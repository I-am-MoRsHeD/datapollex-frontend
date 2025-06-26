'use client'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Spinner from './Spinner';
import axiosInstance from '../hooks/useAxiosInstance';

interface FormValues {
    email: string,
    password: string
}

const Login = () => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();
    const onSubmit = async (data: FormValues) => {
        try {
            setLoading(true);
            const user = await axiosInstance.post('/api/auth/login', data);
            reset();
            if(user?.data?.data?.user?.role === 'ADMIN'){
                window.location.href = '/admin';
            } else if(user?.data?.data?.user?.role === 'USER'){
                window.location.href = '/user';
            } else {
                alert('Invalid user role');
            }
        } catch (error: unknown) {
            console.error(error);
        } finally{
            setLoading(false);
        };

    }
    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <h1 className='text-4xl font-bold text-center mb-5'>Login</h1>
            <div className=' border border-white rounded-xl h-[50%] w-[40%]'>
                <div className='px-4 flex flex-col justify-center h-full'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <input
                                type="text"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                        message: "Invalid email",
                                    },
                                })}
                                className={`w-full px-3 py-2 my-4 border-b ${errors.email ? "border-red-500" : "border-gray-300"
                                    } outline-none rounded-xl`}
                                placeholder="Enter email ..."
                            />
                            {errors.email && (
                                <div className="text-red-500 text-xs mt-1">
                                    {errors.email.message}
                                </div>
                            )}
                        </div>
                        <div>
                            <input
                                type="text"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: 6,
                                    pattern: /^[0-9]*$/
                                })}
                                className={`w-full px-3 py-2 my-4 border-b ${errors.password ? "border-red-500" : "border-gray-300"
                                    } outline-none rounded-xl`}
                                placeholder="Enter password ..."
                            />
                            {errors.password && (
                                <div className="text-red-500 text-xs mt-1">
                                    {errors.password.message}
                                </div>
                            )}
                        </div>
                        <div className='mt-8'>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`bg-white text-black h-10 w-full rounded-[4px] font-medium hover:scale-105 transition-all duration-300 ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                                    }`}
                            >
                                {loading ? <Spinner className="h-3 w-3" /> : "Login"}
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
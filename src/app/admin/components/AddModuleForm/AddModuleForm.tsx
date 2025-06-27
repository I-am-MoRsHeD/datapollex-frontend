import Spinner from '@/app/components/Spinner';
import axiosInstance from '@/app/hooks/useAxiosInstance';
import useModule from '@/app/hooks/useModule';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface FormValues {
    title: string
}

const AddModuleForm = ({ courseId, setIsModalOpen }: { courseId: string; setIsModalOpen: (value: boolean) => void }) => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();
    const [loading, setLoading] = useState(false);
    const { refetch } = useModule();

    const onSubmit = async (data: FormValues) => {
        try {
            setLoading(true);
            const moduleInfo = {
                title: data.title,
                courseId: courseId
            };
            const res = await axiosInstance.post('/api/module', moduleInfo);
            if (res?.data?.success === true) {
                toast.success("Module added successfully");
                reset();
                refetch();
                setIsModalOpen(false);
            };
        } catch (error: unknown) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }

    return (
        <div className='w-full py-5'>
            <div className='flex flex-row justify-center items-center mb-8 border-b border-gray-300 pb-2 rounded-xl'>
                <h2 className='text-2xl font-semibold'>Add Module</h2>
            </div>
            <form className="w-full px-3" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-row items-center w-full gap-2 my-3">
                    {/* title */}
                    <div className="">
                        <label className="">
                            <span className="">Module Title*</span>
                        </label>
                        <input
                            {...register("title", { required: "Module title is required" })}
                            type="text"
                            placeholder="Module Title"
                            className={`w-full px-3 py-2 my-1 border ${errors.title ? "border-red-500" : "border-gray-300"
                                } outline-none rounded-xl`}
                        />
                        {errors.title && (
                            <span className="text-red-500 text-xs mt-1">
                                {errors.title.message}
                            </span>
                        )}
                    </div>
                </div>
                <button
                    type='submit'
                    disabled={loading}
                    className={`focus:outline-none w-full mt-5 bg-white text-black hover:bg-black hover:text-white hover:border font-semibold py-2.5 rounded-md ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}>
                    {loading ? <Spinner className="h-3 w-3" /> : "Add Module"}
                </button>
            </form>
        </div>
    );
};

export default AddModuleForm;
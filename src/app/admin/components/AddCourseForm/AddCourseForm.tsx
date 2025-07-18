import React, { useState } from 'react';
import axiosInstance from '@/app/hooks/useAxiosInstance';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import Spinner from '@/app/components/Spinner';
import toast from 'react-hot-toast';
import useCourse from '@/app/hooks/useCourse';

interface FormValues {
    thumbnail: FileList,
    title: string,
    price: number,
    description: string
};

const AddCourseForm = ({ setIsModalOpen }: { setIsModalOpen: (value: boolean) => void }) => {
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<FormValues>();
    const [loading, setLoading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const { refetch} = useCourse();

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files?.length > 0) {
            setPreviewUrl(URL.createObjectURL(files[0]));
            setImageFile(files[0]);
            setValue("thumbnail", files, { shouldValidate: true });
        }
    };

    const onSubmit = async (data: FormValues) => {
        setLoading(true);
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("price", data.price.toString());
        formData.append("description", data.description);

        if (imageFile) {
            formData.append("thumbnail", imageFile);
        };

        try {
            const res = await axiosInstance.post('/api/course', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setIsModalOpen(false);
            if (res?.data?.success === true) {
                toast.success("Course added successfully");
                reset();
                setImageFile(null);
                setPreviewUrl(null);
                refetch();
            }
        } catch (error) {
            console.error("Upload error:", error);
            toast.error('Something went wrong');
            setIsModalOpen(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-full py-5'>
            <div className='flex flex-row justify-center items-center mb-8 border-b border-gray-300 pb-2 rounded-xl'>
                <h2 className='text-2xl font-semibold'>Add Course</h2>
            </div>
            <form className="w-full px-3" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-row items-center w-full gap-2 my-3">
                    {/* title */}
                    <div className="w-[70%]">
                        <label className="">
                            <span className="">Course Title*</span>
                        </label>
                        <input
                            {...register("title", { required: "Course title is required" })}
                            type="text"
                            placeholder="Course Title"
                            className={`w-full px-3 py-2 my-1 border ${errors.title ? "border-red-500" : "border-gray-300"
                                } outline-none rounded-xl`}
                        />
                        {errors.title && (
                            <span className="text-red-500 text-xs mt-1">
                                {errors.title.message}
                            </span>
                        )}
                    </div>
                    {/* price */}
                    <div className="w-[30%]">
                        <label className="label">
                            <span className="label-text">Price*</span>
                        </label>
                        <input
                            {...register("price", { required: true })}
                            type="number"
                            placeholder="Price"
                            className={`w-full px-3 py-2 my-1 border ${errors.price ? "border-red-500" : "border-gray-300"
                                } outline-none rounded-xl`}
                        />
                        {errors.price && (
                            <span className="text-red-500 text-xs mt-1">
                                {errors.price.message}
                            </span>
                        )}
                    </div>
                </div>
                {/* description */}
                <div className="w-full my-1">
                    <label className="">
                        <span className="">Course description*</span>
                    </label>
                    <textarea
                        {...register("description", { required: "Course description is required" })}
                        placeholder="Course description"
                        className={`w-full px-3 py-2 mt-1 mb-3 border ${errors.description ? "border-red-500" : "border-gray-300"
                            } outline-none rounded-xl`}
                    />
                    {errors.description && (
                        <span className="text-red-500 text-xs mt-1">
                            {errors.description.message}
                        </span>
                    )}
                </div>
                {/* Thumbnail */}
                <div className="w-full my-1 relative border-2 border-dotted border-gray-300 rounded-lg cursor-pointer">
                    <div className="py-4 text-center">
                        <label className="flex flex-col justify-center items-center cursor-pointer">
                            <input
                                {...register("thumbnail", { required: false })}
                                type="file"
                                name="thumbnail"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                            <div className="cursor-pointer px-3">
                                {previewUrl ? (
                                    <Image src={previewUrl} width={100} height={100} alt="Preview" className="object-cover rounded-lg mb-2" />
                                ) : (
                                    <svg
                                        className="text-white w-10 mx-auto mb-2"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                        />
                                    </svg>
                                )}
                            </div>
                            <div className="title text-sm text-white">
                                {imageFile?.name || "Drag or Upload File"}
                            </div>
                        </label>
                    </div>
                </div>
                <button
                    type='submit'
                    disabled={loading}
                    className={`focus:outline-none w-full mt-5 bg-white text-black hover:bg-black hover:text-white hover:border font-semibold py-2.5 rounded-md ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}>
                    {loading ? <Spinner className="h-3 w-3" /> : "Add Course"}
                </button>
            </form>
        </div>
    );
};

export default AddCourseForm;
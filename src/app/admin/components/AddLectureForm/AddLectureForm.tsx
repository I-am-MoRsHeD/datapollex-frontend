import Spinner from '@/app/components/Spinner';
import axiosInstance from '@/app/hooks/useAxiosInstance';
import useLectures from '@/app/hooks/useLectures';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface FormValues {
    title: string,
    videoUrl: string,
    pdfNotes: string
}

const AddLectureForm = ({ moduleId, setIsModalOpen }: { moduleId: string; setIsModalOpen: (value: boolean) => void }) => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>();
    const [loading, setLoading] = useState(false);
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const { refetch } = useLectures();

    const handlePdfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files?.length > 0) {
            setPdfFile(files[0]);
        }
    };

    const onSubmit = async (data: FormValues) => {
        setLoading(true);
        const formData = new FormData();
        formData.append("moduleId", moduleId);
        formData.append("title", data.title);
        formData.append("videoUrl", data.videoUrl);

        if (pdfFile) {
            formData.append("pdfNotes", pdfFile);
        };

        try {
            const res = await axiosInstance.post('/api/lecture', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setIsModalOpen(false);
            if (res?.data?.success === true) {
                toast.success("Lecture added successfully");
                reset();
                refetch();
            }
        } catch {
            toast.error('Something went wrong');
            setIsModalOpen(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='w-full md:w-[600px] py-5'>
            <div className='flex flex-row justify-center items-center mb-8 border-b border-gray-300 pb-2 rounded-xl'>
                <h2 className='text-2xl font-semibold'>Add Lecture</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full px-3">
                <div className='w-full'>
                    <label className="block text-sm font-medium">Lecture Title</label>
                    <input
                        {...register("title", { required: "Title is required" })}
                        type="text"
                        className={`w-full px-3 py-2 my-1 border ${errors.title ? "border-red-500" : "border-gray-300"
                            } outline-none rounded-xl`}
                        placeholder="Enter lecture title"
                    />
                    {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
                </div>

                <div className='w-full'>
                    <label className="block text-sm font-medium">Video URL</label>
                    <input
                        {...register("videoUrl", { required: "Video URL is required" })}
                        type="text"
                        className={`w-full px-3 py-2 my-1 border ${errors.videoUrl ? "border-red-500" : "border-gray-300"
                            } outline-none rounded-xl`}
                        placeholder="https://youtube.com/..."
                    />
                    {errors.videoUrl && <p className="text-sm text-red-500">{errors.videoUrl.message}</p>}
                </div>

                <div className="w-full my-1 relative border-2 border-dotted border-gray-300 rounded-lg cursor-pointer">
                    <div className="py-4 text-center">
                        <label className="flex flex-col justify-center items-center cursor-pointer">
                            <input
                                {...register("pdfNotes", { required: true })}
                                type="file"
                                name="pdfNotes"
                                accept="application/pdf"
                                className="hidden"
                                onChange={handlePdfChange}
                            />
                            <div className="cursor-pointer px-3">
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
                            </div>
                            <div className="title text-sm text-white">
                                {pdfFile?.name || "Drag or Upload File"}
                            </div>
                        </label>
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 px-4 mt-4 rounded-lg text-black font-semibold bg-white ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                >
                    {loading ? <Spinner className="w-4 h-4 mx-auto" /> : "Add Lecture"}
                </button>
            </form>
        </div>
    );
};

export default AddLectureForm;
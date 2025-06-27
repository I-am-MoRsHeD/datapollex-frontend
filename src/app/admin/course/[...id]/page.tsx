'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axiosInstance from '@/app/hooks/useAxiosInstance';
import { ICourse } from '@/app/interfaces';
import Image from 'next/image';
import Spinner from '@/app/components/Spinner';
import Header from '@/app/shared/Header';
import Link from 'next/link';
import { CiCirclePlus } from 'react-icons/ci';
import Modal from '@/app/shared/Modal';
import AddModuleForm from '../../components/AddModuleForm/AddModuleForm';
import ModuleList from '../../components/ModuleList/ModuleList';

const CourseDetailsPage = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [course, setCourse] = useState<ICourse | null>(null);

    useEffect(() => {
        setLoading(true);
        const fetchCourse = async () => {
            try {
                const res = await axiosInstance.get(`/api/course/${id?.[0]}`);
                setCourse(res?.data?.data);
            } catch (error) {
                console.error('Error fetching course:', error);
            }
        };

        if (id?.[0]) {
            fetchCourse();
        }
        setLoading(false);
    }, [id]);

    return (
        <div className="p-5 max-w-6xl mx-auto space-y-8">
            <Header user='Admin' />
            <Link href={'/admin'} className='shadow-md shadow-white rounded-xl py-2 px-4'>
                Go back
            </Link>
            {loading ? <Spinner className='h-10 w-10' /> : (
                <div className='flex flex-row gap-5 w-full mt-5 shadow-md rounded-xl shadow-white'>
                    {course?.thumbnail ? <Image src={course?.thumbnail} alt="placeholder" width={700} height={700} /> : <Spinner className='h-10 w-10' />}
                    <div className='space-y-2 w-full'>
                        <div className='flex flex-row justify-between items-center'>
                            <h1 className="text-2xl font-bold">{course?.title}</h1>
                            <p className="text-md font-semibold">Price: {course?.price}</p>
                        </div>
                        <p className="text-sm">{course?.description}</p>
                    </div>
                </div>
            )}
            {/* module section */}
            <div className='flex flex-row justify-between items-center rounded-b border-b border-gray-300'>
                <h1>Module List</h1>
                <button onClick={() => setIsModalOpen(true)} className='flex flex-col items-center gap-1 cursor-pointer'><CiCirclePlus className='w-10 h-10' />Add Module </button>
            </div>
            {
                isModalOpen && <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                >
                    <AddModuleForm courseId={id?.[0] as string} setIsModalOpen={setIsModalOpen} />
                </Modal>
            }
            <div>
                <ModuleList courseId={id?.[0] as string} />
            </div>
        </div>
    );
};

export default CourseDetailsPage;

'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axiosInstance from '@/app/hooks/useAxiosInstance';
import { ICourse } from '@/app/interfaces';
import Image from 'next/image';
import Spinner from '@/app/components/Spinner';
import Header from '@/app/shared/Header';
import Link from 'next/link';

const CourseDetailsPage = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);

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
        </div>
    );
};

export default CourseDetailsPage;

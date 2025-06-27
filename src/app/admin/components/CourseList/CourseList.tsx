import useCourse from '@/app/hooks/useCourse';
import { ICourse } from '@/app/interfaces';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const CourseList = () => {
    const { courses, isLoading } = useCourse();

    return (
        <div className='my-5 grid grid-cols-2 gap-4'>
            {
                isLoading ? <div className='flex flex-col justify-center items-center h-full col-span-2 text-xl font-bold'>Loading....</div> : (
                    courses?.map((course: ICourse) => (
                        <Link key={course?._id} href={`/admin/course/${course?._id}`} className='h-72 flex flex-row gap-2 shadow-md rounded-xl shadow-white'>
                            {course?.thumbnail ? <Image src={course?.thumbnail} alt="placeholder" width={300} height={300} /> : <Image src="/images/Mask group.png" alt="placeholder" width={300} height={300} />}
                            <div className='space-y-2 pr-2'>
                                <div className='flex flex-row justify-between items-center gap-2'>
                                    <h2 className='text-xl font-semibold'>{course?.title}</h2>
                                    <p>BDT. {course?.price}</p>
                                </div>
                                <p className='text-sm'>{course?.description?.length > 400 ? course?.description?.slice(0, 400) + '...' : course?.description}</p>
                            </div>
                        </Link>
                    ))
                )
            }

            {/* <Link href={'/admin'} className='h-72 w-[50%] flex flex-row gap-2 shadow-md rounded-xl shadow-white'>
                <Image src="/images/Mask group.png" alt="placeholder" width={300} height={300} />
                <div className='space-y-1 pr-2'>
                    <div className='flex flex-row justify-between items-end'>
                        <h2 className='text-xl font-semibold'>Course title</h2>
                        <p>BDT. 2300</p>
                    </div>
                    <p className='text-sm'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Exercitationem, quas inventore? Facere ut sequi doloremque quo tempore, magni, repellat recusandae rem excepturi iure officia sed nobis similique. Quos atque facere labore quod doloremque quis assumenda quisquam. Id perspiciatis, ullam deserunt est corrupti quo quasi recusandae cum, l</p>
                </div>
            </Link> */}
        </div>
    );
};

export default CourseList;
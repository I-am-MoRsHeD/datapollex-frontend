import useCourse from '@/app/hooks/useCourse';
import { ICourse } from '@/app/interfaces';
import Modal from '@/app/shared/Modal';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import EditCourseForm from '../EditCourseForm/EditCourseForm';
import Swal from 'sweetalert2';
import axiosInstance from '@/app/hooks/useAxiosInstance';

const CourseList = () => {
    const { courses, isLoading } = useCourse();
    const [selectedCourse, setSelectedCourse] = useState<ICourse | null>(null);
    const [editModalOpen, setEditModalOpen] = useState(false);

    const handleEdit = (e: React.MouseEvent, course: ICourse) => {
        e.preventDefault();
        e.stopPropagation();
        setEditModalOpen(true);
        setSelectedCourse(course);
    };

    const handleDelete = async (e: React.MouseEvent, course: ICourse) => {
        e.preventDefault();
        e.stopPropagation();
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosInstance.delete(`/api/course/${course?._id}`);
                console.log(res);
                if (res?.data?.success) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Course has been deleted.",
                        icon: "success"
                    });
                }
            }
        });
    };

    return (
        <div className="my-5 grid grid-cols-2 gap-4">
            {isLoading ? (
                <div className="flex flex-col justify-center items-center h-full col-span-2 text-xl font-bold">Loading....</div>
            ) : (
                courses?.map((course: ICourse) => (
                    <Link
                        key={course?._id}
                        href={`/admin/course/${course?._id}`}
                        className="h-72 flex flex-row gap-2 shadow-md shadow-white rounded-xl p-2"
                    >
                        <Image
                            src={course?.thumbnail || "/images/Mask group.png"}
                            alt="Course Thumbnail"
                            width={300}
                            height={300}
                            className="rounded-md object-cover"
                        />

                        <div className="flex flex-col justify-between flex-1 pr-2">
                            <div className="space-y-2">
                                <div className="flex flex-row justify-between items-center gap-2">
                                    <h2 className="text-xl font-semibold">{course?.title}</h2>
                                    <p>BDT. {course?.price}</p>
                                </div>
                                <p className="text-sm text-gray-600">
                                    {course?.description?.length > 250
                                        ? course?.description.slice(0, 250) + '...'
                                        : course?.description}
                                </p>
                            </div>

                            <div className="flex flex-row justify-end gap-2 mt-2">
                                <button
                                    className="bg-gray-500 text-white py-1 px-3 rounded cursor-pointer"
                                    onClick={(e) => handleEdit(e, course)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 text-white py-1 px-3 rounded cursor-pointer"
                                    onClick={(e) => handleDelete(e, course)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </Link>
                ))
            )}
            <>
                {
                    editModalOpen && (
                        <Modal
                            isOpen={editModalOpen}
                            onClose={() => setEditModalOpen(false)}
                        >
                            <EditCourseForm setIsModalOpen={setEditModalOpen} course={selectedCourse as ICourse} />
                        </Modal>
                    )
                }
            </>
        </div>
    );
};

export default CourseList;
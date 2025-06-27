'use client'
import React, { useState } from 'react';
import { CiCirclePlus } from 'react-icons/ci';
import CourseList from '../CourseList/CourseList';
import Modal from '@/app/shared/Modal';
import AddCourseForm from '../AddCourseForm/AddCourseForm';

const CourseComponent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div className='max-w-6xl mx-auto my-3'>
            <div className='flex flex-row justify-between items-center rounded-b border-b border-gray-300'>
                <h1>Course List</h1>
                <button onClick={() => setIsModalOpen(true)} className='flex flex-col items-center gap-1 cursor-pointer'><CiCirclePlus className='w-10 h-10' />Add Course </button>
            </div>
            <div>
                <CourseList />
            </div>
            <>
                {isModalOpen &&
                    <Modal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                    >
                        <AddCourseForm setIsModalOpen={setIsModalOpen} />
                    </Modal>}
            </>
        </div>
    );
};

export default CourseComponent;
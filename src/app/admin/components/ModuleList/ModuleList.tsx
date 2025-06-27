import Spinner from '@/app/components/Spinner';
import useLectures from '@/app/hooks/useLectures';
import useModule from '@/app/hooks/useModule';
import Modal from '@/app/shared/Modal';
import React, { useState } from 'react';
import { CiCirclePlus } from 'react-icons/ci';
import AddLectureForm from '../AddLectureForm/AddLectureForm';
import { ILecture, IModule } from '@/app/interfaces';
import EditModuleForm from '../EditModuleForm/EditModuleForm';
import Swal from 'sweetalert2';
import axiosInstance from '@/app/hooks/useAxiosInstance';
import EditLectureForm from '../EditLectureForm/EditLectureForm';

const ModuleList = ({ courseId }: { courseId: string }) => {
    const { modules, isLoading, refetch } = useModule(courseId);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editLectureModalOpen, setEditLectureModalOpen] = useState(false);
    const [expandedRow, setExpandedRow] = useState<string | null>(null);
    const [selectedModule, setSelectedModule] = useState<IModule | null>(null);
    const [selectedLecture, setSelectedLecture] = useState<ILecture | null>(null);
    const { lectures, isLoading: lecturesLoading, refetch: lectureRefecth } = useLectures(expandedRow as string);

    const handleExpandedRow = (id: string) => {
        setExpandedRow(expandedRow === id ? null : id);
    };

    const handleEdit = (module: IModule) => {
        setEditModalOpen(true);
        setSelectedModule(module);
    };

    const handleDelete = (id: string) => {
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
                const res = await axiosInstance.delete(`/api/module/${id}`);
                refetch();
                if (res?.data?.success) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Module has been deleted.",
                        icon: "success"
                    });
                }
            }
        });
    };

    const handleEditLecture = (lecture: ILecture) => {
        setEditLectureModalOpen(true);
        setSelectedLecture(lecture);
    };

    const handleDeleteLecture = (id: string) => {
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
                const res = await axiosInstance.delete(`/api/lecture/${id}`);
                lectureRefecth();
                if (res?.data?.success) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Lecture has been deleted.",
                        icon: "success"
                    });
                }
            }

        });
    };

    return (
        <div className="overflow-x-auto mt-5">
            <table className="min-w-full border border-gray-300 text-sm text-left">
                <thead className="bg-gray-500">
                    <tr>
                        <th className="px-4 py-3 border-b border-gray-300">Module No.</th>
                        <th className="px-4 py-3 border-b border-gray-300 text-center">Module Title</th>
                        <th className="px-4 py-3 border-b border-gray-300 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? (
                        <tr>
                            <td colSpan={3} className="text-center py-4">
                                <Spinner className="w-6 h-6 mx-auto" />
                            </td>
                        </tr>
                    ) : modules?.length > 0 ? (
                        modules?.flatMap((module: IModule) => [
                            <tr
                                key={module._id}
                                className="border-b border-gray-200 transition cursor-pointer hover:bg-gray-400"
                                onClick={() => handleExpandedRow(module._id)}
                            >
                                <td className="px-4 py-2">{module.moduleNumber}</td>
                                <td className="px-4 py-2 text-center">{module.title}</td>
                                <td className="px-4 py-2 text-center">
                                    <div
                                        className="flex flex-row justify-center gap-3"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <button
                                            onClick={() => setIsModalOpen(true)}
                                            className="flex items-center gap-1 text-green-600 hover:underline"
                                        >
                                            <CiCirclePlus className="w-4 h-4" />
                                            Add Lecture
                                        </button>
                                        <button onClick={() => handleDelete(module?._id)} className="text-red-600 hover:underline cursor-pointer">Delete</button>
                                        <button onClick={() => handleEdit(module)} className="text-blue-600 hover:underline cursor-pointer">Edit</button>
                                    </div>
                                </td>
                            </tr>,

                            expandedRow === module?._id && (
                                <tr key={`${module?._id}-expanded`}>
                                    <td colSpan={3} className="bg-black border-b border-gray-200">
                                        <div className="p-4">
                                            <h3 className="text-lg font-semibold mb-2">Lectures:</h3>
                                            <ul className="list-disc list-inside space-y-1">
                                                {lecturesLoading ? <Spinner className="w-6 h-6 mx-auto" /> :

                                                    lectures?.length > 0 ? (
                                                        lectures?.map((lecture: ILecture) => (
                                                            <li key={lecture?._id} className='flex flex-row justify-between items-center'>
                                                                <a
                                                                    href={lecture?.videoUrl}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="text-blue-600 hover:underline"
                                                                >
                                                                    {lecture?.title}
                                                                </a>
                                                                <div className='flex flex-row gap-2'>
                                                                    <button onClick={() => handleEditLecture(lecture)} className="text-blue-600 hover:underline cursor-pointer">Edit</button>
                                                                    <button onClick={() => handleDeleteLecture(lecture?._id)} className="text-red-600 hover:underline cursor-pointer">Delete</button>
                                                                </div>
                                                            </li>
                                                        ))
                                                    ) : (
                                                        <p className="text-gray-500">No lectures added yet.</p>
                                                    )}
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            ),
                        ])
                    ) : (
                        <tr>
                            <td colSpan={3} className="text-center py-4 text-gray-500">
                                No modules found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Add Lecture modal */}
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <AddLectureForm moduleId={expandedRow as string} setIsModalOpen={setIsModalOpen} />
                </Modal>
            )}
            {editModalOpen && (
                <Modal isOpen={editModalOpen} onClose={() => setEditModalOpen(false)}>
                    <EditModuleForm courseId={courseId as string} module={selectedModule as IModule} setIsModalOpen={setEditModalOpen} />
                </Modal>
            )}
            {editLectureModalOpen && (
                <Modal isOpen={editLectureModalOpen} onClose={() => setEditLectureModalOpen(false)}>
                    <EditLectureForm moduleId={selectedModule?._id as string} lecture={selectedLecture as ILecture} setIsModalOpen={setEditLectureModalOpen} />
                </Modal>
            )}
        </div>
    );
};

export default ModuleList;

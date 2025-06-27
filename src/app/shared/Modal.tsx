'use client';
import { ReactNode } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose?: () => void;
    children: ReactNode;
    modalClassName?: string;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    children,
    modalClassName = '',
}) => {
    return (
        <div
            onClick={onClose}
            className={`fixed inset-0 z-[999999] flex items-center justify-center bg-black/10 backdrop-brightness-75 backdrop-blur-sm transition-opacity duration-300 px-4 lg:px-0 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className={`relative bg-white dark:bg-zinc-900 dark:text-white rounded-xl shadow-lg transition-transform duration-300 ${modalClassName}`}
            >
                <div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
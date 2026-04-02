import React from 'react';
import { FaCheckCircle, FaExclamationCircle, FaTimes } from 'react-icons/fa';

const CustomAlert = ({ message, type = 'info', onClose }) => {
    if (!message) return null;

    const bgColors = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500'
    };

    const icons = {
        success: <FaCheckCircle className="text-xl" />,
        error: <FaExclamationCircle className="text-xl" />,
        info: <FaExclamationCircle className="text-xl" />
    };

    return (
        <div className="fixed top-4 right-4 z-[9999] animate-in fade-in slide-in-from-top-4 duration-300">
            <div className={`${bgColors[type]} text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 min-w-[300px]`}>
                {icons[type]}
                <p className="font-medium flex-1">{message}</p>
                <button
                    onClick={onClose}
                    className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                >
                    <FaTimes />
                </button>
            </div>
        </div>
    );
};

export default CustomAlert;

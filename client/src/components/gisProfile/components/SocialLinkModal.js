"use client";
import React from 'react';
import { IoMdClose } from 'react-icons/io';

const SocialLinkModal = ({ isOpen, setIsOpen, handleSubmit, data, setData }) => {
    const handleAdd = (e) => {
        e.preventDefault();

        if (!data.title || !data.url) {
            return;
        }

        handleSubmit();
        setIsOpen(false);
    };

    return (
        isOpen ? (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                    >
                        <IoMdClose size={24} />
                    </button>
                    <h2 className="text-lg font-semibold mb-4">Add Social Link</h2>
                    <form onSubmit={handleAdd}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData(prev => ({ ...prev, title: e.target.value }))}
                                className="border border-gray-300 rounded-lg w-full p-2"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
                            <input
                                type="url"
                                value={data.url}
                                onChange={(e) => setData(prev => ({ ...prev, url: e.target.value }))}
                                className="border border-gray-300 rounded-lg w-full p-2"
                                required
                            />
                        </div>
                        <div className="flex justify-end text-xs items-center gap-2">
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                            >
                                Close
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                            >
                                Add
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        ) : null
    );
};

export default SocialLinkModal;

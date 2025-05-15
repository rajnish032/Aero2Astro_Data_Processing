import React, { useState } from 'react';
import { TiDelete } from "react-icons/ti";

const EquipmentCard = ({ equipment, width = "300px", handleDelete, equipmentId, isDashboard }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const confirmDelete = (equipmentId) => {
        handleDelete(equipmentId);
        closeModal();
    };

    return (
        <div className={`shadow p-2 rounded-md bg-blue-100 px-3 text-gray-800 flex justify-between gap-3 w-[${width}]`}>
            <div>
                <p className='font-semibold text-tiny md:text-sm'>{equipment?.name}</p>
                <p className='text-xs md:font-medium'>{equipment?.equipmentId}</p>
            </div>

            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQUaCzq95FRU8OgLagfhSQH2NdLq6oSqFNLw&s"
                alt=""
                className='h-14 w-24 object-cover'
            />

            {/* Conditionally render the delete icon based on isDashboard prop */}
            {!isDashboard && (
                <div className='flex items-start justify-end mb-1'>
                    <TiDelete
                        onClick={() => handleDelete(equipmentId)}
                        className='text-lg cursor-pointer w-fit h-fit inline-block text-red-500 hover:text-red-700'
                    />
                </div>
            )}
        </div>
    );
};

export default EquipmentCard;

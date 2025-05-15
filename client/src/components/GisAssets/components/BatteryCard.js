import React from 'react';
import dayjs from 'dayjs';
import { FaBatteryFull, FaIdBadge, FaRegCalendarAlt, FaSyncAlt, FaCommentDots, FaTrashAlt } from 'react-icons/fa';


const BatteryCard = ( { battery, handleDelete, batteryId, isDashboard }) => {
    return (
        <div className='bg-blue-50  text-gray-800 w-[300px] shadow-md  rounded-md p-4 text-tiny'>
            <div className=' flex items-center justify-between mb-2 '>
                <p className='text-lg font-semibold'>{battery?.modelName}</p>

                <div className=' flex  items-center gap-1'>
                    <div className={`w-2 h-2 rounded-full ${battery?.status === "available" ? 'bg-green-500' : 'bg-red-500'}`}>
                    </div>
                    {battery?.status === "available" ? 'Available' : 'Not Available'}
                </div>
            </div>
            <div className='flex items-center mb-2'>
                <FaIdBadge className='mr-2 text-gray-600' />
                <p>{battery?.batteryId}</p>
            </div>
            <div className='flex items-center mb-2'>
                <FaBatteryFull className='mr-2 text-gray-600' />
                <p>{battery?.serialId}</p>
            </div>
            <div className='flex items-center mb-2'>
                <FaRegCalendarAlt className='mr-2 text-gray-600' />
                <p>{dayjs(battery?.purchaseDate).format('MMM DD, YYYY')}</p>
            </div>
            <div className='flex items-center mb-2'>
                <FaSyncAlt className='mr-2 text-gray-600' />
                <p>Cycles: {battery?.dischargeCycles}</p>
            </div>
            {battery?.remarks && (
                <div className='flex items-center'>
                    <FaCommentDots className='mr-2 text-gray-600' />
                    <p>{battery?.remarks}</p>
                </div>
            )}
            
            {/* Conditionally render the delete icon based on isDashboard prop */}
            {!isDashboard && (
                <div className='flex items-start justify-end mb-1'>
                    <FaTrashAlt
                        onClick={() => handleDelete(batteryId) }
                        className='text-lg cursor-pointer w-fit h-fit inline-block text-red-500 hover:text-red-700'
                    />
                </div>
            )}
        </div>
    );
};

export default BatteryCard;

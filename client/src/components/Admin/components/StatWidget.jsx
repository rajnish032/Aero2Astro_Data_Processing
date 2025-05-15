import React from 'react';

const StatWidget = ({ title, value, icon }) => {
    return (
        <div className='bg-white rounded-lg shadow-lg flex min-w-48  p-4  py-5 justify-between gap-5  items-center'>
            <div className='flex-grow'>
                <h3 className='text-gray-600 font-semibold'>{title}</h3>
                <p className='text-3xl font-bold text-gray-900'>{value}</p>
            </div>
            <div className='bg-gradient-to-r p-1 rounded-md from-blue-500 to-blue-800'>
                {icon}
            </div>
        </div>
    );
}

export default StatWidget;

import React from 'react';

const SoftwareCard = () => {
    return (
        <div className='w-32 h-14 relative bg-white shadow cursor-pointer hover:scale-105 transition-all duration-500'>

            <img className='opacity-25 object-cover h-[80%] w-full'
            src="https://t4.ftcdn.net/jpg/02/23/31/39/240_F_223313966_LwIvXbmXjMerJkGsqnYgQKvRwbahJb1U.jpg" alt="" />

            <p className='bg-white text-tiny absolute bottom-0 inset-x-0 text-center '>Software 1</p>
        </div>
    );
}

export default SoftwareCard;

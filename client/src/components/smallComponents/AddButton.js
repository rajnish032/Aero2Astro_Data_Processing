
import React from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";

const AddButton = ({onClick}) => {
    return (
        <div onClick={onClick} title='Add More' className='border border-gray-900 rounded-md cursor-pointer hover:bg-gray-300 border-dotted text-gray-800 min-w-20 p-1 '>
            <IoIosAddCircleOutline className='w-fit mx-auto text-blue-600'/>
        </div>
    );
}

export default AddButton;

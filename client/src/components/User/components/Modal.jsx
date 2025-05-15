"use client"

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { RxCross1 } from "react-icons/rx";



const Modal = ({ children, isModalOpen, disabled, loading, setIsOpenModal, modalBtnHandler, btnText }) => {

    const [portal, setPortal] = useState(null);
    useEffect(() => {
        setPortal(document.getElementById('portal'));
    }, []);


    if (!isModalOpen) return null;



    return createPortal(
        <div className='bg-black bg-opacity-15 absolute inset-0 flex items-center justify-center z-[2400]'>
            <div className='min-w-96 min-h-[500px] rounded-lg relative bg-white shadow-inner border border-blue-500'>
                <div className='w-fit text-right font-bold font-mono text-xl mx-3 hover:text-red-600 cursor-pointer absolute top-5 right-5' onClick={() => setIsOpenModal(false)}>
                    <RxCross1 onClick={() => setIsOpenModal(false)} />
                </div>
                <div className='p-2 my-20 '>
                    {children}
                </div>
                <div className='my-2 p-2 absolute bottom-0 w-full'>
                    <button 
                        disabled={disabled}
                        className={`block text-white font-bold w-[80%] mx-auto p-2 ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-500'}`} 
                        onClick={modalBtnHandler}
                    >
                        {loading? "Saving..." :btnText}
                    </button>
                </div>
            </div>
        </div>,
        portal
    );
};

export default Modal;

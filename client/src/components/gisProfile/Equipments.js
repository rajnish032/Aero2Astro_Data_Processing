"use client"
import React, { useState } from 'react';
import { TbDrone } from "react-icons/tb";

import { gisData } from '@/atom/states';
import { useRecoilState } from 'recoil';

const Equipments = () => {
    const [currentUser, setCurrentUser] = useRecoilState(gisData)
    

    return (
        <div className="rounded-md shadow relative  bg-white ">
            <h2 className="text-lg flex items-center gap-2 border-b font-bold px-5 rounded-sm  inset-x-0 py-1 text-gray-800">
                <TbDrone className="" />  Types of Equipments
            </h2>

            <div className='my-2 md:px-4  px-2 py-2 flex gap-4 flex-wrap '>
            <div className='flex gap-3 px-2 md:px-3 p-1 h-full items-center  flex-wrap'>
                {currentUser?.skills?.equipmentTypesCanHandle?.map((i,id) =>
                    <div key={id} className='bg-blue-600 text-white font-medium text-sm rounded-full px-2 py-1'>
                        {i}
                    </div>
                )}
               

            </div>
               
            </div>


        </div>
    );
}

export default Equipments;

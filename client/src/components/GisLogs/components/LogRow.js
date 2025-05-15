"use client";

import { useState } from 'react';
import { GiDeliveryDrone, GiNotebook } from "react-icons/gi";
import { FaMapMarkerAlt, FaClock, FaRulerHorizontal, FaTrashAlt } from 'react-icons/fa';
import dayjs from 'dayjs';

export const LogRow = ({ log ,handleDeleteLog}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="w-full cursor-pointer">
            <div
                title={log?.remark}
                onClick={toggleAccordion}
                style={{ scrollbarWidth: 'none' }}
                className=" cursor-pointer shadow text-tiny overflow-auto font-medium text-gray-800 rounded p-2 grid md:grid-cols-8 place-content-center text-center grid-cols-2 gap-3  md:cursor-default md:hover:bg-transparent"
            >
                <div className="col-span-1  cursor-pointer  md:col-span-1 flex items-center text-left gap-2">
                    {/* <GiDeliveryDrone className="text-blue-500" /> */}
                    {log?.flightName}
                </div>
                <div className="col-span-1  cursor-pointer  md:col-span-1 flex items-center gap-2">
                    <FaClock className="text-blue-500" />
                    {dayjs(log?.flightDate).format('DD MMM YYYY')}
                </div>

                {/* Additional details for larger screens */}
                <div className="hidden  cursor-pointer  md:flex md:col-span-1 items-center gap-2">
                    <FaMapMarkerAlt className="text-blue-500" />
                    {log?.location}
                </div>
                <div className="hidden  cursor-pointer  md:flex md:col-span-1 items-center gap-2">
                    <FaClock className="text-blue-500" />
                    {log?.duration?.hr + 'h '}{log?.duration?.min + 'm '}{log?.duration?.sec + 's'}
                </div>

                <div className="hidden  cursor-pointer  md:flex md:col-span-1 items-center gap-2">
                    {/* <FaRulerHorizontal className="text-blue-500" /> */}
                    {log?.flightType[0]?.toUpperCase() + log?.flightType?.slice(1)}
                </div>
                <div className="hidden  cursor-pointer  md:flex md:col-span-1 items-center gap-2">
                    {/* <FaRulerHorizontal className="text-blue-500" /> */}
                    {log?.rangeCovered}  {log?.flightType?.includes('linear') ? ' km' : ' acres'}
                </div>
                <div className="hidden  cursor-pointer  md:flex md:col-span-1 items-center gap-2">
                    {/* <FaRulerHorizontal className="text-blue-500" /> */}
                    {log?.projectType}
                </div>
                <div className="hidden  cursor-pointer  md:flex md:col-span-1">
                    <button title='Delete' onClick={()=>handleDeleteLog(log?._id)} className="bg-red-500 hover:bg-red-600 text-white px-1 py-1 rounded flex items-center gap-2">
                        <FaTrashAlt  />
                        
                    </button>
                </div>


            </div>
            <div className={`w-full text-xs flex items-center gap-2 max-sm:hidden p-2 overflow-hidden transition-all duration-1000 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 hidden opacity-0'}`}>
                <GiNotebook className="text-blue-500 text-lg" />
                {log?.remark ? log?.remark : '---No Remark available---'}
            </div>




            {/* Small Screen: Accordion */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="relative grid text-xs gap-3 p-2">
                    <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-blue-500" />
                        {log?.location}
                    </div>
                    <div className="flex items-center gap-2">
                        <FaClock className="text-blue-500" />
                        {log?.duration?.hr + 'h '}{log?.duration?.min + 'm '}{log?.duration?.sec + 's'}
                    </div>
                    <div className="flex items-center gap-2">
                        {log?.flightType[0]?.toUpperCase() + log?.flightType?.slice(1)}
                    </div>
                    <div className="flex items-center gap-2 font-semibold">
                        {log?.rangeCovered} {log?.flightType?.includes('linear') ? ' km' : ' acres'}
                    </div>
                    {log?.remark ? <div className="flex items-center italic gap-2">
                        <GiNotebook className="text-green-500" />  {log?.remark}
                    </div> : ''}
                    <div>
                        <button className="bg-red-500 absolute top-2 right-2 hover:bg-red-600 text-white px-2 py-1 rounded flex items-center gap-2">
                            <FaTrashAlt />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

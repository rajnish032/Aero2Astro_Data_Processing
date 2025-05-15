"use client";
import React, { useState } from 'react';
import { MdEmail } from "react-icons/md";
import { FaPhone, FaTreeCity } from "react-icons/fa6";
import { IoAdd, IoLocationSharp } from "react-icons/io5";
import { GrEdit } from "react-icons/gr";
import { useRecoilState } from 'recoil';
import { logData, gisData } from '@/atom/states';
import { LiaIndustrySolid } from "react-icons/lia";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { IoTime } from "react-icons/io5";
import { PiBagSimple } from "react-icons/pi";
import { FaEdit } from "react-icons/fa";
import Link from 'next/link';

import { IoShareSocial } from "react-icons/io5";

import { Spinner } from '@nextui-org/react';

const ProfileInfo = () => {
 
    const [currentUser, setCurrentUser] = useRecoilState(gisData);


    const details = [
        { icon: <MdEmail />, text: currentUser?.email },
        { icon: <FaPhone />, text: `${currentUser?.phone.countryCode} ${currentUser?.phone?.number}` },
        { icon: <FaTreeCity />, text: currentUser?.state },
        { icon: <IoLocationSharp />, text: currentUser?.locality }
    ];

    const getFavicon = (url) => {
        const domain = (new URL(url)).hostname;
        return `https://www.google.com/s2/favicons?domain=${domain}`;
    };



    return (
        <div className='w-full'>
            {/* Company Experience & Social Links */}
            <div className='grid lg:grid-rows-2'>
                <div className='my-2  bg-white shadow rounded-lg max-h-40 overflow-y-scroll '>
                    <h2 className='flex text-md font-medium mb-4 px-3 border-b items-center justify-between  bg-gradient-to-r from-green-200 to-blue-500 text-gray-900 text-sm md:text-xl text-center sticky top-0'>
                        <span className='inline-flex gap-2 items-center'><PiBagSimple className='w-fit text-lg' /> Experience</span>
                        <Link
                    href={`/gis/profile/${currentUser?.fullName.toLowerCase().replace(" ", "-")}`}
                >
                    <GrEdit className='text-md cursor-pointer text-white hover:text-black' />
                </Link>
                        
                    </h2>

                    {
                        currentUser?.workExp?.works.length == 0 || !currentUser?.workExp ? <div>
                            <p className='text-center text-tiny'>No work experience added</p>
                        </div> :
                            currentUser?.workExp?.works?.map((i) =>
                                <div key={i._id} className='flex items-center text-sm justify-between '>
                                    <div className='flex-1 p-1'>
                                        <p className='flex items-center gap-2'><LiaIndustrySolid />{i.jobType} at {i.companyName} . {i.designation}</p>
                                        <p className='flex items-center gap-2'> <IoTime /> {i.startMon} - {i.endMon}</p>
                                        <hr className="border-t-2 border-gray-300 my-1"/>
                                    </div>
                                </div>)

                    }


                </div>


                <div className='my-2  bg-white shadow rounded-lg max-h-40 overflow-y-scroll'>
                    <h2 className='flex text-md font-medium mb-4 px-3 border-b items-center justify-between bg-gradient-to-r from-blue-500 to-blue-900 text-white text-sm md:text-xl text-center sticky top-0'>
                        <span className='inline-flex gap-2 items-center'><IoShareSocial className='w-fit text-lg' /> Social Links</span>
                        <Link
                    href={`/gis/profile/${currentUser?.fullName.toLowerCase().replace(" ", "-")}`}
                >
                    <GrEdit className='text-md cursor-pointer text-white hover:text-black' />
                </Link>
                    </h2>

                    {currentUser?.socialLinks?.length === 0 ? (
                        <p className='text-center text-gray-500 text-xs'>No social links added</p>
                    ) : (
                        currentUser?.socialLinks?.map((link) => (
                            <div key={link._id} className='p-2 text-sm mb-2 '>
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center gap-2'>
                                        <img src={getFavicon(link.url)} alt={link.title} className='w-4 object-cover h-4' />
                                        <a href={link.url} target='_blank' rel='noopener noreferrer' className='text-blue-600'>{link.title}</a>
                                    </div>
                                </div>
                                <hr className="border-t-2 border-gray-300 my-1"/>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileInfo;

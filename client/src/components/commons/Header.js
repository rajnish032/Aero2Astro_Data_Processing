"use client"
import { gisData } from '@/atom/states';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import React from 'react';
import { useRecoilState } from 'recoil';
const Header = () => {
    const [currentUser,setCurrentUser] =useRecoilState(gisData)
    const pathname  = usePathname()

    return (
        <div className='sticky top-0 shadow  bg-white' style={{zIndex:pathname===`/gis/dashboard/${currentUser?.fullName?.toLowerCase()?.replace(" ", "-")}`?1500:40}}>
            <div className=' p-5 flex gap-2 items-center  justify-end shadow-md h-14 '>
            <div className='text-xs items-end flex flex-col'>
        
               
               <p className='font-semibold'>{currentUser?.fullName}</p> 
               <p>{currentUser?.email}</p> 
                   <Link
                    href={`/gis/profile/${currentUser?.fullName.toLowerCase().replace(" ", "-")}`}
                    className="text-sm text-blue-500 hover:text-blue-700 font-medium transition-all duration-300"
                >
                    My Profile
                </Link>
               </div>
               <div className='relative w-fit h-fit flex flex-col'>
                <img src={currentUser?.avatar || 'https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png'} alt={currentUser?.fullName}  className='w-10 h-10 object-cover rounded-full m-1 ring ring-green-500'/>
               </div>
            </div>

        </div>
    );
}

export default Header;

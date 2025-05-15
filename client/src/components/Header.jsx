"use client"

import Link from 'next/link';
import logo from "../assets/a2alogo.png"

import { useState } from "react";
import Image from 'next/image';
import { FaBars } from "react-icons/fa6";
import { RxAvatar, RxCross1 } from "react-icons/rx";


const Header = () => {
    let Links = [
        { name: "HOME", link: "/" },
        { name: "ABOUT", link: "https://aero2astro.com" },
        { name: "PARTNERS", link: "#testimonial" },
        { name: "FAQ's", link: "#faqs" },
    ];
    let [open, setOpen] = useState(false);

    return (
        <div className='relative shadow-sm shadow-blue-500 
        md:pr-20
         text-white  bg-transparent h-16 font-white flex items-center justify-between'>

        <div className='bg-black opacity-90 absolute  inset-0 -z-10 '>

        </div>
                    {/* logo section */}
                    <Link 
                        href="#"
                        className="font-bold text-2xl md:mx-20 bg-transparent cursor-pointer overflow-clip relative h-full bg-blue-400 w-[300px] max-sm:w-[200px] flex items-center">
                        <Image src={logo} alt="Aero2Astro logo" className="bg-transparent" />
                    </Link>
                <div className='md:flex items-center justify-between z-20  py-1 md:px-10 px-7'>
                    {/* Menu icon */}
                    <div onClick={() => setOpen(!open)} className='absolute right-8 top-6 cursor-pointer md:hidden w-7 h-7'>
                        {
                            open ? <RxCross1 /> : <FaBars />
                        }
                    </div>
                    {/* linke items */}
                    <ul onClick={() => setOpen(!open)}
                    className={`md:flex  flex-grow  max-md:bg-[#080808] md:items-center md:pb-0 pb-12  absolute md:static md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-12' : 'top-[-490px]'}`}>
                        {
                            Links.map((link,idx) => (
                                <li key={link+idx} className='md:ml-8 md:my-0 my-7 font-semibold'>
                                    <a href={link.link} target={link.name==="ABOUT"?"_blank":""} className=' hover:text-blue-500 duration-500'>{link.name}</a>
                                </li>))
                        }
                        <div className="flex items-center gap-3 lg:mx-5 md:ml-10 max-sm:flex-wrap ">

                     <Link href={"/user/dashboard"}  className='btn w-fit bg-[#0e56d6] hover:opacity-90 text-white font-semibold px-3 mr-2  py-1 rounded-sm duration-500 md:static'><RxAvatar size={24}/></Link>
                     <Link href={"/gis/login"}  className='btn min-w-fit bg-[#0e56d6] hover:opacity-90 text-white font-semibold px-3 mr-2 py-1 rounded-sm duration-500 md:static'>Log In</Link>
                     
                    
                        </div>
                    </ul>
                </div>
            </div>


     
       

    );
}

export default Header;

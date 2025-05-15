"use client"

import { Button } from 'antd';
import React, { useContext, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userData } from '@/atom/states';
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleInfo, FaLocationDot } from "react-icons/fa6";
import { FaBan } from "react-icons/fa";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import Link from 'next/link';
import { GoCopilot } from 'react-icons/go';
import { MdEmail, MdPhone } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import { SelectedUserContext } from '@/Contexts/SelectedUser';
import { DataContext } from '@/Contexts/Admin';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Cookies from "universal-cookie";
import { requestUrl } from '@/utils/constants';
const cookies = new Cookies(null, { path: "/", sameSite: 'lax' })



const Card = ({ item }) => {

    // const { setSelectedUser } = useContext(SelectedUserContext);
    const [state, setState] = useRecoilState(userData);
    const { fetchUsers } = useContext(DataContext);
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const handleClick = () => {
        setState(item);
        router.push(`/admin/user/${item.role}/${item.fullName}/${item._id}`);
    };

    //handle approval
    const handleApprove = async (id) => {
        try {
            const adauth = cookies.get("adauth")
            if (!adauth)
                router.push("/admin/login");

            if (confirm('Are you sure to approve ?')) {
                setLoading(true)
                await axios.put(`${requestUrl}/user/approve/${id}`, {}, {
                    headers: {
                        'adauth': adauth
                    },
                    withCredentials: true
                })
                toast.success('Approved success')
                // history.back();
                fetchUsers();
                setLoading(false)

            }
            else {
                return;
            }

        } catch (error) {
            // console.log(error)
            toast.error(error?.response?.data?.message || 'Something went wrong');
            setLoading(false)

        }

    }
    //handle rejectioin
    const handleReject = async (id) => {
        try {
            const adauth = cookies.get("adauth")
            if (!adauth)
                router.push("/admin/login");

            if (confirm('Are you sure to Reject ?')) {
                setLoading(true)
                await axios.put(`${requestUrl}/user/reject/${id}`, {}, {
                    headers: {
                        'adauth': adauth
                    },
                    withCredentials: true
                })
                toast.success('Rejection success')
                // history.back();
                fetchUsers();
                setLoading(false)

            }
            else {
                return;
            }

        } catch (error) {
            // console.log(error)
            toast.error(error?.response?.data?.message || 'Something went wrong');
            setLoading(false)

        }

    }
    //suspend
    const handleSuspend = async (id) => {
        try {
            const adauth = cookies.get("adauth")
            if (!adauth)
                router.push("/admin/login");

            if (confirm('Are you sure to Suspend ?')) {
                const toastId=toast.loading("Please Wait...")
                setLoading(true)
                await axios.put(`${requestUrl}/user/suspend/${id}`, {}, {
                    headers: {
                        'adauth': adauth
                    },
                    withCredentials: true
                })
                toast.dismiss(toastId)
                toast.success('Suspension success')
                // history.back();
                fetchUsers();
                setLoading(false)
                
            }
            else {
                return;
            }
            
        } catch (error) {
            toast.dismiss(toastId)
            // console.log(error)
            toast.error(error?.response?.data?.message || 'Something went wrong');
            setLoading(false)

        }

    }
    //remove suspension
    const RevokeSuspension = async (id) => {
        try {
            const adauth = cookies.get("adauth")
            if (!adauth)
                router.push("/admin/login");

            if (confirm('Are you sure to Revoke Suspension ?')) {
                const toastId=toast.loading("Please Wait...")
                setLoading(true)
                await axios.put(`${requestUrl}/user/resume/${id}`, {}, {
                    headers: {
                        'adauth': adauth
                    },
                    withCredentials: true
                })
                toast.dismiss(toastId)
                toast.success('Suspension Revoked')
                // history.back();
                fetchUsers();
                setLoading(false)
                
            }
            else {
                return;
            }
            
        } catch (error) {
            // console.log(error)
            toast.dismiss(toastId)
            toast.error(error?.response?.data?.message || 'Something went wrong');
            setLoading(false)

        }

    }

    return (

        <div className='md:w-64 relative w-80 text-sm h-[350px] bg-white p-3 shadow rounded-md'>

            {/* Status */}
            <div className='flex items-center px-2 justify-between'>
                <p className='text-white bg-gradient-to-r text-xs px-4 rounded-full  py-1 from-blue-500 to-blue-700'>{item.role}</p>

                <div className='text-xs  flex w-fit items-center gap-2'>
                    <div
                        className={`min-w-2  min-h-2 rounded-full ${item.status === 'pending' ? 'bg-red-500' : item.status === 'review' ? 'bg-yellow-500 animate-ping' : item.status === 'approved' ? 'bg-green-500' : 'hidden'}`}
                    >
                    </div>
                    {
                        item.status === 'pending' ? "Not Applied" : item.status === 'review' ? 'Review Pending' : item.status === 'approved' ? "Approved" : <FaBan className='text-red-500' size={20} />
                    }
                </div>
            </div>
            <hr className='my-2' />
            {/* details */}
            <div className='p-2 font-semibold text-xs r'>
                <div className='w-12 h-12 rounded-full relative overflow-clip bg-blue-500' >
                    <img src={item.avatar || "https://img.freepik.com/premium-vector/avatar-flat-icon-human-white-glyph-blue-background_822686-239.jpg"} alt={item.fullName} className='absolute inset-0' />
                </div>
                <p className='flex items-center font-bold mt-2 gap-2'>
                    {item.fullName}
                </p>
                <p className='flex items-center mt-2 gap-2'>
                    <MdEmail /> {item.email}
                </p>
                <p className='flex items-center mt-2 gap-2'>
                    <MdPhone /> {item.phone.countryCode} {item.phone.number}
                </p>
                <p className='flex items-center mt-2 gap-2'>
                    <FaLocationDot /> {item.locality}
                </p>
                <p className='flex items-center mt-2 gap-2'>
                    City :-  {item.city}
                </p>
                <p className='flex items-center mt-2 gap-2'>
                    State :-  {item.state}
                </p>



            </div>
            <div className='flex  w-full inset-x-0 p absolute bottom-2 px-4 py-3  items-center justify-between text-sm'>
                <button
                    onClick={handleClick}
                    className='bg-blue-500 shadow-md rounded-full font-bold text-white  px-5 py-1 hover:bg-blue-400'
                >
                    View
                </button>
                <div className='flex items-center gap-3'>
                    {
                        item.status === 'approved' ? (item?.isSuspended ? <button onClick={() => RevokeSuspension(item?._id)} className=' text-green-500 text-xs font-semibold hover:text-green-600 '>Resume </button> : <button onClick={() => handleSuspend(item?._id)} className=' text-green-500 text-xs font-semibold hover:text-green-600 '>Suspend </button>
                        ) : <button onClick={() => handleApprove(item?._id)} className=' text-green-500 text-xs font-semibold hover:text-green-600 '>Approve </button>

                    }
                    <button onClick={() => handleReject(item?._id)} className=' text-red-500 text-xs font-semibold hover:text-red-600 '>Reject </button>
                </div>
            </div>

        </div>
    );
}

export default Card;

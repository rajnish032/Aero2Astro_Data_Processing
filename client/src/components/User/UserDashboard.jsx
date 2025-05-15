"use client"
import React, { useContext, useState } from 'react';
import { UserContext } from '../../Contexts/User';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from './components/Navbar';
import { requestUrl } from '../../utils/constants';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Spin, Tooltip } from 'antd';
import Cookies from 'universal-cookie';
import SurveyForm from './components/commons/SurveyForm';
import Modal from './components/Modal';
import { surveyList } from '../../data/defaultList';
import { SiWhatsapp } from 'react-icons/si';

const cookies = new Cookies(null, { path: "/", sameSite: 'lax' });

const UserDashboard = () => {

    const { user, setUser, loading } = useContext(UserContext);

    const router = useRouter();

    const handleLogout = async () => {
        try {
            cookies.remove('auth');
            setUser(null);
            toast.success("Logout Successfully");
            router.push("/");
        } catch (error) {
            toast.error("Could not log out");
        }
    };


    return (
        <div className='relative'>

            <Navbar />


            {loading && (
                <div className='absolute bg-white z-50 flex items-center justify-center inset-0 w-full h-full'>
                    <Spin />
                </div>
            )}



            {!user?.isApplied ? (
                <div className='flex items-center justify-center w-full'>
                    <div className='p-5 my-10 mx-2 relative min-w-[300px] max-w-[500px] min-h-[500px] rounded-3xl shadow-xl border-4 border-blue-500 md:px-8'>
                        <h2 className='text-3xl text-center font-bold my-5'>Hi! {user?.fullName}</h2>
                        <div className='text-lg mt-10 px-2'>
                            <p>You have done with the basic contact details for the Gis Equipment <b>partnership with us.</b></p>
                            <p className='text-red-500 font-semibold'>For the approval kindly complete the onboarding form.</p>
                            <p className='my-2'>If you have already done with the <b>onboarding detail</b> form kindly apply for the
                                <b className='text-blue-500'> Approval</b>.</p>
                        </div>
                        <div className='my-10 absolute bottom-0 md:bottom-3 w-[90%] mx-auto'>
                            <Link href="/user/profile" className='bg-blue-500 rounded w-[90%] text-center max-w-[500px] block mx-auto hover:bg-blue-600 px-2 py-1 text-lg text-white font-bold'>Get Started</Link>
                        </div>
                    </div>
                </div>
            ) : (
                user?.isSuspended ? (<div className='flex items-center md:h-[500px] justify-center relative p-5 text-center'>
                <div>
                    <h2 className='text-3xl lg:text-4xl font-bold my-5 text-red-600'>Account Suspended ⚠️</h2>
                    <div>
                        <p>Your account has been suspended due to a policy violation or security concern.</p>
                        <p>Please contact our support team for further details and assistance.</p>
                        <div className='my-10'>
                            <button onClick={handleLogout} className='bg-red-500 rounded w-full text-center max-w-[400px] block mx-auto hover:bg-red-600 px-2 py-1 text-lg text-white font-bold'>Log out</button>
                        </div>
                    </div>
                </div>
            </div>
            ) :
                    (<div className='flex items-center md:h-[500px] justify-center relative p-5 text-center'>
                        <div>
                            <h2 className='text-3xl lg:text-4xl font-bold my-5'>Thank you for Submission 🎉</h2>
                            <div>
                                <p>We will get back to you soon! Your Application is now under review. </p>
                                <p>Keep Checking your Mail Box for the status updates.</p>
                                <div className='my-10'>
                                    <button onClick={handleLogout} className='bg-blue-500 rounded w-full text-center max-w-[400px] block mx-auto hover:bg-blue-600 px-2 py-1 text-lg text-white font-bold'>Log out</button>
                                </div>
                            </div>
                        </div>

                    </div>)
            )}
            <Tooltip
                color="black"
                defaultOpen
                title="👋 If you need any Support! Kindly contact us on WhatsApp. We are always ready to provide assistance."
                placement="left"
            >
                <SiWhatsapp
                    size={50}
                    onClick={() => {
                        window.open('https://wa.me/916006535445', '_blank', 'noopener,noreferrer');
                    }}
                    className="fixed text-green-500 cursor-pointer duration-500 hover:scale-125 md:bottom-16 lg:right-20 right-10 bottom-20"
                />

            </Tooltip>

        </div>
    );
};

export default UserDashboard;

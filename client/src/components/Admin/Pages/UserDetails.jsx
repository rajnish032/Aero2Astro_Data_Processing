"use client"

import React, { useContext, useEffect, useState } from 'react';
import { FaBan } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { requestUrl } from '../../../utils/constants';
import Cookies from "universal-cookie";
import { Spin } from 'antd';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { DataContext } from '../../../Contexts/Admin';
const cookies = new Cookies(null, { path: "/", sameSite: 'lax' })

const UserDetails = ({ state }) => {

    const router = useRouter();
    const [tab, setTab] = useState("Summary");
    const [loading, setLoading] = useState(false);
    const { fetchUsers } = useContext(DataContext);
    //approve
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

    //Verify
    const handleVerify = async (id) => {
        if(state?.dataVerified){
            toast.success("User Already Verified")
            return;
        }
        try {
            const adauth = cookies.get("adauth")
            if (!adauth)
                router.push("/admin/login");

            if (confirm("This means all the data given by the gis is correct. Are you sure you want to proceed?")) {
                setLoading(true)
                await axios.put(`${requestUrl}/user/verify/${id}`, {}, {
                    headers: {
                        'adauth': adauth
                    },
                    withCredentials: true
                })
                toast.success('User verified successfully')
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
    
    //enable edit
    const handleEnablingEdit = async (id) => {
        let toastId;
        try {
            const adauth = cookies.get("adauth")
            if (!adauth)
                router.push("/admin/login");

            if (confirm('Are you sure to Give Edit access ?')) {
                toastId = toast.loading("Please wait...")
                await axios.put(`${requestUrl}/user/enableEdit/${id}`, {}, {
                    headers: {
                        'adauth': adauth
                    },
                    withCredentials: true
                })
                toast.dismiss(toastId)
                toast.success('Permission Given')
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

    //reject
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
                setLoading(true)
                await axios.put(`${requestUrl}/user/suspend/${id}`, {}, {
                    headers: {
                        'adauth': adauth
                    },
                    withCredentials: true
                })
                toast.success('Suspension success')
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

    //revoke suspension
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
        <>
            {
                loading ? <Spin />
                    :
                    <div className='md:p-5'>
                        <h1 className=' font-bold text-3xl text-center bg-white border-b-2 border-b-blue-500  rounded-full shadow p-4 text-gray-600'>{state?.fullName}</h1>


                        <div className='flex items-center justify-between  px-2 lg:px-10 text-sm text-right mt-5'>
                            <button onClick={() => history.back()} className="shadow px-4 py-2 w-20 text-center font-semibold bg-white border rounded-lg ">Back</button>
                            {state?.status !== 'approved' ?
                                <>
                                    <div className='flex shadow-md font-semibold border gap-3 bg-white p-3 rounded items-center'>
                                        <button onClick={() => handleEnablingEdit(state?._id)} className='text-yellow-500 hover:text-yellow-700'>Enable Edit</button>
                                        <button onClick={() => handleApprove(state?._id)} className='text-green-500 hover:text-green-700'>{state?.status === 'approved' ? 'Approved' : 'Approve'}</button>
                                        <button onClick={() => handleReject(state?._id)} className='text-red-500 hover:text-red-700'>Reject</button>
                                    </div>
                                </> :
                                <div className='flex shadow-md font-semibold border gap-3 bg-white p-3 rounded items-center'>
                                    <button onClick={() => handleVerify(state?._id)} className='text-green-500 hover:text-green-700'>{state?.dataVerified ? 'Verified' : 'Verify'}</button>
                                    {
                                        state?.isSuspended ? <button onClick={() => RevokeSuspension(state?._id)} className='text-yellow-500 hover:text-yellow-700'>Revoke Suspension</button> : <button onClick={() => handleSuspend(state?._id)} className='text-orange-500 hover:text-orange-700'>Suspend</button>
                                    }
                                </div>
                            }
                        </div>

                        {/* tabs */}
                        <div className='items-center my-10 md:mx-4 md:gap-4 gap-3 text-xs rounded-md flex flex-wrap md:justify-center  ' style={{ scrollbarWidth: "none" }}>
                            {["Summary", "Equipment Detail", "Employment", "Work Experience", "Projects", "Licenses"]
                                .map((item, idx) =>
                                (
                                    <div key={idx} onClick={() => setTab(item)}
                                        className={` min-w-fit flex items-center cursor-pointer shadow h-10 px-5 rounded bg-white font-bold  w-32 justify-center  hover:text-blue-500 ${tab === item ? "text-blue-500 border-b-4 border-b-blue-500" : 'text-gray-600'}`}>
                                        {item}
                                    </div>
                                )
                                )
                            }
                        </div>




                        {/* section */}

                        {/*  Details */}

                        <div className=' '>

                            {
                                tab === "Summary" &&
                                <div className='rounded-lg md:p-10 py-10 px-5 relative md:mx-4 my-14  bg-white shadow '>
                                    <div className='bg-gradient-to-r w-[90%] shadow-lg  absolute -top-5 inset-x-0 mx-auto  p-4 text-gray-900 rounded-md from-green-200 to-blue-500'>
                                        <h2 className='font-semibold text-center text-xl'>Summary </h2>
                                    </div>

                                    <div className='flex gap-10  flex-wrap text-sm '>

                                        <div className='py-3 min-w-[200px] text-xs lg:text-sm flex-grow max-w-[500px]'>
                                            <div className='flex my-3 items-center justify-between'>
                                                <p>Name : </p>
                                                <p className='font-semibold'>{state?.fullName}</p>
                                            </div>
                                            <div className='flex my-3  items-center justify-between'>
                                                <p>Age : </p>
                                                <p className='font-semibold' >{state?.basicDetails?.age || "-Not Filled Yet-"}</p>
                                            </div>
                                            <div className='flex my-3  items-center justify-between'>
                                                <p>Work Exp : </p>
                                                <p className='font-semibold' >{state?.workExp?.yearsOfExp && state?.workExp?.yearsOfExp + " Years" || "-N/A-"}</p>
                                            </div>
                                            <div className='flex my-3  items-center justify-between'>
                                                <p>Licenses : </p>
                                                <p className='font-semibold' >{state?.licenses?.licenses?.length || "-N/A-"}</p>
                                            </div>
                                            <div className='flex my-3  items-center justify-between'>
                                                <p>Mobile : </p>
                                                <p className='font-semibold'>{state?.phone?.countryCode} {state?.phone?.number}</p>
                                            </div>
                                            <div className='flex my-3  items-center justify-between'>
                                                <p>Email : </p>
                                                <a href={`mailto:${state?.email}`} className='font-semibold text-blue-500'>{state?.email}</a>
                                            </div>
                                            <div className='flex my-3  items-center justify-between'>
                                                <p>Gender : </p>
                                                <p className='font-semibold'>{state?.basicDetails?.gender || "-Not Filled Yet-"}</p>
                                            </div>
                                            <div className='flex my-3  items-center justify-between'>
                                                <p>DOB : </p>
                                                <p className='font-semibold'>{state?.basicDetails?.dob || "-Not Filled Yet-"}</p>
                                            </div>
                                            <div className='flex my-3  items-center justify-between'>
                                                <p>Survey Answer : </p>
                                                <p className='font-semibold'>{state?.surveyAnswer || "-Not Filled Yet-"}</p>
                                            </div>



                                        </div>
                                        <div className='py-3 min-w-[200px] text-xs lg:text-sm flex-grow max-w-[500px]'>
                                            <div className='flex my-3 items-center justify-between'>
                                                <p>Role : </p>
                                                <p className='font-semibold'>{state?.role}</p>
                                            </div>
                                            <div className='flex my-3 items-center justify-between'>
                                                <p>Service Range : </p>
                                                <p className='font-semibold'>{state?.basicDetails?.serviceRange + ' Km'}</p>
                                            </div>
                                            <div className='flex my-3  items-center justify-between'>
                                                <p>Applied : </p>
                                                <p className="font-semibold">
                                                    {!state?.isApplied
                                                        ? 'No'
                                                        : state?.appliedTime
                                                            ? `Yes, ${new Date(state?.appliedTime).toLocaleString('en-US', {
                                                                day: 'numeric',
                                                                month: 'long',
                                                                year: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit',
                                                                second: '2-digit',
                                                                hour12: false
                                                            })}`
                                                            : 'Yes (Time Not Available)'
                                                    }
                                                </p>
                                            </div>
                                            <div className='flex my-3  items-center justify-between'>
                                                <p>Application Status : </p>
                                                <div className='font-semibold  flex w-fit items-center gap-2'>
                                                    <div
                                                        className={`min-w-2  min-h-2 rounded-full ${state?.status === 'pending' ? 'bg-red-500' : state?.status === 'review' ? 'bg-yellow-500 animate-ping' : state?.status === 'approved' ? 'bg-green-500' : 'hidden'}`}
                                                    >
                                                    </div>
                                                    {
                                                        state?.status === 'pending' ? "Not Applied" : state?.status === 'review' ? 'Review Pending' : state?.status === 'approved' ? "Approved" : <FaBan className='text-red-500' size={20} />
                                                    }
                                                </div>                                </div>
                                            <div className='flex my-3  items-center justify-between'>
                                                <p>Pincode : </p>
                                                <p className='font-semibold'>{state?.areaPin}</p>
                                            </div>
                                            <div className='flex my-3  items-center justify-between'>
                                                <p>City : </p>
                                                <p className='font-semibold'>{state?.city}</p>
                                            </div>
                                            <div className='flex my-3  items-center justify-between'>
                                                <p>State : </p>
                                                <p className='font-semibold'>{state?.state}</p>
                                            </div>
                                            <div className='flex my-3  items-center justify-between'>
                                                <p>Locality : </p>
                                                <p className='font-semibold'>{state?.locality}</p>
                                            </div>


                                        </div>


                                    </div>

                                    <hr className='mb-2' />



                                    <h3 className='text-sm'>Service States / Zones</h3>
                                    <div className='flex my-3 break-all  items-center justify-between'>

                                        <div className='flex items-center gap-3 flex-wrap  text-xs '>

                                            {
                                                !state?.basicDetails?.serviceAreas ? "- Not Filled Yet -"
                                                    :
                                                    state?.basicDetails?.serviceAreas?.map((i, idx) => (
                                                        <div key={idx} className='bg-white shadow p-2 rounded font-semibold  px-2 '>{i.region}

                                                            <div className='my-2 flex flex-wrap items-center gap-2  '>{i.states.map((s) =>
                                                                <p key={s} className='border-blue-500 min-w-fit bg-gray-100  font-normal rounded p-1 px-2  border'>{s}</p>
                                                            )
                                                            }</div>
                                                        </div>
                                                    )

                                                    )
                                            }
                                        </div>
                                    </div>

                                    <hr className='my-4' />


                                    <h3 className='text-sm font-semibold'>Employment Summary</h3>
                                    {state?.professionalDetails ?

                                        <div className='text-sm grid md:gap-5 md:grid-cols-2'>
                                            <div className='flex my-2 max-w-[500px] items-center justify-between'>
                                                <p>Status : </p>
                                                <p className='font-semibold'>{state?.professionalDetails?.employmentStatus}</p>
                                            </div>
                                            {state?.professionalDetails?.employmentStatus !== "Not employed" &&
                                                <div className='flex my-2 max-w-[500px] items-center justify-between'>
                                                    <p>Employment Type : </p>
                                                    <p className='font-semibold'>{state?.professionalDetails?.employmentStatus === "Employed" ? "Company" : state?.professionalDetails?.employmentStatus === "Not Employed" ? "N/A" : state?.professionalDetails?.employmentType}</p>
                                                </div>
                                            }
                                        </div> : '-Not Yet Filled'

                                    }


                                    <hr className='my-4' />


                                    <h3 className='text-sm font-semibold'>Number of Equipments :- {state?.equipmentDetails?.equipments?.length === 0 ? '- Not Available -' : state?.equipmentDetails?.equipments?.length}</h3>
                                    {state?.equipmentDetails ?

                                        <div className='text-sm grid md:gap-5 md:grid-cols-2'>
                                            <div className='flex my-2 max-w-[500px] gap-5 items-center justify-between'>

                                                <div className='font-semibold'>
                                                    <p className='mb-2 text-gray-700'>Addons : </p>
                                                    {
                                                        state?.equipmentDetails?.addons?.length === 0 ? "- Not Available -" : (
                                                            <div className='flex items-center flex-wrap gap-3 text-xs'>
                                                                {
                                                                    state?.equipmentDetails?.addons?.map((i, idx) => (
                                                                        <p key={idx} className='border-blue-500 min-w-fit bg-gray-100 font-normal rounded p-1 px-2 border'>{i}</p>
                                                                    ))
                                                                }
                                                            </div>
                                                        )
                                                    }
                                                </div>



                                            </div>
                                            <div className='flex my-2 max-w-[500px] gap-5 items-center justify-between'>
                                                <div className='font-semibold'>
                                                    <p className='mb-3 text-gray-700'>Payloads </p>
                                                    {
                                                        state?.equipmentDetails?.payloads.length === 0 ? "- Not Available -" : (
                                                            <div className='flex items-center flex-wrap gap-3 text-xs'>
                                                                {
                                                                    state?.equipmentDetails?.payloads?.map((i, idx) => (
                                                                        <p key={idx} className='border-blue-500 min-w-fit bg-gray-100 font-normal rounded p-1 px-2 border'>{i}</p>
                                                                    ))
                                                                }
                                                            </div>
                                                        )
                                                    }
                                                </div>



                                            </div>


                                        </div> : '-N/A'

                                    }


                                    {/* Projects */}
                                    <hr className='my-4' />
                                    <h3 className='text-sm font-semibold'>Projects Done :- {state?.projects?.projects.length === 0 || !state?.projects ? '- N/A -' : state?.projects?.projects.length}</h3>

                                    <div className='text-sm '>


                                        <div className='flex my-1 gap-5 items-center justify-between'>
                                            <div className='font-semibold mt-3'>
                                                <p className='mb-2 text-gray-700'>Mapping projects : </p>
                                                {
                                                    state?.projects?.mapping.length === 0 ? "- Not Available -" : (
                                                        <div className='flex items-center flex-wrap gap-3 text-xs'>
                                                            {
                                                                state?.projects?.mapping?.map((i, idx) => (
                                                                    <p key={idx} className='border-blue-500 min-w-fit bg-gray-100 font-normal rounded p-1 px-2 border'>{i}</p>
                                                                ))
                                                            }
                                                        </div>
                                                    )
                                                }
                                            </div>



                                        </div>
                                        <div className='flex my-1 gap-5 items-center justify-between'>
                                            <div className='font-semibold mt-3'>
                                                <p className='mb-2 text-gray-700'>Inspection projects : </p>
                                                {
                                                    state?.projects?.inspection.length === 0 ? "- Not Available -" : (
                                                        <div className='flex items-center flex-wrap gap-3 text-xs'>
                                                            {
                                                                state?.projects?.inspection?.map((i, idx) => (
                                                                    <p key={idx} className='border-blue-500 min-w-fit bg-gray-100 font-normal rounded p-1 px-2 border'>{i}</p>
                                                                ))
                                                            }
                                                        </div>
                                                    )
                                                }
                                            </div>



                                        </div>
                                        <div className='flex my-1 gap-5 items-center justify-between'>
                                            <div className='font-semibold mt-3'>
                                                <p className='mb-2 text-gray-700'>Monitoring projects : </p>
                                                {
                                                    state?.projects?.monitoring.length === 0 ? "- Not Available -" : (
                                                        <div className='flex items-center flex-wrap gap-3 text-xs'>
                                                            {
                                                                state?.projects?.monitoring?.map((i, idx) => (
                                                                    <p key={idx} className='border-blue-500 min-w-fit bg-gray-100 font-normal rounded p-1 px-2 border'>{i}</p>
                                                                ))
                                                            }
                                                        </div>
                                                    )
                                                }
                                            </div>



                                        </div>


                                    </div>


                                    {/* Projects End */}



                                    {/* Skills */}

                                    <hr className='my-4' />
                                    <h3 className='text-sm font-semibold'>Skills {!state?.skills ? '- Not Filled Yet -' : ''}</h3>

                                    <div className='text-sm '>


                                        <div className='flex my-1 gap-5 items-center justify-between'>
                                            <div className='font-semibold mt-3'>
                                                <p className='mb-2 text-gray-700'>Equipment Skills : </p>
                                                {
                                                    state?.skills?.equipmentTypesCanHandle.length === 0 ? "- Not Available -" : (
                                                        <div className='flex items-center flex-wrap gap-3 text-xs'>
                                                            {
                                                                state?.skills?.equipmentTypesCanHandle?.map((i, idx) => (
                                                                    <p key={idx} className='border-blue-500 min-w-fit bg-gray-100 font-normal rounded p-1 px-2 border'>{i}</p>
                                                                ))
                                                            }
                                                        </div>
                                                    )
                                                }
                                            </div>



                                        </div>
                                        <div className='flex my-1 gap-5 items-center justify-between'>
                                            <div className='font-semibold mt-3'>
                                                <p className='mb-2 text-gray-700'>Control Stations : </p>
                                                {
                                                    state?.skills?.controlStations.length === 0 ? "- Not Available -" : (
                                                        <div className='flex items-center flex-wrap gap-3 text-xs'>
                                                            {
                                                                state?.skills?.controlStations?.map((i, idx) => (
                                                                    <p key={idx} className='border-blue-500 min-w-fit bg-gray-100 font-normal rounded p-1 px-2 border'>{i}</p>
                                                                ))
                                                            }
                                                        </div>
                                                    )
                                                }
                                            </div>



                                        </div>


                                        <div className='flex my-1 gap-5 items-center justify-between'>
                                            <div className='font-semibold mt-3'>
                                                <p className='mb-2 text-gray-700'>Hardware skills : </p>
                                                {
                                                    state?.skills?.hardwareSkills.length === 0 ? "- Not Available -" : (
                                                        <div className='flex items-center flex-wrap gap-3 text-xs'>
                                                            {
                                                                state?.skills?.hardwareSkills?.map((i, idx) => (
                                                                    <p key={idx} className='border-blue-500 min-w-fit bg-gray-100 font-normal rounded p-1 px-2 border'>{i}</p>
                                                                ))
                                                            }
                                                        </div>
                                                    )
                                                }
                                            </div>



                                        </div>
                                        <div className='flex my-1 gap-5 items-center justify-between'>
                                            <div className='font-semibold mt-3'>
                                                <p className='mb-2 text-gray-700'> Gis Software & Programming skills : </p>
                                                {
                                                    state?.skills?.softwareSkills.length === 0 ? "- Not Available -" : (
                                                        <div className='flex items-center flex-wrap gap-3 text-xs'>
                                                            {
                                                                state?.skills?.softwareSkills?.map((i, idx) => (
                                                                    <p key={idx} className='border-blue-500 min-w-fit bg-gray-100 font-normal rounded p-1 px-2 border'>{i}</p>
                                                                ))
                                                            }
                                                        </div>
                                                    )
                                                }
                                            </div>



                                        </div>


                                    </div>

                                    {/* Skills END */}

                                </div>
                            }


                            {/* Equipment Details */}

                            {
                                tab === "Equipment Detail" &&
                                <div className='rounded-lg md:p-10 py-10 px-5 relative md:mx-4 my-14  bg-white shadow '>
                                    <div className='bg-gradient-to-r w-[90%] shadow-lg  absolute -top-5 inset-x-0 mx-auto  p-4 text-white rounded-md from-blue-500 to-blue-700'>
                                        <h2 className='font-semibold text-center text-xl'>Drones & Equipments </h2>
                                    </div>

                                    <div className='text-right mt-5 text-sm font-semibold '>
                                        Total Equipments : {state?.equipmentDetails?.equipments.length || 'N/A'}
                                    </div>
                                    <div className='flex gap-5 my-10 relative flex-wrap  text-sm  items-center'>
                                        {
                                            state?.equipmentDetails?.equipments?.map((item) =>
                                                <div key={item._id}
                                                    className='border-2 w-96 h-40 relative max-sm:text-xs border-blue-500 shadow-lg text-sm p-3 rounded-lg'>
                                                    <div className='bg-gradient-to-r w-[90%] shadow  absolute -top-5 inset-x-0 mx-auto  p-1 text-white rounded-md from-green-500 to-blue-700'>
                                                        <h2 className='font-semibold text-center text-sm'>{item.equipmentModel} </h2>
                                                    </div>

                                                    <div className='flex justify-between flex-wrap my-1'>
                                                        <p className='font-semibold text-gray-800'>Type : </p>
                                                        <p className=''>{item.equipmentType}</p>
                                                    </div>
                                                    <div className='flex justify-between flex-wrap my-1'>
                                                        <p className='font-semibold text-gray-800'>Serial : </p>
                                                        <p className=''>{item.serial}</p>
                                                    </div>
                                                    <div className='flex justify-between flex-wrap my-1'>
                                                        <p className='font-semibold text-gray-800'>UIN : </p>
                                                        <p className=''>{item.uin}</p>
                                                    </div>
                                                    <div className='flex justify-between flex-wrap my-1'>
                                                        <p className='font-semibold text-gray-800'>Purchased in : </p>
                                                        <p className=''>{item.purchasedOn}</p>
                                                    </div>
                                                    <div className='flex justify-between flex-wrap my-1'>
                                                        <p className='font-semibold text-gray-800'>Batteries: </p>
                                                        <p className=''>{item.batteries}</p>
                                                    </div>

                                                </div>
                                            )
                                        }



                                    </div>
                                    <h4 className=' text-xl font-semibold'>Equipments </h4>

                                    <div className='text-sm grid md:gap-5 md:grid-cols-2'>
                                        <div className='flex my-2 max-w-[500px] gap-5 items-center justify-between'>

                                            <div className='font-semibold'>
                                                <p className='mb-2 text-gray-700'>Addons : </p>
                                                {
                                                    state?.equipmentDetails?.addons.length === 0 ? "- Not Available -" : (
                                                        <div className='flex items-center flex-wrap gap-3 text-xs'>
                                                            {
                                                                state?.equipmentDetails?.addons?.map((i, idx) => (
                                                                    <p key={idx} className='border-blue-500 min-w-fit bg-gray-100 font-normal rounded p-1 px-2 border'>{i}</p>
                                                                ))
                                                            }
                                                        </div>
                                                    )
                                                }
                                            </div>



                                        </div>


                                        <div className='flex my-2 max-w-[500px] gap-5 items-center justify-between'>
                                            <div className='font-semibold'>
                                                <p className='mb-3 text-gray-700'>Payloads </p>
                                                {
                                                    state?.equipmentDetails?.payloads.length === 0 ? "- Not Available -" : (
                                                        <div className='flex items-center flex-wrap gap-3 text-xs'>
                                                            {
                                                                state?.equipmentDetails?.payloads?.map((i, idx) => (
                                                                    <p key={idx} className='border-blue-500 min-w-fit bg-gray-100 font-normal rounded p-1 px-2 border'>{i}</p>
                                                                ))
                                                            }
                                                        </div>
                                                    )
                                                }
                                            </div>



                                        </div>


                                    </div>



                                </div>
                            }


                            {/* Professional Detail */}

                            {
                                tab === "Employment" &&
                                <div className='rounded-lg md:p-10 py-10 px-5 relative md:mx-4 my-14  bg-white shadow '>
                                    <div className='bg-gradient-to-r w-[90%] shadow-lg  absolute -top-5 inset-x-0 mx-auto  p-4 text-white rounded-md from-blue-500 to-blue-700'>
                                        <h2 className='font-semibold text-center text-xl'>Employment Details </h2>
                                    </div>
                                    <div className='flex gap-10 my-10  flex-wrap text-sm '>

                                        <div className='py-3 min-w-[230px] text-xs lg:text-sm flex-grow max-w-[500px]'>
                                            <div className='flex my-3 items-center justify-between'>
                                                <p>Employment Status : </p>
                                                <p className='font-semibold'>{state?.professionalDetails?.employmentStatus || "N/A"}</p>
                                            </div>
                                            {state?.professionalDetails?.employmentStatus === "Self Employed" && <div className='flex my-3 items-center justify-between'>
                                                <p>Employment Type : </p>
                                                <p className='font-semibold'>{state?.professionalDetails?.employmentType || "N/A"}</p>
                                            </div>}
                                            <div className='flex my-3  items-center justify-between'>
                                                <p>Company : </p>
                                                <p className='font-semibold' >{state?.professionalDetails?.companyName || state?.professionalDetails?.seCompanyName || "N/A"}</p>
                                            </div>
                                            <div className='flex my-3  items-center justify-between'>
                                                <p>Place : </p>
                                                <p className='font-semibold'>{state?.professionalDetails?.place || state?.professionalDetails?.sePlace || "N/A"}</p>
                                            </div>
                                            <div className='flex my-3  items-center justify-between'>
                                                <p>Work Type : </p>
                                                <p className='font-semibold'>{state?.professionalDetails?.workType || state?.professionalDetails?.workNature || "N/A"}</p>
                                            </div>




                                        </div>



                                    </div>


                                </div>
                            }


                            {
                                tab === "Work Experience" &&
                                <div className='rounded-lg md:p-10 py-10 px-5 relative md:mx-4 my-14  bg-white shadow '>
                                    <div className='bg-gradient-to-r w-[90%] shadow-lg  absolute -top-5 inset-x-0 mx-auto  p-4 text-white rounded-md from-blue-500 to-blue-700'>
                                        <h2 className='font-semibold text-center text-xl'>Work Experiences </h2>
                                    </div>

                                    <div className='my-5'>

                                        {!state?.workExp || state?.workExp?.works.length === 0 ?
                                            <div className='text-center opacity-70 py-4'>
                                                No Work Experiences Available
                                            </div> :


                                            <div className='py-3 p-3 text-xs mt-10 lg:text-sm flex-grow max-w-[700px]'>

                                                <div className='flex gap-3  items-center flex-wrap '>
                                                    {
                                                        state?.workExp?.works?.map((item) =>
                                                            <div key={item._id}
                                                                className=' border-2 w-96 h-40 relative max-sm:text-xs border-blue-500 shadow-lg text-sm p-3 rounded-lg'>
                                                                <div className='bg-gradient-to-r w-[90%] shadow  absolute -top-5 inset-x-0 mx-auto  p-1 text-white rounded-md from-green-500 to-blue-700'>
                                                                    <h2 className='font-semibold text-center text-sm'>{item.companyName} </h2>
                                                                </div>

                                                                <div className='flex justify-between flex-wrap my-1'>
                                                                    <p className='font-semibold text-gray-800'>Job Type : </p>
                                                                    <p className=''>{item.jobType}</p>
                                                                </div>
                                                                <div className='flex justify-between flex-wrap my-1'>
                                                                    <p className='font-semibold text-gray-800'>Designation : </p>
                                                                    <p className=''>{item.designation}</p>
                                                                </div>
                                                                <div className='flex justify-between flex-wrap my-1'>
                                                                    <p className='font-semibold text-gray-800'>End Month : </p>
                                                                    <p className=''>{item.endMon}</p>
                                                                </div>
                                                                <div className='flex justify-between flex-wrap my-1'>
                                                                    <p className='font-semibold text-gray-800'>Start Month : </p>
                                                                    <p className=''>{item.startMon}</p>
                                                                </div>
                                                                <div className='flex justify-between flex-wrap my-1'>
                                                                    <p className='font-semibold text-gray-800'>Certicate : </p>
                                                                    <a target='_blank' href={item.image} className='text-blue-500 font-semibold'>View</a>
                                                                </div>



                                                            </div>
                                                        )
                                                    }
                                                </div>





                                            </div>

                                        }
                                    </div>


                                </div>
                            }



                            {/* Projects */}
                            {
                                tab === "Projects" &&
                                <div className='rounded-lg md:p-10 py-10 px-5 relative md:mx-4 my-14  bg-white shadow '>
                                    <div className='bg-gradient-to-r w-[90%] shadow-lg  absolute -top-5 inset-x-0 mx-auto  p-4 text-white rounded-md from-blue-500 to-blue-700'>
                                        <h2 className='font-semibold text-center text-xl'>Project Experiences </h2>
                                    </div>

                                    <div className='my-5'>

                                        {!state?.projects || state?.projects?.projects.length === 0 ?
                                            <div className='text-center opacity-70 py-4'>
                                                No Project Experiences Available
                                            </div> :


                                            <div className='py-3 p-3 text-xs mt-10 lg:text-sm flex-grow max-w-[700px]'>

                                                <div className='flex gap-3  items-center flex-wrap '>
                                                    {
                                                        state?.projects?.projects?.map((item) =>
                                                            <div key={item._id}
                                                                className=' border-2 w-96 max-sm:text-xs h-36 relative border-blue-500 shadow-lg text-sm p-3 rounded-lg'>
                                                                <div className='bg-gradient-to-r w-[90%] shadow  absolute -top-5 inset-x-0 mx-auto  p-1 text-white rounded-md from-green-500 to-blue-700'>
                                                                    <h2 className='font-semibold text-center text-sm'>{item.clientName} </h2>
                                                                </div>


                                                                <div className='flex justify-between flex-wrap my-1'>
                                                                    <p className='font-semibold text-gray-800'>Designation : </p>
                                                                    <p className=''>{item.projectDesc}</p>
                                                                </div>
                                                                <div className='flex justify-between flex-wrap my-1'>
                                                                    <p className='font-semibold text-gray-800'>End Month : </p>
                                                                    <p className=''>{item.endMon}</p>
                                                                </div>
                                                                <div className='flex justify-between flex-wrap my-1'>
                                                                    <p className='font-semibold text-gray-800'>Start Month : </p>
                                                                    <p className=''>{item.startMon}</p>
                                                                </div>
                                                                <div className='flex justify-between flex-wrap my-1'>
                                                                    <p className='font-semibold text-gray-800'>Certicate : </p>
                                                                    <a target='_blank' href={item.image} className='text-blue-500 font-semibold'> {item.image ? 'View' : 'N/A'} </a>
                                                                </div>



                                                            </div>
                                                        )
                                                    }
                                                </div>

                                                <div className='text-sm '>

                                                    <h4 className='mt-10 text-xl font-semibold'>Project Areas</h4>

                                                    <div className='flex my-1 gap-5 items-center justify-between'>
                                                        <div className='font-semibold mt-3'>
                                                            <p className='mb-2 text-gray-700'>Mapping projects : </p>
                                                            {
                                                                state?.projects?.mapping.length === 0 ? "- Not Available -" : (
                                                                    <div className='flex items-center flex-wrap gap-3 text-xs'>
                                                                        {
                                                                            state?.projects?.mapping?.map((i, idx) => (
                                                                                <p key={idx} className='border-blue-500 min-w-fit bg-gray-100 font-normal rounded p-1 px-2 border'>{i}</p>
                                                                            ))
                                                                        }
                                                                    </div>
                                                                )
                                                            }
                                                        </div>



                                                    </div>
                                                    <div className='flex my-1 gap-5 items-center justify-between'>
                                                        <div className='font-semibold mt-3'>
                                                            <p className='mb-2 text-gray-700'>Inspection projects : </p>
                                                            {
                                                                state?.projects?.inspection.length === 0 ? "- Not Available -" : (
                                                                    <div className='flex items-center flex-wrap gap-3 text-xs'>
                                                                        {
                                                                            state?.projects?.inspection?.map((i, idx) => (
                                                                                <p key={idx} className='border-blue-500 min-w-fit bg-gray-100 font-normal rounded p-1 px-2 border'>{i}</p>
                                                                            ))
                                                                        }
                                                                    </div>
                                                                )
                                                            }
                                                        </div>



                                                    </div>
                                                    <div className='flex my-1 gap-5 items-center justify-between'>
                                                        <div className='font-semibold mt-3'>
                                                            <p className='mb-2 text-gray-700'>Monitoring projects : </p>
                                                            {
                                                                state?.projects?.monitoring.length === 0 ? "- Not Available -" : (
                                                                    <div className='flex items-center flex-wrap gap-3 text-xs'>
                                                                        {
                                                                            state?.projects?.monitoring?.map((i, idx) => (
                                                                                <p key={idx} className='border-blue-500 min-w-fit bg-gray-100 font-normal rounded p-1 px-2 border'>{i}</p>
                                                                            ))
                                                                        }
                                                                    </div>
                                                                )
                                                            }
                                                        </div>



                                                    </div>


                                                </div>




                                            </div>

                                        }
                                    </div>


                                </div>
                            }



                            {/* Licenses */}

                            {
                                tab === "Licenses" &&
                                <div className='rounded-lg md:p-10 py-10 px-5 relative md:mx-4 my-14  bg-white shadow '>
                                    <div className='bg-gradient-to-r w-[90%] shadow-lg  absolute -top-5 inset-x-0 mx-auto  p-4 text-white rounded-md from-blue-500 to-blue-700'>
                                        <h2 className='font-semibold text-center text-xl'>Licenses </h2>
                                    </div>

                                    <div className='my-5'>

                                        {!state?.licenses || state?.licenses?.licenses.length === 0 ?
                                            <div className='text-center opacity-70 py-4'>
                                                No License Available
                                            </div> :


                                            <div className='py-3 p-3 text-xs mt-10 lg:text-sm flex-grow max-w-[700px]'>

                                                <div className='flex gap-3  items-center flex-wrap '>
                                                    {
                                                        state?.licenses?.licenses?.map((item) =>
                                                            <div key={item._id}
                                                                className=' border-2 w-96 h-40 max-sm:text-xs relative border-blue-500 shadow-lg text-sm p-3 rounded-lg'>
                                                                <div className='bg-gradient-to-r w-[90%] shadow  absolute -top-5 inset-x-0 mx-auto  p-1 text-white rounded-md from-green-500 to-blue-700'>
                                                                    <h2 className='font-semibold text-center text-sm'>
                                                                        {item.licenseName.toLowerCase().includes('lic') ? item.licenseName : item.licenseName + " License"}
                                                                    </h2>
                                                                </div>

                                                                <div className='flex justify-between flex-wrap my-1'>
                                                                    <p className='font-semibold text-gray-800'>Gis Name : </p>
                                                                    <p className=''>{item.gisName}</p>
                                                                </div>
                                                                <div className='flex justify-between flex-wrap my-1'>
                                                                    <p className='font-semibold text-gray-800'>Class UAS : </p>
                                                                    <p className=''>{item.classUas}</p>
                                                                </div>
                                                                <div className='flex justify-between flex-wrap my-1'>
                                                                    <p className='font-semibold text-gray-800'>Issued On : </p>
                                                                    <p className=''>{item.dateOfIssuance}</p>
                                                                </div>
                                                                <div className='flex justify-between flex-wrap my-1'>
                                                                    <p className='font-semibold text-gray-800'>License No. : </p>
                                                                    <p className=''>{item.licenseNumber}</p>
                                                                </div>

                                                                <div className='flex justify-between flex-wrap my-1'>
                                                                    <p className='font-semibold text-gray-800'>Certicate : </p>
                                                                    <a target='_blank' href={item.image} className='text-blue-500 font-semibold'> {item.image ? 'View License' : 'N/A'} </a>
                                                                </div>



                                                            </div>
                                                        )
                                                    }
                                                </div>


                                            </div>

                                        }
                                    </div>


                                </div>
                            }

                        </div>

                    </div>
            }
        </>
    );
}

export default UserDetails;

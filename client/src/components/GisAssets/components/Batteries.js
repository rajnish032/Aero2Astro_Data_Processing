"use client"
import { assetData } from '@/atom/states';
import { getAllAssets } from '@/routes/gisAssets';
import { reqUrl } from '@/utils/constants';
import { Spinner } from '@nextui-org/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CgSearch } from 'react-icons/cg';
import { IoAdd } from 'react-icons/io5';
import { FaCarBattery } from "react-icons/fa6";
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import Cookies from 'universal-cookie';
import BatteryCard from './BatteryCard';
import BatteryForm from './batteryForm';

const cookies = new Cookies(null, { path: '/' });

const Batteries = ({ isDashboard = false }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [loader, setLoader] = useState(false);
    const [allAssets, setAllAsset] = useRecoilState(assetData);
    const [newBattery, setNewBatteryData] = useState({
        batteryId: "",
        modelName: "",
        serialId: "",
        status: "",
        purchaseDate: "",
        remarks: '',
        dischargeCycles: null,
    });

    useEffect(() => {
        getAllAssets(setAllAsset);
    }, []);

    const handleAddBattery = async (e) => {
        e.preventDefault();
        const token = cookies.get('auth');
        if (!token) return toast.error('You are unauthorized. Kindly login!');

        try {
            setLoader(true);
            await axios.post(`${reqUrl}/gis/assets/battery/new`, { data: newBattery }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                  },
                  
            });
            toast.success('Battery Added');
            setNewBatteryData({
                batteryId: "",
                modelName: "",
                serialId: "",
                status: "",
                purchaseDate: "",
                remarks: '',
                dischargeCycles: null,
            });
            await getAllAssets(setAllAsset);
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || 'Could not Add. Try again!');
        } finally {
            setLoader(false);
            setIsOpen(false);
        }
    };

    const handleDeleteBattery = async (batteryId) => {
        if (!confirm('Are You Sure to remove this battery?')) return;

        const token = cookies.get('auth');
        if (!token) {
            return toast.error('You are unauthorized. Kindly login!');
        }

        try {
            setLoader(true);
            const response = await axios.delete(`${reqUrl}/gis/battery/delete/${batteryId}`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });
            toast.success('Battery Removed');
            getAllAssets(setAllAsset, token);
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || 'Could not delete equipment. Try again!');
        } finally {
            setLoader(false);
        }
    };


    const filteredBatteries = allAssets?.batteries?.filter(battery =>
        battery.modelName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        battery.batteryId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        battery.serialId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='p-2 bg-white shadow rounded-md'>
            <h2 className="text-lg flex items-center gap-2 border-b font-bold px-5 rounded-sm inset-x-0 py-1 text-gray-800">
                Batteries
            </h2>
            <div className='text-sm flex items-center gap-3 font-medium p-2 px-3 mb-2'>
                <button className='text-white bg-blue-600 py-1 px-2 rounded-md shadow flex items-center gap-2'>
                    <FaCarBattery /> Own
                </button>
            </div>
            <div className='flex px-1 md:px-4 items-center md:text-sm text-tiny justify-between gap-3'>
                <div className='flex items-center'>
                    <CgSearch className='text-gray-500 text-xl' />
                    <input
                        type="text"
                        placeholder="Search "
                        className="flex-1 text-tiny md:text-sm outline-none rounded px-2 w-[70%]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <button onClick={() => setIsOpen(true)} className="bg-blue-500 text-tiny hover:bg-blue-700 min-w-fit text-white flex items-center gap-1 px-3 py-1 md:text-sm rounded">
                    <span className='max-sm:hidden'>Add Battery</span> <IoAdd />
                </button>
            </div>

            <BatteryForm handleSubmit={handleAddBattery} data={newBattery} setData={setNewBatteryData} isOpen={isOpen} setIsOpen={setIsOpen} />
            {
                <div className='my-5 md:px-5 py-2 p-1 flex items-center gap-4 flex-wrap'>
                    {
                        !allAssets ?
                            <div className='flex items-center w-full justify-center'>
                                <Spinner />
                            </div>
                            :
                            filteredBatteries?.length === 0 ?
                                <div className='text-center text-xs w-full'>No Battery Found</div>
                                :
                                filteredBatteries.map((battery) =>
                                    <BatteryCard  handleDelete={!isDashboard ? handleDeleteBattery : null}
                                batteryId={battery._id}
                                isDashboard={isDashboard}
                                key={battery._id}
                                battery={battery}  />
                                )
                    }
                </div>
            }
        </div>
    );
};

export default Batteries;

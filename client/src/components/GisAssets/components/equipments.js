"use client";
import React, { useEffect, useState } from 'react';
import { CgSearch } from 'react-icons/cg';
import { IoAdd } from 'react-icons/io5';
import { TbDrone } from 'react-icons/tb';
import EquipmentForm from './equipmentForm';
import EquipmentCard from './EquipmentCard';
import { getAllAssets } from '@/routes/gisAssets';
import { useRecoilState } from 'recoil';
import { assetData } from '@/atom/states';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';
import { reqUrl } from '@/utils/constants';
import { Spinner } from '@nextui-org/react';
const cookies = new Cookies(null, { path: '/' });

const Equipments = ({ isDashboard = false }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [loader, setLoader] = useState(false);
    const [allAssets, setAllAsset] = useRecoilState(assetData);
    const [newEquipmentData, setNewEquipmentData] = useState({
        name: '',
        equipmentId: '',
        ownerName: ''
    });

    useEffect(() => {
        getAllAssets(setAllAsset);
    }, []);

    const handleAddEquipment = async (e) => {
        e.preventDefault();
        const token = cookies.get('auth');
        if (!token) {
            return toast.error('You are unauthorized. Kindly login!');
        }

        try {
            setLoader(true);
            const response = await axios.post(
                `${reqUrl}/gis/assets/equipment/new`,
                { data: newEquipmentData },
                {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                }
            );
            toast.success('Equipment Added');
            setNewEquipmentData({
                name: '',
                equipmentId: '',
                ownerName: ''
            });
            await getAllAssets(setAllAsset);
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || 'Could not Add. Try again!');
        } finally {
            setLoader(false);
            setIsOpen(false);
        }
    };

    const handleDeleteEquipment = async (equipmentId) => {
        if (!confirm('Are You Sure to remove this equipment?')) return;

        const token = cookies.get('auth');
        if (!token) {
            return toast.error('You are unauthorized. Kindly login!');
        }

        try {
            setLoader(true);
            const response = await axios.delete(`${reqUrl}/gis/equipment/delete/${equipmentId}`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
            });
            toast.success('Equipment Removed');
            getAllAssets(setAllAsset, token);
        } catch (error) {
            console.error(error);
            toast.error(error?.response?.data?.message || 'Could not delete equipment. Try again!');
        } finally {
            setLoader(false);
        }
    };

    // Filter equipments based on the search term
    const filteredEquipments = allAssets?.equipments?.filter((equipment) =>
        equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        equipment.equipmentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        equipment.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='p-2 bg-white shadow rounded-md'>
            <h2 className="text-lg flex items-center gap-2 border-b font-bold px-5 rounded-sm inset-x-0 py-1 text-gray-800">
                Equipments
            </h2>
            <div className='text-sm flex items-center gap-3 font-medium p-2 px-3 mb-2'>
                <button className='text-white bg-blue-600 py-1 px-2 rounded-md shadow flex items-center gap-2'><TbDrone /> Own</button>
            </div>
            <div className='flex px-1 md:px-4 items-center md:text-sm text-tiny justify-between gap-3'>
                <div className='flex items-center'>
                    <CgSearch className='text-gray-500 text-xl' />
                    <input
                        type="text"
                        placeholder="Search Equipment"
                        className="flex-1 text-tiny md:text-sm outline-none rounded px-2 w-[70%]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <button
                    onClick={() => setIsOpen(true)}
                    disabled={loader}  // Disable button when loading
                    className="bg-blue-500 text-tiny hover:bg-blue-700 min-w-fit text-white flex items-center gap-1 px-3 py-1 md:text-sm rounded"
                >
                    <span className='max-sm:hidden'>Add Equipment</span> <IoAdd />
                </button>
            </div>

            <EquipmentForm
                handleSubmit={handleAddEquipment}
                data={newEquipmentData}
                setData={setNewEquipmentData}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />

            <div className='my-5 md:px-5 py-2 p-1 flex items-center gap-4 flex-wrap'>
                {
                    loader || !allAssets ? (
                        <div className='flex items-center w-full justify-center'>
                            <Spinner />
                        </div>
                    ) : filteredEquipments?.length === 0 ? (
                        <div className='text-center text-xs w-full'>No Equipment Available</div>
                    ) : (
                        filteredEquipments?.map((equipment) => (
                            <EquipmentCard
                                handleDelete={!isDashboard ? handleDeleteEquipment : null}
                                equipmentId={equipment._id}
                                equipment={equipment}
                                isDashboard={isDashboard}
                                key={equipment._id}
                            />
                        ))
                    )
                }
            </div>
        </div>
    );
};

export default Equipments;

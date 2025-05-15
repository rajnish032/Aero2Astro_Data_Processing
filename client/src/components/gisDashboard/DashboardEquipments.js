"use client"
import React, { useEffect, useState } from 'react';
import { CgSearch } from 'react-icons/cg';
import { TbDrone } from 'react-icons/tb';
import { GrEdit } from "react-icons/gr";
import { GiDeliveryDrone } from "react-icons/gi";
import EquipmentCard from '../GisAssets/components/EquipmentCard';
import { getAllAssets } from '@/routes/gisAssets';
import { useRecoilState } from 'recoil';
import { assetData, gisData } from '@/atom/states';
import { Spinner } from '@nextui-org/react';
import Link from 'next/link';

const Equipments = ({isDashboard=false}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [loader, setLoader] = useState(false);
    const [allAssets, setAllAsset] = useRecoilState(assetData);
    const [currentUser, setCurrentUser] = useRecoilState(gisData);

    useEffect(() => {
        getAllAssets(setAllAsset);
    }, []);

    // Filter equipments based on the search term
    const filteredEquipments = allAssets?.equipments?.filter(equipment =>
        equipment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        equipment.equipmentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        equipment.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='p-2 mb-10 bg-white shadow rounded-md h-80 min-h-60 max-h-120'>
                <h2 className="text-lg flex items-center justify-between gap-2 border-b font-bold px-5 rounded-sm inset-x-0 py-1 bg-gradient-to-r from-green-200 to-blue-500 text-gray-900 tex-sm md:text-xl text-center">
        <span className="inline-flex gap-2 items-center">
          <GiDeliveryDrone className="w-fit text-lg" /> Equipments
        </span>
        <Link
          href={`/gis/assets/${currentUser?.fullName
            .toLowerCase()
            .replace(" ", "-")}`}
        >
          <GrEdit className="text-md cursor-pointer text-white hover:text-black" />
        </Link>
      </h2>
            <div className='flex px-1 md:px-4 items-center md:text-sm text-tiny justify-between gap-3'>
                <div className='flex items-center mt-4'>
                    <CgSearch className='text-gray-500 text-xl' />
                    <input
                        type="text"
                        placeholder="Search Equipment"
                        className="flex-1 text-tiny md:text-sm outline-none rounded px-2 w-[70%]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <div className='my-5 md:px-5 py-2 flex items-center gap-6 flex-wrap h-[calc(100%-7rem)] overflow-y-auto'>
                {
                    loader ||!allAssets ? (
                        <div className='flex items-center w-full justify-center'>
                            <Spinner />
                        </div>
                    ) : (
                        filteredEquipments?.length === 0 ? (
                            <div className='text-center text-xs w-full'>No Equipment Available</div>
                        ) : (
                            filteredEquipments?.map((equipment) =>
                                <EquipmentCard width={"230px"} isDashboard={isDashboard} equipment={equipment} key={equipment._id} />
                            )
                        )
                    )
                }
            </div>
        </div>
    );
};

export default Equipments;

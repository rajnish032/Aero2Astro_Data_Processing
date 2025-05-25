"use client"

import React, { useEffect } from 'react';
import Skills from './Skills';
import Equipments from './DashboardEquipments'
import dynamic from 'next/dynamic';
import WeatherCard from './WeatherCard';
//import FlightRecords from './FlightRecords';
import { verifyGisAuth } from '@/utils/verifyauth';
import {useRouter} from 'next/navigation';

import Cookies from "universal-cookie";
import { useRecoilState } from 'recoil';
import { FiMapPin } from "react-icons/fi";
import { logData, gisData, gisProject } from '@/atom/states';
import { getAllLog } from '@/routes/gisLog';
import { getAllProj } from '@/routes/gisProj';
import ProfileInfo from './Experience';
const cookies = new Cookies(null, { path: '/' });

const MapView = dynamic(
  () => import('@/components/gisDashboard/MapView'),
  {
    loading: () => <div className="w-full min-h-80 h-80 p-6 pt-4 bg-white rounded-lg shadow-md animate-pulse">
      <div className="h-full bg-gray-300 rounded  mb-4"></div>
    </div>,
    ssr: false
  }
);

const Dashboard = () => {
  const [currentUser,setCurrentUser] =useRecoilState(gisData)
  const [allLogs,setAllLog] =useRecoilState(logData)
  const [allProj,setAllProj] =useRecoilState(gisProject)
  const router = useRouter();

  useEffect(() => {
    const token = cookies.get('auth');
    
    if (!token) {
      router.push('/gis/login');
      return;
    }
  
    verifyGisAuth({ setCurrentUser, token }).then((data) => {
      
      if (!data) {
        router.push('/gis/login');
      }
    });
  }, [router, setCurrentUser]);

  useEffect(()=>{
    getAllLog(setAllLog)
  },[currentUser])
  
  useEffect(()=>{
    getAllProj(setAllProj)
  },[currentUser])
  
  return (
    <div>
      <div className='p-2 mb-4'>
        <Skills />
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 p-2">
        {/* Equipments component should take full width on small screens and two-thirds width on larger screens */}
        <div className="lg:col-span-2 w-full">
          <Equipments isDashboard={true} />
        </div>
        {/* WeatherCard should take full width on small screens and one-third width on larger screens */}
        <div className="lg:col-span-1 w-full">
          <WeatherCard />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-5 p-2">

        {/* <div className="lg:col-span-2">
          <FlightRecords className="max-h-44 h-full overflow-y-auto" />
        </div> */}

        <div className="lg:col-span-1 p-2">
        <h2 className="text-lg flex items-center gap-2 border-b font-bold px-5 rounded-sm inset-x-0 py-1 text-gray-900 bg-gradient-to-r from-green-300 to-blue-600">
               <FiMapPin /> Location
            </h2>
          <MapView className="h-full" />
        </div>
      </div>
      
    </div>
  );
};

export default Dashboard;

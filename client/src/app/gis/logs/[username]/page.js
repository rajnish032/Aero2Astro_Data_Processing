import Header from '@/components/commons/Header';
import LogsMain from '@/components/GisLogs/LogsMain';
import React from 'react';
import GisSideBar from '@/components/commons/GisSideBar';

const gisLogPage = () => {
    return (
        <div className="flex">
        <GisSideBar />
        {/* outer wrapper */}
        <div className='flex flex-col flex-1 overflow-y-auto  h-screen'>
          <Header />
  
          {/* Main page container */}
          <div className=" bg-gray-100 h-full p-2 lg:p-7">
            {/* <h1 className="lg:text-2xl font-semibold mb-5 text-lg opacity-70">Flight Records</h1> */}
            <LogsMain />
          </div>
  
  
        </div>
  
      </div>
    );
}

export default gisLogPage;

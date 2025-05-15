
import Header from '@/components/commons/Header';
import GisSideBar from '@/components/commons/GisSideBar';
import Profile from '@/components/gisProfile/Profile';
import React from 'react';

const GisProfilePage = () => {

    return (
        <div className="flex bg-gray-100 h-full">
        <GisSideBar />
        {/* outer wrapper */}
        <div className='flex flex-col flex-1 overflow-y-auto  h-screen'>
          <Header />
  
          {/* Main page container */}
          <div className=" bg-gray-100 h-full max-sm:pt-4 max-sm:px-2 max-sm:text-tiny max-md:text-sm max-md:p-5 p-7">
          {/* <h1 className="md:text-2xl text-lg max-sm:px-3 font-semibold mb-5  opacity-70">My Profile</h1> */}

                    <Profile  />



                </div>


            </div>

        </div>
    );
}

export default GisProfilePage;

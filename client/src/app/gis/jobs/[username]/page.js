import Header from '@/components/commons/Header';
import AssetsMain from '@/components/GisAssets/AssetsMain';
import React from 'react';
import GisSideBar from '@/components/commons/GisSideBar';
import ScrapeJobs from "@/components/gisDashboard/ScrapeJobs";

const Page = () => {
    return (
      <div className="flex">
      <GisSideBar/>
      {/* outer wrapper */}
      <div className='flex flex-col flex-1 overflow-y-auto  h-screen'>
        <Header />

        {/* Main page container */}
        <div className=" bg-gray-100 h-full max-sm:pt-4 max-sm:px-1 max-md:p-5 p-7">
          {/* <h1 className="md:text-2xl text-lg max-sm:px-3 font-semibold mb-5  opacity-70">Assets</h1> */}

          <ScrapeJobs />

        </div>


      </div>

    </div>
    );
}

export default Page;

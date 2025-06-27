import Header from "@/components/commons/Header";

import React from "react";
import GisSideBar from "@/components/commons/GisSideBar";
import ScrapeJobs from "@/components/gisDashboard/ScrapeJobs";

const Page = () => {
  return (
    <div className="flex">
      <GisSideBar />
      {/* outer wrapper */}
      <div className="flex flex-col flex-1 overflow-y-auto  h-screen">
        <Header />

        {/* Main page container */}
        <div className=" bg-gray-100 h-full max-sm:pt-4 max-sm:px-1 max-md:p-5 p-7">
          <ScrapeJobs />
        </div>
      </div>
    </div>
  );
};

export default Page;

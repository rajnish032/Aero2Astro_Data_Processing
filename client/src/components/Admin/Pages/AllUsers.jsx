"use client"

import React, { useContext, useState, useEffect } from 'react';
import { FaMapMarkedAlt, FaThList } from "react-icons/fa";
import { IoMdGrid } from "react-icons/io";
import GridView from '../components/GridView';
import MapView from '../components/MapView';
import { DataContext } from '../../../Contexts/Admin';
import { CiSearch } from 'react-icons/ci';
import StatWidget from '../components/StatWidget';
import { TbDrone } from 'react-icons/tb';
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
const AllUsers = () => {
  const { res, allUsers, setPage, dataLoading, setFilters, filters, page,setSearchQuery,searchQuery} = useContext(DataContext);
  const [viewType, setViewType] = useState('grid');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    filterUsers();
  }, [searchQuery, selectedFilters, allUsers]);

  const handleFilterChange = (value) => {
    setSelectedFilters(value);
    const newFilters = {};
    value.forEach(option => {
      newFilters[option] = true;
    });
    setFilters(newFilters);
  };

  const handleViewChange = (type) => {
    setViewType(type);
  };

  const resetFilters = () => {
    setSelectedFilters([]);
    setFilters({
      haveEquipments: false,
      notHavingEquipments: false,
      haveWorkExp: false,
      haveLicense: false,
    });
  };

  const filterUsers = () => {
    let users = allUsers;

    if (searchQuery) {
      users = users.filter(user =>
        user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    
    setFilteredUsers(users);
  };

  const toggleFilter = (key) => {
    setFilters((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    setPage(1)
  };

  return (
    <div className='md:p-5 py-5 relative'>
      <h1 className='font-bold text-3xl text-center bg-white rounded-full shadow p-4 text-gray-600'>All Gis Pilots</h1>

      <div className='flex items-center justify-center gap-5 max-sm:text-sm lg:gap-8 flex-wrap my-10 md:my-4 md:p-4'>
        <StatWidget title={"Total Gis Pilots"} value={res?.stats.numberOfGis} icon={<TbDrone size={30} className='text-white' />} />
        <StatWidget title={"Applied"} value={res?.stats?.numberOfAppliedUsers || 0} icon={<TbDrone size={30} className='text-white' />} />
        <StatWidget title={"With Equipments"} value={res?.stats?.numberOfUsersWithEquipments || 0} icon={<TbDrone size={30} className='text-white' />} />
        <StatWidget title={"Licensed"} value={res?.stats?.totalUsersWithLicense || 0} icon={<TbDrone size={30} className='text-white' />} />
        <StatWidget title={"Equipments And Licensed"} value={res?.stats?.numberOfUsersWithEquipmentAndLicense || 0} icon={<TbDrone size={30} className='text-white' />} />
      </div>

      <div className='flex justify-between gap-10 my-10 px-2 md:px-10'>
        <div className='flex items-center gap-2  px-2 '>
          <div className='bg-white gap-3 items-center px-2 border pr-5 flex rounded-full'>
            <CiSearch size={20} />
            <input
              type="text"
              name="query"
              placeholder='Search by Name'
              className='outline-none h-8 flex-grow'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {/* filters section start */}
          <div className="flex gap-2">
        <button 
          className={`px-3 py-1 text-sm rounded-full ${filters.isApplied ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          onClick={() => toggleFilter("isApplied")}
        >
           Applied
        </button>
        <button 
          className={`px-3 py-1 text-sm rounded-full ${filters.haveLicense ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          onClick={() => toggleFilter("haveLicense")}
        >
          Licensed
        </button>
        <button 
          className={`px-3 py-1 text-sm rounded-full ${filters.haveWorkExp ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          onClick={() => toggleFilter("haveWorkExp")}
        >
          Experience
        </button>
        <button 
          className={`px-3 py-1 text-sm rounded-full ${filters.haveEquipments ? "bg-blue-500 text-white" : "bg-gray-300"}`}
          onClick={() => toggleFilter("haveEquipments")}
        >
          Have Equipment
        </button>
       
      </div>
          {/* filters section end */}

        </div>

        <div className='flex items-center max-w-[400px] border pr-5 px-3 bg-white gap-3 text-gray-500'>
          <IoMdGrid
            size={25}
            className={`hover:text-blue-500 cursor-pointer ${viewType === 'grid' ? 'text-blue-500' : ''}`}
            onClick={() => handleViewChange('grid')}
            title='Grid View'
          />
          <FaMapMarkedAlt
            size={25}
            className={`hover:text-blue-500 cursor-pointer ${viewType === 'map' ? 'text-blue-500' : 'text-gray-500'}`}
            onClick={() => handleViewChange('map')}
            title='Map View'
          />
        </div>
      </div>

      <div>
        {viewType === 'grid' ? <GridView users={allUsers} /> : <MapView users={allUsers} />}
      </div>
      {!dataLoading &&
        <div className='w-full justify-between items-center px-2 flex'>
          <div>
            {`Page ${page} of ${res?.totalPages}`}
          </div>

          <div className='flex gap-3'>
            {<button disabled={page <= 1} onClick={() => setPage(page - 1)} className={`bg-white px-2 py-1 ${page <= 1 ? "cursor-not-allowed" : ""} rounded-md shadow-md flex items-center gap-0.5`}><GrFormPrevious className='text-lg' />Prev</button>}
            {<button disabled={page >= res?.totalPages} onClick={() => setPage(page + 1)} className={`bg-white px-2 py-1 ${page >= res?.totalPages ? "cursor-not-allowed" : ""} rounded-md shadow-md flex items-center gap-0.5`}>Next<MdOutlineNavigateNext className='text-lg' /></button>}
          </div>
        </div>}
    </div>
  );
}

export default AllUsers;

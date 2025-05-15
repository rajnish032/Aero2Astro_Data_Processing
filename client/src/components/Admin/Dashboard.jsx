"use client";

import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../Contexts/Admin";
import Widgets from "./components/Widgets";
import { Grid, Progress, Skeleton } from "antd";
import GridView from "./components/GridView";
import { useRecoilState } from "recoil";
import { userData } from "@/atom/states";
import { CiSearch } from "react-icons/ci";
import { FaUserAltSlash } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { IoStatsChartSharp } from "react-icons/io5";
import { FaRegHandshake } from "react-icons/fa";
import { BsBan } from "react-icons/bs";
import { MdOutlinePendingActions } from "react-icons/md";

import ListView from "./components/ListView";
import Card from "./components/Card";
import StatWidget from "./components/StatWidget";
import { TbDrone } from "react-icons/tb";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SelectedUserContext } from "@/Contexts/SelectedUser";
import { all } from "axios";
import { useCallback } from "react";
import AllUsers from "./Pages/AllUsers";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
const Dashboard = () => {
  // const { setSelectedUser } = useContext(SelectedUserContext);
  const [state, setState] = useRecoilState(userData);
  const { res, allNewUsers,setPage,page,allUsers, setFilters,dataLoading,setSearchQuery,searchQuery,newSearchQuery,setNewSearchQuery } = useContext(DataContext) || {};
  const [filter, setFilter] = useState("all");
  const router = useRouter();
  const handleClick = useCallback(
    (user) => {
      setState(user);
      router.push(`/admin/user/${user.role}/${user.fullName}/${user._id}`);
    },
    [setState, router]
  );
  return (
    <div>
      {/* Search box */}
      <div className="flex items-center shadow md:mx-10 bg-white my-4 rounded-full px-5 py-2 gap-2">
        <CiSearch size={20} />{" "}
        <input
          type="text"
          name="query"
          id=""
          placeholder="Search by Email, Name, phone"
          className="outline-none h-8 rounded-full flex-grow"
        />
      </div>

      <div className="flex items-center justify-center gap-5 md:gap-4 flex-wrap my-10 md:my-4 md:p-2">
        <StatWidget
          title={"Total Applications"}
          value={res?.totalCount}
          icon={<FaUsers size={30} className="text-white" />}
        />
        <StatWidget
          title={"Total Applied"}
          value={res?.stats?.numberOfAppliedUsers}
          icon={<IoStatsChartSharp size={30} className="text-white" />}
        />
        <StatWidget
          title={"Review Pending"}
          value={res?.stats?.numberOfAppliedUsers-res?.stats?.numberOfApprovedUser||0}
          icon={<MdOutlinePendingActions size={30} className="text-white" />}
        />
        <StatWidget
          title={"Total Approved "}
          value={res?.stats?.numberOfApprovedUser}
          icon={<FaRegHandshake size={30} className="text-white" />}
        />
        <StatWidget
          title={"Total Rejected"}
          value={res?.stats?.numberOfRejectedUser}
          icon={<BsBan size={30} className="text-white" />}
        />
      </div>

      <div className="rounded-lg mt-20 md:p-4 relative md:mx-12 my-10 p-2 bg-white shadow ">
        <div className="bg-gradient-to-r w-[90%] shadow-lg  absolute -top-5 inset-x-0 mx-auto  p-4 text-gray-900 rounded-md from-green-200 to-blue-500">
          <h2 className="font-semibold text-center text-xl">
            Today&apos;s Applications
          </h2>
        </div>

        {/*  user Table */}

        <div className="flex mt-10 py-2 md:px-7 justify-between text-xs items-center ">
          <div className="flex items-center max-w-[400px] border pr-5 px-3 gap-3 rounded-full">
            <CiSearch size={20} />{" "}
            <input
              type="text"
              name="query"
              placeholder='Search by Name'
              className='outline-none h-8 flex-grow'
              value={newSearchQuery}
              onChange={(e) => setNewSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div
          className="mb-10 my-4 overflow-scroll md:mx-4"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="grid grid-cols-7 text-sm">
            {["Name", "Role", "Email", "Phone", "City", "State", "Applied"].map(
              (header) => (
                <div
                  key={header}
                  className="font-bold border-b border-gray-300 p-2"
                >
                  {header}
                </div>
              )
            )}
          </div>
          {allNewUsers.length === 0 ? (
            <div className="opacity-50 col-span-7 text-center my-5">
              <FaUserAltSlash size={40} className="w-fit mx-auto" />
              No Application Received
            </div>
          ) : (
            allNewUsers?.map((user) => (
              <div
                key={user._id}
                onClick={() => handleClick(user)}
                className="grid grid-cols-7 text-sm cursor-pointer hover:bg-gradient-to-r hover:from-blue-200 hover:to-blue-400"
                title="View Profile"
              >
                <div className="border-b border-gray-200 p-2">
                  {user.fullName}
                </div>
                <div className="border-b border-gray-200 p-2">{user.role}</div>
                <div
                  className="border-b border-gray-200 p-2 overflow-x-scroll"
                  style={{ scrollbarWidth: "none" }}
                >
                  {user.email}
                </div>
                <div className="border-b border-gray-200 p-2 px-3">
                  {user.phone.number}
                </div>
                <div className="border-b border-gray-200 p-2">{user.city}</div>
                <div className="border-b border-gray-200 p-2">{user.state}</div>
                <div className="border-b border-gray-200 p-2">
                  {user.isApplied ? "Applied" : "Not Applied"}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Applications for Approval */}
      <div className="rounded-lg mt-20 md:p-4 relative md:mx-12 my-10 p-2 bg-white shadow ">
        <div className="w-4 h-4 bg-green-500 absolute -top-1 -left-1 rounded-full animate-pulse"></div>
        <div className="bg-gradient-to-r w-[90%] shadow-lg  absolute -top-5 inset-x-0 mx-auto  p-4 text-gray-900 rounded-md from-green-200 to-blue-500">
          <h2 className="font-semibold text-center text-xl">
            Applications for Approval
          </h2>
        </div>

        {/*  user Table */}

        <div className="flex mt-10 py-2 md:px-7 justify-between text-xs items-center ">
          <div className="flex items-center max-w-[400px] border pr-5 px-3 gap-3 rounded-full">
            <CiSearch size={20} />{" "}
            <input
              type="text"
              name="query"
              placeholder='Search by Name'
              className='outline-none h-8 flex-grow'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div>
          <button
              onClick={() => {
                setFilter("all")
                setFilters(prev => ({
                  ...prev,
                  status: "all",
                }))
                setPage(1)
              }}
              className={`border px-2 py-1  ${filter === "all"
                  ? "bg-gradient-to-r from-green-200 to-blue-500 text-gray-900 font-bold"
                  : ""
                }`}
            >
              All
            </button>
            <button
              onClick={() => {
                setFilter("approved")
                setFilters(prev => ({
                  ...prev,
                  status: "approved",
                }))
                setPage(1)
              }}
              className={`border px-2 py-1  ${filter === "approved"
                  ? "bg-gradient-to-r from-green-200 to-blue-500 text-gray-900 font-bold"
                  : ""
                }`}
            >
              Approved
            </button>
            <button

              onClick={() => {
                setFilter("notApproved")
                setFilters(prev => ({
                  ...prev,
                  status: "notApproved",
                }))
                setPage(1)
              }}
              className={`border px-2 py-1 ${filter === "notApproved"
                  ? "bg-gradient-to-r from-green-200 to-blue-500 text-gray-900 font-bold"
                  : ""
                }`}
            >
              Not Approved
            </button>
          </div>
        </div>

        <div
          className="mb-10 my-4 overflow-scroll md:mx-4"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="grid grid-cols-7 text-sm">
            {["Name", "Role", "Email", "Phone", "City", "State", "Status"].map(
              (header) => (
                <div
                  key={header}
                  className="font-bold border-b border-gray-300 p-2"
                >
                  {header}
                </div>
              )
            )}
          </div>
          {dataLoading?<Skeleton active />:allUsers.length === 0 ? (
            <div className="opacity-50 col-span-7 text-center my-5">
              <FaUserAltSlash size={40} className="w-fit mx-auto" />
              No Application Received
            </div>
          ) : (
            allUsers?.map((user) => (
              <div
                key={user._id}
                onClick={() => handleClick(user)}
                className="grid grid-cols-7  text-sm cursor-pointer hover:bg-gradient-to-r hover:from-blue-200 hover:to-blue-400 "
                title="View Profile"
              >
                <div className="border-b border-gray-200 p-2  ">
                  {user.fullName}
                </div>
                <div className="border-b border-gray-200 p-2">{user.role}</div>
                <div
                  className="border-b border-gray-200 p-2 overflow-x-scroll"
                  style={{ scrollbarWidth: "none" }}
                >
                  {user.email}
                </div>
                <div className="border-b border-gray-200 p-2 px-3">
                  {user.phone.number}
                </div>
                <div className="border-b border-gray-200 p-2">{user.city}</div>
                <div className="border-b border-gray-200 p-2">{user.state}</div>
                <div className="border-b border-gray-200 flex gap-3 items-center p-2">
                  <p className="text-green-500">
                    {" "}
                    {user.status.charAt(0).toUpperCase() +
                      user.status.slice(1).toLowerCase()}
                  </p>
                </div>
              </div>
            ))
          )}
           {
            allUsers.length>0 &&
        <div className='w-full my-5 justify-between items-center px-2 flex'>
          <div>
            {`Page ${page} of ${res?.totalPages}`}
          </div>

          <div className='flex gap-3'>
            {<button disabled={page <= 1} onClick={() => setPage(page - 1)} className={`bg-white px-2 py-1 ${page <= 1 ? "cursor-not-allowed" : ""} rounded-md shadow-md flex items-center gap-0.5`}><GrFormPrevious className='text-lg' />Prev</button>}
            {<button disabled={page >= res?.totalPages} onClick={() => setPage(page + 1)} className={`bg-white px-2 py-1 ${page >= res?.totalPages ? "cursor-not-allowed" : ""} rounded-md shadow-md flex items-center gap-0.5`}>Next<MdOutlineNavigateNext className='text-lg' /></button>}
          </div>
        </div>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

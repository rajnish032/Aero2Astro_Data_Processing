"use client";
import React, { useState, useEffect } from "react";

import { useRecoilState } from "recoil";
import { CiSettings } from "react-icons/ci";
import { TbDrone } from "react-icons/tb";
import { MdOutlineComputer } from "react-icons/md";
import CircularProgress from "@/components/gisProfile/components/cir";
import { getAllProj } from "@/routes/gisProj";
import { Spinner } from "@nextui-org/react";
import { getAllLog } from "@/routes/gisLog";
import { logData, gisProject, shareGisData } from "@/atom/states";
import { requestUrl } from "@/utils/constants";
import { MdEmail } from "react-icons/md";
import { FaPhone, FaTreeCity } from "react-icons/fa6";
import { IoTime, IoLocationSharp } from "react-icons/io5";
import { LiaIndustrySolid } from "react-icons/lia";
import { GrEdit } from "react-icons/gr";
import { PiBagSimple } from "react-icons/pi";
import { IoShareSocial } from "react-icons/io5";
// import { useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import FlightDetails from "@/components/gisProfile/FlightDetails";
import Portfolio from "@/components/gisProfile/components/Portfolio";
import UnavailabilityStatus from "@/components/gisProfile/components/UnavailabilityStatus";
import { CiLock } from "react-icons/ci";
const Profile = () => {
  const [currentUser, setCurrentUser] = useRecoilState(shareGisData);
  const [allLogs, setAllLogs] = useRecoilState(logData);
  const [allProj, setAllProj] = useRecoilState(gisProject);
  const [loading, setLoading] = useState(false);
  const [workData, setWorkData] = useState({
    jobType: "",
    companyName: "",
    designation: "",
    startDate: "",
    endDate: "",
    file: null,
  });
  const params = useParams();
  const id = params.id;
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        console.log("Id : ", id);
        const response = await axios.get(`${requestUrl}/gis/public/logs/all`, {
          params: {
            uniqueId: id,
          },
        });
        console.log("response : ", response);
        setAllLogs(response?.data?.allLog);
      } catch (error) {
        console.error("Error fetching user Logs:", error);
      }
    };

    fetchLogs();
  }, [setAllLogs]);

  useEffect(() => {
    // getAllProj(setAllProj);
    const fetchAllProj = async () => {
      try {
        console.log("Id : ", id);
        const response = await axios.get(`${requestUrl}/gis/public/projects/all`, {
          params: {
            uniqueId: id,
          },
        });
        console.log("response : ", response);
        setAllProj(response?.data?.allProj);
      } catch (error) {
        console.error("Error fetching user Projects:", error);
      }
    };

    fetchAllProj();
  }, []);

  // Group projects by tag
  const projectsByTag = allProj?.reduce((acc, project) => {
    const tag = project.industry;
    if (!acc[tag]) {
      acc[tag] = 0;
    }
    acc[tag]++;
    return acc;
  }, {});

  // Group projects by Type
  const projectsByType = allProj?.reduce((acc, project) => {
    const tag = project.type;
    if (!acc[tag]) {
      acc[tag] = 0;
    }
    acc[tag]++;
    return acc;
  }, {});

  const projectsByApplication = allProj?.reduce((acc, project) => {
    const tag = project.application;
    if (!acc[tag]) {
      acc[tag] = 0;
    }
    acc[tag]++;
    return acc;
  }, {});

  // Render a section for each category
  const renderSkillsSection = (skillsData) => {
    return (
      <div className="flex flex-row items-center overflow-y-hidden overflow-x-auto min-h-40 max-h-40 w-full box-border">
        {skillsData &&
          Object.entries(skillsData).map(([tag, count]) => {
            const totalProjects = 100; // default total count
            const percentage = (count / totalProjects) * 100;
            let color = "";

            if (percentage < 25) {
              color = "red";
            } else if (percentage < 50) {
              color = "orange";
            } else if (percentage < 75) {
              color = "yellow";
            } else {
              color = "green";
            }

            return (
              <div key={tag} className="flex flex-col items-center mb-4">
                <CircularProgress
                  value={percentage}
                  color={color}
                  radius={35}
                />
                <span
                  className="text-xs font-bold text-center text-gray-700 truncate max-w-[120px] -mt-4" // Truncate long tags with ellipsis
                  title={tag} // Show full tag on hover
                >
                  {tag}
                </span>
              </div>
            );
          })}
      </div>
    );
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        console.log("Id : ", id);
        const response = await axios.post(`${requestUrl}/gis/public/detail`, {
          uniqueId: id,
        });
        console.log("response : ", response);
        setCurrentUser(response?.data?.user);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id, setCurrentUser]);

  // Show loading spinner while `currentUser` is not yet available
  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-full bg-white">
        <Spinner color="primary" size="large" />
      </div>
    );
  }
  if (currentUser && !currentUser?.dataVerified) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-white p-5 text-center">
        <CiLock className="text-gray-800 mb-4" size={52} />
        <h2 className="text-xl font-bold text-gray-800">Private Profile</h2>
        <p className="text-gray-700 mt-2 max-w-sm">
          This user&apos;s information is currently hidden because the profile hasn&apos;t been verified yet.
        </p>
      </div>

    );
  }
  if (currentUser && currentUser?.isSuspended) {
    return (
      <div className="flex items-center justify-center h-full bg-white p-5 text-center">
        <div>
          <h2 className="text-3xl font-bold text-red-600">Profile Suspended ⚠️</h2>
          <p className="mt-2 text-gray-700">
            This gis&rsquo;s profile is currently suspended and unavailable for viewing.
          </p>

        </div>
      </div>
    );
  }


  const details = [
    { icon: <MdEmail />, text: currentUser?.email },
    {
      icon: <FaPhone />,
      text: `${currentUser?.phone.countryCode} ${currentUser?.phone?.number}`,
    },
    { icon: <FaTreeCity />, text: currentUser?.state },
    { icon: <IoLocationSharp />, text: currentUser?.locality },
  ];

  const getFavicon = (url) => {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}`;
  };

  return (
    <div className="bg-gray-600 pb-4 px-2 sm:px-4 md:px-12  py-4">
      {/* Profile Info Section */}
      <div className="mb-4">
        <div className="w-full ">
          <div className="border-r bg-white px-4 shadow p-3 rounded-lg gap-5 flex-wrap flex max-sm:justify-center ">
            <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-gray-700 w-[380px] border border-gray-200">
              <div className="relative w-32 h-32">
                {loading ? (
                  <Spinner />
                ) : (
                  <>
                    <img
                      src={
                        currentUser?.avatar ||
                        "https://www.pngkey.com/png/detail/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
                      }
                      alt={currentUser?.fullName}
                      className="w-full h-full rounded-full object-cover ring-4 ring-green-500"
                    />
                  </>
                )}
              </div>

              <h2 className="text-xl font-semibold mt-4">
                {currentUser?.fullName || "User Name"}
              </h2>
              <h3 className="text-sm text-indigo-500">
                {currentUser?.role === "Gis" ? "UAV Pilot" : currentUser?.role}
              </h3>

              {!currentUser?.bioSection?.hideBio && (
                <div className="mt-3 text-center text-sm text-gray-600">
                  <p className="font-medium">
                    Certified Equipment any GIS | Aerial Survey Specialist
                  </p>
                  <p>
                    {currentUser?.workExp?.yearsOfExp || 0}+ Years of Experience
                  </p>

                  <div className="mt-2 max-h-24 overflow-y-auto text-sm text-gray-500 text-center px-4 hideScrollbar">
                    <p>{currentUser?.bioSection?.bio}</p>
                  </div>
                </div>
              )}

            </div>

            {/* Detail section */}
            <div className="md:p-3 p-1 ">
              {details?.map((i, index) => (
                <p
                  key={index}
                  className="flex w-full max-sm:text-tiny items-center justify-start gap-3"
                >
                  {i.icon}
                  <span className="break-words">{i.text}</span>
                </p>
              ))}
              <UnavailabilityStatus showAll={false} userId={currentUser?._id} />
            </div>
            {/* Availabilty section */}


            {/* Summary */}
            <FlightDetails allLogs={allLogs} />
            {/* <div>
              <h3 className="text-lg font-semibold">Total Flight Time</h3>
              <p>
                {(() => {
                  let totalHours = 0;
                  let totalMinutes = 0;
                  let totalSeconds = 0;

                  allLogs.forEach((log) => {
                    const { hr = 0, min = 0, sec = 0 } = log.duration || {};

                    totalHours += hr;
                    totalMinutes += min;
                    totalSeconds += sec;
                  });

                  const extraMinutes = Math.floor(totalSeconds / 60);
                  totalSeconds = totalSeconds % 60;

                  totalMinutes += extraMinutes;

                  const extraHours = Math.floor(totalMinutes / 60);
                  totalMinutes = totalMinutes % 60;

                  totalHours += extraHours;

                  return `${totalHours}h ${totalMinutes}m ${totalSeconds}s`;
                })()}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Total Range Covered</h3>
              <p className="text-sm text-blue-600">Distance</p>
              <p>
                {allLogs
                  .filter((log) => log.flightType?.includes("linear"))
                  .reduce((total, log) => total + log.rangeCovered, 0)
                  .toFixed(2)}{" "}
                km
              </p>
              <p className="text-sm text-blue-600">Area</p>
              <p>
                {allLogs
                  .filter((log) => !log.flightType?.includes("linear"))
                  .reduce((total, log) => total + log.rangeCovered, 0)
                  .toFixed(2)}{" "}
                acres
              </p>
            </div> */}
          </div>

          {/* Company Experience & Social Links */}
          <div className="grid lg:grid-cols-2 gap-4 mt-2">
            <div className="my-1 p-3 bg-white shadow rounded-lg">
              <h2 className="text-gray-900 flex text-md font-medium mb-4 px-3 border-b items-center justify-between ">
                <span className="inline-flex gap-2 items-center">
                  <PiBagSimple className="w-fit text-lg" /> Experience
                </span>
              </h2>

              {currentUser?.workExp?.works.length == 0 ||
                !currentUser?.workExp ? (
                <div>
                  <p className="text-center text-tiny">
                    No work experience added
                  </p>
                </div>
              ) : (
                currentUser?.workExp?.works?.map((i) => (
                  <div
                    key={i._id}
                    className="flex items-center text-sm justify-between "
                  >
                    <div className="flex-1 p-1">
                      <p className="flex items-center gap-2">
                        <LiaIndustrySolid />
                        {i.jobType} at {i.companyName} . {i.designation}
                      </p>
                      <p className="flex items-center gap-2">
                        {" "}
                        <IoTime /> {i.startMon} - {i.endMon}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="my-1 p-3 bg-white shadow rounded-lg">
              <h2 className="text-gray-900 flex text-md font-medium mb-4 px-3 border-b items-center justify-between">
                <span className="inline-flex gap-2 items-center">
                  <IoShareSocial className="w-fit text-lg" /> Social Links
                </span>
              </h2>

              {currentUser?.socialLinks?.length === 0 ? (
                <p className="text-center text-gray-500 text-xs">
                  No social links added
                </p>
              ) : (
                currentUser?.socialLinks?.map((link) => (
                  <div key={link._id} className="p-2 text-sm mb-2 ">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={getFavicon(link.url)}
                          alt={link.title}
                          className="w-4 object-cover h-4"
                        />
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600"
                        >
                          {link.title}
                        </a>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="rounded-md shadow relative h-full min-h-28 bg-white mb-4 ">
        <h2 className="text-lg flex items-center justify-between gap-2 border-b font-bold px-5 rounded-sm inset-x-0 py-1  text-black text-sm md:text-xl text-center">
          <span className="inline-flex gap-2 items-center">
            <CiSettings className="w-fit color-black text-lg" /> Skills
          </span>
          <Link
            href={`/gis/projects/${currentUser?.fullName
              .toLowerCase()
              .replace(" ", "-")}`}
          >
            <GrEdit className="text-md cursor-pointer text-white hover:text-black" />
          </Link>
        </h2>

        {/* Three Column Layout with Separator */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 relative">
          {/* Industry Skills */}
          <div className="flex flex-col items-center">
            <h3 className="font-bold text-blue-700 mb-2 w-full border-b-2 border-gray-300 pb-2 text-center">
              Industry Skills
            </h3>
            {renderSkillsSection(projectsByTag)}
          </div>
          {/* Vertical line between columns */}
          <div className="hidden md:block border-l-2 border-gray-300 absolute left-1/3 top-0 bottom-0"></div>
          <div className="hidden md:block border-l-2 border-gray-300 absolute left-2/3 top-0 bottom-0"></div>
          {/* Project Skills */}
          <div className="flex flex-col items-center">
            <h3 className="font-bold text-blue-700 mb-2  w-full border-b-2 border-gray-300 pb-2 text-center">
              Project Skills
            </h3>
            {renderSkillsSection(projectsByType)}
          </div>
          {/* Application Skills */}{" "}
          <div className="flex flex-col items-center">
            <h3 className="font-bold text-blue-700 mb-2  w-full border-b-2 border-gray-300 pb-2 text-center">
              Application Skills
            </h3>
            {renderSkillsSection(projectsByApplication)}
          </div>
        </div>
      </div>

      {/* Software Section */}
      <div className="mb-4">
        <div className="rounded-md shadow relative min-h-20  bg-white ">
          <h2 className="text-lg flex items-center gap-2 border-b font-bold px-5 rounded-sm  inset-x-0 py-1 text-gray-800">
            <MdOutlineComputer className="" /> Softwares
          </h2>

          <div className="flex gap-3 px-2 md:px-8 py-4 h-full items-center  flex-wrap">
            {currentUser?.skills?.controlStations?.map((i, id) => (
              <div
                key={id}
                className="bg-blue-600 text-white font-medium text-sm rounded-full px-2 py-1"
              >
                {i}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Drones Section */}
      <div className="mb-4">
        <div className="rounded-md shadow relative  bg-white ">
          <h2 className="text-lg flex items-center gap-2 border-b font-bold px-5 rounded-sm  inset-x-0 py-1 text-gray-800">
            <TbDrone className="" /> Types of Equipment
          </h2>

          <div className="my-2 md:px-4  px-2 py-2 flex gap-4 flex-wrap ">
            <div className="flex gap-3 px-2 md:px-3 p-1 h-full items-center  flex-wrap">
              {currentUser?.skills?.droneTypesCanFly?.map((i, id) => (
                <div
                  key={id}
                  className="bg-blue-600 text-white font-medium text-sm rounded-full px-2 py-1"
                >
                  {i}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* portfolio */}
      <div className="mb-4">
        <Portfolio currentUser={currentUser} giveControl={false} />
      </div>
    </div>
  );
};

export default Profile;

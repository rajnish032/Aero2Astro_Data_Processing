"use client";
import React, { useEffect, useState } from "react";
import { FaPhone, FaTreeCity } from "react-icons/fa6";
import { IoAdd, IoLocationSharp } from "react-icons/io5";
import { useRecoilState } from "recoil";
import { logData, gisData } from "@/atom/states";
import { LiaIndustrySolid } from "react-icons/lia";
import { CiEdit } from "react-icons/ci";
import { IoIosAddCircle } from "react-icons/io";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { IoTime } from "react-icons/io5";
import { PiBagSimple } from "react-icons/pi";
import axios from "axios";
import { reqUrl } from "@/utils/constants";
import { CgEditBlackPoint } from "react-icons/cg";
import { FaEdit } from "react-icons/fa";
import WorkModal from "./components/workModal";
import { IoShareSocial } from "react-icons/io5";
import { FaShareAlt } from "react-icons/fa"; // Import share icon
import { MdEmail } from "react-icons/md";
import SocialLinkModal from "./components/SocialLinkModal";
import { toast } from "react-toastify";
import { verifyGisAuth } from "@/utils/verifyauth";
import Cookies from "universal-cookie";
import dayjs from "dayjs";
import { Spinner } from "@nextui-org/react";
import FlightDetails from "./FlightDetails";
import UnavailabilityStatus from "./components/UnavailabilityStatus";
const cookies = new Cookies(null, { path: "/" });

const ProfileInfo = ({ shareProfile }) => {
  const [currentUser, setCurrentUser] = useRecoilState(gisData);
  const [allLogs, setAllLogs] = useRecoilState(logData);
  const [loading, setLoading] = useState(false);
  const [workData, setWorkData] = useState({
    jobType: "",
    companyName: "",
    designation: "",
    startDate: "",
    endDate: "",
    file: null,
  });
  const [socialLinkData, setSocialLinkData] = useState({
    title: "",
    url: "",
  });
  console.log(currentUser);
  const [expId, setExpId] = useState(null);
  const [isWorkModalOpen, setIsWorkModalOpen] = useState(false);
  const [isSocialLinkModalOpen, setIsSocialLinkModalOpen] = useState(false);

  const [showDetails, setShowDetails] = useState(
    !currentUser?.bioSection?.hideBio
  );
  const [bio, setBio] = useState(currentUser?.bioSection?.bio || "Add Bio");
  const [isEditing, setIsEditing] = useState(false);
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

  const handleProfileInfoChange = async () => {
    const token = cookies.get("auth");

    try {
      setLoading(true);
      await axios.post(
        `${reqUrl}/gis/update/personalInfo`,
        { fullname, locality, email, phone },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      toast.success("Successfully Updated");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  //**************************************** */

  // Avatar Update handler
  const handleAvatarUpload = async (e) => {
    setLoading(true);
    const file = e.target.files[0];

    try {
      const formData = new FormData();
      formData.append("avatar", file);
      const token = cookies.get("auth");

      const response = await axios.put(
        `${reqUrl}/gis/updateAvatar`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        toast.success("Avatar updated successfully");
        setCurrentUser(response.data.user);
        verifyGisAuth({ setCurrentUser, token });
      } else {
        toast.error("Failed to update avatar");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update avatar");
    } finally {
      setLoading(false);
    }
  };

  //***************************************************** */

  //  work Exp

  const handleAddWorkExp = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      if (workData.image) {
        formData.append("file", workData.image);
      }
      formData.append("jobType", workData.jobType);
      formData.append("companyName", workData.companyName);
      formData.append("designation", workData.designation);
      formData.append("startMon", dayjs(workData.startMon).format("MM-YYYY"));
      formData.append("endMon", dayjs(workData.endMon).format("MM-YYYY"));

      if (dayjs(workData.startMon).isAfter(dayjs(workData.endMon), "month")) {
        toast.error("Start Month can't be greater than End Month");
        setLoading(false);
        return;
      }

      const token = cookies.get("auth");
      await axios.post(`${reqUrl}/gis/add/work`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      toast.success("Successfully saved");
      setLoading(false);
      setIsWorkModalOpen(false);
      verifyGisAuth({ setCurrentUser, token });
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Error Saving!");
      setLoading(false);
    }
  };

  const handleDeleteExp = async (id) => {
    const token = cookies.get("auth");

    if (
      window.confirm("Are you sure you want to delete this work experience?")
    ) {
      try {
        setLoading(true);
        await axios.delete(`${reqUrl}/gis/delete/work/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
        toast.success("Deleted Successfully");
        verifyGisAuth({ setCurrentUser, token });
      } catch (error) {
        toast.error("Something went wrong");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  //********************************************************* */

  //***************************************************** */
  //  Social Links handlers
  const handleDeleteSocialLink = async (id) => {
    if (window.confirm("Are you sure you want to delete this social link?")) {
      try {
        setLoading(true);
        const token = cookies.get("auth");
        await axios.delete(`${reqUrl}/gis/delete/socialLink`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
          data: {
            id,
          },
        });
        toast.success("Deleted Successfully");
        await verifyGisAuth({ setCurrentUser, token });
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAddSocialLink = async () => {
    try {
      const token = cookies.get("auth");

      if (!socialLinkData) return;
      setLoading(true);
      await axios.post(
        `${reqUrl}/gis/add/socialLink`,
        { data: socialLinkData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      toast.success("Added Successfully");
      setIsSocialLinkModalOpen(false);
      await verifyGisAuth({ setCurrentUser, token });
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  // **********************************************************

  //Bio change

  const handleBioChange = async () => {
    if (!bio.trim()) {
      toast.error("Bio cannot be empty");
      return;
    }

    setLoading(true);
    try {
      const token = cookies.get("auth");
      const response = await axios.post(
        `${reqUrl}/gis/updateBio`,
        { bio },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update Bio");
    } finally {
      setLoading(false);
      setIsEditing(!isEditing);
    }
  };

  const handleHideDetails = async () => {
    setLoading(true);
    try {
      const token = cookies.get("auth");
      let changed;
      if (showDetails) {
        changed = false;
      } else {
        changed = true;
      }
      setShowDetails(changed);
      const response = await axios.post(
        `${reqUrl}/gis/hideDetails`,
        { hideDetails: !changed },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Updates saved");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full ">
      {/* Work Modal */}
      <WorkModal
        loading={loading}
        isOpen={isWorkModalOpen}
        setIsOpen={setIsWorkModalOpen}
        handleSubmit={handleAddWorkExp}
        data={workData}
        setData={setWorkData}
      />

      {/* Social Link Modal */}
      <SocialLinkModal
        isOpen={isSocialLinkModalOpen}
        setIsOpen={setIsSocialLinkModalOpen}
        handleSubmit={handleAddSocialLink}
        data={socialLinkData}
        setData={setSocialLinkData}
      />

      <div className="border-r bg-white shadow py-3 px-1 rounded-lg gap-2 flex-wrap flex max-sm:justify-center ">
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
                <input
                  type="file"
                  className="hidden"
                  id="avatar"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                />
                <label htmlFor="avatar">
                  <FaEdit
                    className="absolute bottom-2 right-2 text-blue-500 hover:text-orange-500 cursor-pointer bg-white p-1 rounded-full shadow-md"
                    size={24}
                  />
                </label>
              </>
            )}
          </div>

          <h2 className="text-xl font-semibold mt-4">
            {currentUser?.fullName || "User Name"}
          </h2>
          <h3 className="text-sm text-indigo-500">
            {currentUser?.role === "Gis" ? "UAV Pilot" : currentUser?.role}
          </h3>

          {showDetails && (
            <div className="mt-3 text-center text-sm text-gray-600">
              <p className="font-medium">
                Certified in any Gis Equipment | Aerial Survey Specialist
              </p>
              <p>
                {currentUser?.workExp?.yearsOfExp || 0}+ Years of Experience
              </p>

              <div className="mt-2 max-h-24 overflow-y-auto text-sm text-gray-500 text-center px-4 hideScrollbar">
                {isEditing ? (
                  <textarea
                    className="w-full p-2 border rounded hideScrollbar"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                ) : (
                  <p>{bio}</p>
                )}
              </div>
              <div className=" gap-5 flex justify-center">
                {isEditing ? (
                  <button
                    onClick={handleBioChange}
                    className="mt-2 text-sm text-blue-500 underline"
                  >
                    Save Bio
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="mt-2 text-sm text-blue-500 underline"
                  >
                    Edit Bio
                  </button>
                )}
              </div>
            </div>
          )}
          <button
            onClick={handleHideDetails}
            className="mt-2 text-sm text-blue-500 underline"
          >
            {showDetails ? "Hide Details" : "Show Details"}
          </button>
        </div>

        {/* Detail section */}
        <div className="md:p-3 p-1">
          {details?.map((i, index) => (
            <p
              key={index}
              className="flex w-full max-sm:text-tiny items-center justify-start gap-3"
            >
              {i.icon}
              <span className="break-words">{i.text}</span>
            </p>
          ))}

          {/* unavailability section */}
          <div className="flex gap-2  items-center">
            <UnavailabilityStatus showAll={true} userId={currentUser?._id} />
          </div>

          {/* Share Button */}
          <div className="flex justify-start py-4">
            <button
              onClick={shareProfile}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center gap-2"
            >
              <FaShareAlt />
              Share Profile
            </button>
          </div>
        </div>

        
        <FlightDetails allLogs={allLogs} />
      </div>

      {/* Company Experience & Social Links */}
      <div className="grid lg:grid-cols-2 gap-4 mt-2">
        <div className="my-1 p-3 bg-white shadow rounded-lg">
          <h2 className="text-gray-900 flex text-md font-medium mb-4 px-3 border-b items-center justify-between ">
            <span className="inline-flex gap-2 items-center">
              <PiBagSimple className="w-fit text-lg" /> Experience
            </span>
            <IoAdd
              onClick={() => setIsWorkModalOpen(true)}
              className="text-2xl text-blue-500 hover:text-blue-800"
            />
          </h2>

          {currentUser?.workExp?.works.length == 0 || !currentUser?.workExp ? (
            <div>
              <p className="text-center text-tiny">No work experience added</p>
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
                <RiDeleteBin2Fill
                  onClick={() => handleDeleteExp(i._id)}
                  className="text-red-500 hover:text-red-700 cursor-pointer text-lg"
                />{" "}
              </div>
            ))
          )}
        </div>

        <div className="my-1 p-3 bg-white shadow rounded-lg">
          <h2 className="text-gray-900 flex text-md font-medium mb-4 px-3 border-b items-center justify-between">
            <span className="inline-flex gap-2 items-center">
              <IoShareSocial className="w-fit text-lg" /> Social Links
            </span>
            <IoAdd
              onClick={() => setIsSocialLinkModalOpen(true)}
              className="text-2xl cursor-pointer text-blue-500 hover:text-blue-800"
            />
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
                  <RiDeleteBin2Fill
                    onClick={() => handleDeleteSocialLink(link._id)}
                    className="text-red-500 hover:text-red-700 cursor-pointer text-lg"
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;

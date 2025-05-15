"use client";

import React, { useEffect } from "react";
import ProfileInfo from "./profileInfo";
import Skills from "./Skills";
import Softwares from "./Softwares";
import { Spinner } from "@nextui-org/react";
import { getAllLog } from "@/routes/gisLog";
import Cookies from "universal-cookie";
import { useRecoilState } from "recoil";
import { logData, PageLoader, gisData } from "@/atom/states";
import Portfolio from "./components/Portfolio";
import Equipments from "./Equipments";

// Initialize cookies
const cookies = new Cookies(null, { path: "/" });

const Profile = () => {
  const [currentUser, setCurrentUser] = useRecoilState(gisData);
  const [pageLoader, setPageLoader] = useRecoilState(PageLoader);
  const [allLogs, setAllLogs] = useRecoilState(logData);

  // Fetch gis logs on component mount
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        await getAllLog(setAllLogs);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchLogs();
  }, [setAllLogs]);

  // Function to handle sharing the profile

  const formattedName = currentUser?.fullName.toLowerCase().replace(/\s+/g, "-");
  const shareProfile = () => {
    const shareData = {
      title: `${currentUser?.fullName}'s Profile`,
      text: `Check out ${currentUser?.fullName}'s profile on our platform!`,
      // url: `${window.location.origin}/public/${formattedName}?id=${currentUser?._id}`,
      // url: `${window.location.origin}/public/${formattedName}?id=${currentUser?.uniqueId}`,
      url: `${window.location.origin}/public/${currentUser?.uniqueId}`,
    };

    if (navigator.share) {
      // If Web Share API is available
      navigator
        .share(shareData)
        .then(() => console.log("Profile shared successfully!"))
        .catch((error) => console.error("Error sharing profile:", error));
    } else {
      // Fallback to copy the link to clipboard
      navigator.clipboard.writeText(shareData.url).then(() => {
        alert("Profile link copied to clipboard!");
      });
    }
  };

  // Show loading spinner while `currentUser` is not yet available
  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-full bg-white">
        <Spinner color="primary" size="large" />
      </div>
    );
  }

  return (
    <div className="pb-4">
    
      {/* Profile Info Section */}
      <div className="mb-4">
        <ProfileInfo shareProfile={shareProfile} />
      </div>

      {/* Skills Section */}
      <div className="mb-4">
        <Skills />
      </div>

      {/* Software Section */}
      <div className="mb-4">
        <Softwares />
      </div>

      {/* Equipments Section */}
      <div className="mb-4">
        <Equipments />
      </div>
      {/* Portfolio */}
      <div className="mb-4">
        <Portfolio setCurrentUser={setCurrentUser} currentUser={currentUser} giveControl={true}/>
      </div>
      
    </div>
  );
};

export default Profile;

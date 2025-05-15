"use client"

import { Button } from "antd";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useContext } from "react";
import axios from "axios";
import defaultavatar from "../../../assets/avatar.png";
import logo from "../../../assets/logo.png";
import { requestUrl } from "../../../utils/constants";
import { UserContext } from "../../../Contexts/User";
import Cookies from 'universal-cookie';
import toast from "react-hot-toast";
import Modal from "./Modal";
import SurveyForm from "./commons/SurveyForm";
import { surveyList } from "../../../data/defaultList";
const cookies = new Cookies(null, { path: "/", sameSite: 'lax' })

const Navbar = () => {

  const [showDropdown, setShowDropdown] = useState(false);
  const { user, setUser,handleApplyApproval } = useContext(UserContext);



  const router = useRouter();

  const handleLogout = async () => {
    try {
      if (confirm("Are You Sure to sign out?")) {
        cookies.remove('auth');
        setUser(null);
        router.push("/gis/login");
      }
      else {
        return;
      }
    } catch (error) {
      // console.error("Logout failed:", error);
    }
  };


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [surveyOption, setSurveyOption] = useState(null);
  const [loading, setLoading] = useState(false);
  


  const openModal = async() => {
      if (user?.isApplied) {
          toast.error("Already applied");
          return;
      }

      if (confirm("Once applied you won't be able to edit your details back. Are you sure to apply?")) {
          if (user?.basicDetails && user?.skills && user?.projects && user?.professionalDetails && user?.acceptedCommunication && user?.acceptedTermsandPrivacy) {
            if(user?.surveyAnswer){
             await handleApplyApproval();
             return;
            }
            else{
              setIsModalOpen(true);
            }
          } else {
              toast.error("Kindly complete the profile");
          }
      }
  };

  const handleApplyandSaveSurvey = async () => {
      const userAuth = cookies.get('auth');
      if (!userAuth) router.push("/gis/login");
      setLoading(true);

      try {
          await axios.post(`${requestUrl}/user/survey`, { answer:surveyOption }, {
              headers: {
                  Authorization: `Bearer ${userAuth}`,
              },
              withCredentials: true
          });

          await handleApplyApproval();
          setIsModalOpen(false);
          setLoading(false);
      } catch (err) {
          toast.error("There is some issue while saving your response");
          setLoading(false);
      }
  };

  return (
    <header
      className="sticky top-0 z-[2000] border-b border-blue-400  mb-5 shadow-md bg-white  text-gray-700">
    
    <Modal
                isModalOpen={isModalOpen}
                setIsOpenModal={setIsModalOpen}
                btnText="Proceed to Apply"
                disabled={!surveyOption}
                modalBtnHandler={handleApplyandSaveSurvey}
                loading={loading}
            >
                <SurveyForm
                    surveyOption={surveyOption}
                    setSurveyOption={setSurveyOption}
                    options={surveyList}
                />
            </Modal>
    
      <div className=" max-w-screen-xl relative flex flex-wrap items-center justify-between  max-sm:pl-2 px-3 lg:px-5">
        <Link href={"/"} className=' lg:mx-20
                     bg-cover cursor-pointer inline-flex overflow-hidden relative
                       md:w-[300px] h-16 w-[150px]  items-center '>
          <Image src={logo} alt="Aero2Astro" className=" max-sm:scale-[1.4] lg:scale-[1.1]" />
        </Link>

        <div className="gap-3 flex  text-sm lg:mx-4 lg:justify-end flex-grow items-center max-md:hidden">
          {!user?.isApplied ? <Link className="font-semibold px-2 hover:text-blue-400"
            href={"/user/profile"}>
            Profile
          </Link>:<Link className="font-semibold px-2 hover:text-blue-400"
            href={"/user/preview"}>
            View Profile
          </Link>}
          <Link className="font-semibold px-2 hover:text-blue-500"
            href={"/user/dashboard"}>
            Dashboard
          </Link>
      
          <button

            className={`font-semibold relative   text-white py-1 px-2 rounded hover:bg-blue-600 ${user?.isApplied ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500"}`}
            onClick={()=>openModal()}
          >
            {!user?.isApplied ? "Apply for Approval" : "Applied"}
          </button>


        </div>
        <div className="items-center flex md:flex-row-reverse  gap-5 relative">

          {
            loading ?
              <div className=" flex gap-2">

                <div className="w-8 h-8 rounded-full animate-pulse bg-gray-500">
                </div>
                <div className="flex flex-col min-w-[100px] gap-1">
                  <div className="h-2 animate-pulse bg-gray-800 min-w-full rounded-2xl"></div>
                  <div className="h-2 max-w-[80%] animate-pulse bg-gray-800  rounded-2xl "></div>
                  <div className="h-2 max-w-[70%] animate-pulse bg-gray-800  rounded-2xl "></div>
                </div>
              </div>
              :
              (<><div className="w-fit  py-2 ">
                <p className="font-semibold max-sm:text-sm">{user?.fullName}</p>
                <p className="text-xs">{user?.role}</p>
                <p className="text-xs mt-1">
                  {user?.status === "pending" ? (
                    <span className="bg-red-600 px-1 text-center w-fit text-white">Not Applied</span>
                  ) : user?.status === "review" ? (
                    <span className="bg-yellow-600 text-center w-fit px-1 text-white">{user?.status}</span>
                  ) : user?.status === "rejected" ? (
                    <span className="bg-red-600 text-center w-fit px-1 text-white">{user?.status}</span>
                  ) : user?.status === "approved" ? (
                    <span className="bg-green-600 text-center w-fit px-1 text-white">{user?.status}</span>
                  ) : null}
                </p>

              </div>

                <div className="flex items-center relative md:order-2 space-x-3 md:space-x-0 ">

                  <button
                    type="button"
                    className="flex text-sm   ring-1 ring-blue-500 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300"
                    id="user-menu-button"
                    aria-expanded="false"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img className="w-8 h-8 rounded-full" src={user?.avatar || defaultavatar} alt={user?.fullName} />
                  </button>
                  {/* Dropdown menu */}
                  {showDropdown && (
                    <div className="z-50 my-4 text-base fixed top-16 right-5 lg:right-52 list-none shadow-lg bg-white   divide-y divide-gray-500 rounded-lg ">
                      <div className="px-4 py-3">
                        {user && (
                          <>
                            <span className="block text-sm text-gray-900 ">{user.fullName.toUpperCase()}</span>
                            <span className="block text-sm text-gray-900 truncate">{user.email.substr(0, 24)}...</span>
                          </>
                        )}
                      </div>
                      <ul className="py-2" aria-labelledby="user-menu-button">
                        <li>
                          <Link
                            href="/user/dashboard"
                            className="block px-4 py-2 text-sm text-gray-700 w-[100%] "
                          >
                            Dashboard
                          </Link>
                        </li>
                        <li>
                          {!user?.isApplied && <Link
                            href="/user/profile"
                            className="block px-4 py-2 text-sm text-gray-700 w-[100%] "
                          >
                            My Profile
                          </Link>}
                        </li>


                        <li>
                          <Button
                            onClick={()=>openModal()}
                            disabled={user?.isApplied}

                            className="block px-4  text-sm bg-green-500 font-semibold  text-white mx-auto w-[90%] "
                          >
                            Apply for Approval
                          </Button>
                        </li>
                        <li>
                          <Button
                            onClick={handleLogout}
                            className="block px-4 text-sm bg-blue-500 font-bold  text-white w-[90%] mx-auto my-2 "
                          >
                            Sign out
                          </Button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </>)

          }
        </div>
      </div>
    </header>
  );
};

export default Navbar;

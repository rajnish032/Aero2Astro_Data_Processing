"use client"

import { useContext, useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import BasicDetails from "./components/BasicDetails";
import EquipmentDetails from "./components/EquipmentDetails";
import WorkExperience from "./components/WorkExperience";
import ProfessionalDetails from "./components/ProfessionalDetails";
import SkillsServices from "./components/SkillsServices";
import Licenses from "./components/Licenses";

import { UserContext } from "../../Contexts/User";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ProjectExperience from "./components/ProjectExperience";
import { SiWhatsapp } from "react-icons/si";
import { Tooltip } from "antd";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import UserConsent from "./components/UserConsent";

const tabs = [
    "Basic Details",
    "Equipments",
    "Employment Details",
    "Work Experience",
    "Projects",
    "Skills",
    "Licenses",
    "Privacy Policy and T&C"
]
const UserProfilePage = () => {
    const [currTab, setCurrTab] = useState("Basic Details");
    const { user } = useContext(UserContext);
    const router = useRouter();


    useEffect(() => {
        if (user?.isApplied) {
            router.push("/user/dashboard");
            return;
        }
    }, [user, router]);



    const [scrollPos, setScrollPos] = useState(0);
    const tabsContainerRef = useRef(null);

    
    const scrollLeft = () => {
        if (tabsContainerRef.current) {
            const newPos = Math.max(scrollPos - 160, 0);
            tabsContainerRef.current.scrollTo({
                left: newPos,
                behavior: 'smooth',
            });
            setScrollPos(newPos);
        }
    };

    const scrollRight = () => {
        if (tabsContainerRef.current) {
            const maxScroll = tabsContainerRef.current.scrollWidth - tabsContainerRef.current.clientWidth;
            const newPos = Math.min(scrollPos + 160, maxScroll);
            tabsContainerRef.current.scrollTo({
                left: newPos,
                behavior: 'smooth',
            });
            setScrollPos(newPos);
        }
    };

    const getTabIcon = (tabItem) => {
        if (tabItem === 'Basic Details' && user?.basicDetails) return <FaCircleCheck size={15} className="text-green-500" />;
        if (tabItem === 'Work Experience' && user?.workExp) return <FaCircleCheck size={15} className="text-green-500" />;
        if (tabItem === 'Employment Details' && user?.professionalDetails) return <FaCircleCheck size={15} className="text-green-500" />;
        if (tabItem === 'Skills' && user?.skills) return <FaCircleCheck size={15} className="text-green-500" />;
        if (tabItem === 'Projects' && user?.projects) return <FaCircleCheck size={15} className="text-green-500" />;
        if (tabItem === 'Equipments' && user?.equipmentDetails) return <FaCircleCheck size={15} className="text-green-500" />;
        if (tabItem === 'Licenses' && user?.licenses?.licenses.length!==0) return <FaCircleCheck size={15} className="text-green-500" />;
        if (tabItem === "Privacy Policy and T&C" && user?.acceptedCommunication & user?.acceptedTermsandPrivacy) return <FaCircleCheck size={15} className="text-green-500" />;

        if(tabItem==="Work Experience" || tabItem === "Equipments" || tabItem === "Licenses" )
            return <FaCircleCheck size={15} className="text-yellow-500  "/>
        return <RiCheckboxBlankCircleFill size={12} className="text-red-500  "/> ;
      };

      return (
        <div>
            <Navbar />




            {/* Form Main Container */}
            <div className="min-h-full px-2  ">

                {/* Tabs */}

                <div className="relative ">
                    <div
                        ref={tabsContainerRef}
                        className="h-14  border-b-2  max-sm:px-8 flex overflow-x-auto lg:px-32 text-sm tabs items-center gap-3"
                        style={{ scrollbarWidth: "none" }}>
                        {tabs?.map((tabItem, idx) =>
                            <div key={idx}
                                onClick={() => setCurrTab(tabItem)}
                                className={`p-3 flex h-full min-w-fit hover:text-blue-500 font-semibold cursor-pointer relative flex-col items-center`}>
                               <p className="flex items-center gap-2"> {tabItem }  {getTabIcon(tabItem)}</p>
                                <div className={`h-1 absolute ${currTab === tabItem ? "visible" : "hidden"} bg-blue-400 bottom-0 w-full`}></div>
                            </div>
                        )}
                    </div>
                    <FaArrowAltCircleLeft
                        onClick={scrollLeft}
                        className="absolute left-0 top-1 md:hidden  bg-white  border-2 border-blue-500  w-8 h-8 rounded-full shadow-md"
                        style={{ zIndex: 1 }}>
                        &lt;
                    </FaArrowAltCircleLeft>
                    <FaArrowAltCircleRight
                        onClick={scrollRight}
                        className="absolute right-0 top-1 md:hidden bg-white border-2 border-blue-500  w-8 h-8 rounded-full shadow-md"
                        style={{ zIndex: 1 }}>
                        &gt;
                    </FaArrowAltCircleRight>
                </div>





                {/* Form */}
                <div className="flex lg:px-[115px] overflow-x-hidden">
                    {currTab === "Basic Details" && <BasicDetails />}
                    {currTab === "Equipments" && <EquipmentDetails />}
                    {currTab === "Work Experience" && <WorkExperience />}
                    {currTab === "Employment Details" && <ProfessionalDetails />}
                    {currTab === "Skills" && <SkillsServices />}
                    {currTab === "Licenses" && <Licenses />}
                    {currTab === "Projects" && <ProjectExperience />}
                    {currTab === "Privacy Policy and T&C" && <UserConsent/>}
                    <Tooltip
                        color="black"
                        defaultOpen
                        title="👋 If you need any Support! Kindly contact us on WhatsApp. We are always ready to provide assistance."
                        placement="left"
                    >
                        <SiWhatsapp
                            // size={50}
                            onClick={() => {
                                window.open('https://wa.me/916006535445', '_blank', 'noopener,noreferrer');
                            }}
                            className="fixed max-sm:hidden lg:text-5xl duration-500 text-4xl text-green-500 cursor-pointer hover:scale-125 md:bottom-16 lg:right-20 right-4 bottom-20"
                        />

                    </Tooltip>
                </div>

            </div>
        </div>
    );
}

export default UserProfilePage;

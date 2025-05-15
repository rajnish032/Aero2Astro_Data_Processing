"use client";

import { PhoneFilled, UpOutlined, WhatsAppOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import Image from "next/image";
import hero from "../assets/hero.webp";
import dashboard from "../assets/dashboard.svg";
import hero2 from "../assets/hero.jpg";
import isot1 from "../assets/vectors/isot1.png";
import isot2 from "../assets/vectors/isot2.png";
import isot3 from "../assets/vectors/isot3.png";
import isot4 from "../assets/vectors/isot4.png";
import isot5 from "../assets/vectors/isot5.png";
import isot6 from "../assets/vectors/isot6.png";
import isot7 from "../assets/vectors/isot7.png";
import isot8 from "../assets/vectors/isot8.png";
import isot9 from "../assets/vectors/isot9.png";
import industries from "../assets/industries.png";
import cities from "../assets/cities.png";
import clients from "../assets/clients.png";
import pilot from "../assets/pilot.png";

import UserRegister from "../components/Auth/UserRegister";
//import AccordionStepper from "../components/AccordianStepper";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";
import Header from "../components/Header";
import { FaArrowRightLong } from "react-icons/fa6";
import droneicon from "../assets/droneicon.png";
import TypingEffect from "../components/TypingEffect";
import axios from "axios";
import { reqUrl } from "@/utils/constants";
import FeatureSection from "@/components/FeatureSection";

const steps = [
  {
    title: "Create an Account",
    description:
      "Register your account and credentials and get the access of Dashboard",
  },
  {
    title: "Complete your Profile",
    description:
      "Go to the Profile section and complete your profile details and get approval",
  },
  { title: "Apply and get Approved", description: "" },
];



const achiev = [
  {
    key: 1,
    title: "Industries we Covered",
    number: 12,
    img: industries,
  },
  {
    key: 2,
    title: "Clients we work",
    number: 25,
    img: clients,
  },

  {
    key: 3,
    title: "Pilots we Partnered with",
    number: 30,
    img: pilot,
  },
  {
    key: 4,
    title: "Cities we Covered",
    number: 120,
    img: cities,
  },
];

const featuresData = [
  {
    id: 1,
    title: "🚀 Work on Cutting-Edge Projects",
    description:
      "Gain access to real-world geospatial datasets and process drone imagery, LiDAR, and GIS data.",
    image: "/assests/istockphoto-1337105633-612x612.jpg",
    alt: "Capture image",
  },
  {
    id: 2,
    title: "💰 Earn Recognition & Rewards",
    description:
      "Get certified, build your reputation, and unlock high-paying opportunities.",
    image: "/assests/download (1).jpeg",
    alt: "Industry Insights",
  },
  {
    id: 3,
    title: "🌍 Be Part of an Exclusive Community",
    description:
      "Connect with top geospatial experts and collaborate on global projects.",
    image: "/assests/hannah-busing-Zyx1bK9mqmA-unsplash.jpg",
    alt: "Smart Cities",
  },
  {
    id: 4,
    title: "📈 Advance Your Career",
    description:
      "Create a verified portfolio, gain exposure, and establish credibility in the industry.",
    image: "/assests/360_F_444393374_40Fs9t5kUMHVQBx6mXpTY8eRAGo6og97.jpg",
    alt: "Smart Cities",
  },
];

const imgarr = [isot1, isot2, isot3, isot4];
const accordimgs = [isot5, isot9, isot7, isot8];

const Home = () => {
  const [currImg, setCurrImg] = useState(imgarr[0]);
  const [fade, setFade] = useState(true);
  const [openIndex, setOpenIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrImg((prev) => {
          const currentIndex = imgarr.indexOf(prev);
          return imgarr[(currentIndex + 1) % imgarr.length];
        });
        setFade(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);


  return (
    <div id="head" className="bg-[#080808] text-white">

      {/* contact header banner section */}
      <div className="sticky top-0 z-50">
        <div className="shine-div bg-[#0055d4] h-10 py-2 text-right px-4 lg:pr-20 text-white">
          <WhatsAppOutlined
            onClick={() =>
              window.open("https://wa.me/916006535445?text=Hello", "_blank")
            }
            className="text-xl cursor-pointer bg-green-500 rounded-full animate-pulse"
          />

          <a
            href="tel:+916006535445"
            className="flex items-center no-underline"
          >
            <PhoneFilled className="mx-4" />
            <p className="font-semibold">+91 6006535445</p>
          </a>
        </div>

        {/* Navbar */}

        <Header />
      </div>

      {/* Hero Section */}

      <main className="min-h-[700px] relative overflow-hidden">
        <Image
          src={hero}
          alt="Aero2Astro Gis Data Processing Network Join and Register"
          className="absolute  md:object-cover object-center  w-full h-full max-sm:h-[35%] max-sm:scale-150"
        />

        <div className="bg-black opacity-80 absolute inset-0 z-10"></div>

        <div className="relative z-20 flex flex-wrap gap-10 lg:justify-center items-center p-5">
          <div className="text-white max-w-[800px] mt-5 min-md:w-[360px] mx-auto">
            <h1 className="lg:text-6xl text-4xl leading-[55px] font-semibold">
              Aero2Astro,<span className="inline-block font-medium bg-gradient-to-r py-1 mx-2 from-green-300 to-blue-500 bg-clip-text text-transparent">
                Geospatial
              </span> Expert Network
            </h1>
            <h4 className="lg:text-4xl font- mb-10 text-gray-200 text-2xl mt-5 max-w-[650px] font">
              Collaborate, Contribute & Elevate Transform {" "}
              <div className="relative inline-block">
                <TypingEffect />
              </div>
              <br />
              <span>& </span>
              <span className="inline ">into Actionable</span>
              <span className="inline-block font-medium bg-gradient-to-r py-1 mx-2 from-pink-500 to-blue-500 bg-clip-text text-transparent">
                Intelligence
              </span>
              
            </h4>

            <a
              href="#head"
              className="bg-[#085ad5] w-[150px] py-2 text-white hover:bg-blue-600 rounded-full flex items-center gap-2 justify-center"
            >
              Join Now <FaArrowRightLong />
            </a>
          </div>

          <div
            id="form"
            className="bg-white relative min-md:w-[360px] mx-auto lg:mt-8 shadow-lg overflow-hidden p-1 rounded-lg shadow-gray-950"
          >
            <UserRegister />
          </div>
        </div>
      </main>

      {/* Facility */}
      <section className="p-3  ">
        <div className=" flex flex-wrap gap-10 my-20 justify-center items-center">
          <div className=" relative  w-[200px] h-[220px] rounded-md shadow-xl  bg-[#161615] ">
            <div className="relative pt-4  mx-auto overflow-clip flex items-center justify-center">
              <svg
                fill="#0055d4"
                className="w-24 h-24"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="-51.2 -51.2 614.40 614.40"
                xmlSpace="preserve"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth={0}>
                  <rect
                    x="-51.2"
                    y="-51.2"
                    width="614.40"
                    height="614.40"
                    rx="307.2"
                    fill="#7ed0ec"
                    strokeWidth={0}
                  />
                </g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                  <g>
                    <g>
                      <path d="M508,279.892H340c-2.212,0-4,1.792-4,4v64c0,2.208,1.788,4,4,4h168c2.212,0,4-1.792,4-4v-64 C512,281.684,510.212,279.892,508,279.892z M372.052,331.744c-8.836,0-16-7.168-16-16c0-8.836,7.164-16,16-16s16,7.164,16,16 C388.052,324.576,380.888,331.744,372.052,331.744z" />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M444,375.892v75.856c0,11.028-8.724,20.144-19.752,20.144h-404c-0.028,0-0.08,0-0.1,0C12.892,471.892,8,469.92,0,466.784 v8.96c0,19.852,16.204,36.148,36.052,36.148h420c19.848,0,35.948-16.296,35.948-36.148v-99.852H444z" />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M460,117.452V91.744c0-17.82-10.632-33.156-25.908-40.056l-9.916-42.38c-0.728-3.096-2.648-5.78-5.352-7.46 c-2.708-1.68-5.968-2.128-9.072-1.412l-201.58,47.456H44.064C19.8,47.892,0,67.48,0,91.744v50.14c0,0.608,0.22,1.296,0.22,1.932 c0,11.028,9.004,20.076,20.028,20.076c0.016,0,0.024,0,0.04,0h403.96c11.028,0,19.752,8.828,19.752,19.856v72.144h48v-96.148 C492,139.648,480,122.688,460,117.452z M44.064,71.892h61.996L24.14,91.144C24.54,80.472,33.288,71.892,44.064,71.892z M44.064,115.892c-3.468,0-6.688-1.044-9.536-2.604l369.036-86.7l20.904,89.304H44.064z" />
                    </g>
                  </g>
                  <g>
                    <g>
                      <path d="M340.052,255.892H420v-68H20.248c-0.028,0-0.08,0-0.1,0C12.892,187.892,8,185.92,0,182.784v242.984 c0,0.648,0.228,1.376,0.228,2.052c0,11.024,8.996,20.072,20.02,20.072c0.016,0,0.024,0,0.04,0H420v-72h-79.948 c-15.444,0-28.052-12.712-28.052-28.148v-64C312,268.308,324.608,255.892,340.052,255.892z" />
                    </g>
                  </g>
                </g>
              </svg>
            </div>
            <p className="max-w-[90%] mt-4 w-full text-md font-semibold text-gray-200 text-center mx-auto py-2">
              Regular Payouts with bonuses & Incentives
            </p>
          </div>

          {/* free access benefit */}

          <div className=" relative  w-[200px] h-[220px] rounded-md shadow-xl  bg-[#161615] ">
            <div className="relative  mx-auto overflow-clip flex items-center justify-center">
              <svg
                className="w-32 h-32 py-3"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 392.598 392.598"
                xmlSpace="preserve"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                  <path
                    style={{ fill: "#FFFFFF" }}
                    d="M160.517,64.905c0-23.79-19.329-43.119-43.119-43.119S74.279,41.18,74.279,64.905 s19.329,43.119,43.119,43.119S160.517,88.695,160.517,64.905z"
                  />
                  <path
                    style={{ fill: "#194F82" }}
                    d="M117.398,0c-35.75,0-64.905,29.156-64.905,64.905s29.091,64.905,64.905,64.905 s64.905-29.156,64.905-64.905S153.147,0,117.398,0z M74.279,64.905c0-23.79,19.329-43.119,43.119-43.119 s43.119,19.329,43.119,43.119s-19.329,43.119-43.119,43.119S74.279,88.695,74.279,64.905z"
                  />
                  <path
                    style={{ fill: "#56ACE0" }}
                    d="M160.517,276.558c0-34.327,15.063-65.164,38.853-86.368c-3.685-3.426-8.016-6.012-12.735-7.758 c-9.18-3.168-18.489-5.689-27.604-7.564l-31.547,79.257c-3.62,9.18-16.614,9.18-20.234,0l-31.547-79.386 c-9.18,1.875-18.489,4.396-27.604,7.564c-10.537,3.62-18.618,11.766-22.885,21.786H60.38c6.012,0,10.925,4.848,10.925,10.925 c0,6.012-4.848,10.925-10.925,10.925H21.786v19.394h17.519c6.012,0,10.925,4.848,10.925,10.925c0,6.012-4.848,10.925-10.925,10.925 H21.786v30.061h140.606C161.293,290.457,160.517,283.604,160.517,276.558z"
                  />
                  <path
                    style={{ fill: "#FFC10D" }}
                    d="M286.125,204.8c0.84,1.552,1.358,3.362,1.358,5.236v66.521c0,6.012-4.848,10.925-10.925,10.925 h-35.879c-6.012,0-10.861-4.848-10.861-10.925c0-6.012,4.848-10.861,10.861-10.861h24.954v-55.661c0-1.939,0.517-3.685,1.358-5.236 c-35.426,4.719-62.836,35.103-62.836,71.758c0,39.952,32.453,72.404,72.404,72.404c39.887,0,72.404-32.453,72.404-72.404 C348.962,239.838,321.552,209.455,286.125,204.8z"
                  />
                  <g>
                    <path
                      style={{ fill: "#194F82" }}
                      d="M276.558,160.517c-21.657,0-41.891,6.077-59.216,16.485c-6.594-6.853-14.545-11.96-23.596-15.127 c-13.317-4.655-26.764-7.952-39.952-10.02c-5.042-0.776-9.956,2.004-11.83,6.723l-24.566,62.061l-24.63-62.125 c-1.875-4.719-6.788-7.499-11.83-6.723c-13.382,2.069-26.828,5.495-39.952,10.02C16.485,170.408,0,193.875,0,220.38v87.79 c0,6.012,4.848,10.925,10.925,10.925h157.802c17.002,42.99,58.893,73.503,107.895,73.503c64,0,115.976-52.105,115.976-115.976 S340.428,160.517,276.558,160.517z M162.263,297.18H21.657v-30.061h0.129h17.519c6.012,0,10.925-4.848,10.925-10.925 c0-6.077-4.848-10.925-10.925-10.925H21.786v-19.394h38.529c6.012,0,10.925-4.848,10.925-10.925 c0-6.012-4.848-10.925-10.925-10.925H25.212c4.331-10.02,12.412-18.101,22.885-21.786c9.115-3.168,18.36-5.689,27.604-7.564 l31.547,79.386c3.62,9.18,16.614,9.18,20.234,0l31.418-79.386c9.18,1.875,18.489,4.396,27.604,7.564 c4.784,1.681,9.051,4.331,12.735,7.758c-23.79,21.269-38.853,52.105-38.853,86.368C160.323,283.604,161.099,290.457,162.263,297.18 z M276.558,370.747L276.558,370.747c-0.065,0-0.065,0-0.065,0c-51.911,0-94.19-42.279-94.19-94.19s42.279-94.19,94.19-94.19 c0,0,0,0,0.065,0c0.065,0,0,0,0.065,0c51.911,0,94.19,42.279,94.19,94.19C370.747,328.469,328.469,370.747,276.558,370.747z"
                    />
                    <path
                      style={{ fill: "#194F82" }}
                      d="M276.558,182.368L276.558,182.368c51.846,0,94.125,42.279,94.125,94.19s-42.279,94.19-94.125,94.19 c0,0,0,0,0.065,0c51.911,0,94.19-42.279,94.19-94.19C370.747,224.646,328.469,182.368,276.558,182.368z"
                    />
                    <path
                      style={{ fill: "#194F82" }}
                      d="M276.558,199.111c-6.012,0-10.925,4.848-10.925,10.925v55.661h-24.954 c-6.012,0-10.925,4.848-10.925,10.925c0,6.012,4.848,10.925,10.925,10.925h35.879c6.012,0,10.925-4.848,10.925-10.925v-66.586 C287.418,204.024,282.57,199.111,276.558,199.111z"
                    />
                  </g>
                </g>
              </svg>
            </div>

            <p className="max-w-[90%] text-md font-semibold text-gray-200 text-center mx-auto py-2">
              Flexibility to work & choice of Location{" "}
            </p>
          </div>

          <div className=" relative  w-[200px] h-[220px] rounded-md shadow-xl  bg-[#161615] ">
            <div className="relative  mx-auto overflow-clip flex items-center justify-center">
              <svg
                fill="#0055d4"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                className="w-32 h-32"
                viewBox="-25.6 -25.6 307.20 307.20"
                enableBackground="new 0 0 256 240"
                xmlSpace="preserve"
                stroke="#4d94fe"
                strokeWidth="5"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="#000c29"
                  strokeWidth="4.608"
                >
                  <path d="M127.826,39.584c10.308,0,18.7-8.392,18.7-18.7s-8.392-18.7-18.7-18.7s-18.7,8.392-18.7,18.7S117.518,39.584,127.826,39.584 z M26.21,39.584c-10.308,0-18.7-8.392-18.7-18.7s8.392-18.7,18.7-18.7s18.7,8.392,18.7,18.7S36.518,39.584,26.21,39.584z M229.79,39.584c10.308,0,18.7-8.392,18.7-18.7s-8.392-18.7-18.7-18.7c-10.308,0-18.7,8.392-18.7,18.7S219.482,39.584,229.79,39.584 z M253.966,130.048c0,3.167-4.598,95.372-4.598,95.372c0,6.998-5.398,12.396-12.396,12.396c-6.998,0-12.396-5.398-12.396-12.396 c0,0-8.617-95.972-10.995-131.806l-19.741,23.724c-1.694,2.035-4.194,3.192-6.808,3.192c-0.339,0-0.68-0.019-1.021-0.059 c-2.972-0.345-5.569-2.165-6.905-4.842l-23.665-47.388v156.056c0,7.435-5.504,13.517-12.359,13.517 c-6.855,0-12.359-6.082-12.359-13.517V138.85c0-1.352-1.159-2.511-2.511-2.511c-1.352,0-2.511,1.159-2.511,2.511v85.448 c0,7.435-5.504,13.517-12.359,13.517c-6.855,0-12.359-6.082-12.359-13.517V67.387l-24.092,48.243 c-1.336,2.677-3.933,4.497-6.904,4.842c-0.341,0.039-0.682,0.059-1.021,0.059c-2.613,0-5.114-1.157-6.808-3.192L42.419,93.614 c-2.378,35.834-10.995,131.805-10.995,131.805c0,6.998-5.398,12.396-12.396,12.396s-12.396-5.398-12.396-12.396 c0,0-4.598-92.204-4.598-95.371c0,0-0.034-71.339-0.034-71.57c0-7.97,6.091-13.605,13.605-13.605c5.692,0,10.073,1.924,14.649,6.516 c0.131,0.132,36.851,44.193,36.851,44.193c-0.062-0.074,16.261-33.095,19.507-39.002c4.344-7.903,10.612-11.71,18.6-11.765 c0.019,0,0.041-0.005,0.059-0.005c0,0,45.073,0.012,45.348,0.022c8.069-0.022,14.396,3.788,18.772,11.752 c0.091,0.157,19.506,38.998,19.506,38.998s36.714-44.061,36.854-44.196c4.473-4.689,9.55-6.513,14.645-6.513 c7.514,0,13.605,6.091,13.605,13.605C254,61.212,253.966,130.048,253.966,130.048z" />
                </g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M127.826,39.584c10.308,0,18.7-8.392,18.7-18.7s-8.392-18.7-18.7-18.7s-18.7,8.392-18.7,18.7S117.518,39.584,127.826,39.584 z M26.21,39.584c-10.308,0-18.7-8.392-18.7-18.7s8.392-18.7,18.7-18.7s18.7,8.392,18.7,18.7S36.518,39.584,26.21,39.584z M229.79,39.584c10.308,0,18.7-8.392,18.7-18.7s-8.392-18.7-18.7-18.7c-10.308,0-18.7,8.392-18.7,18.7S219.482,39.584,229.79,39.584 z M253.966,130.048c0,3.167-4.598,95.372-4.598,95.372c0,6.998-5.398,12.396-12.396,12.396c-6.998,0-12.396-5.398-12.396-12.396 c0,0-8.617-95.972-10.995-131.806l-19.741,23.724c-1.694,2.035-4.194,3.192-6.808,3.192c-0.339,0-0.68-0.019-1.021-0.059 c-2.972-0.345-5.569-2.165-6.905-4.842l-23.665-47.388v156.056c0,7.435-5.504,13.517-12.359,13.517 c-6.855,0-12.359-6.082-12.359-13.517V138.85c0-1.352-1.159-2.511-2.511-2.511c-1.352,0-2.511,1.159-2.511,2.511v85.448 c0,7.435-5.504,13.517-12.359,13.517c-6.855,0-12.359-6.082-12.359-13.517V67.387l-24.092,48.243 c-1.336,2.677-3.933,4.497-6.904,4.842c-0.341,0.039-0.682,0.059-1.021,0.059c-2.613,0-5.114-1.157-6.808-3.192L42.419,93.614 c-2.378,35.834-10.995,131.805-10.995,131.805c0,6.998-5.398,12.396-12.396,12.396s-12.396-5.398-12.396-12.396 c0,0-4.598-92.204-4.598-95.371c0,0-0.034-71.339-0.034-71.57c0-7.97,6.091-13.605,13.605-13.605c5.692,0,10.073,1.924,14.649,6.516 c0.131,0.132,36.851,44.193,36.851,44.193c-0.062-0.074,16.261-33.095,19.507-39.002c4.344-7.903,10.612-11.71,18.6-11.765 c0.019,0,0.041-0.005,0.059-0.005c0,0,45.073,0.012,45.348,0.022c8.069-0.022,14.396,3.788,18.772,11.752 c0.091,0.157,19.506,38.998,19.506,38.998s36.714-44.061,36.854-44.196c4.473-4.689,9.55-6.513,14.645-6.513 c7.514,0,13.605,6.091,13.605,13.605C254,61.212,253.966,130.048,253.966,130.048z" />
                </g>
              </svg>
            </div>

            <p className="max-w-[90%] text-md font-semibold text-gray-200 text-center mx-auto py-2">
              Community and Peer Support{" "}
            </p>
          </div>

          <div className=" relative  w-[200px] h-[220px] rounded-md shadow-xl  bg-[#161615] ">
            <div className="relative  mx-auto overflow-clip flex items-center justify-center">
              <svg
                className="w-32 h-32 py-3"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 480 480"
                xmlSpace="preserve"
                fill="#0f4b71"
                stroke="#0f4b71"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                  <g>
                    <path
                      style={{ fill: "#F1998A" }}
                      d="M96,400v32h0.376c2.544,16,17.552,31.2,35.872,31.2S165.584,448,168.12,432H168v-32H96z"
                    />
                    <path
                      style={{ fill: "#F1998A" }}
                      d="M168.128,400L168,416h0.376c2.544,16,17.552,31.2,35.872,31.2s33.336-15.2,35.88-31.2H240l-7.872-16 H168.128z"
                    />
                  </g>
                  <path
                    style={{ fill: "#34B095" }}
                    d="M265.264,400H64c-8.84,0-16-7.16-16-16V24c0-8.84,7.16-16,16-16h201.264c8.832,0,16,7.16,16,16v360 C281.264,392.84,274.096,400,265.264,400z"
                  />
                  <g>
                    <circle
                      style={{ fill: "#ECF8F6" }}
                      cx="167.144"
                      cy="203.696"
                      r="54.032"
                    />
                    <circle
                      style={{ fill: "#ECF8F6" }}
                      cx="68.288"
                      cy="28.288"
                      r="20.288"
                    />
                    <circle
                      style={{ fill: "#ECF8F6" }}
                      cx="67.712"
                      cy="379.68"
                      r="20.288"
                    />
                    <circle
                      style={{ fill: "#ECF8F6" }}
                      cx="259.712"
                      cy="28.288"
                      r="20.288"
                    />
                  </g>
                  <path d="M265.264,0H64C50.768,0,40,10.768,40,24v350.008c-0.376,1.84-0.576,3.752-0.576,5.704c0,2.2,0.312,4.32,0.792,6.384 C41.288,398.336,51.48,408,64,408h201.264C278.496,408,288,397.232,288,384V24C288,10.768,278.496,0,265.264,0z M259.712,16 C266.488,16,272,21.512,272,28.288s-5.512,12.288-12.288,12.288s-12.288-5.512-12.288-12.288S252.936,16,259.712,16z M80.576,28.288 c0,6.776-5.512,12.288-12.288,12.288S56,35.064,56,28.288S61.512,16,68.288,16S80.576,21.512,80.576,28.288z M67.712,392 c-5.544,0-10.184-3.712-11.712-8.76v-7.056c1.528-5.048,6.168-8.76,11.712-8.76c6.776,0,12.288,5.512,12.288,12.288 S74.488,392,67.712,392z M265.264,392H93.072c1.816-3.728,2.928-7.864,2.928-12.288c0-15.6-12.688-28.288-28.288-28.288 c-4.184,0-8.128,0.976-11.712,2.616V53.648c3.728,1.816,7.864,2.928,12.288,2.928c15.6,0,28.288-12.688,28.288-28.288 c0-4.424-1.112-8.56-2.928-12.288h140.696c-1.816,3.728-2.928,7.864-2.928,12.288c0,15.6,12.064,28.288,27.656,28.288 c4.944,0,12.928-1.384,12.928-3.608V384C272,388.408,269.672,392,265.264,392z" />
                  <path d="M167.144,141.664c-34.2,0-62.032,27.832-62.032,62.032s27.832,62.032,62.032,62.032s62.032-27.832,62.032-62.032 S201.344,141.664,167.144,141.664z M167.144,249.728c-25.384,0-46.032-20.648-46.032-46.032s20.648-46.032,46.032-46.032 s46.032,20.648,46.032,46.032S192.528,249.728,167.144,249.728z" />
                  <circle cx="165.888" cy="108.624" r="12.624" />
                  <circle cx="165.888" cy="60.624" r="12.624" />
                  <path
                    style={{ fill: "#F1998A" }}
                    d="M352.52,160h-70.904L280,336l-122.728-70.144l-0.264,0.408c-16.528-6.608-35.8-0.424-44.96,15.448 c-9.16,15.864-4.904,35.648,9.08,46.656l-0.264,0.448l116.032,77.424L254.4,472H440l-25.408-255.552 C411.304,184.64,384.496,160,352.52,160z"
                  />
                  <path d="M422.544,215.624C418.8,179.352,388.688,152,352.52,152h-70.904c-4.392,0-7.96,3.536-8,7.928l-1.496,162.36l-110.888-63.376 c-1.136-0.656-2.392-0.952-3.664-0.96c-19.768-6.584-41.976,1.6-52.464,19.752c-10.408,18.032-6.56,41.136,8.76,54.992 c0.6,1.08,1.456,2.032,2.552,2.768L201.16,392h-33.032c-0.024,0-0.04,0.016-0.064,0.016S168.024,392,168,392H96 c-4.416,0-8,3.584-8,8v32c0,1.288,0.336,2.496,0.92,3.576c3.96,17.896,20.688,35.624,43.336,35.624 c19.928,0,35.168-13.752,41.256-29.248c7.736,7.8,18.288,13.248,30.744,13.248c13.816,0,25.312-6.68,33.168-15.888l9.24,34.744 C247.6,477.56,250.776,480,254.4,480H440c2.256,0,4.416-0.96,5.928-2.632c1.512-1.672,2.256-3.912,2.032-6.168L422.544,215.624z M160,431.976c-2.424,11.4-13.384,23.224-27.744,23.224c-14.88,0-26.104-12.696-27.976-24.456c-0.064-0.392-0.16-0.776-0.28-1.152 V408h56V431.976z M204.256,439.2c-14.88,0-26.104-12.696-27.976-24.456c-0.064-0.376-0.152-0.736-0.264-1.088l0.048-5.656h49.072 l6.248,8.616l0.224,0.856C228.592,428.384,217.984,439.2,204.256,439.2z M260.544,464l-15.912-59.824 c-0.496-1.88-1.672-3.512-3.288-4.6l-113.696-75.864c-0.432-0.608-0.952-1.16-1.56-1.64c-11.016-8.672-14.072-24.312-7.112-36.368 c6.968-12.056,22.048-17.224,35.064-12.016c0.504,0.2,1.024,0.336,1.552,0.424l120.44,68.832c2.464,1.408,5.488,1.4,7.952-0.008 c2.464-1.416,3.992-4.024,4.016-6.864L289.544,168h62.976c27.944,0,51.2,21.176,54.104,49.24L431.168,464H260.544z" />
                  <path d="M30.336,480C13.608,480,0,466.392,0,449.664s13.608-30.336,30.336-30.336c4.416,0,8,3.584,8,8s-3.584,8-8,8 C22.432,435.336,16,441.76,16,449.664S22.432,464,30.336,464s14.336-6.432,14.336-14.336c0-4.416,3.584-8,8-8s8,3.584,8,8 C60.664,466.392,47.056,480,30.336,480z" />
                  <path d="M416,38.4c-4.416,0-8-3.584-8-8V8c0-4.416,3.584-8,8-8s8,3.584,8,8v22.4C424,34.816,420.416,38.4,416,38.4z" />
                  <path d="M416,128c-4.416,0-8-3.584-8-8V97.6c0-4.416,3.584-8,8-8s8,3.584,8,8V120C424,124.416,420.416,128,416,128z" />
                  <path d="M472,72h-22.4c-4.416,0-8-3.584-8-8s3.584-8,8-8H472c4.416,0,8,3.584,8,8S476.416,72,472,72z" />
                  <path d="M382.4,72H360c-4.416,0-8-3.584-8-8s3.584-8,8-8h22.4c4.416,0,8,3.584,8,8S386.816,72,382.4,72z" />
                  <path d="M455.6,111.6c-2.048,0-4.096-0.784-5.656-2.344l-15.84-15.84c-3.128-3.128-3.128-8.184,0-11.312s8.184-3.128,11.312,0 l15.84,15.84c3.128,3.128,3.128,8.184,0,11.312C459.688,110.816,457.648,111.6,455.6,111.6z" />
                  <path d="M392.24,48.24c-2.048,0-4.096-0.784-5.656-2.344l-15.84-15.84c-3.128-3.128-3.128-8.184,0-11.312s8.184-3.128,11.312,0 l15.84,15.84c3.128,3.128,3.128,8.184,0,11.312C396.336,47.464,394.288,48.24,392.24,48.24z" />
                  <path d="M376.4,111.6c-2.048,0-4.096-0.784-5.656-2.344c-3.128-3.128-3.128-8.184,0-11.312l15.84-15.84 c3.128-3.128,8.184-3.128,11.312,0s3.128,8.184,0,11.312l-15.84,15.84C380.496,110.816,378.448,111.6,376.4,111.6z" />
                  <path d="M439.76,48.24c-2.048,0-4.096-0.784-5.656-2.344c-3.128-3.128-3.128-8.184,0-11.312l15.84-15.84 c3.128-3.128,8.184-3.128,11.312,0s3.128,8.184,0,11.312l-15.84,15.84C443.848,47.464,441.808,48.24,439.76,48.24z" />
                </g>
              </svg>
            </div>

            <p className="max-w-[90%] text-md font-semibold text-gray-200 text-center mx-auto py-2">
              Diverse Project Opportunities
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="knowmore" className="p-3 min-h-[500px] bg-[#0a0a09]">
        <h2 className=" lg:text-7xl text-5xl text-center mt-10 ">
          <span className="inline-block font-medium bg-gradient-to-r py-1 mx-2 from-green-300 to-blue-500 bg-clip-text text-transparent">
                How It Works?
              </span>
          
        </h2>

        <div className="flex  min-h-full flex-wrap items-center justify-center lg:gap-20 gap-10 ">
          <div className="max-w-[600px] min-h-full  my-10 overflow-hidden rounded-xl flex-grow ">
            <Image
              loading="lazy"
              src={currImg}
              alt="gispilot"
              className={`transition-opacity duration-500 ${
                fade ? "opacity-100" : "opacity-0"
              } max-h-[480px] min-h-[365px] h-[480px]`}
            />

            <div className="flex items-center gap-3 justify-center my-3">
              {imgarr.map((i, id) => {
                return (
                  <div
                    key={id}
                    onClick={() => setCurrImg(i)}
                    className={`w-4 h-4 rounded-full  border border-blue-500 ${
                      i === currImg ? "bg-blue-500" : "bg-transparent "
                    }`}
                  ></div>
                );
              })}
            </div>
          </div>

          {/* Steps */}

          <div className="min-w-[300px] flex-grow max-w-[500px] p-3 mx-2 mt-14 ">
            <ol className="relative text-gray-500  border-l border-blue-500">
              {steps.map((step, index) => (
                <li key={index} className="mb-16 ml-6 ">
                  <span className="absolute flex items-center justify-center w-10 h-10 bg-blue-500 rounded-full -left-5  ring-4 ring-white dark:ring-gray-900">
                    <span className="text-white  font-bold">{index + 1}</span>
                  </span>
                  <h3 className="font-medium lg:text-3xl text-2xl my-2 leading-tight text-white mx-3">
                    {step.title}
                  </h3>
                  <p className=" mx-3 text-md">{step.description}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Benefits */}

      <section className="p-3 min-h-[500px] ">
        
        <div className="flex  min-h-full flex-wrap-reverse items-center justify-center lg:gap-20 md:gap-5 ">
          

          <div className="">
            <FeatureSection features={featuresData} />
          </div>
        </div>

        <div className=" my-10 py-5">
          <p className=" text-center font-semibold ">
            <span className="inline-block font-medium bg-gradient-to-r py-1 mx-2 from-pink-700 to-blue-500 bg-clip-text text-transparent">
                LETS&apos;S WORK TOGETHER
              </span>
            
          </p>
          <h2 className=" text-center text-4xl font-bold ">
            <span className="inline-block font-medium bg-gradient-to-r py-1 mx-2 from-green-300 to-blue-500 bg-clip-text text-transparent">
                What Are You Waiting For?
              </span>
            
          </h2>
          <a
            href="#head"
            className="btn-div shine-div  w-fit hover:bg-[#3371cf] bg-[#0e56d6] h-10 mx-auto py-6 text-xl rounded-full px-20 font-semibold my-8  text-white"
          >
            Join us
          </a>
        </div>
      </section>

      {/* Get access */}

      {/* <div className="md:pl-24 p-4 my-10  min-h-screen relative flex items-center justify-center bg-gradient-to-r from-black to-stone-900 ">
        <div className="flex flex-col md:flex-row items-center gap-10 w-full">
          <div className="text-center  md:text-left text-white flex-1">
            <h1 className="md:p-5 max-sm:py-4 text-4xl md:text-5xl font-bold mb-4">
              Get{" "}
              <span className=" inline-block bg-gradient-to-r py-1 mx-1  from-pink-500 to-blue-500 bg-clip-text text-transparent ">
                Free
              </span>{" "}
              Access to the Pilot Portfolio Management Platform
            </h1>
            <p className="text-gray-300 px-5 mb-6">
              Get lifetime free access to Create and Manage your Gis pilot
              portfolio, flight records, assets and projects in our platform
            </p>
            <a
              href="#form"
              className="bg-blue-600 mx-5 inline-block text-white py-3 px-6 rounded-lg hover:bg-blue-700"
            >
              Register For Free
            </a>
            <div className="mt-6 px-5 flex flex-col md:items-center lg:items-start gap-2 text-gray-400">
              <div className="flex md:items-center gap-2 max-sm:text-left">
                <span className="text-green-500">✓</span> Get more jobs.
              </div>
              <div className="flex md:items-center gap-2 max-sm:text-left">
                <span className="text-green-500">✓</span> Work from anywhere
                with flexible hours.
              </div>
              <div className="flex md:items-center gap-2 max-sm:text-left">
                <span className="text-green-500">✓</span> Earn good money based
                on your experience.
              </div>
            </div>
          </div>
          <div className="w-full min-h-screen flex-1 shadow-lg relative">
            <Image
              src={dashboard}
              alt="Dashboard"
              className="rounded-lg min-h-screen object-cover"
            />
          </div>
        </div>
      </div> */}

      {/* Achievments */}
      <section className="p-3 my-20 min-h-[500px] relative ">
        <div className="flex items-center flex-wrap gap-10 justify-center py-3">
          {achiev?.map((item) => (
            <div
              key={item.key}
              className="w-[300px] h-[450px] overflow-hidden rounded-lg border-2 bg-[#232320]  border-[#0a0a09] 
              bg-opacity-10  border-opacity-20 shadow-lg  backdrop-filter backdrop-blur-md"
            >
              <div className="w-full h-[300px] rounded-lg hover:scale-105 duration-700 cursor-pointer relative overflow-clip">
                <Image
                  loading="lazy"
                  src={item.img}
                  alt={item?.title}
                  className="w-full  inset-0 absolute h-full"
                />

                <div className="bg-black opacity-10 hidden absolute inset-0 z-20 w-full h-full"></div>
              </div>
              <p className="text-xl text-center mt-5 font-semibold">
                {item?.title}
              </p>
              <p className="font-bold text-6xl text-center my-5">
                {item.number}+
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <div id="testimonial">
        <Testimonials />
      </div>

      {/* FAQS */}
      <section className="p-3 min-h-[500px] my-10 mt-20" id="faqs">
        <FAQ />

        {/* Query */}
        <div
          id="contact"
          className="md:text-xl shining-border md:mx-10
                rounded-3xl  p-2 bg-[#0a0a09] border-b-[1px] border-indigo-500 min-h-14 text-center my-10 mt-20 py-3 flex justify-center gap-7 items-center"
        >
          <p>
            If You have any Query, you can contact on{" "}
            <span className="font-bold text-indigo-500">+91 6006535445 </span>{" "}
            or send a message on the{" "}
            <span className="text-green-500"> Whatsapp</span>
          </p>
          <div className="bg-green-600 w-fit h-fit rounded-full">
            <WhatsAppOutlined
              onClick={() =>
                window.open("https://wa.me/916006535445?text=Hello", "_blank")
              }
              className="text-6xl cursor-pointer "
            />
          </div>
        </div>

        <h2 className=" text-center text-4xl font-bold ">
          Be the Part of Our Family
        </h2>
        <a
          href="#head"
          className="btn-div shine-div w-fit  hover:bg-[#3371cf] bg-[#0e56d6] h-10 mx-auto py-6 text-xl rounded-full px-20 font-semibold my-8  text-white"
        >
          Join us
        </a>
      </section>

      <Footer />
      {isVisible && (
        <a
          href="#head"
          className="bg-blue-500 opacity-50 w-10 h-10 fixed bottom-12 right-10 p-2 px-3 cursor-pointer"
        >
          <UpOutlined size={25} />
        </a>
      )}
    </div>
  );
};

export default Home;

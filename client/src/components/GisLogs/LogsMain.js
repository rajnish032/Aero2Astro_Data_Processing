// "use client"
// import React, { useEffect, useState } from 'react';
// import LogModal from './components/LogModal';
// import { useRecoilState } from 'recoil';
// import { logData, gisProject } from '@/atom/states';
// import { getAllLog } from '@/routes/gisLog';
// import { CgSearch } from 'react-icons/cg';
// import { IoAdd } from 'react-icons/io5';
// import { getAllProj } from '@/routes/gisProj';
// import Cookies from 'universal-cookie';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import { reqUrl } from '@/utils/constants';
// import LogTable from './components/LogTable';
// import { Spinner } from '@nextui-org/react';
// import { verifyGisAuth } from '@/utils/verifyauth';

// const cookies = new Cookies(null, { path: '/' });

// const LogsMain = () => {
//     const [allLog, setAllLog] = useRecoilState(logData);
//     const [fileName, setFileName] = useState("");
//     const [isManual, setIsManual] = useState(true);
//     const [totalDistance, setTotalDistance] = useState(0);
//     const [totalTime, setTotalTime] = useState(0);
//     const [allProj, setAllProj] = useRecoilState(gisProject);
//     const [isOpen, setIsOpen] = useState(false);
//     const [loader, setLoader] = useState(false);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [newLogData, setNewLogData] = useState({
//         flightName: '',
//         project: '',
//         location: '',
//         flightDate: '',
//         duration: {
//             hr: 0,
//             min: 0,
//             sec: 0
//         },
//         rangeCovered: '',
//         flightType: 'linear videography',
//         flightDistance:"",
//         totalFlyTime:"",
//         projectType:"Manual"
//     });

//     const fetchLogs = async () => {
//         getAllLog(setAllLog);
//     };

//     useEffect(() => {
//         fetchLogs();
//     }, []);

//     const fetchProjects = async () => {
//         await getAllProj(setAllProj);
//     };

//     useEffect(() => {
//         fetchProjects();
//     }, []);


//     // *************************************
//     // handlers
//     const handleAddLog = async (e) => {
//         e.preventDefault();
//         const token = cookies.get('auth');
//         if (!token)
//             return toast.error('You are unauthorized. Kindly login!');

//         if(!validateFlightName(newLogData.flightName)){
//             return;
//         }
//         try {
//             setLoader(true);
//             const updatedLogData = {
//                 ...newLogData,
//                 flightDistance: totalDistance,
//                 totalFlyTime: totalTime,
//                 projectType: isManual ? "Manual" : "Autonomous"
//             };
//             console.log(updatedLogData)
//             const response = await axios.post(`${reqUrl}/gis/log/new`, { data: updatedLogData }, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                   },
//                   withCredentials: true,
//             });
//             toast.success('Log Added');
//             setNewLogData({
//                 flightName: '',
//                 project: '',
//                 location: '',
//                 flightDate: '',
//                 duration: {
//                     hr: 0,
//                     min: 0,
//                     sec: 0
//                 },
//                 rangeCovered: 0,
//                 flightType: 'linear videography',
//             });
//             setTotalDistance(0);
//             setTotalTime(0)
//             await getAllLog(setAllLog);
//         } catch (error) {
//             console.log(error);
//             toast.error(error?.response?.data?.message || 'Could not project. Try again!');
//         } finally {
//             setLoader(false);
//             setIsOpen(false);
//             setIsManual(true)
//         }
//     };

//     const handleDeleteLog = async (id) => {
//         if (window.confirm('Are you sure you want to delete this?')) {
//             try {
//                 setLoader(true);
//                 const token = cookies.get('auth');
//                 await axios.delete(`${reqUrl}/gis/delete/log/${id}`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                       },
//                       withCredentials: true,
                  
//                 });
//                 toast.success('Deleted Successfully');
//                 await getAllLog(setAllLog);
//             } catch (error) {
//                 console.log(error)
//                 toast.error('Something went wrong');
//             } finally {
//                 setLoader(false);
//             }
//         }
//     };

//     const handleFileUpload = async (event) => {
//         if (event.target.files.length === 0) {
//           return; 
//         }
      
//         const file = event.target.files[0]; 
//         setTotalDistance(0);
//         setTotalTime(0);
      
//         const formData = new FormData();
//         formData.append('file', file);
      
//         try {
//           const response = await axios.post(`${reqUrl}/gis/uploadlogfile`, formData, {
//             headers: {
//               'Content-Type': 'multipart/form-data',
//             },
//           });
//           const flightInfo = response.data.infos;
//           console.log(flightInfo);
//           setNewLogData((prevData) => ({
//             ...prevData, 
//             flightName: formatFlightName(file.name), 
//           }));
//           setTotalDistance(flightInfo.totalDistance);
//           setTotalTime(flightInfo.totalTime);
      
//         } catch (error) {
//           console.error('There was an error uploading the file', error);
//         }
//       };

//     // *************************************
//     //   format flightname name
//     const formatFlightName = (fileName) => {
//         const regex =  /DJIFlightRecord_(\d{4})-(\d{2})-(\d{2})_\[(\d{2})-(\d{2})-(\d{2})\]/;
//         const match = fileName.match(regex);
      
//         if (!match) {
//           toast.warning("Invalid file name format");
//           return null;
//         }
      
//         const [, year, month, day, hour, minute, second] = match;
//         const formattedName = `DJI-${day}${month}${year.slice(-2)}-${hour}${minute}${second}`;
//         return formattedName;
//       };
//     //   check flightname name
//     const validateFlightName = (flightName) => {
//         if (!flightName || flightName.trim() === "") {
//           toast.warning("Flight name cannot be empty.");
//           return false;
//         }

//         const flightNameRegex = /^DJI-\d{6}-\d{6}$/;
      
//         if (!flightNameRegex.test(flightName)) {
//           toast.warning(
//             "Invalid flight name format."
//           );
//           return false;
//         }
      
//         return true;
//       };

//     const filteredLogs = allLog?.filter(log =>
//         log.flightName.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     return (
//         !allLog ? 
//         <div className='flex items-center justify-center h-[300px]'>
//             <Spinner /> 
//         </div>
//         :
//         <div className="rounded-md shadow relative bg-white p-2 lg:p-4">
//             <LogModal isOpen={isOpen} setIsOpen={setIsOpen} loading={loader} setData={setNewLogData}
//                 data={newLogData} handleSubmit={handleAddLog} handleFileUpload={handleFileUpload} flightTime={totalTime} flightDistance={totalDistance} setTotalDistance={setTotalDistance} setTotalTime={setTotalTime} setIsManual={setIsManual} isManual={isManual} />

//             <div className="flex items-center px-2 justify-between mt-2">
//                 <div className='flex items-center'>
//                     <CgSearch className='text-gray-500 text-xl' />
//                     <input
//                         type="text"
//                         placeholder="Search by Name"
//                         className="flex-1 text-tiny md:text-sm outline-none rounded px-3 w-full md:w-1/2"
//                         value={searchTerm}
//                         onChange={(e) => setSearchTerm(e.target.value)}
//                     />
//                 </div>

//                 <button onClick={() => setIsOpen(true)} className="bg-blue-500 text-tiny hover:bg-blue-700 min-w-fit text-white flex items-center gap-1 px-3 py-1 md:text-sm rounded">
//                     <span className='max-sm:hidden'>Add New</span> <IoAdd />
//                 </button>
//             </div>

//             <div className='bg-white my-5 p-2 rounded-lg'>
//                 <LogTable handleDeleteLog={handleDeleteLog} allLogs={filteredLogs} setAllLogs={setAllLog} />
//             </div>
//         </div>
//     );
// }

// export default LogsMain;

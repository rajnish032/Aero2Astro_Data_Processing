// "use client"
// import React, { useState } from 'react';
// import LogTable from '../GisLogs/components/LogTable';
// import { useRecoilState } from 'recoil';
// import { logData, gisData } from '@/atom/states';
// import { toast } from 'react-toastify';
// import { getAllLog } from '@/routes/gisLog';
// import { GrEdit } from "react-icons/gr";
// import { MdFlightTakeoff } from "react-icons/md";
// import Cookies from 'universal-cookie';
// import { reqUrl } from '@/utils/constants';
// import { Spinner } from '@nextui-org/react';
// import axios from 'axios';
// import Link from 'next/link';
// const cookies = new Cookies(null, { path: '/' });

// const FlightRecords = ({className=""}) => {
//     const [flightData, setFlightData] = useState('')
//     const [allLogs, setAllLogs] = useRecoilState(logData)
//     const [currentUser, setCurrentUser] = useRecoilState(gisData);
//     const [loader, setLoader] = useState(false);
    
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
//                 await getAllLog(setAllLogs);
//             } catch (error) {
//                 console.log(error)
//                 toast.error('Something went wrong');
//             } finally {
//                 setLoader(false);
//             }
//         }
//     };
//     return (
//         <div className='bg-white relative  p-3 shadow rounded-md min-h-72 h-72'>
//              <h2 className="text-lg flex items-center justify-between gap-2 border-b font-bold px-5 rounded-sm inset-x-0 py-1 bg-gradient-to-r from-green-300 to-blue-500 text-gray-900 text-sm md:text-xl text-center">
//         <span className="inline-flex gap-2 items-center">
//           <MdFlightTakeoff className="w-fit text-lg" /> Flight Records
//         </span>
//         <Link
//           href={`/gis/logs/${currentUser?.fullName
//             .toLowerCase()
//             .replace(" ", "-")}`}
//         >
//           <GrEdit className="text-md cursor-pointer text-white hover:text-black" />
//         </Link>
//       </h2>
           

//            { loader?
//            <div className='flex items-center justify-center p-3'>
//             <Spinner/>

//            </div>
//            :
//            <div className='mt-5'>

//                 {
//                     allLogs?.length !== 0 || allLogs ? <div>
//                         <LogTable className={`${className}`}  handleDeleteLog ={handleDeleteLog} allLogs={[...allLogs]?.reverse()?.slice(0,5)?.reverse()} setAllLogs={setAllLogs} />
//                     </div>
//                         :
//                         <>
//                             <img src="https://ik.imagekit.io/d3kzbpbila/thejashari_uflabwVd8" alt="not available" className='mx-auto' />
//                             <p className='opacity-70 text-center'>No Data Available</p>
//                         </>

//                 }

//             </div>
// }

//         </div>
//     );
// }

// export default FlightRecords;

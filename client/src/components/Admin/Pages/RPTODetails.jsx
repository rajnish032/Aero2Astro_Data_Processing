// "use client";
// import React, { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import axios from "axios";
// import { CiSearch } from "react-icons/ci";
// import { MdOutlineNavigateNext } from "react-icons/md";
// import { GrFormPrevious } from "react-icons/gr";
// import { FaUsers } from "react-icons/fa";
// import { IoStatsChartSharp } from "react-icons/io5";
// import { FaRegHandshake } from "react-icons/fa";
// import { BsBan } from "react-icons/bs";
// import { MdOutlinePendingActions } from "react-icons/md";
// import StatWidget from "../components/StatWidget";
// import GridView from "../components/GridView";
// import Cookies from "universal-cookie";
// import { requestUrl } from "@/utils/constants";
// import Card from "../components/Card";
// const cookies = new Cookies(null, { path: "/", sameSite: 'lax' })
// const RPTODetails = () => {
//   const { id } = useParams(); // Get RPTO ID from URL
//   const router = useRouter();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [res, setRes] = useState({});
//   const [allUsers, setAllUsers] = useState([]);
//   const [dataLoading, setDataLoading] = useState(false);
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     if (id) fetchRptoUsers();
//   }, [id, page, searchQuery]);

//   async function fetchRptoUsers() {
//     const adauth = cookies.get("adauth");
//     if (!adauth) router.push("/admin/login");

//     try {
//       setDataLoading(true);
//       const params = new URLSearchParams({
//         page,
//         limit: 15,
//       });

//       if (searchQuery.trim() !== "") {
//         params.append("fullName", searchQuery);
//       }

//       const response = await axios.get(
//         `${requestUrl}/admin/rpto/${id}/users?${params.toString()}`,
//         {
//           headers: {
//             adauth: adauth,
//           },
//           withCredentials: true,
//         }
//       );

//       setRes(response.data);
//       setAllUsers(response.data.users);
//       setDataLoading(false);
//     } catch (error) {
//       setDataLoading(false);
//     }
//   }

//   return (
//     <div className="md:p-5 py-5 relative">
//       <h1 className="font-bold text-3xl text-center bg-white rounded-full shadow p-4 text-gray-600">
//         RPTO Users
//       </h1>

//       {/* Stat Widgets */}
//       <div className="flex items-center justify-center gap-5 md:gap-4 flex-wrap my-10 md:my-4 md:p-2">
//         <StatWidget
//           title={"Total"}
//           value={res?.stats?.numberOfGis||0}
//           icon={<FaUsers size={30} className="text-white" />}
//         />
//         <StatWidget
//           title={"Applied"}
//           value={res?.stats?.numberOfAppliedUsers||0}
//           icon={<IoStatsChartSharp size={30} className="text-white" />}
//         />
//         <StatWidget
//           title={"Review Pending"}
//           value={
//             res?.stats?.numberOfAppliedUsers - res?.stats?.numberOfApprovedUser || 0
//           }
//           icon={<MdOutlinePendingActions size={30} className="text-white" />}
//         />
//         <StatWidget
//           title={"Approved"}
//           value={res?.stats?.numberOfApprovedUser||0}
//           icon={<FaRegHandshake size={30} className="text-white" />}
//         />
//         <StatWidget
//           title={"Rejected"}
//           value={res?.stats?.numberOfRejectedUser||0}
//           icon={<BsBan size={30} className="text-white" />}
//         />
//       </div>

//       {allUsers.length>0&&<div className="flex justify-between gap-10 my-10 px-2 md:px-10">
//         <div className="flex items-center gap-2 px-2">
//           <div className="bg-white gap-3 items-center px-2 border pr-5 flex rounded-full">
//             <CiSearch size={20} />
//             <input
//               type="text"
//               name="query"
//               placeholder="Search by Name"
//               className="outline-none h-8 flex-grow"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//         </div>
//       </div>}

//       {/* Users List */}
//       <div>
//         {!dataLoading&&( allUsers?.length>0?allUsers?.map((item) => <Card key={item._id} item={item} />):<p className="text-center mt-40">This RPTO has not registered any users yet.</p>)}
//       </div>

//       {!dataLoading && (
//         allUsers?.length>0&&
//         <div className="w-full justify-between items-center px-2 flex">
//           <div>{`Page ${page} of ${res?.totalPages}`}</div>

//           <div className="flex gap-3">
//             <button
//               disabled={page <= 1}
//               onClick={() => setPage(page - 1)}
//               className={`bg-white px-2 py-1 ${
//                 page <= 1 ? "cursor-not-allowed" : ""
//               } rounded-md shadow-md flex items-center gap-0.5`}
//             >
//               <GrFormPrevious className="text-lg" />
//               Prev
//             </button>
//             <button
//               disabled={page >= res?.totalPages}
//               onClick={() => setPage(page + 1)}
//               className={`bg-white px-2 py-1 ${
//                 page >= res?.totalPages ? "cursor-not-allowed" : ""
//               } rounded-md shadow-md flex items-center gap-0.5`}
//             >
//               Next
//               <MdOutlineNavigateNext className="text-lg" />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RPTODetails;

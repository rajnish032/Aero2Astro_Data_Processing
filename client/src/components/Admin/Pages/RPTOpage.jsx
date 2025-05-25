// "use client";
// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import Cookies from "universal-cookie";
// import { toast } from "react-hot-toast";
// import { requestUrl } from "@/utils/constants";
// import { DataContext } from "@/Contexts/Admin";
// const cookies = new Cookies(null, { path: "/", sameSite: 'lax' })
// import { MdEmail } from "react-icons/md";
// import { FaPhone } from "react-icons/fa6";
// import { FaUser } from "react-icons/fa";
// import { IoLocation } from "react-icons/io5";
// const RPTOPage = () => {
//   const [inviteEmail, setInviteEmail] = useState("");
//   const { rptos } = useContext(DataContext) || {};
//   const router = useRouter()
//   const inviteRtps = async () => {
//     if (!inviteEmail.trim()) return alert("Please enter a valid email");

//     const adauth = cookies.get("adauth");
//     if (!adauth) {
//       router.replace("/admin/login");
//       return;
//     }

//     try {
//       const res = await axios.post(
//         `${requestUrl}/rpto/inviteRPTO`,
//         { email: inviteEmail.trim() },
//         {
//           headers: { 'adauth': adauth },
//           withCredentials: true,
//         }
//       );
//       console.log(res)
//       toast.success(res.data.message || "Invitation sent successfully!");
//       setInviteEmail("");
//     } catch (error) {
//       console.error("Error sending invitation:", error);
//       toast.error(
//         error.response?.data?.error || "Failed to send invitation. Please try again."
//       );
//     }
//   };


//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <div className="mb-6 p-4 bg-white rounded-md shadow-md">
//         <h2 className="text-xl font-semibold mb-3">Invite RPTO</h2>
//         <div className="flex gap-2">
//           <input
//             type="email"
//             value={inviteEmail}
//             onChange={(e) => setInviteEmail(e.target.value)}
//             placeholder="Enter RPTO email..."
//             className="w-10/12 p-2 border border-gray-300 rounded-md"
//           />
//           <button
//             onClick={inviteRtps}
//             className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
//           >
//             Send Invite
//           </button>
//         </div>
//       </div>

//       {/* RTPS List Section */}
//       <div className="w-ful">

//         <h2 className="text-2xl font-bold text-center py-10">RPTO Accounts</h2>


//         {rptos?.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//             {rptos?.map((rpto) => (
//               <div
//                 key={rpto._id}
//                 className="bg-white px-6 py-4 shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition duration-300"
//               >
//                 <h2 className="text-xl text-center underline font-bold text-gray-900">{rpto.companyName}</h2>

//                 <div className="mt-3 flex flex-col gap-1 text-gray-700">
//                   <p className="flex gap-1 items-center"><span className="font-medium"><MdEmail/></span> {rpto.email}</p>
//                   <p className="flex gap-1 items-center"><span className="font-medium"><FaPhone/></span> {rpto.mobile}</p>
//                   <p className="flex gap-1 items-center"><span className="font-medium"><FaUser/></span> {rpto.contactPerson}-{rpto.contactPersonDesignation}</p>
//                   <p className="flex gap-1 items-center">
//                     <IoLocation/> {rpto.city}, {rpto.state}
//                   </p>
//                 </div>
//                 <div className="mt-4">
//                   <button
//                     onClick={() => router.push(`/admin/rpto/${rpto._id}`)}
//                     className="bg-slate-800 text-sm font-bold text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition"
//                   >
//                     View
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center text-gray-500">No RPTO Account Found</div>
//         )}
//       </div></div>

//   );
// };

// export default RPTOPage;

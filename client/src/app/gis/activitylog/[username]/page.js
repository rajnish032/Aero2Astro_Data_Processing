"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { reqUrl } from "@/utils/constants";
import Header from "@/components/commons/Header";
import { Spinner } from "@nextui-org/react";
import GisSideBar from "@/components/commons/GisSideBar";

const cookies = new Cookies(null, { path: "/" });

export default function ActivityLog() {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const logsPerPage = 10;
  const [loading, setLoading] = useState(true);

  const fetchLogs = async (page) => {
    try {
      setLoading(true);
      const token = cookies.get("auth");
      if (!token) throw new Error("No authentication token found");

      const response = await axios.get(`${reqUrl}/user/details/getLogs`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { page, limit: logsPerPage },
      });

      setLogs(response.data.logs);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching logs:", error);
      setError("Failed to load logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs(currentPage);
  }, [currentPage]);

  return (
    <div className="flex">
      <GisSideBar />
      <div className="flex flex-col flex-1 overflow-y-auto h-screen">
        <Header />
        <div className="bg-gray-100 h-full p-7 max-md:p-5 max-sm:px-1 max-sm:pt-4">
          {/* <h1 className="text-lg md:text-2xl font-semibold mb-5 opacity-70 max-sm:px-3">
            Activity Log
          </h1> */}
          <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
            {loading ? (
              <div className="flex items-center justify-center h-40">
                <Spinner />
              </div>
            ) : logs.length === 0 ? (
              <div className="text-center text-sm">No Records found</div>
            ) : (
              <div className="w-full">
                <div className="sticky top-0 text-tiny md:text-sm grid md:grid-cols-2 grid-cols-2 gap-3 bg-stone-800 text-white font-medium md:rounded-t p-2">
                  <div className="text-left">Action</div>
                  <div>Time</div>
                </div>
                {logs.map((log) => (
                  <div key={log._id} className="grid md:grid-cols-2 grid-cols-2 gap-3 p-2 border-b border-gray-300">
                    <div>{log.action}</div>
                    <div>{new Date(log.timestamp).toLocaleString()}</div>
                  </div>
                ))}
                <div className="flex items-center justify-between p-3">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    className="bg-blue-500 px-4 py-1 rounded-full hover:bg-blue-700 text-white text-sm font-semibold disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="text-sm">Page {currentPage} of {totalPages}</span>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    className="bg-blue-500 px-4 py-1 rounded-full hover:bg-blue-700 text-white text-sm font-semibold disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client"

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { requestUrl } from "../utils/constants";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";
import { toast } from "react-hot-toast";
const cookies = new Cookies(null, { path: "/", sameSite: 'lax' })

const DataContext = createContext();

const RPTODataProvider = ({ children }) => {
  const [rpto, setRpto] = useState(null);
  const router = useRouter();
  const [allUsers, setAllUsers] = useState([]);
  const [res, setRes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [dataLoading, setDataLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('');
  const [fileLoading, setFileLoading] = useState(false)

  // LogOut
  async function handleLogout() {
    if (!confirm("Are You Sure to Log out?"))
      return;
    else {
      setLoading(true);
      try {
        cookies.remove('rptoauth');
        setRpto(null);
        router.push("/rpto/login");
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
  }


  //fetch all Users
  async function fetchUsers() {
     const rptoauth = cookies.get("rptoauth")

    if (!rptoauth)
      router.push("/rpto/login");

    try {
      setDataLoading(true);
      const params = new URLSearchParams({
        page,
        limit: 15,
      });
      if (searchQuery.trim() !== "") {
        params.append("fullName", searchQuery);
      }
      const response = await axios.get(`${requestUrl}/user/rpto/all?${params.toString()}`, {
        headers: {
          'rptoauth': rptoauth
        },
        withCredentials: true
      });
      setRes(response.data);
      setAllUsers(response.data.users);
      setDataLoading(false);
    } catch (error) {
      setDataLoading(false);
    }
  }



  // Handle file upload
  const handleFileUpload = async (file) => {
  
    const rptoauth = cookies.get("rptoauth");

    if (!rptoauth) {
      router.push("/rpto/login");
      return;
    }

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const toastId = toast.loading("Please Wait...")
    setFileLoading(true)

    try {
      const response = await axios.post(
        `${requestUrl}/user/rpto/upload-users`,
        formData,
        {
          headers: {
            rptoauth,
          },
          withCredentials: true,
        }
      );
      toast.dismiss(toastId)
      toast.success(response.data.message || "Users Created");
      await fetchUsers()
    } catch (error) {
      toast.dismiss(toastId)
      console.error("Error uploading file:", error);
      toast.error(error.response?.data?.message || "Failed to upload file");
    }finally{
      setFileLoading(false)
    }
  };




  useEffect(() => {
    fetchUsers();

  }, [page]);


  useEffect(() => {
    const delayFetch = setTimeout(() => {
      fetchUsers();
    }, 500);

    return () => clearTimeout(delayFetch);
  }, [searchQuery]);

  useEffect(() => {
    async function fetchData() {
      const rptoauth = cookies.get("rptoauth")

      if (!rptoauth)
        router.push("/rpto/login");
      setLoading(true);
      try {
        const rptoResponse = await axios.get(`${requestUrl}/rpto/detail`, {
          headers: {
            'rptoauth': rptoauth
          },
          withCredentials: true
        });

        setRpto({
          email: rptoResponse.data.rpto.email
        });

        setLoading(false);
      } catch (error) {
        router.push("/rpto/login");
        setLoading(false);
      }
    }

    fetchData();


  }, []);

  return (
    <DataContext.Provider
      value={{
        rpto,
        allUsers,
        res,
        loading,
        handleLogout,
        fetchUsers,
        setPage,
        page,
        setSearchQuery,
        searchQuery,
        dataLoading,
        handleFileUpload,
        fileLoading
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, RPTODataProvider, };

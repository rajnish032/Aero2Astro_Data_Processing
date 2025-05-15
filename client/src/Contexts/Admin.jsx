"use client"

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { requestUrl } from "../utils/constants";
import { useRouter } from "next/navigation";
import Cookies from "universal-cookie";
import { toast } from "react-hot-toast";
const cookies = new Cookies(null, { path: "/", sameSite: 'lax' })

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const router = useRouter();
  const [allUsers, setAllUsers] = useState([]);
  const [allNewUsers, setAllNewUsers] = useState([]);
  const [rptos, setRptos] = useState([]);
  const [res, setRes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [dataLoading, setDataLoading] = useState(false)
  const [filters, setFilters] = useState({
    haveEquipments: false,
    notHavingEquipments: false,
    haveWorkExp: false,
    haveLicense: false,
    status: "all",
    isApplied: false,
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [newSearchQuery, setNewSearchQuery] = useState('');

  // LogOut
  async function handleLogout() {
    if (!confirm("Are You Sure to Log out?"))
      return;
    else {
      setLoading(true);
      try {
        cookies.remove('adauth');
        setAdmin(null);

        router.push("/admin/login");
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
  }


  //fetch all Users
  async function fetchUsers() {
    const adauth = cookies.get("adauth")

    if (!adauth)
      router.push("/admin/login");

    try {
      setDataLoading(true);
      const params = new URLSearchParams({
        page,
        limit: 15,
        ...filters,
      });
      if (searchQuery.trim() !== "") {
        params.append("fullName", searchQuery);
      }
      const response = await axios.get(`${requestUrl}/user/all?${params.toString()}`, {
        headers: {
          'adauth': adauth
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

  // fetch New Users
  async function fetchNewUsers() {
    const adauth = cookies.get("adauth")

    if (!adauth)
      router.push("/admin/login");
    try {
      setDataLoading(true);
      const params = new URLSearchParams();
      if (newSearchQuery.trim() !== "") {
        params.append("fullName", newSearchQuery);
      }
      const response = await axios.get(`${requestUrl}/user/all/new?${params.toString()}`, {
        headers: {
          'adauth': adauth
        },
        withCredentials: true
      });
      setAllNewUsers(response.data);
      setDataLoading(false);
    } catch (error) {
      setDataLoading(false);
    }
  }

  //fetch RPTOS
  async function fetchRptos() {
    const adauth = cookies.get("adauth")
    if (!adauth)
      router.push("/admin/login");

    try {
      const response = await axios.get(`${requestUrl}/rpto/getRpto`, {
        headers: {
          'adauth': adauth
        },
        withCredentials: true
      });
      setRptos(response.data.rptos);
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    fetchUsers();

  }, [page, filters]);

  useEffect(() => {
    const delayFetch = setTimeout(() => {
      fetchNewUsers();
    }, 500);
    return () => clearTimeout(delayFetch);
  }, [newSearchQuery]);


  useEffect(() => {
    const delayFetch = setTimeout(() => {
      fetchUsers();
    }, 500);

    return () => clearTimeout(delayFetch);
  }, [searchQuery]);

  useEffect(() => {
    async function fetchData() {
      const adauth = cookies.get("adauth")

      if (!adauth)
        router.push("/admin/login");
      setLoading(true);
      try {
        const adminResponse = await axios.get(`${requestUrl}/admin/detail`, {
          headers: {
            'adauth': adauth
          },
          withCredentials: true
        });

        setAdmin({
          email: adminResponse.data.admin.email
        });

        setLoading(false);
      } catch (error) {
        router.push("/admin/login");
        setLoading(false);
      }
    }

    fetchData();

    fetchRptos();


  }, []);

  return (
    <DataContext.Provider
      value={{
        admin,
        allUsers,
        res,
        loading,
        handleLogout,
        fetchUsers,
        setPage,
        setFilters,
        allNewUsers,
        filters,
        page,
        setSearchQuery,
        searchQuery,
        dataLoading,
        newSearchQuery,
        setNewSearchQuery,
        rptos
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider, };

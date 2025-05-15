"use client"

import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { requestUrl } from '../utils/constants';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    const userAuth = cookies.get('auth');
   
    if (!userAuth) {

        router.push("/gis/login");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(`${requestUrl}/user/get`, 
        {
          headers: {
            Authorization: `Bearer ${userAuth}`,
          },
         withCredentials: true 
        }
      );
      if(user?.status == "approved"){
        console.log("Userprofilepage user1 : ", user)
            router.push(`/gis/dashboard/${user?.fullName?.toLowerCase().replace(' ', '-')}`);
        }else if (user?.isApplied) {
            console.log("Userprofilepage user2 : ", user)
            router.push("/user/dashboard");
        }

      setUser(response.data);
      setLoading(false);

    } catch (error) {
        router.push("/gis/login");
      setLoading(false);

    }
  };
  const handleApplyApproval = async () => {
    const userAuth = cookies.get('auth');
    if (!userAuth) router.push("/gis/login");
    try {
      if (user?.isApplied) {
        toast.error("Already Applied");
        return;
      }
  
        if (user?.basicDetails && user?.skills && user?.projects && user?.professionalDetails ) {
          await axios.get(`${requestUrl}/user/approval`,
          
              {
                headers: {
                  Authorization: `Bearer ${userAuth}`,
                },
               withCredentials: true 
              }
          );
          toast.success("Applied Successfully! We will connect you soon")
          fetchUserDetails()
          router.push("/user/dashboard");
        }
        else {
          toast.error("Kindly Complete the Form and Try Again!");
        }
      
    } catch (error) {
      toast.error("Could not Apply Try Again!");
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, fetchUserDetails, handleApplyApproval, loading }}>
      {children}
    </UserContext.Provider>
  );
};

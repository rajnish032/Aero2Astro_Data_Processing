"use client"

import { useContext, useState } from 'react';

import { Button, Spin } from 'antd';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserContext } from '../../../../Contexts/User';
import { requestUrl } from '../../../../utils/constants';
import Cookies from 'universal-cookie';
const cookies = new Cookies(null, { path: '/' ,sameSite:'lax'});

const ProjectsCards = () => {
  const { user, fetchUserDetails } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const handleDeleteWork = async (id) => {
    if (confirm("Are you sure you want to delete this Project Experience?")) {
      try {
        setLoading(true);
        const userAuth = cookies.get('auth');
        await axios.delete(`${requestUrl}/user/details/project/${id}`, {
          headers:{
           Authorization:`Bearer ${userAuth}`
          },
          withCredentials: true });
        toast.success("Deleted Successfully");
        fetchUserDetails(); 
      } catch (error) {
        toast.error("Could not delete. Try again!");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className='flex items-start flex-wrap gap-10 md:p-5 p-1 mx-auto '>
       {loading && <div className='absolute flex items-center justify-center inset-0 z-20 bg-white opacity-50'>
        <Spin size={30} className='' />  </div>
      }
      {user?.projects?.projects?.length === 0 || !user?.projects ? (
        <p className='text-center italic text-sm'>No projects Added...</p>
      ) : (
        user?.projects?.projects?.map((item) => (
        
              <div key={item._id}  className="max-w-sm p-6 max-sm:mx-auto  border-b-4  border-b-indigo-500 relative bg-white border w-[270px] md:w-[300px] h-[300px] overflow-hidden  border-gray-200 rounded-lg shadow  ">
             
                <h5 className="mb-2 text-xl  break-all text-center font-bold tracking-tight ">
                 {item?.clientName}
                </h5>
            
              <p className="mb-3  break-all  font-normal text-center">
              {item?.projectDesc }
              </p>
              <div className='flex gap-5 mt-8 justify-between'>
    
              <p>From: {item?.startMon}</p>
              <p>To : {item?.endMon}</p>
              </div>
    
              <div className='mt-5 absolute bottom-3 w-full right-0 left-0'>
              <a
                href={ item?.image }
                className=" w-[80%] mx-auto block items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
              >
                View File
              </a>
              <Button
                  onClick={() => handleDeleteWork(item._id)}
                  className='bg-red-500 mx-auto my-3 block text-white w-[80%] font-bold'
                  disabled={loading}
                  >
                  {"Delete "}
                </Button>
                  </div>
    
            </div>
        ))
      )}
    </div>
  );
};

export default ProjectsCards;

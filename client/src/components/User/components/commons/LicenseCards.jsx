"use client"

import { useContext, useState } from 'react';

import { Button, Spin } from 'antd';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserContext } from '../../../../Contexts/User';
import { requestUrl } from '../../../../utils/constants';
import Cookies from 'universal-cookie';
const cookies = new Cookies(null, { path: '/' ,sameSite:'lax'});


const LicenseCards = () => {
  const { user, fetchUserDetails } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const handleDeleteWork = async (id) => {
    if (confirm("Are you sure you want to delete this License?")) {
      try {
        setLoading(true);
        const userAuth = cookies.get('auth');
        await axios.delete(`${requestUrl}/user/details/licenses/${id}`, {
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
    <div className='flex items-start flex-wrap gap-10 md:p-5 p-1  '>
      {loading && <div className='absolute flex items-center justify-center inset-0 z-20 bg-white opacity-50'>
        <Spin size={30} className='' />  </div>
      }
      {user?.licenses?.licenses?.length === 0 || !user?.licenses ? (
        <p className='text-center italic text-sm'>No license Added...</p>
      ) : (
        user?.licenses?.licenses?.map((item) => (

          <div key={item._id} className="max-w-sm p-6 border-b-4  border-b-indigo-500 relative bg-white border w-[270px] md:w-[300px] h-[350px] overflow-hidden  border-gray-200 rounded-lg shadow  ">
            <div className='bg-indigo-500 rounded-3xl text-white w-fit px-3 relative bottom-3 text-center text-xs py-1 '>
              {item?.licenseName}
            </div>
            <h5 className="mb-2 text-xl  break-all text-center font-bold tracking-tight ">
              {item?.gisName}
            </h5>
             
          <p className="mb-3 break-all  font-normal text-center">
          {item?.licenseNumber}
          </p>

            <p className="mb-3  break-all flex gap-3 flex-wrap justify-between  font-normal text-center">
              Class UAS: <p>{item?.classUas}</p>
            </p>
            <p className="mb-3  break-all flex gap-3 flex-wrap justify-between  font-normal text-center">
              Issued On: <p>{item?.dateOfIssuance}</p>
            </p>
           


            <div className='mt-5 absolute bottom-3 w-full right-0 left-0'>
              <a
                href={item?.image}
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

export default LicenseCards;

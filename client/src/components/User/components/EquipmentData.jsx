"use client"

import { useContext, useState } from 'react';
import { UserContext } from "../../../Contexts/User";
import { Button, Spin } from 'antd';
import { requestUrl } from '../../../utils/constants';
import axios from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'universal-cookie';
const cookies = new Cookies(null, { path: '/' ,sameSite:'lax'});

const EquipmentData = () => {
  const { user, fetchUserDetails } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const handleDeleteEquipment = async (id) => {
    if (confirm("Are you sure you want to delete this equipment?")) {
      try {
        setLoading(true);
        const userAuth = cookies.get('auth');
        await axios.delete(`${requestUrl}/user/details/equipment/${id}`, {
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
    <div className='flex items-start gap-4 p-2'>
      {loading && <div className='absolute flex items-center justify-center inset-0 z-20 bg-white opacity-50'>
        <Spin size={30} className='' />  </div>
      }
      {user?.equipmentDetails?.equipments?.length === 0 || !user?.equipmentDetails ? (
        <p className='text-center max-w-[200px] italic text-sm'>No Equipments Added...</p>
      ) : (
        user?.equipmentDetails?.equipments?.map((item) => (


          <div key={item._id} className="max-w-sm p-6  border-b-4  border-b-indigo-500 relative bg-white border w-[270px] md:w-[300px] h-[300px] overflow-hidden  border-gray-200 rounded-lg shadow  ">

            <h5 className="mb-2 text-xl  break-all text-center font-bold tracking-tight ">
              {item?.equipmentModel}
            </h5>

            <p className="mb-3  break-all  font-normal text-center">
              {item?.equipmentType}
            </p>
            <p className="mb-3  break-all flex gap-3 flex-wrap justify-between  font-normal text-center">
              UIN: <p>{item?.uin} </p>
               
            </p>
            <p className="mb-3  break-all flex gap-3 flex-wrap justify-between  font-normal text-center">
            Purchased On: <p> {item?.purchasedOn} </p>
               
            </p>
            <p className="mb-3  break-all flex  gap-3 flex-wrap justify-between  font-normal text-center">
            Batteries: <p>{item?.batteries} </p>
               
            </p>
           

            <div className='mt-5 absolute bottom-3 w-full right-0 left-0'>

              <Button
                onClick={() => handleDeleteEquipment(item._id)}
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

export default EquipmentData;

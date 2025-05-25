"use client";

import { Form, Switch,Spin } from "antd";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../../Contexts/User";
import EquipmentData from "../EquipmentData";

const EquipmentDetailsPreview = () => {
    const { user } = useContext(UserContext);
    const [switchChecked, setSwitchChecked] = useState(true);
    const [isDisabled, setIsDisabled] = useState(switchChecked);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (
            user?.equipmentDetails?.equipments.length > 0 
        ) {
            setIsDisabled(false);
            setSwitchChecked(false);
        }
    }, [user]);

    return (
        <div>
            <div className="my-10 flex-grow">
                {/* <EquipmentData /> */}
                <div className='flex items-start gap-4 p-2'>
                    {loading && <div className='absolute flex items-center justify-center inset-0 z-20 bg-white opacity-50'>
                        <Spin size={30} className='' />  </div>
                    }
                    {user?.equipmentDetails?.equipments?.length === 0 || !user?.equipmentDetails ? (
                        <p className='text-center max-w-[200px] italic text-sm'>No Equipments Added...</p>
                    ) : (
                        user?.equipmentDetails?.equipments?.map((item) => (


                            <div key={item._id} className="max-w-sm p-6  border-b-4  border-b-indigo-500 relative bg-white border w-[270px] md:w-[300px] h-[225px] overflow-hidden  border-gray-200 rounded-lg shadow  ">

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

                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default EquipmentDetailsPreview;

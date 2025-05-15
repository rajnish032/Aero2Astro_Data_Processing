"use client";
import { useContext, useEffect, useState } from 'react';
import { Switch,Spin} from 'antd';
import { UserContext } from '../../../../Contexts/User';
import LicenseCards from '.././commons/LicenseCards';
const LicensesPreview = () => {
    const { user } = useContext(UserContext);
    const [hasLicense, setHasLicense] = useState(true);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (user?.licenses?.licenses.length === 0) {
            setHasLicense(false);
        }
    }, [user]);
    return (
        <div className="px-5">
            <div className='flex items-start flex-wrap gap-10 md:p-5 p-1  '>
                {loading && <div className='absolute flex items-center justify-center inset-0 z-20 bg-white opacity-50'>
                    <Spin size={30} className='' />  </div>
                }
                {user?.licenses?.licenses?.length === 0 || !user?.licenses ? (
                    <p className='text-center italic text-sm'>No license Added...</p>
                ) : (
                    user?.licenses?.licenses?.map((item) => (

                        <div key={item._id} className="max-w-sm p-6 border-b-4  border-b-indigo-500 relative bg-white border w-[270px] md:w-[300px] h-[250px] overflow-hidden  border-gray-200 rounded-lg shadow  ">
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

                            </div>

                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default LicensesPreview;

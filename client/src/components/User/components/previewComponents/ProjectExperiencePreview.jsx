"use client";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../Contexts/User";
import ProjectsCards from ".././commons/ProjectsCards";
import { Button, Spin } from 'antd';
const ProjectExperiencePreview = () => {
    const { user } = useContext(UserContext);
    const [hasProjects, setHasProjects] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (user && user.projects) {
            setHasProjects(true);
        }
    }, [user]);

    return (
        <div className="p-3">
            <p className="px-3 py-3 font-bold">Project Experience</p>
            {!hasProjects ? (
                <p className="px-3 text-gray-500">No project experience available.</p>
            ) : (
                <div className='flex items-start flex-wrap gap-10 md:p-5 p-1 mx-auto '>
                    {loading && <div className='absolute flex items-center justify-center inset-0 z-20 bg-white opacity-50'>
                        <Spin size={30} className='' />  </div>
                    }
                    {user?.projects?.projects?.length === 0 || !user?.projects ? (
                        <p className='text-center italic text-sm'>No projects Added...</p>
                    ) : (
                        user?.projects?.projects?.map((item) => (

                            <div key={item._id} className="max-w-sm p-6 max-sm:mx-auto  border-b-4  border-b-indigo-500 relative bg-white border w-[270px] md:w-[300px] h-[250px] overflow-hidden  border-gray-200 rounded-lg shadow  ">

                                <h5 className="mb-2 text-xl  break-all text-center font-bold tracking-tight ">
                                    {item?.clientName}
                                </h5>

                                <p className="mb-3  break-all  font-normal text-center">
                                    {item?.projectDesc}
                                </p>
                                <div className='flex gap-5 mt-8 justify-between'>

                                    <p>From: {item?.startMon}</p>
                                    <p>To : {item?.endMon}</p>
                                </div>

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
            )}
        </div>
    );
};

export default ProjectExperiencePreview;

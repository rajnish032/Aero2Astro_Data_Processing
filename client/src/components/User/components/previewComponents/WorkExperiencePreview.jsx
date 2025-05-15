"use client";
import { useContext, useState } from "react";
import { Form, InputNumber } from "antd";
import { QuestionCircleTwoTone } from "@ant-design/icons";
import { UserContext } from "../../../../Contexts/User";
import WorkCards from "../commons/WorkCards";
import { Button, Spin } from 'antd';
const WorkExperiencePreview = () => {
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(false);

    return (
        <div>
            <Form layout="vertical" className="my-5 flex flex-wrap gap-16 items-center px-5 font-bold">
                <Form.Item
                    className="m-0"
                    tooltip={{
                        title: "The Experience years are calculated based on the work experiences you have added.",
                        icon: <QuestionCircleTwoTone />,
                    }}
                    label="Years of Work Experience"
                >
                    <InputNumber
                        size="large"
                        min={0}
                        value={user?.workExp?.yearsOfExp}
                        disabled
                        className="w-[200px]"
                        placeholder="Work Experience"
                    />
                </Form.Item>
            </Form>

            {/* Display Work Experiences */}
            <div>
                {/* <WorkCards /> */}
                <div className='flex items-start flex-wrap gap-10 md:p-5 p-2'>
                    {loading && <div className='absolute flex items-center justify-center inset-0 z-20 bg-white opacity-50'>
                        <Spin size={30} className='' />  </div>
                    }
                    {user?.workExp?.works?.length === 0 || !user?.workExp ? (
                        <p className='text-center italic text-sm'>No works Added...</p>
                    ) : (
                        user?.workExp?.works?.map((item) => (

                            <div key={item._id} className="max-w-sm p-6 border-b-4  border-b-indigo-500 relative bg-white border w-[270px] md:w-[300px] h-[250px] overflow-hidden  border-gray-200 rounded-lg shadow  ">
                                <div className='bg-indigo-500 rounded-3xl text-white w-fit px-3 relative bottom-3 text-center text-xs py-1 '>
                                    {item?.jobType}
                                </div>
                                <h5 className="mb-2 text-xl  break-all text-center font-bold tracking-tight ">
                                    {item?.companyName}
                                </h5>

                                <p className="mb-3  break-all  font-normal text-center">
                                    {item?.designation}
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
            </div>
        </div>
    );
};

export default WorkExperiencePreview;

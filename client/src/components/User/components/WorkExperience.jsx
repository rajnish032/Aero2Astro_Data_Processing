"use client"
import { useContext, useEffect, useState } from "react";
import { Button, Form, Switch, Input, DatePicker, Upload, Select, InputNumber } from "antd";
import { InfoCircleOutlined, PlusCircleFilled, QuestionCircleTwoTone, UploadOutlined } from "@ant-design/icons";
import { UserContext } from "../../../Contexts/User";
import dayjs from 'dayjs';
import axios from 'axios';
import { requestUrl } from "../../../utils/constants";
import toast from "react-hot-toast";
import WorkCards from "./commons/WorkCards";
import Cookies from 'universal-cookie';
const cookies = new Cookies(null, { path: '/', sameSite: 'lax' });

const WorkExperience = () => {
    const { user, fetchUserDetails } = useContext(UserContext);
    const [showWorkForm, setShowWorkForm] = useState(false);
    const [switchChecked, setSwitchChecked] = useState(true);
    const [isDisabled, setIsDisabled] = useState(switchChecked);
    const [loading, setLoading] = useState(false);

    const currentYear = dayjs().year();

    useEffect(() => {
        if (user?.workExp?.works.length > 0) {
            setIsDisabled(false);
            setSwitchChecked(false);
        }
    }, [user]);

    const handleSwitchChange = (checked) => {
        setSwitchChecked(checked);
        setIsDisabled(checked);
    };

    const disabledDate = (current) => {
        return current && current.year() > currentYear;
    };

    const uploadProps = {
        name: 'file',
        maxCount: 1,
        beforeUpload: (file) => {
            const isPDF = file.type === 'application/pdf';
            const isLt1M = file.size / 1024 / 1024 < 1;
            if (!isPDF) {
                toast.error('Only PDF files are allowed!');
                return false;
            }
            if (!isLt1M) {
                toast.error('File must be less than 1MB!');
                return false;
            }
            return isPDF && isLt1M;
        },
    };

    const handleWorkExperienceSubmit = async (values) => {
        try {
            setLoading(true);
            const formData = new FormData();
            if (values.image) {
                formData.append('file', values.image[0].originFileObj);
            }
            formData.append('jobType', values.jobType);
            formData.append('companyName', values.companyName);
            formData.append('designation', values.designation);
            formData.append('startMon', dayjs(values.startMon).format('MM-YYYY'));
            formData.append('endMon', dayjs(values.endMon).format('MM-YYYY'));

            // if (dayjs(values.startMon).format('MM-YYYY') >= dayjs(values.endMon).format('MM-YYYY')) {
            //     toast.error("Start Month can't be greater");
            //     setLoading(false);

            //     return;
            // }
            if (dayjs(values.startMon).isAfter(dayjs(values.endMon), 'month')) {
                toast.error("Start Month can't be greater");
                setLoading(false);
                return;
            }

            const userAuth = cookies.get('auth');
            await axios.post(`${requestUrl}/user/details/work`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userAuth}`
                },
            });
            setShowWorkForm(false);
            toast.success("Successfully saved");
            setLoading(false);
            fetchUserDetails();
        } catch (error) {
            console.log(error?.response?.data?.message)
            toast.error(error?.response?.data?.message);
            setLoading(false);
        }
    };

    return (
        <div>
            <Form layout="vertical"
                className="my-5 flex flex-wrap gap-16 items-center px-5 font-bold">

                <div>
                    <p className="mb-4">I have no Experience in work</p>

                    <Switch
                        size="large"
                        checked={switchChecked}
                        onChange={handleSwitchChange}
                        disabled={user?.workExp?.works.length > 0}
                    />
                </div>
                <Form.Item className="m-0"
                    tooltip={{
                        title: "The Experience years will be calculated using the work experiences you added here.",
                        icon: <QuestionCircleTwoTone />

                    }}
                    label='Years of Work experience'
                >

                    {/* <p className="text-sm my-1 font-normal"> Years of Work experience</p> */}
                    <InputNumber size="large" min={0} value={user?.workExp?.yearsOfExp} disabled className="w-[200px] " placeholder="Work experiecne" defaultValue={0} />
                </Form.Item>


            </Form>

            <div className="flex gap-10 my-10 mx-3 items-center">
                <Button
                    type="primary"
                    onClick={() => setShowWorkForm(!showWorkForm)}
                    className={`flex items-center mx-2 ${showWorkForm ? 'bg-red-500 text-white' : ''}`}
                    disabled={isDisabled}
                >
                    {showWorkForm ? 'Remove' : <> Add Work Experience &nbsp; <PlusCircleFilled /></>}
                </Button>

            </div>

            {showWorkForm && (
                <div className="my-8 relative w-fit overflow-clip rounded-lg border-2 border-blue-500 px-4 ">
                    
                    <Form layout="vertical" onFinish={handleWorkExperienceSubmit}>
                        
                        <div className="flex p-2 items-center gap-3 flex-wrap">
                            <Form.Item
                                name="jobType"
                                label="Job Type"
                                className="min-w-[150px]"
                                rules={[{ required: true, message: 'Please select job type' }]}
                            >
                                <Select placeholder="Job Type">
                                    <Select.Option value="Employed in company">Employed in company</Select.Option>
                                    <Select.Option value="Freelancer">Freelancer</Select.Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="companyName"
                                label="Company Name"
                                rules={[{ required: true, message: 'Please enter company name' }]}
                            >
                                <Input placeholder="Company Name" />
                            </Form.Item>

                            <Form.Item
                                name="designation"
                                label="Designation"
                                rules={[{ required: true, message: 'Please enter designation' }]}
                            >
                                <Input placeholder="Designation" />
                            </Form.Item>

                            <Form.Item
                                name="startMon"
                                label="Start Month"
                                rules={[{ required: true, message: 'Please select start month' }]}
                            >
                                <DatePicker className="w-[100%]" placeholder="MM-YYYY" picker="month" disabledDate={disabledDate} />
                            </Form.Item>

                            <Form.Item
                                name="endMon"
                                label="End Month"
                                rules={[{ required: true, message: 'Please select end month' }]}
                            >
                                <DatePicker className="w-[100%]" placeholder="MM-YYYY" picker="month" disabledDate={disabledDate} />
                            </Form.Item>

                            <Form.Item
                                name="image"
                                label="Upload (pdf)"
                                valuePropName="fileList"
                                rules={[{ required: true, message: 'it is Required' }]}

                                tooltip={{
                                    title: "Upload relevant experience certificate or any proof of work. The file should be in pdf format with size less than 1 MB",
                                    icon: <InfoCircleOutlined />
                                }}
                                getValueFromEvent={e => e && e.fileList}
                            >
                                <Upload {...uploadProps}>
                                    <Button icon={<UploadOutlined />}>Proof of Work</Button>
                                </Upload>
                            </Form.Item>

                            <Button
                                type="primary"
                                disabled={loading}
                                htmlType="submit"
                                className="m-2"
                            >
                                {loading ? "Saving..." : "Save Work Experience"}
                            </Button>
                        </div>
                        
                    </Form>
                    <p className="text-red-500 px-3 mb-3 text-sm">*Edit & Upload the self-declaration letter when
                         employment certificate or 
                         relieving certificate is not available
                         <a href="https://ik.imagekit.io/aero2astro/image%20cdn/Self%20declaration%20format.docx?updatedAt=1719772749545"
                          className="text-blue-700 font-semibold mx-2">Download</a></p>
                </div>
            )}

            <div>
                <WorkCards />
            </div>
        </div>
    );
};

export default WorkExperience;

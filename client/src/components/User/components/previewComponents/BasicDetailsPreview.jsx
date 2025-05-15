"use client"
import { useContext, useEffect, useState } from 'react';
import { InfoCircleOutlined, MailOutlined, QuestionCircleTwoTone, UserOutlined } from '@ant-design/icons';
import { Form, Input, Select, Slider, Spin, message } from 'antd';
import { divisionAndStates } from '../../../../data/defaultList';
import axios from 'axios';
import defaultavatar from "../../../../assets/avatar.png";
import { CheckPicker } from 'rsuite';
import { requestUrl } from '../../../../utils/constants';
import { UserContext } from '../../../../Contexts/User';
import dayjs from 'dayjs';
import 'rsuite/dist/rsuite-no-reset.min.css';
import Cookies from 'universal-cookie';
const cookies = new Cookies(null, { path: '/', sameSite: 'lax' });

const BasicDetailsPreview = () => {
    const { user } = useContext(UserContext);
    const [form] = Form.useForm();
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (user) {
            const initialSelectedStates = user?.basicDetails?.serviceAreas.flatMap((item) => item.states) || [];
            form.setFieldsValue({
                role: "Gis",
                serviceAreas: initialSelectedStates,
                serviceRange: user?.basicDetails?.serviceRange || 5,
                fullName: user?.fullName,
                locality: user?.locality,
                email: user?.email,
                phone: user?.phone?.number,
                alternatePhone: user?.basicDetails?.alternatePhone.number,
                pincode: user?.areaPin,
                city: user?.city,
                availability: user?.basicDetails?.availability,
                state: user?.state,
                gender: user?.basicDetails?.gender,
                dob: user?.basicDetails?.dob ? dayjs(user?.basicDetails?.dob) : null,
                age: user?.basicDetails?.age
            });
        }
    }, [user, form]);

    return (
        <Form layout="vertical" className='lg:p-5' form={form}>
            <div className='flex lg:gap-5 items-center max-md:px-8 gap-3 p-2 flex-wrap'>
                <div className="w-16 h-16 bg-contain overflow-clip relative rounded-full ring  max-sm:mt-5  ring-blue-500 mr-5">
                    <img src={user?.avatar || defaultavatar} alt={user?.fullName} className="w-full h-full" />
                    {uploading && (
                        <div className="inset-0 bg-white opacity-50 z-20 absolute inline-flex items-center justify-center">
                            <Spin />
                        </div>
                    )}
                </div>
            </div>

            <div className='flex lg:gap-5  items-center max-md:px-8 gap-3 my-3 p-2 flex-wrap'>
                <Form.Item label="Role as" name="role" className='min-w-[250px] m-0'>
                    <Input disabled size='large' />
                </Form.Item>
                <Form.Item className='min-w-[250px] m-0' name="fullName" label="Full Name (As per Aadhaar)">
                    <Input size="large" placeholder="fullname" disabled prefix={<UserOutlined className='mr-3' />} />
                </Form.Item>
                <Form.Item className='min-w-[250px] m-0 ' label="Service Range" name="serviceRange">
                    <Slider className='w-[250px]' step={5} min={5} max={4000} tooltip={{ open: true, placement: 'right' }} disabled />
                </Form.Item>
                <Form.Item className='min-w-[250px] m-0' label="Select your service states/zones" name="serviceAreas">
                    <CheckPicker data={divisionAndStates} groupBy="zone" labelKey="state" valueKey="state" block placeholder="Select States" style={{ width: 250 }} searchable disabled />
                </Form.Item>
            </div>

            <div className='flex lg:gap-5 items-center gap-3 p-2 flex-wrap max-md:px-8'>
                <Form.Item className='min-w-[250px] m-0' name="email" label="Email">
                    <Input size="large" placeholder="Email" disabled prefix={<MailOutlined className='mr-3' />} />
                </Form.Item>
                <Form.Item className='min-w-[250px] m-0' name="phone" label="Phone Number">
                    <Input disabled size='large' autoComplete='off' addonBefore={"+91"} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item className='min-w-[250px] m-0' name='pincode' label="Pin Code">
                    <Input disabled size='large' />
                </Form.Item>
            </div>

            <div className='flex lg:gap-5 gap-3 max-md:px-8 items-center p-2 flex-wrap'>
                <Form.Item className='min-w-[250px] m-0' name='locality' label="Locality/Area">
                    <Input disabled size='large' />
                </Form.Item>
                <Form.Item className='min-w-[250px] m-0' name='city' label="City">
                    <Input disabled size='large' />
                </Form.Item>
                <Form.Item className='min-w-[250px] m-0' name='state' label="State">
                    <Input disabled size='large' />
                </Form.Item>
            </div>

            <div className='flex lg:gap-5 items-center gap-3 p-2 flex-wrap max-md:px-8'>
                <Form.Item className='min-w-[250px] m-0' label="Gender" name="gender">
                    <Select size="large" placeholder="Select Gender" disabled>
                        {["Male", "Female", "Other", "Prefer not to say"].map((val, idx) => (
                            <Select.Option key={idx} value={val}>{val}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item className='md:w-[250px] m-0' label="DOB (as per Aadhaar)" name="dob">
                    <Input disabled size='large' />
                </Form.Item>
                <Form.Item className='m-0' label="Age" name="age">
                    <Input disabled size='large' />
                </Form.Item>
            </div>
        </Form>
    );
}

export default BasicDetailsPreview;

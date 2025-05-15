"use client"

import { useContext, useEffect, useState } from 'react';
import { EditFilled, InfoCircleOutlined, MailOutlined, QuestionCircleFilled, QuestionCircleOutlined, QuestionCircleTwoTone, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, DatePicker, Form, Input, InputNumber, Select, Slider, Spin, message } from 'antd';
import { divisionAndStates } from '../../../data/defaultList';
import axios from 'axios';
import defaultavatar from "../../../assets/avatar.png";
import { CheckPicker } from 'rsuite';
import { requestUrl } from '../../../utils/constants';
import { UserContext } from '../../../Contexts/User';
import dayjs from 'dayjs';
import 'rsuite/dist/rsuite-no-reset.min.css';
import Cookies from 'universal-cookie';
import { Option } from 'antd/es/mentions';
const cookies = new Cookies(null, { path: '/', sameSite: 'lax' });



const BasicDetails = () => {
    const { user, fetchUserDetails } = useContext(UserContext);
    const [form] = Form.useForm();
    const [saving, setSaving] = useState(false);
    const [editMode, setEditMode] = useState(true);
    const [isNotApplicable, setIsNotApplicable] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [selectedServiceAreas, setSelectedServiceAreas] = useState([]);

    const formatter = (value) => `${value} km`;

    const mapSelectedToServiceAreas = (selectedStates) => {
        const serviceAreas = [];
        selectedStates.forEach(state => {
            const found = divisionAndStates.find(item => item.state === state);
            if (found) {

                const existingArea = serviceAreas.find(area => area.region === found.zone);
                if (existingArea) {
                    existingArea.states.push(state);
                } else {
                    serviceAreas.push({
                        region: found.zone,
                        states: [state]
                    });
                }
            }
        });
        return serviceAreas;
    };



    const onFinish = async (values) => {
        setSaving(true);
        try {
            const formattedValues = {
                ...values,
                dob: dayjs(values.dob).format('YYYY-MM-DD'),
                serviceAreas: mapSelectedToServiceAreas(selectedServiceAreas)
            };
            const userAuth = cookies.get('auth');

            await axios.put(`${requestUrl}/user/details/update`, { fullName: values.fullName, basicDetails: formattedValues }, {
                headers: {
                    Authorization: `Bearer ${userAuth}`
                },
                withCredentials: true
            });
            message.success('Details updated successfully');
            setEditMode(false);
            fetchUserDetails();
        } catch (error) {
            message.error('Failed to update details');
        } finally {
            setSaving(false);
        }
    };

    const handleDateChange = (date) => {
        if (date) {
            const currentDate = dayjs();
            const selectedDate = dayjs(date);
            const age = currentDate.diff(selectedDate, 'year');

            form.setFieldsValue({ age: age });
        } else {
            form.setFieldsValue({ age: null });
        }
    };

    const disabledDate = (current) => {
        return current && current > dayjs().subtract(18, 'year').endOf('day');
    };

    const handleCheckboxChange = (e) => {
        const checked = e.target.checked;
        setIsNotApplicable(checked);
        if (checked) {
            form.setFieldsValue({ alternatePhone: 'N/A' });
        } else {
            form.setFieldsValue({ alternatePhone: '' });
        }
    };


    useEffect(() => {
        if (user) {
            setIsNotApplicable(user?.basicDetails?.alternatePhone.number === 'N/A');
            const initialSelectedStates = user?.basicDetails?.serviceAreas.flatMap((item) => item.states) || [];
            setSelectedServiceAreas(initialSelectedStates);
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
                availability:user?.basicDetails?.availability,
                state: user?.state,
                gender: user?.basicDetails?.gender,
                dob: user?.basicDetails?.dob ? dayjs(user?.basicDetails?.dob) : null,
                age: user?.basicDetails?.age
            });
        }
    }, [user, form]);



    const handleAvatarUpload = async (e) => {
        setUploading(true);

        const file = e.target.files[0];

        try {
            const formData = new FormData();
            formData.append('avatar', file);
            const userAuth = cookies.get('auth');
            const response = await axios.put(`${requestUrl}/user/updateAvatar`, formData, {
                headers: {
                    Authorization: `Bearer ${userAuth}`
                },
                withCredentials: true
            });

            if (response.status === 201) {
                message.success('Avatar updated successfully');
                setUploading(false);

                fetchUserDetails();
            }
        } catch (error) {

            message.error(error.response.data.message || 'Failed to update avatar');
            setUploading(false);
        }
    };



    return (
        <Form
            layout="vertical"
            className='lg:p-5 '
            form={form}
            onFinish={onFinish}
            

        >

            <div className='flex lg:gap-5 items-center max-md:px-8 gap-3 p-2 flex-wrap'>

                <div className="w-16 h-16 bg-contain overflow-clip relative rounded-full ring  max-sm:mt-5  ring-blue-500 mr-5">
                    <img src={user?.avatar || defaultavatar} alt={user?.fullName} className="w-full h-full" />
                    {uploading && (
                        <div className="inset-0 bg-white opacity-50 z-20 absolute inline-flex items-center justify-center">
                            <Spin />
                        </div>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        name="avatar"
                        id="avatar"
                        onChange={(e) => handleAvatarUpload(e)}
                        hidden
                    />
                    <label htmlFor="avatar">
                        <EditFilled size={35} title="Edit Image" className="z-10  absolute bottom-1 right-1 bg-indigo-500 hover:bg-black  rounded-full text-white  p-1 cursor-pointer" />
                    </label>
                </div>


            </div>

            <div className='flex lg:gap-5  items-center max-md:px-8 gap-3 my-3 p-2 flex-wrap'>

                {/* Role  */}
                <Form.Item
                    label="Role as" name="role" required className='min-w-[250px] m-0'>
                    <Input disabled size='large' />
                </Form.Item>

                <Form.Item className='min-w-[250px] m-0'
                    tooltip={{
                        title: 'Enter your name as per your Aadhaar card',
                        icon: <QuestionCircleTwoTone />
                    }}
                    name="fullName" label="Full Name (As per Aadhaar)" rules={[{
                        required: true,
                        message: "Full Name required (As per Aadhaar)"
                    }]}>
                    <Input size="large" placeholder="fullname" disabled={!editMode} prefix={<UserOutlined className='mr-3' />} />
                </Form.Item>

                
                {/* Range */}

                <Form.Item
                    tooltip={{

                        title: 'Select the Range in kms (Kilometers) in which you can work and provide services',
                        icon: <QuestionCircleTwoTone />
                    }}
                    className='min-w-[250px] m-0 '
                    label="Service Range"
                    name="serviceRange"
                    rules={[{ required: true, message: 'Please Select Range of Km' }]}
                >
                    <Slider
                        className='w-[250px] '
                        step={5}
                        min={5}
                        max={4000}
                        tooltip={{ formatter, open: true, placement: 'right' }}
                        disabled={!editMode}
                    />
                </Form.Item>
                {/* Serivce States */}
                <Form.Item
                    tooltip={{
                        title: 'You can select multiple states where you can provide your services',
                        icon: <QuestionCircleTwoTone />
                    }}
                    className='min-w-[250px] m-0'
                    label="Select your service states/zones"
                    name="serviceAreas"
                    rules={[{ required: true, message: 'Please Select at least one state' }]}
                >

                    <CheckPicker
                        data={divisionAndStates}
                        groupBy="zone"
                        labelKey="state"
                        valueKey="state"
                        block
                        placeholder="Select States"
                        style={{ width: 250 }}
                        
                        searchable
                        disabled={!editMode}
                        onChange={(value) => setSelectedServiceAreas(value)}
                        renderMenuItem={(label, item) => (
                            <span className=' text-sm' >{item.state}</span>
                        )}
                        renderMenuGroup={(label, item) => (
                            <span className='font-bold text-white py-1 px-5 rounded-sm italic text-sm shadow-lg bg-blue-700'>{label}</span>
                        )}

                    />

                </Form.Item>


            </div>

            <div className='flex lg:gap-5 items-center gap-3 p-2 flex-wrap max-md:px-8'>

            <Form.Item
            
                        className='min-w-[250px] m-0'
                        label="Availability"
                        name="availability"
                        tooltip={{

                            title: 'Select the Days when you will be available & want to recieve jobs',
                            icon: <QuestionCircleTwoTone />
                        }}
                        rules={[{ required: true, message: 'Please check availability days' }]}
                    >
                        <Select
                        size='large'
                         disabled ={!editMode}
                            mode="multiple"
                            placeholder="Select days"
                            maxTagCount={2}
                            maxTagTextLength={4}
                        >
                            <Option value="Monday">Monday</Option>
                            <Option value="Tuesday">Tuesday</Option>
                            <Option value="Wednesday">Wednesday</Option>
                            <Option value="Thursday">Thursday</Option>
                            <Option value="Friday">Friday</Option>
                            <Option value="Saturday">Saturday</Option>
                            <Option value="Sunday">Sunday</Option>
                        </Select>
                    </Form.Item>

                <Form.Item className='min-w-[250px] m-0' name="email" label="Email" rules={[{ required: true }]}>
                    <Input size="large" placeholder="Email" disabled prefix={<MailOutlined className='mr-3' />} />
                </Form.Item>

                <Form.Item className='min-w-[250px] m-0' name="phone" label="Phone Number" rules={[{ required: true, message: 'Please input your phone number!' }]}>
                    <Input disabled size='large' autoComplete='off' addonBefore={"+91"} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item className='min-w-[250px] m-0' name='pincode' label="Pin Code" rules={[{ required: true, message: 'Please Enter your Pin code!' }]}>
                    <Input disabled size='large' />
                </Form.Item>
               
            </div>

            <div className='flex lg:gap-5 gap-3 max-md:px-8 items-center p-2 flex-wrap'>
            <Form.Item className='min-w-[250px] m-0' name='locality' label="Locality/Area" rules={[{ required: true, message: 'Please Enter your location !' }]}>
                    <Input disabled size='large' />
                </Form.Item>

                <Form.Item className='min-w-[250px] m-0' name='city' label="City" rules={[{ required: true }]}>
                    <Input disabled size='large' />
                </Form.Item>

                <Form.Item className='min-w-[250px] m-0' name='state' label="State" rules={[{ required: true }]}>
                    <Input disabled size='large' />
                </Form.Item>



                <Form.Item className="min-w-[250px] m-0 "
                    tooltip={{
                        title: `Alternate Phone number is required for Emergency situations. If you do not want to give then check the Not Applicable N/A.`,
                        icon: <InfoCircleOutlined />,
                    }}
                    rules={[
                        {
                            required: !isNotApplicable,
                            pattern: /^[0-9]{10}$/,
                            message: 'Please enter a valid 10-digit phone number',
                            validator: (_, value) =>
                                isNotApplicable || /^[0-9]{10}$/.test(value) ? Promise.resolve() : Promise.reject('Please enter a valid 10-digit phone number')
                        },
                    ]}
                    label={(
                        <div className='flex items-center gap-16 justify-between'>
                            <p> Alternate Phone </p>   <Checkbox onChange={handleCheckboxChange} checked={isNotApplicable}>N/A</Checkbox>
                        </div>
                    )}
                    name="alternatePhone"
                >
                    <Input
                        disabled={!editMode || isNotApplicable}
                        size="large"
                        minLength={10}
                        type="tel"
                        maxLength={10}
                        autoComplete="off"
                        addonBefore="+91"
                        style={{ width: '100%' }}
                    />
                </Form.Item>
            </div>

            <div className='flex lg:gap-5 items-center gap-3 p-2 flex-wrap max-md:px-8'>


                    
                <Form.Item className='min-w-[250px] m-0' label="Gender" name="gender" rules={[{ required: true, message: 'Please Select Gender' }]}>
                    <Select size="large" placeholder="Select Gender" disabled={!editMode}>
                        {["Male", "Female", "Other", "Prefer not to say"].map((val, idx) => (
                            <Select.Option key={idx} value={val}>{val}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                    <Form.Item className='md:w-[250px]   m-0'
                        tooltip={{
                            title: 'Enter valid Date of Birth as per your Aadhaar card',
                            icon: <QuestionCircleTwoTone />
                        }}
                        rules={[{ required: true, message: 'Please Enter valid Age' }]}
                        label="DOB (as per Aadhaar)" name="dob">
                        <DatePicker placeholder='Enter DOB'
                            className='w-[100%]'
                            size='large'
                            onChange={handleDateChange}
                            format="DD-MM-YYYY"
                            disabled={!editMode}
                            disabledDate={disabledDate}
                        />
                    </Form.Item>

                    <Form.Item className=' m-0'
                        rules={[{ required: true, message: 'Please Enter valid Age' }]}
                        label="Age" name="age">
                        <InputNumber className='w-[60px]'
                            min={18} size='large' placeholder='Age'
                            disabled />
                    </Form.Item>

                  

            </div>

<div className='max-md:px-7 w-fit'>

            <Button
                type='primary'
                htmlType='submit'
                className='w-[150px] my-5 mx-2  text-white font-bold hover:bg-white hover:border-blue-500 hover:text-500 bg-blue-500'
                loading={saving}
                disabled={!editMode}
            >
                {saving ? 'Saving...' : 'Save'}
            </Button>
            <Button onClick={() => setEditMode(prev => !prev)}>{!editMode ? 'Edit' : 'Cancel'}</Button>
</div>

        </Form >
    );
}

export default BasicDetails;

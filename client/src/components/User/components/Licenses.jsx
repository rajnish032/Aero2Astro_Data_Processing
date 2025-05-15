"use client"

import { useContext, useEffect, useState } from 'react';
import { PlusOutlined, QuestionCircleTwoTone, UploadOutlined } from '@ant-design/icons';
import { Button, DatePicker, Form, Input, Switch, Upload, Select } from 'antd';
import dayjs from 'dayjs';
import axios from 'axios';
import { requestUrl } from '../../../utils/constants';
import { UserContext } from '../../../Contexts/User';
import { Option } from 'antd/es/mentions';
import { toast } from "react-hot-toast"
import LicenseCards from './commons/LicenseCards';
import Cookies from 'universal-cookie';
const cookies = new Cookies(null, { path: '/' ,sameSite:'lax'});

const Licenses = () => {
  const [form] = Form.useForm();
  const { user ,fetchUserDetails} = useContext(UserContext);

  const [showForm, setShowForm] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(true);
  const [isDisabled, setIsDisabled] = useState(switchChecked);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user?.licenses?.licenses.length > 0) {
      setSwitchChecked(false);
      setIsDisabled(false);
    }
  }, [user]);

  const handleSwitchChange = (checked) => {
    setSwitchChecked(!switchChecked)
    setIsDisabled(checked);
    setShowForm(!checked);
  };

  const handleAddLicense = () => {
    setShowForm(!showForm);
    setIsDisabled(showForm);

  };

  const onFinish = async (values) => {
    try {
      setIsSaving(true);
      const formData = new FormData();
      formData.append('licenseName', values.licenseName);
      formData.append('gisName', values.gisName);
      formData.append('licenseNumber', values.licenseNumber);
      formData.append('classUas', values.classUas);
      formData.append('dateOfIssuance', dayjs(values.issuedOn).format('YYYY-MM-DD'));
      formData.append('image', values.image[0].originFileObj);

      const userAuth = cookies.get('auth');

      const res = await axios.post(`${requestUrl}/user/details/licenses`, formData,{
        withCredentials: true,
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization :`Bearer ${userAuth}`
        },
    });
      if (res.status === 201) {

        toast.success('License uploaded successfully');
        form.resetFields();
        setShowForm(false);
        setIsSaving(false);
        fetchUserDetails()

      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Error uploading license');
      setIsSaving(false);

    } finally {
      setIsSaving(false);
    }
  };

  const props = {
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

  return (

    <div className=' px-5'>
      <Form
        form={form}
        layout='vertical'
        
        onFinish={onFinish}
      >
        <div className="my-5 font-bold ">
          <p className=''>I have no License</p>
          <Switch
            className='my-2'
            size="large"
            disabled={user?.licenses?.licenses.length > 0}
            onChange={handleSwitchChange}
            checked={switchChecked}
          />

        </div>

        <Button
          type="primary"
          disabled={switchChecked}
          className={`${showForm ? 'bg-red-500 hover:bg-red-600' : ''}`}
          onClick={handleAddLicense}
        >
          {!showForm ? <>Add GIS License <PlusOutlined /></> : 'Remove'}
        </Button>

        {showForm && (
          <div className="my-8 relative shadow-md rounded-lg overflow-clip border-2 border-blue-500 px-4">
            <p className="bg-gradient-to-r absolute left-0 from-blue-400 to-blue-500 text-white w-fit px-10 rounded-br-xl">
              Gis License
            </p>
            <div className='flex gap-4 relative my-7 flex-wrap items-center'>
              {/* License Name */}
              <Form.Item
                name='licenseName'
                label="License Name"
                tooltip={{
                  title: 'Kindly enter the license name/type e.g. DGCA Gis License, FAA Gis License, RPA License etc.',
                  icon: <QuestionCircleTwoTone />
              }}
                rules={[
                  {
                    required: true,
                    message: 'Enter license name',
                  },
                ]}
              >
                <Input placeholder="e.g. DGCA Gis License" />
              </Form.Item>

              {/* Gis name */}
              <Form.Item
                name='gisName'
                label="Gis Name on License"
                rules={[
                  {
                    required: true,
                    message: 'Enter license name',
                  },
                ]}
              >
                <Input 
                className='min-w-[200px]'
                placeholder="License name" />
              </Form.Item>


              {/* Equipment Class */}
              <Form.Item

                name="classUas"
                className='min-w-[200px]'
                label="Class of UAS"

                rules={[
                  {
                    required: true,
                    message: 'Please select the class',
                  },
                ]}
              >
                <Select placeholder="Select UAS Class">
                  {["Micro", "Small", "Medium", "Large"].map((val, idx) => (
                    <Option key={idx} value={val}>{val}</Option>
                  ))}
                </Select>

              </Form.Item>
              <Form.Item
                label="License Number"
                name='licenseNumber'
                rules={[
                  {
                    required: true,
                    message: 'Missing license number',
                  },
                ]}
              >
                <Input placeholder="UAXX242X22" />
              </Form.Item>
              <Form.Item
                label="Date of issuance"
               
                
                name='issuedOn'
                rules={[
                  {
                    required: true,
                    message: 'Missing issuance date',
                  },
                ]}
              >
                <DatePicker 
                className='min-w-[200px]'

                placeholder="Select date" />
              </Form.Item>

              <Form.Item
                name="image"
                label="Upload License"
              

                valuePropName="file"
                rules={[
                  {
                    required: true,
                    message: 'License pdf/img less than 1MB',
                  },
                ]}
                getValueFromEvent={e => e && e.fileList}
              >
                <Upload 
              
                {...props}>
                  <Button
                className='min-w-[100px]'

                   icon={<UploadOutlined />}>Upload License</Button>
                </Upload>
              </Form.Item>
            </div>
          </div>
        )}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className='w-[140px] my-5'
            disabled={isDisabled || isSaving || !showForm}
            loading={isSaving}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>

      <div>
        <LicenseCards />
      </div>


    </div>
  );
};

export default Licenses;

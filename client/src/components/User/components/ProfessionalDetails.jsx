"use client"

import { Form, Input, Radio, Space, Button, Select, Tooltip } from 'antd';
import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserContext } from "../../../Contexts/User";
import { requestUrl } from "../../../utils/constants";
import { InfoCircleOutlined } from '@ant-design/icons';
import Cookies from 'universal-cookie';
const cookies = new Cookies(null, { path: '/' ,sameSite:'lax'});

const ProfessionalDetails = () => {
  const { user, fetchUserDetails } = useContext(UserContext);
  const [form] = Form.useForm();
  const [employmentStatus, setEmploymentStatus] = useState(user?.professionalDetails?.employmentStatus);
  const [employmentType, setEmploymentType] = useState(user?.professionalDetails?.employmentType);

  const [editing, setEditing] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.professionalDetails) {
      form.setFieldsValue({
        employmentStatus: user?.professionalDetails?.employmentStatus,
        companyName: user?.professionalDetails?.companyName,
        employmentType: user?.professionalDetails?.employmentType,
        place: user?.professionalDetails?.place,
        workType: user?.professionalDetails?.workType,
        seCompanyName: user?.professionalDetails?.seCompanyName,
        sePlace: user?.professionalDetails?.sePlace,
        workNature: user?.professionalDetails?.workNature,
      });
      setEmploymentStatus(user?.professionalDetails?.employmentStatus || "Not employed");
      setEmploymentType(user?.professionalDetails?.employmentType);
    }
  }, [user, form]);

  const onEmploymentStatusChange = (e) => {
    const newValue = e.target.value;
    setEmploymentStatus(newValue);

    if (newValue === "Employed") {
      form.setFieldsValue({
        employmentType: undefined,
        seCompanyName: undefined,
        sePlace: undefined,
        workNature: undefined,
        workType: undefined,
      });
      setEmploymentType(undefined);
    } else if (newValue === "Self employed") {
      form.setFieldsValue({
        companyName: undefined,
        place: undefined,
        workType: undefined,
      });
    } else if (newValue === "Not employed") {
      form.resetFields();
      setEmploymentType(undefined);
    }
  };

  const onEmploymentTypeChange = (value) => {
    setEmploymentType(value);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      const professionalDetails = {
        employmentStatus,
        companyName: values?.companyName,
        employmentType: values?.employmentType,
        place: values?.place,
        workType: values?.workType,
        seCompanyName: employmentType === "Company" ? values?.seCompanyName : undefined,
        sePlace: values?.sePlace,
        workNature: values?.workNature,
      };
      const userAuth = cookies.get('auth');
      await axios.put(`${requestUrl}/user/details/update`, { professionalDetails }, {
        headers:{
         Authorization:`Bearer ${userAuth}`
        },
        withCredentials: true });

      toast.success('Employment details updated successfully');
      setEditing(false);
      setLoading(false);
      fetchUserDetails();

    } catch (error) {
      toast.error('Failed to update professional details');
      setLoading(false);
    }
  };

  return (
    <Form layout='vertical' form={form} onFinish={handleSave}>
      <Radio.Group
        className='p-5'
        size='large'
        onChange={onEmploymentStatusChange}
        value={employmentStatus}
        disabled={!editing}
      >
        <Space direction="vertical">
          <Tooltip title="Select this if you are currently employed with a company">
            <Radio value="Employed">Employed with a Company</Radio>
          </Tooltip>
          <Tooltip title="Select this if you are self-employed as any gis equipment">
            <Radio value="Self employed">Self Employed Gis Pilot</Radio>
          </Tooltip>
          <Tooltip title="Select this if you are not currently employed">
            <Radio value="Not employed">Not Employed</Radio>
          </Tooltip>
        </Space>
      </Radio.Group>

      {(employmentStatus === "Employed" || employmentStatus === "Self employed") && (
        <div className='flex items-center py-2 flex-wrap rounded-lg '>
          {employmentStatus === "Employed" && (
            <>
              <Form.Item
                label="Company Name"
                name="companyName"
                rules={[
                  {
                    required: true,
                    message: 'Please enter the company name',
                  },
                ]}
                className='px-5 min-w-[250px]'
              >
                <Input placeholder='Enter Company Name' disabled={!editing} />
              </Form.Item>

              <Form.Item
                label="Place"
                name="place"
                rules={[
                  {
                    required: true,
                    message: 'Please enter the place',
                  },
                ]}
                className='px-5 min-w-[250px]'
              >
                <Input placeholder='Enter Company Place' disabled={!editing} />
              </Form.Item>

              <Form.Item
                label="Work Type"
                name="workType"
                rules={[
                  {
                    required: true,
                    message: 'Please enter the work type',
                  },
                ]}
                className='px-5 min-w-[250px]'
              >
                <Input placeholder='e.g. Equipment Gis Pilot' disabled={!editing} />
              </Form.Item>
            </>
          )}

          {employmentStatus === "Self employed" && (
            <>
              <Form.Item
                label="Type"
                name="employmentType"
                rules={[
                  {
                    required: true,
                    message: 'Please select the employment type',
                  },
                ]}
                className='px-5 min-w-[250px]'
                tooltip={{
                  title: 'Select the employment category in dropdown',
                  icon: <InfoCircleOutlined />,
                }}
              >
                <Select
                  placeholder='Select employment Type'
                  onChange={onEmploymentTypeChange}
                  disabled={!editing}
                >
                  {['Freelancer', 'Company'].map((item, index) => (
                    <Select.Option key={index} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              {employmentType === "Company" && (
                <Form.Item
                  label="Company Name"
                  name="seCompanyName"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter the company name',
                    },
                  ]}
                  className='px-5 min-w-[250px]'
                >
                  <Input placeholder='Enter Company Name' disabled={!editing} />
                </Form.Item>
              )}

              <Form.Item
                label={employmentType === "Company" ? "Company Location" : "Work Place"}
                name="sePlace"
                rules={[
                  {
                    required: true,
                    message: 'Please enter the place',
                  },
                ]}
                className='px-5 min-w-[250px]'
              >
                <Input placeholder='e.g. Work from Home or Chennai, Tamil Nadu' disabled={!editing} />
              </Form.Item>

              <Form.Item
                label="Nature of Work"
                name="workNature"
                rules={[
                  {
                    required: true,
                    message: 'Please enter the nature of work',
                  },
                ]}
                className='px-5 min-w-[250px]'
              >
                <Input placeholder='e.g. Equipment Manufacturing, GIS Company' disabled={!editing} />
              </Form.Item>
            </>
          )}
        </div>
      )}

      <div>
        <Button type="primary" className='w-[100px] m-5' htmlType="submit" disabled={!editing || loading}>
          {loading ? "Saving...." : "Save"}
        </Button>
        <Button onClick={() => setEditing(prev => !prev)}>{!editing ? 'Edit' : 'Cancel'}</Button>
      </div>
    </Form>
  );
};

export default ProfessionalDetails;

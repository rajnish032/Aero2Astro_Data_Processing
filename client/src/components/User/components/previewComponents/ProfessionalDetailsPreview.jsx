"use client";

import { Form, Input, Radio, Space, Select, Tooltip } from 'antd';
import { useContext, useEffect } from 'react';
import { UserContext } from "../../../../Contexts/User";
import { InfoCircleOutlined } from '@ant-design/icons';

const ProfessionalDetailsPreview = () => {
    const { user } = useContext(UserContext);
    const [form] = Form.useForm();

    useEffect(() => {
        if (user?.professionalDetails) {
            form.setFieldsValue({
                employmentStatus: user.professionalDetails.employmentStatus,
                companyName: user.professionalDetails.companyName,
                employmentType: user.professionalDetails.employmentType,
                place: user.professionalDetails.place,
                workType: user.professionalDetails.workType,
                seCompanyName: user.professionalDetails.seCompanyName,
                sePlace: user.professionalDetails.sePlace,
                workNature: user.professionalDetails.workNature,
            });
        }
    }, [user, form]);

    return (
        <Form layout="vertical" form={form} disabled>
            <Radio.Group className="p-5" size="large" value={user?.professionalDetails?.employmentStatus}>
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

            {(user?.professionalDetails?.employmentStatus === "Employed" ||
                user?.professionalDetails?.employmentStatus === "Self employed") && (
                    <div className="flex items-center py-2 flex-wrap rounded-lg">
                        {user?.professionalDetails?.employmentStatus === "Employed" && (
                            <>
                                <Form.Item label="Company Name" name="companyName" className="px-5 min-w-[250px]">
                                    <Input disabled />
                                </Form.Item>

                                <Form.Item label="Place" name="place" className="px-5 min-w-[250px]">
                                    <Input disabled />
                                </Form.Item>

                                <Form.Item label="Work Type" name="workType" className="px-5 min-w-[250px]">
                                    <Input disabled />
                                </Form.Item>
                            </>
                        )}

                        {user?.professionalDetails?.employmentStatus === "Self employed" && (
                            <>
                                <Form.Item label="Type" name="employmentType" className="px-5 min-w-[250px]">
                                    <Select disabled>
                                        <Select.Option value="Freelancer">Freelancer</Select.Option>
                                        <Select.Option value="Company">Company</Select.Option>
                                    </Select>
                                </Form.Item>

                                {user?.professionalDetails?.employmentType === "Company" && (
                                    <Form.Item label="Company Name" name="seCompanyName" className="px-5 min-w-[250px]">
                                        <Input disabled />
                                    </Form.Item>
                                )}

                                <Form.Item
                                    label={user?.professionalDetails?.employmentType === "Company" ? "Company Location" : "Work Place"}
                                    name="sePlace"
                                    className="px-5 min-w-[250px]"
                                >
                                    <Input disabled />
                                </Form.Item>

                                <Form.Item label="Nature of Work" name="workNature" className="px-5 min-w-[250px]">
                                    <Input disabled />
                                </Form.Item>
                            </>
                        )}
                    </div>
                )}
        </Form>
    );
};

export default ProfessionalDetailsPreview;

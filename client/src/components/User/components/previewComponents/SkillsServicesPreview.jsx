"use client";
import { Form, Checkbox } from 'antd';
import { useEffect, useContext } from 'react';
import { UserContext } from "../../../../Contexts/User";
import HybridSelect from '.././commons/HybridSelect';
import { InfoCircleOutlined } from '@ant-design/icons';
import { controlStations, equipmentTypes } from '@/data/defaultList';

const SkillsServicesPreview = () => {
    const { user } = useContext(UserContext);
    const [form] = Form.useForm();

    useEffect(() => {
        if (user?.skills) {
            form.setFieldsValue(user.skills);
        }
    }, [user, form]);

    return (
        <Form layout="vertical" form={form} disabled>
            <div className="flex gap-5 flex-wrap items-center p-5">
                <Form.Item label="Equipment Types You Can Handle" className="min-w-[250px]" name="equipmentTypesCanHandle">
                    <HybridSelect initialItems={equipmentTypes} disabled />
                </Form.Item>

                <Form.Item label="Control Stations" className="min-w-[250px]" name="controlStations">
                    <HybridSelect initialItems={controlStations} disabled />
                </Form.Item>

                <Form.Item
                    className="min-w-[250px]"
                    label={(
                        <div className="flex items-center gap-16 justify-between">
                            <p>Hardware Skills</p>
                            <Checkbox checked={user?.skills?.hardwareSkills?.includes('N/A')} disabled>
                                N/A
                            </Checkbox>
                        </div>
                    )}
                    name="hardwareSkills"
                    tooltip={{ title: 'Select N/A if you have no hardware skills', icon: <InfoCircleOutlined /> }}
                >
                    <HybridSelect initialItems={["Repair fixed wing", "Operating RTK/GNSS Receivers", "Installing and calibrating UAV sensors", "Repair hybrid"]} disabled />
                </Form.Item>

                <Form.Item
                    className="min-w-[250px]"
                    label={(
                        <div className="flex items-center gap-16 justify-between">
                            <p>Gis Software & Programming Skills</p>
                            <Checkbox checked={user?.skills?.softwareSkills?.includes('N/A')} disabled>
                                N/A
                            </Checkbox>
                        </div>
                    )}
                    name="softwareSkills"
                    tooltip={{ title: 'Select N/A if you have no gis software and programming skills', icon: <InfoCircleOutlined /> }}
                >
                    <HybridSelect initialItems={["ArcGIS","AutoCAD","Global Mapper","C++","Java"]} disabled />
                </Form.Item>
            </div>
        </Form>
    );
};

export default SkillsServicesPreview;

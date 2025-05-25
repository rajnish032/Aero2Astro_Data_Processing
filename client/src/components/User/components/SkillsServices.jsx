"use client"

import { Form, Button, Checkbox } from 'antd';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { UserContext } from "../../../Contexts/User";
import { equipmentTypes } from '../../../data/defaultList';
import { requestUrl } from '../../../utils/constants';
import HybridSelect from './commons/HybridSelect';
import { InfoCircleOutlined } from '@ant-design/icons';
import Cookies from 'universal-cookie';
const cookies = new Cookies(null, { path: '/' ,sameSite:'lax'});

const SkillsServices = () => {
    const { user, fetchUserDetails } = useContext(UserContext);
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const [isEquipmentNAChecked, setIsEquipmentNAChecked] = useState(false);
    const [isHardwareNAChecked, setIsHardwareNAChecked] = useState(false);
    const [isSoftwareNAChecked, setIsSoftwareNAChecked] = useState(false);

    useEffect(() => {
        if (user && user.skills) {
            const { equipmentTypesCanHandle, hardwareSkills, softwareSkills } = user.skills;
            
            if (equipmentTypesCanHandle?.includes('N/A')) {
                setIsEquipmentNAChecked(true);
                form.setFieldsValue({ equipmentTypesCanHandle: ['N/A'] });
            } else {
                form.setFieldsValue({ equipmentTypesCanHandle });
            }

            if (hardwareSkills?.includes('N/A')) {
                setIsHardwareNAChecked(true);
                form.setFieldsValue({ hardwareSkills: ['N/A'] });
            } else {
                form.setFieldsValue({ hardwareSkills });
            }

            if (softwareSkills?.includes('N/A')) {
                setIsSoftwareNAChecked(true);
                form.setFieldsValue({ softwareSkills: ['N/A'] });
            } else {
                form.setFieldsValue({ softwareSkills });
            }
        }
    }, [user, form]);

    const handleCheckboxChange = (e, field) => {
        const checked = e.target.checked;
        if (field === 'equipmentTypesCanHandle') {
            setIsEquipmentNAChecked(checked);
            form.setFieldsValue({ equipmentTypesCanHandle: checked ? ['N/A'] : [] });
        } else if (field === 'hardwareSkills') {
            setIsHardwareNAChecked(checked);
            form.setFieldsValue({ hardwareSkills: checked ? ['N/A'] : [] });
        } else if (field === 'softwareSkills') {
            setIsSoftwareNAChecked(checked);
            form.setFieldsValue({ softwareSkills: checked ? ['N/A'] : [] });
        }
    };

    const handleSubmit = async (values) => {
        try {
            setSaving(true);
            setLoading(true);
            const userAuth = cookies.get('auth');
            await axios.put(`${requestUrl}/user/details/update`, { skills: values }, {
                headers:{ Authorization:`Bearer ${userAuth}` },
                withCredentials: true
            });
            setLoading(false);
            setSaving(false);
            setDisabled(true);
            toast.success('Data saved successfully!');
            fetchUserDetails();
        } catch (error) {
            setLoading(false);
            setSaving(false);
            toast.error('Failed to save data. Please try again later.');
        }
    };

    return (
        <Form layout='vertical' form={form} onFinish={handleSubmit}>
            <div className='flex gap-5 flex-wrap items-center p-5'>

                <Form.Item
                    label={
                        <div className='flex items-center gap-16 justify-between'>
                            <p>Equipments Types You can Handle</p>
                            <Checkbox
                                disabled={disabled}
                                onChange={(e) => handleCheckboxChange(e, 'equipmentTypesCanHandle')}
                                checked={isEquipmentNAChecked}
                            >
                                N/A
                            </Checkbox>
                        </div>
                    }
                    className='min-w-[250px]'
                    name="equipmentTypesCanHandle"
                    rules={[{ required: !isEquipmentNAChecked, message: 'Select multiple or select only N/A' }]}
                    tooltip={{
                        title: 'Select N/A if you cannot handle any GIS equipment',
                        icon: <InfoCircleOutlined />,
                    }}
                >
                    <HybridSelect
                        initialItems={equipmentTypes}
                        disabled={disabled || isEquipmentNAChecked}
                        placeholder="Equipment Types You can Handle"
                    />
                </Form.Item>

                <Form.Item
                    className='min-w-[250px]'
                    label={(
                        <div className='flex items-center gap-16 justify-between'>
                            <p>Hardware Skills</p>
                            <Checkbox
                                disabled={disabled}
                                onChange={(e) => handleCheckboxChange(e, 'hardwareSkills')}
                                checked={isHardwareNAChecked}
                            >
                                N/A
                            </Checkbox>
                        </div>
                    )}
                    name="hardwareSkills"
                    rules={[{ required: !isHardwareNAChecked, message: 'Select Multiple or select only N/A' }]}
                    tooltip={{
                        title: 'Select N/A if you have not any hardware skill',
                        icon: <InfoCircleOutlined />,
                    }}
                >
                    <HybridSelect
                        initialItems={["Repair fixed wing", "Operating RTK/GNSS Receivers", "Installing and calibrating UAV sensors", "Repair hybrid"]}
                        disabled={disabled || isHardwareNAChecked}
                        placeholder="Hardware Skills"
                    />
                </Form.Item>

                <Form.Item
                    className='min-w-[250px]'
                    label={(
                        <div className='flex items-center gap-16 justify-between'>
                            <p>GIS Software & Programming Skills</p>
                            <Checkbox
                                disabled={disabled}
                                onChange={(e) => handleCheckboxChange(e, 'softwareSkills')}
                                checked={isSoftwareNAChecked}
                            >
                                N/A
                            </Checkbox>
                        </div>
                    )}
                    name="softwareSkills"
                    rules={[{ required: !isSoftwareNAChecked, message: 'Select Multiple or select only N/A' }]}
                    tooltip={{
                        title: 'Select N/A if you have not any GIS software and programming skill',
                        icon: <InfoCircleOutlined />,
                    }}
                >
                    <HybridSelect
                        initialItems={["ArcGIS","AutoCAD","Global Mapper","C++","Java"]}
                        disabled={disabled || isSoftwareNAChecked}
                        placeholder="Software Skills"
                    />
                </Form.Item>
            </div>

            <div className='p-2 m-3'>
                <Button type="primary" disabled={disabled} className='mx-2 w-[150px]' htmlType="submit" loading={loading || saving}>Save</Button>
                <Button onClick={() => setDisabled(prev => !prev)}>{disabled ? 'Edit' : 'Cancel'}</Button>
            </div>
        </Form>
    );
};

export default SkillsServices;

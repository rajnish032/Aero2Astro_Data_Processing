'use client';
import { Checkbox, Form } from 'antd';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from "../../../Contexts/User";
import { requestUrl } from '@/utils/constants';
import Cookies from 'universal-cookie';
import axios from 'axios';
const cookies = new Cookies(null, { path: '/', sameSite: 'lax' });
const UserConsent = ({ onChange }) => {
    const { user, fetchUserDetails } = useContext(UserContext);
    const [form] = Form.useForm();
    const [policyAccepted, setPolicyAccepted] = useState(false);
    const [communicationConsent, setCommunicationConsent] = useState(false);
    useEffect(() => {
        if (user) {
            setPolicyAccepted(user.acceptedTermsandPrivacy || false);
            setCommunicationConsent(user.acceptedCommunication || false);
        }
    }, [user]);

    const handlePolicyChange = async (e) => {
        const checked = e.target.checked;
        setPolicyAccepted(checked);

        try {
            const userAuth = cookies.get('auth');
            await axios.put(`${requestUrl}/user/details/update`, {
                acceptedTermsandPrivacy: checked,
            }, {
                headers: {
                    Authorization: `Bearer ${userAuth}`
                },
                withCredentials: true
            }
            );
            fetchUserDetails();
        } catch (err) {
            console.error("Failed to update policy consent", err);
        }
    };

    const handleCommunicationChange = async (e) => {
        const checked = e.target.checked;
        setCommunicationConsent(checked);

        try {
            const userAuth = cookies.get('auth');
            await axios.put(`${requestUrl}/user/details/update`, {
                acceptedCommunication: checked,
            }, {
                headers: {
                    Authorization: `Bearer ${userAuth}`
                },
                withCredentials: true
            }
            );
            fetchUserDetails();
        } catch (err) {
            console.error("Failed to update communication consent", err);
        }
    };

    return (
        <div className="p-4">
            <Form form={form} layout="vertical">
                <Form.Item>
                    <Checkbox checked={policyAccepted} onChange={handlePolicyChange}>
                        I have read the <a className='underline text-blue-500' href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and
                        <a className='underline text-blue-500' href="/terms-conditions" target="_blank" rel="noopener noreferrer"> Terms & Conditions</a> and accept them.
                    </Checkbox>
                </Form.Item>

                <Form.Item>
                    <Checkbox checked={communicationConsent} onChange={handleCommunicationChange}>
                        I agree to get updates on WhatsApp, Email, Phone, or any other communication channel.
                    </Checkbox>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UserConsent;

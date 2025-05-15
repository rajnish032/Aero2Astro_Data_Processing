"use client"

import React, { useState } from 'react';
import { AutoComplete, Input, Spin, message } from 'antd';
import axios from 'axios';
import { requestUrl } from '../../utils/constants';
import { CheckOutlined } from '@ant-design/icons';
import { IoMdLocate } from 'react-icons/io';

const AutoCompleteComponent = ({ setDetails,pinValid,setPinValid, details, otpSent }) => {
    const [areas, setAreas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [optionsVisible, setOptionsVisible] = useState(false);

    const handlePinChange = async (value) => {
        setDetails((prevDetails) => ({ ...prevDetails, areaPin: value }));
        
        if (value.length === 6) {
            setLoading(true);
            setOptionsVisible(true);
            try {
                const response = await axios.get(`${requestUrl}/pincode/${value}`);
                
                if (response.data.status === "Success") {
                    setAreas(response.data.postOffices);
                    
                    setDetails((prevDetails) => ({
                        ...prevDetails,
                        city: response.data.postOffices[0]?.District || '',
                        state: response.data.postOffices[0]?.State || '',
                        coordinates: {
                            lat: response.data.coordinates.lat || null,
                            lon: response.data.coordinates.lon || null
                        }
                    }));
                    
                    setPinValid(true);
                } else {
                    throw new Error('Invalid pincode');
                }
            } catch (error) {
                console.error('Error fetching pincode details:', error.message);
                setDetails((prevDetails) => ({
                    ...prevDetails,
                    city: '',
                    state: '',
                    area: '',
                    locality: '',
                    coordinates: null,
                }));
                setAreas([]);
                setPinValid(false);
                message.error('Could not fetch areas. Please try again.');
            } finally {
                setLoading(false);
            }
        } else {
            setDetails((prevDetails) => ({
                ...prevDetails,
                city: '',
                state: '',
                area: '',
                locality: '',
                coordinates: null,
            }));
            setAreas([]);
            setPinValid(false);
            setOptionsVisible(false);
        }
    };
    
    const handleAreaSelect = (value) => {
        const selectedArea = areas.find((area) => area.Name === value);
        console.log(selectedArea)
        if (selectedArea) {
            const { Name, District, State, Pincode } = selectedArea;
            setDetails((prevDetails) => (
                {
                ...prevDetails,
                locality: `${Pincode}-${Name}, ${District}, ${State}`,
                area: Name,
                city: District,
                state: State,
                coordinates: prevDetails.coordinates || null, 
            }));
        }
        setOptionsVisible(false);
        console.log(details)
    };
    

    return (
        <div>
            <AutoComplete
                size="large"
                className="w-full"
                options={areas.map((area) => ({
                    label: `${area.Pincode}-${area.Name}, ${area.District}, ${area.State}`,
                    value: area.Name,
                }))}
                onSelect={handleAreaSelect}
                onSearch={handlePinChange}
                value={details.areaPin}
                maxLength={6}
                disabled={otpSent}
                open={optionsVisible}
                placeholder ="Enter Area PIN Code"
                required
                
                suffixIcon={<IoMdLocate size={20} className='mx-1 text-gray-800' />}

                
                notFoundContent={loading ? <Spin size={15} className='mx-auto text-center my-1 w-full' /> : null}
            >
            
            </AutoComplete>
            {!pinValid && <p className="text-[10px] mx-2 text-red-500">Enter a valid pincode</p>}

            <div className="mt-4">
                <Input
                    size="large"
                    className='my-1'
                    value={details.locality || "No Area Selected"}
                    placeholder="Selected Area"
                    suffix={details.locality && <CheckOutlined style={{ color: "green" }} />}
                    disabled
                />
            </div>
        </div>
    );
};

export default AutoCompleteComponent;

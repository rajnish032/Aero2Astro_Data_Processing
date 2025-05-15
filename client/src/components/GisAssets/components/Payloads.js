"use client";
import { assetData } from "@/atom/states";
import AddButton from "@/components/smallComponents/AddButton";
import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import AddMoreModal from "./AddMoreModal";
import axios from "axios";
import { reqUrl } from "@/utils/constants";
import { toast } from "react-toastify";
import { getAllAssets } from "@/routes/gisAssets";
import { Spinner } from "@nextui-org/react";
import Cookies from "universal-cookie";
import { RxCross2 } from "react-icons/rx";

const cookies = new Cookies(null, { path: '/' });

const Payloads = () => {
    const [allAssets, setAllAssets] = useRecoilState(assetData);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [payloadsData, setPayloadsData] = useState([]);

    useEffect(() => {
        if (allAssets?.payloads?.length) {
            setPayloadsData(allAssets.payloads[0].payloads);
        }
    }, [allAssets]);

    
    const handleUpdatePayloads = async (newPayloads) => {
        const token = cookies.get('auth');
        if (!token) {
            return alert("You are not authorized kindly login");
        }
        try {
            setLoading(true);
            await axios.post(`${reqUrl}/gis/assets/payloads/update`, {
                data: newPayloads,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                  },
                  withCredentials: true,
            });
            toast.success("Updated Successfully");
            await getAllAssets(setAllAssets);
        } catch (error) {
            toast.error("Failed to Update");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // add payload 
    const addPayload = (newPayload) => {
        const updatedPayloads = [...payloadsData, newPayload];
        setPayloadsData(updatedPayloads);
        handleUpdatePayloads(updatedPayloads);
    };

    // remove payload 
    const removePayload = (payload) => {
        if (confirm(`Are you sure you want to remove the payload: ${payload}?`)) {
            const updatedPayloads = payloadsData.filter((p) => p !== payload);
            setPayloadsData(updatedPayloads);
            handleUpdatePayloads(updatedPayloads);
        }
    };

    return (
        <div className="p-2 bg-white shadow rounded-md">
            <AddMoreModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                handleSubmit={addPayload}
            />
            <h2 className="text-lg flex items-center gap-2 border-b font-bold px-5 rounded-sm inset-x-0 py-1 text-gray-800">
                Payloads
            </h2>
            <div className="my-3 p-2">
                {loading ? (
                    <div className="flex items-center w-full justify-center">
                        <Spinner />
                    </div>
                ) : (
                    <div className="flex items-center justify-center gap-3 flex-wrap">
                        {payloadsData.map((payload, id) => (
                            <div
                                key={id}
                                className={`text-xs bg-blue-600 font-medium shadow px-2 py-1 text-white flex items-center gap-1 rounded-full`}
                            >
                                {payload}
                                <RxCross2
                                    onClick={() => removePayload(payload)}
                                    className="ml-2 text-white cursor-pointer hover:text-red-500"
                                />
                            </div>
                        ))}
                        <AddButton onClick={() => setIsOpen(true)} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Payloads;

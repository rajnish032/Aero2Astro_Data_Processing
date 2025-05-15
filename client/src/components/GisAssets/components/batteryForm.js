"use client"
import React from 'react';
import { assetData } from '@/atom/states';
import RequiredStar from '@/components/smallComponents/RequiredStar';
import { Button, Modal, ModalBody, ModalContent, ModalHeader, Spinner } from '@nextui-org/react';
import { useRecoilState } from 'recoil';

const BatteryForm = ({ isOpen, setIsOpen, handleSubmit, loading, setData, data }) => {
    const [allAsset, setAllAsset] = useRecoilState(assetData);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <Modal hideCloseButton isOpen={isOpen} className="m-1">
            <ModalContent className="overflow-y-auto max-h-[70vh] w-full max-w-lg mx-auto">
                <ModalHeader className="flex gap-1 text-center">Add Battery</ModalHeader>
                <ModalBody>
                    <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-4 text-tiny md:text-sm">

                        <div className="flex flex-col md:flex-row items-center gap-3">
                            <div className="w-full">
                                <p>Battery ID <RequiredStar /></p>
                                <input
                                    name="batteryId"
                                    required
                                    className="p-2 w-full rounded bg-gray-100 text-gray-800"
                                    type="text"
                                    placeholder="Enter Battery ID"
                                    value={data.batteryId}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="w-full">
                                <p>Model Name <RequiredStar /></p>
                                <input
                                    name="modelName"
                                    required
                                    className="p-2 w-full rounded bg-gray-100 text-gray-800"
                                    type="text"
                                    placeholder="Model Name"
                                    value={data.modelName}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-3">
                            <div className="w-full">
                                <p>Serial ID <RequiredStar /></p>
                                <input
                                    name="serialId"
                                    required
                                    className="p-2 w-full rounded bg-gray-100 text-gray-800"
                                    type="text"
                                    placeholder="Serial ID"
                                    value={data.serialId}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="w-full">
                                <p>Discharge Cycles <RequiredStar /></p>
                                <input
                                    name="dischargeCycles"
                                    required
                                    className="p-2 w-full rounded bg-gray-100 text-gray-800"
                                    type="number"
                                    min={0}
                                    placeholder="Enter Discharge Cycles"
                                    value={data.dischargeCycles}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row items-center gap-3">
                            <div className="w-full">
                                <p>Equipment Status <RequiredStar /></p>
                                <select
                                    name="status"
                                    required
                                    className="p-2 w-full rounded bg-gray-100 text-gray-800"
                                    value={data.status}
                                    onChange={handleInputChange}
                                >
                                    <option value="" key="">Select Status</option>
                                    <option value="available" key="">Available</option>
                                    <option value="notavailable" key="">Not Available</option>
                                </select>
                            </div>
                            <div className="w-full">
                                <p>Purchase Date <RequiredStar /></p>
                                <input
                                    name="purchaseDate"
                                    required
                                    className="p-2 w-full rounded bg-gray-100 text-gray-800"
                                    type="date"
                                    value={data.purchaseDate}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <div>
                            <p>Remarks</p>
                            <textarea
                                name="remarks"
                                rows={3}
                                className="p-2 w-full resize-none rounded bg-gray-100 text-gray-800"
                                placeholder="Enter Remarks (if any)"
                                value={data.remarks}
                                onChange={handleInputChange}
                            ></textarea>
                        </div>

                        <div className="flex items-center justify-end gap-3 w-full p-4">
                            <Button color="danger" variant="light" onPress={() => {
                                setIsOpen(false);
                                setData({
                                    batteryId:"",
                                    modelName:"",
                                    serialId:"",
                                    status:"",
                                    purchaseDate:"",
                                    remarks:'',
                                    dischargeCycles:null,
                                });
                            }}>
                                Close
                            </Button>
                            {loading ? (
                                <Spinner />
                            ) : (
                                <Button color="primary" className="cursor-pointer" type="submit">
                                    Save
                                </Button>
                            )}
                        </div>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default BatteryForm;

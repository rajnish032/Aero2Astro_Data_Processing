"use client";
import React, { useContext, useState, useCallback } from "react";
import { FaUsers } from "react-icons/fa";
import { IoStatsChartSharp } from "react-icons/io5";
import { FaRegHandshake } from "react-icons/fa";
import { BsBan } from "react-icons/bs";
import { MdOutlinePendingActions } from "react-icons/md";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import { DataContext } from "@/Contexts/Rpto";
import StatWidget from "../Admin/components/StatWidget";

const Dashboard = () => {
    const { res, handleFileUpload, fileLoading } = useContext(DataContext) || {};

    const [fileName, setFileName] = useState("");
    const [fileData, setFileData] = useState([]);
    const [xlsxFile, setXlsxFile] = useState(null)
    const [loading, setLoading] = useState(false);

    // Handle file read and conversion to table data
    const readExcelFile = (file) => {
        setXlsxFile(file)
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
            setFileData(jsonData);
        };

        reader.readAsArrayBuffer(file);
    };

    // Handle drag-and-drop
    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            setFileName(file.name);
            readExcelFile(file);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [".xlsx"],
            "application/vnd.ms-excel": [".xls"],
        },
        multiple: false,
    });

    // Handle file upload
    const handleUpload = async () => {
        if (!fileData.length) return;
        setLoading(true);

        // Mock upload process (replace with actual API call)
        setTimeout(() => {
            alert("File uploaded successfully!");
            setLoading(false);
            setFileName("");
            setFileData([]);
        }, 1500);
    };

    // Handle file removal
    const handleRemoveFile = () => {
        setFileName("");
        setFileData([]);
        setXlsxFile(null)
    };

    return (
        <div>
            {/* Stat Widgets */}
            <div className="flex items-center justify-center gap-5 md:gap-4 flex-wrap my-10 md:my-4 md:p-2">
                <StatWidget
                    title={"Total"}
                    value={res?.totalCount}
                    icon={<FaUsers size={30} className="text-white" />}
                />
                <StatWidget
                    title={"Applied"}
                    value={res?.stats?.numberOfAppliedUsers}
                    icon={<IoStatsChartSharp size={30} className="text-white" />}
                />
                <StatWidget
                    title={"Review Pending"}
                    value={res?.stats?.numberOfAppliedUsers - res?.stats?.numberOfApprovedUser || 0}
                    icon={<MdOutlinePendingActions size={30} className="text-white" />}
                />
                <StatWidget
                    title={"Approved"}
                    value={res?.stats?.numberOfApprovedUser}
                    icon={<FaRegHandshake size={30} className="text-white" />}
                />
                <StatWidget
                    title={"Rejected"}
                    value={res?.stats?.numberOfRejectedUser}
                    icon={<BsBan size={30} className="text-white" />}
                />
            </div>

            {/* File Upload Section */}
            <div className="md:w-10/12 minh-[300px] mx-auto mt-10">
                <h2 className="text-lg font-semibold mb-4 text-center">
                    Upload an Excel File to Create Users
                </h2>

                <div className="border-2 border-gray-300 rounded-xl p-6 shadow-md bg-white">
                    <div {...getRootProps()} className={`p-4 border-2 border-dashed ${fileData.length > 0 ? "" : "h-48"} rounded-md ${isDragActive ? "border-blue-500 bg-blue-100" : "border-gray-300"}`}>
                        <input {...getInputProps()} />
                        {isDragActive ? (
                            <p className="text-blue-600">Drop the file here...</p>
                        ) : (
                            <p className="text-gray-500">Drag & drop a file here, or click to select a file</p>
                        )}
                    </div>

                    {/* File Preview */}
                    {fileName && (
                        <div className="mt-4 bg-gray-50 border border-gray-200 rounded-md p-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-800 font-medium truncate">
                                    {fileName}
                                </span>
                                <button
                                    disabled={fileLoading}
                                    onClick={handleRemoveFile}
                                    className="text-red-500 hover:text-red-700 transition"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Display Table */}
                            <div className="overflow-x-auto max-h-60 border-t border-gray-300">
                                <table className="w-full text-sm text-gray-700">
                                    <thead>
                                        {fileData.length > 0 && (
                                            <tr className="bg-gray-100">
                                                {fileData[0].map((header, index) => (
                                                    <th key={index} className="border p-2 text-left">
                                                        {header}
                                                    </th>
                                                ))}
                                            </tr>
                                        )}
                                    </thead>
                                    <tbody>
                                        {fileData.slice(1).map((row, rowIndex) => (
                                            <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                                {row.map((cell, cellIndex) => (
                                                    <td key={cellIndex} className="border p-2">
                                                        {cell}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Upload and Remove Buttons */}
                            <div className="flex justify-end gap-4 mt-4">
                                <button
                                    onClick={handleRemoveFile}
                                    className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold"
                                >
                                    Remove
                                </button>
                                <button
                                    onClick={() => handleFileUpload(xlsxFile)}
                                    disabled={fileLoading}
                                    className={`px-4 py-2 rounded-md font-semibold ${fileLoading
                                            ? "bg-gray-400 text-white cursor-not-allowed"
                                            : "bg-green-600 hover:bg-green-700 text-white"
                                        }`}
                                >
                                    {fileLoading ? "Uploading..." : "Upload"}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

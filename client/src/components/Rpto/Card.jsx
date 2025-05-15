"use client";

import React from 'react';
import { MdEmail, MdPhone } from 'react-icons/md';
import { FaLocationDot } from 'react-icons/fa6';

const Card = ({ item }) => {
    return (
        <div className="md:w-64 w-80 text-sm h-[275px] bg-white p-4 shadow-md rounded-md border">
            {/* Status */}
            <div className="flex items-center justify-between mb-2">
                <p className="text-white bg-gradient-to-r text-xs px-4 rounded-full py-1 from-blue-500 to-blue-700">
                    {item.role}
                </p>
                <div className="text-xs flex items-center gap-2">
                    <div
                        className={`w-2 h-2 rounded-full ${
                            item.status === 'pending'
                                ? 'bg-red-500'
                                : item.status === 'review'
                                ? 'bg-yellow-500 animate-ping'
                                : item.status === 'approved'
                                ? 'bg-green-500'
                                : 'hidden'
                        }`}
                    ></div>
                    {item.status === 'pending'
                        ? "Not Applied"
                        : item.status === 'review'
                        ? 'Review Pending'
                        : item.status === 'approved'
                        ? "Approved"
                        : "Unknown"}
                </div>
            </div>

            <hr className="my-2" />

            {/* Details */}
            <div className="p-2 font-semibold text-xs">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-blue-500">
                    <img
                        src={item.avatar || "https://img.freepik.com/premium-vector/avatar-flat-icon-human-white-glyph-blue-background_822686-239.jpg"}
                        alt={item.fullName}
                        className="w-full h-full object-cover"
                    />
                </div>

                <p className="font-bold mt-2">{item.fullName}</p>
                <p className="flex items-center mt-1 gap-2">
                    <MdEmail /> {item.email}
                </p>
                <p className="flex items-center mt-1 gap-2">
                    <MdPhone /> {item.phone?.countryCode} {item.phone?.number}
                </p>
                <p className="flex items-center mt-1 gap-2">
                    <FaLocationDot /> {item.locality}
                </p>
                <p className="mt-1">City: {item.city}</p>
                <p className="mt-1">State: {item.state}</p>
            </div>
        </div>
    );
};

export default Card;

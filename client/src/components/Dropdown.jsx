"use client"

import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { cities } from "../data/cities";

const Selector = ({setUserDetails}) => {
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

 
  return (
    <div className="w-full font-medium  relative">
      <div
        onClick={() => setOpen(!open)}
        className={`bg-white w-full p-3 my-2 relative border-2 flex items-center justify-between rounded ${
          !selected && "text-gray-500"
        }`}
      >
        {selected
          ? selected?.length > 25
            ? selected?.substring(0, 25) + "..."
            : selected
          : "Select City"}
        <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
      </div>
      <ul
        className={`bg-white mt-2 w-full absolute z-10 top-12 shadow-lg rounded-md overflow-y-auto ${
          open ? "max-h-60" : "max-h-0"
        } `}
      >
        <div className="flex items-center px-2 sticky top-0 bg-white">
          <AiOutlineSearch size={18} className="text-gray-700" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            placeholder="Enter city name"
            className="placeholder:text-gray-400 p-2 outline-none"
          />
        </div>
        {cities.filter((item, index) => cities.findIndex(i => i.label === item.label) === index).map((i) => (
          <li
            key={i?.id}
            className={`p-2 text-sm hover:bg-sky-600 hover:text-white
            ${
              i?.label?.toLowerCase() === selected?.toLowerCase() &&
              "bg-sky-600 text-white"
            }
            ${
              i?.label?.toLowerCase().startsWith(inputValue)
                ? "block"
                : "hidden"
            }`}
            onClick={() => {
              if (i?.label?.toLowerCase() !== selected.toLowerCase()) {
                setSelected(i?.label);
                setUserDetails((prev)=>({...prev,city:i.label}))
                setOpen(false);
                setInputValue("");
              }
            }}
          >
            {i?.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Selector;


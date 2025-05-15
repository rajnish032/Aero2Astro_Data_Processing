import React from 'react';
import { MdOutlineWidgets } from "react-icons/md";

const Widgets = ({color,value,title}) => {
    return (
        <div className={`w-[250px] flex justify-between p-4 border-gray-300 border-[2px] h-[100px] 
        text-xs rounded-md ${color}
s               shadow-lg`}>
       <MdOutlineWidgets size={30} className='text-white'/>
       <div>
       <p className='text-right text-white font-semibold text-2xl'> {title}</p>
       <p className=' text-right font-semibold my-1 text-white text-xl'>{value}</p>
       </div>

   </div>
    );
}

export default Widgets;

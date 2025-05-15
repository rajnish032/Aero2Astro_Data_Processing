import React from 'react';
import { MdOutlineComputer } from "react-icons/md";
import { useRecoilState } from 'recoil';
import { gisData } from '@/atom/states';

const Softwares = () => {
    const [currUser, setCurrentUser] = useRecoilState(gisData)
    
    return (
        <div className="rounded-md shadow relative min-h-20  bg-white ">
            <h2 className="text-lg flex items-center gap-2 border-b font-bold px-5 rounded-sm  inset-x-0 py-1 text-gray-800">
                <MdOutlineComputer className="" />  Softwares
            </h2>

            <div className='flex gap-3 px-2 md:px-8 py-4 h-full items-center  flex-wrap'>
                {currUser?.skills?.controlStations?.map((i,id) =>
                    <div key={id} className='bg-blue-600 text-white font-medium text-sm rounded-full px-2 py-1'>
                        {i}
                    </div>
                )}
               

            </div>
            


        </div>
    );
}

export default Softwares;

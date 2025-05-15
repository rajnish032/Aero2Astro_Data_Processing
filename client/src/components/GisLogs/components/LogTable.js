"use client"
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { logData, gisData } from '@/atom/states';
import { LogRow } from './LogRow';
import { usePathname, useRouter } from 'next/navigation';
import { Spinner } from '@nextui-org/react';

const LogTable = ({ allLogs,handleDeleteLog, setAllLog, className="" }) => {
    const [range, setRange] = useState(10);
    const [currUser] = useRecoilState(gisData);
    const pathname = usePathname();

    return (
<>
      { !currUser ?
      <div className='flex items-center justify-center h-40'>
          <Spinner/>
      </div> 
        :
        <div className='flex items-center justify-center'>
            {(!allLogs || allLogs.length === 0) ? (
                <div className='text-center  text-sm'>No Records found</div>
            ) : (
                <div className={`w-full ${className}`}>
                    <div className="sticky top-0 text-tiny md:text-sm grid md:grid-cols-8 grid-cols-2 gap-3 bg-stone-800 text-white font-medium md:rounded-t p-2">
                        <div className="text-left">Flight Name</div>
                        <div className='max-md:hidden'>Date</div>
                        <div className='max-md:hidden'>Location</div>
                        <div>Duration</div>
                        <div className='max-md:hidden'>Flight Type</div>
                        <div className='max-md:hidden'>Range Covered</div>
                        <div className='max-md:hidden'>Project Type</div>
                        <div className='max-md:hidden'></div>
                    </div>{
                        [...allLogs].reverse()?.slice(0, range).map((i) => (


                            <LogRow handleDeleteLog={handleDeleteLog} key={i._id} log={i} logId={i._id} />
                        ))}
                    {
                        pathname !== `/gis/dashboard/${currUser?.fullName?.toLowerCase()?.replace(" ", "-")}` && <div className='flex items-center text-xs p-3 justify-center'>
                            {
                                allLogs.length <= range ? "That's All "
                                    :
                                    <button onClick={() => setRange((p) => p + 5)} className='bg-blue-500 px-5 my-5 py-1 rounded-full hover:bg-blue-700 text-white text-sm font-semibold'>Load More</button>
                            }
                        </div>}
                </div>
            )}
        </div >}
</>

    );
};

export default LogTable;

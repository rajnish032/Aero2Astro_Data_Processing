"use client"

import React, { useContext } from 'react';
import { Skeleton } from 'antd';
import { DataContext } from '@/Contexts/Rpto';
import Card from './Card';
const GridView = ({allUsers}) => {
    const {  dataLoading } = useContext(DataContext)

    return (
        <div className='p-3 flex justify-center gap-10 items-center  flex-wrap my-10'>

            {

                dataLoading ? <Skeleton active /> :

                    allUsers?.map((item) => <Card key={item._id} item={item} />)

            }
           
        </div>
    );
}

export default GridView;

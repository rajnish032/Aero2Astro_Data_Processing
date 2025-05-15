import React from 'react';
import Equipments from './components/equipments';
import Batteries from './components/Batteries';
import Payloads from './components/Payloads';

const AssetsMain = () => {
    return (
        <div className=''>
            <Equipments/>


            <div className='my-5'>
                <Payloads/>
            </div>
            <div className='my-5'>
                <Batteries/>
            </div>
        </div>
    );
}

export default AssetsMain;

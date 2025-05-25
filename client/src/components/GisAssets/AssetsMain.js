import React from 'react';
import Equipments from './components/equipments';
import Batteries from './components/Batteries';


const AssetsMain = () => {
    return (
        <div className=''>
            <Equipments/>
            
            <div className='my-5'>
                <Batteries/>
            </div>
        </div>
    );
}

export default AssetsMain;

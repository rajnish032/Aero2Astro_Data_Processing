"use client"

import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

const EnterPhone = ({ setDetails ,setIsPhoneVerified}) => {
   

    useEffect(() => {
        const handlePhoneEmailListener = (userObj) => {
            const { user_country_code, user_phone_number } = userObj;
            toast.success("Phone has been Verified");
          
            setDetails((prevState) => ({ ...prevState, phoneNumber: user_phone_number,countryCode:user_country_code }));
            setIsPhoneVerified(true);
        };

        window.phoneEmailListener = handlePhoneEmailListener;

        return () => {
            delete window.phoneEmailListener;
        };
    }, []);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://www.phone.email/sign_in_button_v1.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

  
    return (
        <div className='text-center items-center h-[300px]  relative'>

            <div className='w-fit h-fit mx-auto relative mt-10'>
                <div className="pe_signin_button " data-client-id="11397842142995038206"></div>
            </div>

        </div>
    );
};

export default EnterPhone;
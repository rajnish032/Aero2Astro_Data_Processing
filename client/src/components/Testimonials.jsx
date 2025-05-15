"use client"

import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import pilot1 from "../assets/Testimonials/pilot1.png"
import pilot2 from "../assets/Testimonials/pilot2.png"
import pilot3 from "../assets/Testimonials/pilot3.png"

const testimonials = [
    {
      id: 1,
      name: 'Chandru',
      location:"Tirchy",
      role: 'UAV Drone Pilot',
      image: pilot1, 
      feedback: 'Aero to astro is really awesome. Whenever I am facing a problem in the field they provide a immediate costumer support and field support. And the payments are also cleared at correct timeline. our working experience also good 👍🏻'
    },
    {
      id: 2,
      name: 'Karthikeyan',
      location:"Chennai",
      role: 'UAV Drone Pilot',
      image: pilot2,  
      feedback: 'Hi friends,This is an honest review of my past work with this team. They helped me complete a project, and this website was very helpful. You can take on projects and hire professionals from different categories. The website looks neat and clean, and it is very easy to use.'
    },
    {
      id: 3,
      name: 'Karthik',
      location:"Chennai",
      role: 'UAV Drone Pilot',
      image: pilot3, 
      feedback: 'Working environment is very good and also new people can learn a lot. Regular and standardized payouts for all pilots. Supportive management encourages professional growth and development. Team collaboration is highly valued, fostering a positive and productive atmosphere.'
    },

  ];

const Testimonials = () => {
    const [currIndex, setCurrIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrIndex(prevIndex => (prevIndex + 1) % testimonials.length);
        }, 3000); 

        return () => clearInterval(interval);
    }, []);

    const nextTestimonial = () => {
        setCurrIndex((currIndex + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrIndex((currIndex - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section className='p-3 min-h-[500px] my-10 pb-10 bg-[#0a0a09]'>
            <h2 className='lg:text-7xl text-4xl text-white text-center my-10 mb-16'>
                What Our Partners Say
            </h2>
            <div className='min-h-[400px] relative max-w-[700px] mx-auto border-2 border-indigo-500 rounded-2xl transition-transform duration-500'>
                <div className='w-28 h-28 relative bottom-6'>
                    <div className='bg-blue-500 right-2 -top-3 w-28 h-28 rounded-full absolute'></div>
                    <Image src={testimonials[currIndex].image} alt={`${testimonials[currIndex].name} image`} className='w-full h-full z-10 absolute bg-white rounded-full ring-4 p-1' />
                </div>
                <div className='text-center relative bottom-5'>
                    <p className='text-3xl  text-gray-500 font-semibold'>{testimonials[currIndex].name}</p>
                    <p className=' text-gray-600 font-semibold'>{testimonials[currIndex].location}</p>
                    <p className='text-gray-600'>{testimonials[currIndex].role}</p>
                    <div className='text-gray-400 mt-5 max-w-[80%] text-center mx-auto md:text-lg text-sm'>
                        <p>{testimonials[currIndex].feedback}</p>
                    </div>
                </div>
            </div>

            <div className='flex items-center gap-3 justify-center my-3'>
                {testimonials.map((testimonial, index) => (
                    <div
                        key={testimonial.id}
                        onClick={() => setCurrIndex(index)}
                        className={`w-4 h-4 rounded-full border border-blue-500 ${index === currIndex ? 'bg-blue-500' : 'bg-transparent'}`}
                    ></div>
                ))}
            </div>

            <div className='h-20 py-2 flex items-center justify-center gap-5'>
                <button onClick={prevTestimonial} className='bg-[#0055d4] hover:bg-blue-400 w-16 h-16 rounded-full font-bold'><LeftOutlined size={40}/></button>
                <button onClick={nextTestimonial} className='bg-[#0055d4] hover:bg-blue-400 w-16 h-16 rounded-full font-bold'><RightOutlined size={40}/></button>
            </div>
        </section>
    );
};

export default Testimonials;

import React, { useState } from 'react';

const AccordionItem = ({ title, description, isOpen, onClick }) => (
    <div className="border-b border-blue-500 rounded-b-xl my-5  ">
        <h2 className="mb-0">
            <button
                className="flex items-center text-lg bg-[#100f0f] hover:text-blue-500 rounded-xl my-1 justify-between w-full p-4 text-left "
                onClick={onClick}
            >
                <span className={`${isOpen?"text-blue-400":""}`}>{title}</span>
                <span>{isOpen ? '-' : '|'}</span>
            </button>
        </h2>
        {isOpen && (
            <div className="p-4 bg-[#181616] rounded-b-xl  ">
                {description}
            </div>
        )}
    </div>
);

const AccordionStepper = ({ items,openIndex,setOpenIndex }) => {

    const handleToggle = index => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="w-full">
            {items?.map((item, index) => (
                <AccordionItem
                    key={index}
                    title={item.title}
                    description={item.description}
                    isOpen={openIndex === index}
                    onClick={() => handleToggle(index)}
                />
            ))}
        </div>
    );
};

export default AccordionStepper;

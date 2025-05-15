"use client"

import { useEffect, useState } from "react";

const TypingEffect = () => {
    const words = ["Drone Data", "Flight records,", "Assets,", "Projects"];
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [fade, setFade] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(true);
            setTimeout(() => {
                setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
                setFade(false);
            }, 1000); 
        }, 3000); 

        return () => clearInterval(interval);
    }, []);

    return (
        <span className={`inline-block font-medium text-blue-600 transition-opacity duration-1000 ${fade ? 'opacity-0' : 'opacity-100'}`}>
            {words[currentWordIndex]}
        </span>
    );
}

export default TypingEffect
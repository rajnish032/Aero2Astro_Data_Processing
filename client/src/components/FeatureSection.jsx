import React, { useEffect, useState } from "react";

const FeatureSection = ({ features }) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <div className="bg-black text-white py-20 px-6 md:px-20">
      <h2 className="text-5xl md:text-6xl font-bold text-center text-white">
        <span className="inline-block font-medium bg-gradient-to-r py-1 mx-2 from-pink-900 to-blue-500 bg-clip-text text-transparent">
                Why join Aero2Astro's Geospatial Network ?
              </span>
        
      </h2>
      <div className="mt-12">
        {features.map((feature, index) => (
          <div
            key={feature.id}
            className={`flex flex-col md:flex-row items-center mb-16 ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            <div className="w-full md:w-1/2">
              <img
                src={feature.image}
                alt={feature.alt}
                width={600}
                height={400}
                className={`rounded-lg shadow-lg ${
                  isHydrated ? "animate-slideIn" : ""
                }`}
              />
            </div>
            <div className="w-full md:w-1/2 md:px-12 mt-6 md:mt-0">
              <h2 className="text-3xl md:text-4xl font-bold mt-2">
                {feature.title}
              </h2>
              <p className="mt-4 text-lg leading-relaxed">{feature.description}</p>
              <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300">
                Read the story →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;


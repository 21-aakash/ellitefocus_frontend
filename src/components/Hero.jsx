import React from "react";
import back from '../assets/logo.jpg'; // Import your background image
import { useNavigate } from "react-router-dom";

const Hero2 = () => {
  const navigate = useNavigate(); // Hook for navigation
  const handleClick = () => {
    navigate('/register'); // Navigate to the /register route
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${back})` }}
      ></div>

      <div className="relative h-full flex flex-col items-center justify-center px-4 py-6 md:px-6 lg:px-8 lg:py-12 text-center">
        
        {/* Centered Content */}
        <div className="max-w-2xl h-auto">
          {/* Lottie Player */}
        

          <h4 className="text-2xl md:text-2xl lg:text-2xl xl:text-2xl font-montserrat tracking-tight leading-tight text-gray-900 dark:text-white mb-4">
            Making life better with
          </h4>

          <h1 className="text-5xl  md:text-7xl lg:text-9xl font-outfit font-thin text-gray-900 dark:text-white mb-4">
            eliteFocus<sup className="text-2xl md:text-4xl align-super">™</sup>
          </h1>

          <div className="border-b-4 border-blue-500 w-3/4 mx-auto my-4"></div>

          <p className="mt-4 text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-400 mb-4">
            Our app's superpower? Making you look more organized than you actually are!
          </p>
          
          <p className="text-sm md:text-base lg:text-lg text-gray-800 font-semibold font-manrope mb-8">
            A
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 ml-2 bg-no-repeat bg-bottom p-1 text-white">
              ValueBound 
            </span>{" "}
            Product
          </p>

          <div className="flex flex-col md:flex-row gap-3 items-center justify-center">
            <button onClick={handleClick} className="px-4 py-2 md:px-6 md:py-3 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg">
              Get Started
            </button>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Hero2;

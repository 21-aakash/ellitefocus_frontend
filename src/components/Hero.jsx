import React from "react";
import back from '../assets/logo.jpg'; // Import your background image
import st from "../assets/st.png"
import graph from "../assets/graph.png"
import { useNavigate } from "react-router-dom";

import testimonialImage1 from "../assets/kushagra.jpeg"; // Example image import
import testimonialImage2 from "../assets/sid.jpeg"; // Another example image import
import testimonialImage3 from "../assets/prachi.jpeg"; // Example image import
import testimonialImage4 from "../assets/leena.jpeg"; // Another example image import


const Hero2 = () => {
  const navigate = useNavigate(); // Hook for navigation
  const handleClick = () => {
    navigate('/register'); // Navigate to the /register route
  };


 
  


  return (
   
    <div>
    
   
    <div className="relative h-screen overflow-hidden">
      
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat "
         style={{ backgroundImage: `url(${back})` }}
      ></div>

      <div className="relative h-full flex flex-col items-center justify-center px-4 py-6 md:px-6 lg:px-8 lg:py-12 text-center">
        
        {/* Centered Content */}
        <div className="max-w-2xl h-auto">
          {/* Lottie Player */}
        

          <h4 className="text-2xl md:text-2xl lg:text-2xl xl:text-2xl font-montserrat tracking-tight leading-tight text-gray-900 dark:text-white mb-4">
            Making life better with
          </h4>

          <h1 className="text-5xl  md:text-7xl lg:text-9xl font-outfit dark:text-white mb-4">
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




    <div className="py-16 px-4 md:px-8 lg:px-16">
      {/* Section 1 */}
      <div className="flex flex-col md:flex-row items-center mb-12">
        {/* Image Section */}
        <div className="w-full md:w-1/2 p-4">
          <img 
            src={st} 
            alt="Section 1 Image" 
            className="w-full h-auto rounded-lg shadow-lg opacity-90 hover:opacity-100 transition-opacity duration-300" 
          />
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 p-4">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Amazing Feature</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Discover how this feature can help you achieve more in less time. Our intuitive design and user-friendly interface ensure that you can focus on what matters most.
          </p>
        </div>
      </div>

      {/* Section 2 */}
      <div className="flex flex-col md:flex-row items-center">
        {/* Text Section */}
        <div className="w-full md:w-1/2 p-4 order-2 md:order-1">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Analyze Your Progress</h3>
          <p className="text-gray-600 dark:text-gray-300">
            With our powerful analytics tools, you can track your performance and make data-driven decisions to enhance your productivity and achieve your goals.
          </p>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 p-4 order-1 md:order-2">
          <img 
            src={graph} 
            alt="Section 2 Image" 
            className="w-full h-auto rounded-lg shadow-lg opacity-90 hover:opacity-100 transition-opacity duration-300" 
          />
        </div>









      </div>
    </div>


  
    <div className="py-16 px-4 md:px-8 lg:px-16">
  {/* Hero Section */}
  <div className="text-center mb-12">
    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">What Our Users Say</h1>
    <p className="text-lg text-gray-600">Real testimonials from our happy users.</p>
  </div>

  {/* Testimonials Section */}
  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
    <div className="flex flex-col md:flex-row items-center text-center md:text-left p-6 bg-white shadow-lg rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <img src={testimonialImage1} alt="" className="w-24 h-24 rounded-full object-cover mb-4 md:mb-0 md:mr-6" />
      <div>
        <p className="text-lg italic text-gray-700">"If procrastination was an Olympic sport, this app would make me retire!"</p>
        <p className="mt-4 text-sm font-semibold text-gray-900">Kushagra Jain</p>
        <p className="text-sm text-gray-500">Co-founder, Xolve</p>
      </div>
    </div>

    <div className="flex flex-col md:flex-row items-center text-center md:text-left p-6 bg-white shadow-lg rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <img src={testimonialImage2} alt="" className="w-24 h-24 rounded-full object-cover mb-4 md:mb-0 md:mr-6" />
      <div>
        <p className="text-lg italic text-gray-700">"This app made me so organized, my mom is now asking it for tips!"</p>
        <p className="mt-4 text-sm font-semibold text-gray-900">Siddhart Verma</p>
        <p className="text-sm text-gray-500">Senior Product Manager, Maximus</p>
      </div>
    </div>

    <div className="flex flex-col md:flex-row items-center text-center md:text-left p-6 bg-white shadow-lg rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <img src={testimonialImage3} alt="" className="w-24 h-24 rounded-full object-cover mb-4 md:mb-0 md:mr-6" />
      <div>
        <p className="text-lg italic text-gray-700">"This app is like coffee for my productivity—can't function without it!"</p>
        <p className="mt-4 text-sm font-semibold text-gray-900">Prachi Gupta</p>
        <p className="text-sm text-gray-500">CEO, Inscribe</p>
      </div>
    </div>

    <div className="flex flex-col md:flex-row items-center text-center md:text-left p-6 bg-white shadow-lg rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <img src={testimonialImage4} alt="" className="w-24 h-24 rounded-full object-cover mb-4 md:mb-0 md:mr-6" />
      <div>
        <p className="text-lg italic text-gray-700">"This app has completely transformed the way I manage my tasks. I can’t imagine my life without it now!"</p>
        <p className="mt-4 text-sm font-semibold text-gray-900">Leena Ghatiya</p>
        <p className="text-sm text-gray-500">Senior SDE @Atlassian</p>
      </div>
    </div>
  </div>
</div>




   















<footer className="bg-gray-900 text-white p-8 ">
<div className="container mx-auto">
  <div className="flex flex-wrap justify-between">
    {/* Company Info */}
    <div className="w-full sm:w-1/3 text-center sm:text-left mb-6">
      <h2 className="text-xl font-semibold mb-2">eliteFocus</h2>
      <p className="text-sm text-gray-400">Making life better with eliteFocus Task Assistant.</p>
      <p className="text-sm text-gray-400 mt-2">We focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
    </div>
    
  

    {/* Contact Info */}
    <div className="w-full sm:w-1/3 text-center sm:text-right mb-6">
      <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
      <p className="text-sm text-gray-400">123, Vijay Street, Tech City</p>
      <p className="text-sm text-gray-400">Email: support@ellitefocus.com</p>
      <p className="text-sm text-gray-400">Phone: +1 (555) 123-4567</p>
    </div>
  </div>

  <div className="border-t border-gray-700 mt-8 pt-6 text-center">
    <div className="flex justify-center mb-4">
      {/* Social Media Icons */}
      <a href="#" className="mx-2 text-gray-400 hover:text-white"><i className="fab fa-facebook fa-lg"></i></a>
      <a href="#" className="mx-2 text-gray-400 hover:text-white"><i className="fab fa-twitter fa-lg"></i></a>
      <a href="#" className="mx-2 text-gray-400 hover:text-white"><i className="fab fa-linkedin fa-lg"></i></a>
      <a href="#" className="mx-2 text-gray-400 hover:text-white"><i className="fab fa-instagram fa-lg"></i></a>
    </div>

    <p className="text-sm text-gray-400">&copy; 2024 ellitefocus. All Rights Reserved.</p>
    <p className="text-sm text-gray-400 mt-2">Built with ♥ using React and Spring Boot</p>
  </div>
</div>
</footer>


   </div>
  


  );
};

export default Hero2;












// import React from "react";
// import back from '../assets/logo.jpg'; // Import your background image
// import st from "../assets/st.png"
// import graph from "../assets/graph.png"
// import { useNavigate } from "react-router-dom";
// import testimonialImage1 from "../assets/kushagra.jpeg"; // Example image import
// import testimonialImage2 from "../assets/sid.jpeg"; // Another example image import
// import testimonialImage3 from "../assets/prachi.jpeg"; // Example image import
// import testimonialImage4 from "../assets/leena.jpeg"; // Another example image import


// const Hero2 = () => {
//   const navigate = useNavigate(); // Hook for navigation
//   const handleClick = () => {
//     navigate('/register'); // Navigate to the /register route
//   };

//   return (
   
//     <div>
    
   
//     <div className="relative h-screen overflow-hidden">
//       {/* Background Image */}
//       <div
//         className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat"
//         style={{ backgroundImage: `url(${back})` }}
//       ></div>

//       <div className="relative h-full flex flex-col items-center justify-center px-4 py-6 md:px-6 lg:px-8 lg:py-12 text-center">
        
//         {/* Centered Content */}
//         <div className="max-w-2xl h-auto">
//           {/* Lottie Player */}
        

//           <h4 className="text-2xl md:text-2xl lg:text-2xl xl:text-2xl font-montserrat tracking-tight leading-tight text-gray-900 dark:text-white mb-4">
//             Making life better with
//           </h4>

//           <h1 className="text-5xl  md:text-7xl lg:text-9xl font-outfit font- text-gray-900 dark:text-white mb-4">
//             eliteFocus<sup className="text-2xl md:text-4xl align-super">™</sup>
//           </h1>

//           <div className="border-b-4 border-blue-500 w-3/4 mx-auto my-4"></div>

//           <p className="mt-4 text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-400 mb-4">
//             Our app's superpower? Making you look more organized than you actually are!
//           </p>
          
//           <p className="text-sm md:text-base lg:text-lg text-gray-800 font-semibold font-manrope mb-8">
//             A
//             <span className="bg-gradient-to-r from-indigo-600 to-purple-600 ml-2 bg-no-repeat bg-bottom p-1 text-white">
//               ValueBound 
//             </span>{" "}
//             Product
//           </p>

//           <div className="flex flex-col md:flex-row gap-3 items-center justify-center">
//             <button onClick={handleClick} className="px-4 py-2 md:px-6 md:py-3 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg">
//               Get Started
//             </button>
//           </div>
//         </div>

        
//       </div>


//     </div>




//     <div className="py-16 px-4 md:px-8 lg:px-16">
//       {/* Section 1 */}
//       <div className="flex flex-col md:flex-row items-center mb-12">
//         {/* Image Section */}
//         <div className="w-full md:w-1/2 p-4">
//           <img 
//             src={st} 
//             alt="Section 1 Image" 
//             className="w-full h-auto rounded-lg shadow-lg opacity-90 hover:opacity-100 transition-opacity duration-300" 
//           />
//         </div>

//         {/* Text Section */}
//         <div className="w-full md:w-1/2 p-4">
//           <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Amazing Feature</h3>
//           <p className="text-gray-600 dark:text-gray-300">
//             Discover how this feature can help you achieve more in less time. Our intuitive design and user-friendly interface ensure that you can focus on what matters most.
//           </p>
//         </div>
//       </div>

//       {/* Section 2 */}
//       <div className="flex flex-col md:flex-row items-center">
//         {/* Text Section */}
//         <div className="w-full md:w-1/2 p-4 order-2 md:order-1">
//           <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Analyze Your Progress</h3>
//           <p className="text-gray-600 dark:text-gray-300">
//             With our powerful analytics tools, you can track your performance and make data-driven decisions to enhance your productivity and achieve your goals.
//           </p>
//         </div>

//         {/* Image Section */}
//         <div className="w-full md:w-1/2 p-4 order-1 md:order-2">
//           <img 
//             src={graph} 
//             alt="Section 2 Image" 
//             className="w-full h-auto rounded-lg shadow-lg opacity-90 hover:opacity-100 transition-opacity duration-300" 
//           />
//         </div>
//       </div>
//     </div>

//  {/* Testimonials Section */}
//   <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
//     <div className="flex flex-col md:flex-row items-center text-center md:text-left p-6 bg-white shadow-lg rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
//       <img src={testimonialImage1} alt="" className="w-24 h-24 rounded-full object-cover mb-4 md:mb-0 md:mr-6" />
//       <div>
//         <p className="text-lg italic text-gray-700">"If procrastination was an Olympic sport, this app would make me retire!"</p>
//         <p className="mt-4 text-sm font-semibold text-gray-900">Kushagra Jain</p>
//         <p className="text-sm text-gray-500">Co-founder, Xolve</p>
//       </div>
//     </div>

//     <div className="flex flex-col md:flex-row items-center text-center md:text-left p-6 bg-white shadow-lg rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
//       <img src={testimonialImage2} alt="" className="w-24 h-24 rounded-full object-cover mb-4 md:mb-0 md:mr-6" />
//       <div>
//         <p className="text-lg italic text-gray-700">"This app made me so organized, my mom is now asking it for tips!"</p>
//         <p className="mt-4 text-sm font-semibold text-gray-900">Siddhart Verma</p>
//         <p className="text-sm text-gray-500">Senior Product Manager, Maximus</p>
//       </div>
//     </div>

//     <div className="flex flex-col md:flex-row items-center text-center md:text-left p-6 bg-white shadow-lg rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
//       <img src={testimonialImage3} alt="" className="w-24 h-24 rounded-full object-cover mb-4 md:mb-0 md:mr-6" />
//       <div>
//         <p className="text-lg italic text-gray-700">"This app is like coffee for my productivity—can't function without it!"</p>
//         <p className="mt-4 text-sm font-semibold text-gray-900">Prachi Gupta</p>
//         <p className="text-sm text-gray-500">CEO, Inscribe</p>
//       </div>
//     </div>

//     <div className="flex flex-col md:flex-row items-center text-center md:text-left p-6 bg-white shadow-lg rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
//       <img src={testimonialImage4} alt="" className="w-24 h-24 rounded-full object-cover mb-4 md:mb-0 md:mr-6" />
//       <div>
//         <p className="text-lg italic text-gray-700">"This app has completely transformed the way I manage my tasks. I can’t imagine my life without it now!"</p>
//         <p className="mt-4 text-sm font-semibold text-gray-900">Leena Ghatiya</p>
//         <p className="text-sm text-gray-500">Senior SDE @Atlassian</p>
//       </div>
//     </div>
//   </div>
// </div>


// <footer className="bg-gray-900 text-white p-8 ">
// <div className="container mx-auto">
//   <div className="flex flex-wrap justify-between">
//     {/* Company Info */}
//     <div className="w-full sm:w-1/3 text-center sm:text-left mb-6">
//       <h2 className="text-xl font-semibold mb-2">eliteFocus</h2>
//       <p className="text-sm text-gray-400">Making life better with eliteFocus Task Assistant.</p>
//       <p className="text-sm text-gray-400 mt-2">We focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
//     </div>
    
  

//     {/* Contact Info */}
//     <div className="w-full sm:w-1/3 text-center sm:text-right mb-6">
//       <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
//       <p className="text-sm text-gray-400">123, Vijay Street, Tech City</p>
//       <p className="text-sm text-gray-400">Email: support@ellitefocus.com</p>
//       <p className="text-sm text-gray-400">Phone: +1 (555) 123-4567</p>
//     </div>
//   </div>

//   <div className="border-t border-gray-700 mt-8 pt-6 text-center">
//     <div className="flex justify-center mb-4">
//       {/* Social Media Icons */}
//       <a href="#" className="mx-2 text-gray-400 hover:text-white"><i className="fab fa-facebook fa-lg"></i></a>
//       <a href="#" className="mx-2 text-gray-400 hover:text-white"><i className="fab fa-twitter fa-lg"></i></a>
//       <a href="#" className="mx-2 text-gray-400 hover:text-white"><i className="fab fa-linkedin fa-lg"></i></a>
//       <a href="#" className="mx-2 text-gray-400 hover:text-white"><i className="fab fa-instagram fa-lg"></i></a>
//     </div>

//     <p className="text-sm text-gray-400">&copy; 2024 ellitefocus. All Rights Reserved.</p>
//     <p className="text-sm text-gray-400 mt-2">Built with ♥ using React and Spring Boot</p>
//   </div>
// </div>
// </footer>


//    </div>
  


//   );
// };

// export default Hero2;








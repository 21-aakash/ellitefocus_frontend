


import React, { useState } from "react";
import { useAuth } from "./context/AuthContext"; // Update the path as needed
import logo from "../assets/target (2).png";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth(); // Destructure all needed auth functions
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const avatars = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeBGZHsTpIn5ATxnOecH-CTE1EqSFpdLQ2bQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOUcIfLx52km-4juGIkHokHxTvKgZCWTZHpg&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKIgMnN5GceDQMx_B9GbeHSUvNeY4S3p38hQ&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyfVutx1L9LX19cD3xXITzLfB9St39BnJ7o_M5FvfrGWjotHe47W4HtPI00EU8-AifX-g&usqp=CAU",
  ];

  return (
    <nav className="p-4 bg-gray-900">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Menu Toggle for Mobile */}
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 inline-block mr-2" />
          <a href="/" className="text-2xl text-white">eliteFocus™</a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="lg:hidden flex items-center px-3 py-2 border border-gray-700 rounded text-gray-400 hover:text-yellow-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>

        {/* Navigation Links */}
        <div className={`lg:flex lg:space-x-8 items-center ${isMenuOpen ? 'block' : 'hidden'} w-full lg:w-auto mt-4 lg:mt-0`}>
          <div className="flex flex-col lg:flex-row items-center lg:items-center lg:space-x-8 gap-2 lg:gap-4 text-center">
            {isAuthenticated ? (
              <>
                {/* User Info and Logout Button */}
                {user && (
                  <div className="flex items-center space-x-4 ml-6 text-white">
                    <img
                      src={avatars[Math.floor(Math.random() * avatars.length)]}
                      alt="User Avatar"
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex flex-col">
                      <p className="font-semibold text-lg uppercase">Hi {user.name}!</p>
                      <p className="text-sm">{user.email}</p>
                    </div>
                  </div>
                )}
                <button
                  onClick={logout}
                  className="inline-block px-2 py-1 text-gray-300 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg  font-medium rounded-md transition-all
"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Guest Links */}
                <a href="/features" className="text-gray-300 hover:text-yellow-300 transition">Features</a>
                <a href="/resources" className="text-gray-300 hover:text-yellow-300 transition">Resources</a>
                <a href="/pricing" className="text-gray-300 hover:text-yellow-300 transition">Pricing</a>
                <a href="/login" className="inline-block px-2 py-1 text-gray-300 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg  font-medium rounded-md transition-all
">
                  Login
                </a>
                <a href="/register" className="inline-block px-2 py-1 text-gray-300 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg  font-medium rounded-md transition-all
">
                  Register
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;


// import React, { useState } from 'react';
// import { useAuth } from './context/AuthContext'; // Update the path as needed
// import logo from '../assets/target (2).png';

// function Navbar() {
//   const { isAuthenticated, logout } = useAuth();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   return (
//     <nav className="p-4 bg-gray-900"
   
    
//     >
//       <div className="container mx-auto flex justify-between items-center">
//         {/* Logo and Title */}
//         <div className="flex items-center space-x-2 ml-20">
//           <img 
//             src={logo} 
//             alt="Logo" 
//             className="h-8 inline-block mr-2" 
//           />
//           <a href="/" className="text-2xl text-neutral-300 text-white">
//             eliteFocus™
//           </a>
//         </div>
        
//         {/* Hamburger Menu */}
//         <button 
//           className="lg:hidden flex items-center px-3 py-2 border border-gray-700 rounded text-gray-400 hover:text-yellow-300"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
//           </svg>
//         </button>
        
//         {/* Navigation Links */}
//         <div className={`lg:flex lg:space-x-8 ${isMenuOpen ? 'block' : 'hidden'}`}>
//           <div className="flex flex-col font-medium mr-20 gap-2 lg:flex-row lg:space-x-8">
//             <a href="/features" className="hover:text-yellow-300 text-gray-300 py-2 lg:py-0">Features</a>
          
//             <a href="/resources" className="hover:text-yellow-300 text-gray-300 py-2 lg:py-0">Resources</a>
//             <a href="/pricing" className="hover:text-yellow-300 text-gray-300 py-2 lg:py-0">Pricing</a>
//             {isAuthenticated ? (
//               <button onClick={logout} className="inline-block px-2 py-1 text-gray-300 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg  font-medium rounded-md transition-all">
//                 Logout
//               </button>
//             ) : (
//               <>
//                 <a href="/login" className="inline-block px-2 py-1 text-gray-300 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg  font-medium rounded-md transition-all">
//                   Login
//                 </a>
//                 <a href="/register" className="inline-block px-2 py-1 text-gray-300 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg  font-medium rounded-md transition-all">
//                   Register
//                 </a>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;








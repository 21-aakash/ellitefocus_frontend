


import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaRegFileAlt } from 'react-icons/fa';
import { LuDownload } from 'react-icons/lu';
import { IoCloseOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { formatDistanceToNow } from 'date-fns';

const API_BASE_URL = "https://ellitefocus-backend-production.up.railway.app"; // Define API_BASE_URL here


function Index() {
  const { user } = useAuth(); // Get user info from context
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();
  const ref = useRef(null); // Reference for drag constraints

  useEffect(() => {
    if (!user) {
      // Redirect to login if no user is authenticated
      navigate('/login');
      return;
    }
    console.log("user", user);
    console.log("Fetching todos for user ID:", user.id);
    // Fetch todos for the logged-in user
    axios.get(`${API_BASE_URL}/api/todos/user/${user.id}`)
      .then(response => {
        setTodos(response.data);
        console.log("Todos received:", response.data);
      })
      .catch(error => {
        console.error(error);
        toast.error('Error fetching todos');
      });
  }, [user, navigate]);

  const handleDelete = (id) => {
    axios.delete(`${API_BASE_URL}/api/todos/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id));
        toast.success('Todo deleted successfully');
      })
      .catch(error => {
        console.error(error);
        toast.error('Error deleting todo');
      });
  };
    const avatars = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeBGZHsTpIn5ATxnOecH-CTE1EqSFpdLQ2bQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOUcIfLx52km-4juGIkHokHxTvKgZCWTZHpg&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKIgMnN5GceDQMx_B9GbeHSUvNeY4S3p38hQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyfVutx1L9LX19cD3xXITzLfB9St39BnJ7o_M5FvfrGWjotHe47W4HtPI00EU8-AifX-g&usqp=CAU'
  ];

  return (
    <div className='relative w-full h-screen  bg-gray-900 text-gray-300'>
      <ToastContainer />
      <div className='flex justify-between items-center  p-8'>
       
       {/* User Profile Section */}
       {user && (
          <div className="flex items-center space-x-4 ml-6 p-4 ">
            <div className="relative w-16 h-16">
              <div className="w-full h-full rounded-full overflow-hidden">
                <img
                  src={avatars[Math.floor(Math.random() * avatars.length)]}
                  alt="User Avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <div className="flex flex-col">
              
              <p className="font-semibold text-lg uppercase">Hi {user.name} !</p>
              <p className="text-sm ">{user.email}</p>
            </div>
          </div>
        )}
       
       
       
       
        <div>
          <h1 className=' text-3xl mr-14 font-bold text-slate-200'>Focus Dashboard</h1>
          <h6 className=' text-slate-200'>stay on track</h6>
        </div>

        
       
      </div>
      <hr className='' />
      <a className=' ml-16 mt-6 text-sm inline-block bg-green-600 text-neutral-200 px-2 py-1 rounded' href='/create-todo'>
        Create Task +
      </a>
      
      <div ref={ref} className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8'>
        {Array.isArray(todos) && todos.length > 0 ? (
          todos.map(item => (
            <motion.div
              key={item.id}
              drag
              dragConstraints={ref}
              whileDrag={{ scale: 1.2 }}
              dragElastic={0.2}
              dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
              className={` rounded-lg shadow-lg shadow-blue-700/30 ${item.isComplete ? 'bg-green-300' : 'bg-yellow-300'}`}
              onDragEnd={(event, info) => {
                // Reset position after drag ends
                event.target.style.transform = 'none';
              }}
           
           >
               <div className='rounded-lg text-gray-100 p-4 border  shadow-sm bg-cyan-950'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-bold '>{item.description}</h2>
        <span className={`px-2 py-1 rounded-lg text-sm ${item.isComplete ? 'bg-green-600 text-neutral-300' : 'bg-red-600 text-neutral-300'}`}>
  {item.isComplete ? 'Done' : 'Pending'}


          <FontAwesomeIcon icon={item.isComplete ? faCheckCircle : faTimesCircle} />
        </span>
      </div>
      <p className='text-gray-400 text-xs '>
        <strong>Created At:</strong> {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
      </p>
      <p className='text-gray-400 text-xs'>
        <strong>Updated At:</strong> {formatDistanceToNow(new Date(item.updatedAt), { addSuffix: true })}
      </p>
      <div className='mt-4 flex justify-between items-center'>
        <a className='bg-blue-500 text-white px-2 py-1 rounded-lg' href={`/edit/${item.id}`}>
          <FontAwesomeIcon icon={faEdit} />
        </a>
        <button
          className='bg-red-500 text-white px-2 py-1 rounded-md'
          onClick={() => handleDelete(item.id)}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
    </div>
            </motion.div>
          ))
        ) : (
          <p className='col-span-3 text-center text-gray-600'>No Todos Created yet</p>
        )}
      </div>
      
    </div>
  );
}

export default Index;
























// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useAuth } from './context/AuthContext'; // Update the path as needed
// import { useNavigate } from 'react-router-dom';

// function Index() {
//   const { user } = useAuth(); // Get user info from context
//   const [todos, setTodos] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user) {
//       // Redirect to login if no user is authenticated
//       navigate('/login');
//       return;
//     }
//     console.log("user", user);
//     console.log("Fetching todos for user ID:", user.id);
//     // Fetch todos for the logged-in user
//     axios.get(`/api/todos/user/${user.id}`)
//       .then(response => {
//         setTodos(response.data);
//         console.log("Todos received:", response.data);
//       })
//       .catch(error => {
//         console.error(error);
//         toast.error('Error fetching todos');
//       });
//   }, [user, navigate]); // Depend on user and navigate to refetch and redirect if necessary

//   const handleDelete = (id) => {
//     axios.delete(`/api/todos/${id}`)
//       .then(() => {
//         setTodos(todos.filter(todo => todo.id !== id));
//         toast.success('Todo deleted successfully');
//       })
//       .catch(error => {
//         console.error(error);
//         toast.error('Error deleting todo');
//       });
//   };

//   // Example avatars (you can replace these with real avatar images)
//   const avatars = [
//     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeBGZHsTpIn5ATxnOecH-CTE1EqSFpdLQ2bQ&s',
//     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOUcIfLx52km-4juGIkHokHxTvKgZCWTZHpg&s',
//     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKIgMnN5GceDQMx_B9GbeHSUvNeY4S3p38hQ&s',
//     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyfVutx1L9LX19cD3xXITzLfB9St39BnJ7o_M5FvfrGWjotHe47W4HtPI00EU8-AifX-g&usqp=CAU'
//   ];

//   return (
//     <div className="container mx-auto bg-white p-8 h-screen">
//       <ToastContainer />
//       <div className="flex justify-between items-center mb-4">
//         <div>
//           <h1 className="text-3xl font-bold text-blue-800">Task Dashboard</h1>
//           {/* <h6 className="italic text-gray-700">Stay on track</h6> */}
//         </div>

//         {/* User Profile Section */}
//         {user && (
//           <div className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg shadow-md">
//             <div className="relative w-16 h-16">
//               <div className="w-full h-full rounded-full overflow-hidden">
//                 <img
//                   src={avatars[Math.floor(Math.random() * avatars.length)]}
//                   alt="User Avatar"
//                   className="w-full h-full object-cover rounded-full"
//                 />
//               </div>
//             </div>
//             <div className="flex flex-col">
//               <p className="font-semibold text-lg uppercase">{user.name}</p>
//               <p className="text-sm text-gray-600">{user.email}</p>
//             </div>
//           </div>
//         )}
//       </div>
//       <hr className="my-4" />
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {Array.isArray(todos) && todos.length > 0 ? (
//           todos.map(item => (
//             <div key={item.id} className={`p-6 bg-white rounded-lg shadow-md ${item.isComplete ? 'bg-green-100' : 'bg-yellow-100'}`}>
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-bold text-gray-800">{item.description}</h2>
//                 <span className={`px-2 py-1 rounded-lg text-sm ${item.isComplete ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
//                   {item.isComplete ? 'Complete' : 'Incomplete'}
//                 </span>
//               </div>
//               <p className="text-gray-600">
//                 <strong>Created At:</strong> {new Date(item.createdAt).toLocaleString()}
//               </p>
//               <p className="text-gray-600">
//                 <strong>Updated At:</strong> {new Date(item.updatedAt).toLocaleString()}
//               </p>
//               <div className="mt-4 flex justify-between items-center">
//                 <a className="text-blue-600 hover:text-blue-800" href={`/edit/${item.id}`}>
//                   Edit
//                 </a>
//                 <button
//                   className="bg-red-500 text-white px-4 py-2 rounded-lg"
//                   onClick={() => handleDelete(item.id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="col-span-3 text-center text-gray-600">No Todos Found</p>
//         )}
//       </div>
//       <a className="mt-8 inline-block bg-green-600 text-white px-4 py-2 rounded-lg" href="/create-todo">
//         Create a Todo
//       </a>
//     </div>
//   );
// }

// export default Index;

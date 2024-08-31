
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import Activity from './activity.jsx';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

const API_BASE_URL = "https://ellitefocus-backend-production.up.railway.app"; // Define API_BASE_URL here

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Index() {
  const { user } = useAuth();
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();
  const ref = useRef(null); // Reference for drag constraints

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    axios.get(`${API_BASE_URL}/api/todos/user/${user.id}`)
      .then(response => setTodos(response.data))
      .catch(error => toast.error('Error fetching todos'));
  }, [user, navigate]);

  // Calculate counts
  const pendingCount = todos.filter(todo => todo.isComplete === null).length;
  const doneCount = todos.filter(todo => todo.isComplete === true).length;

  const handleStatusChange = (id, newStatus) => {
    const updatedTodos = todos.map(todo =>
      todo.id === id ? { ...todo, isComplete: newStatus } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDelete = (id) => {
   axios.delete(`${API_BASE_URL}/api/todos/${id}`)
      .then(() => {
        setTodos(todos.filter(todo => todo.id !== id));
        toast.success('Todo deleted successfully');
      })
      .catch(error => toast.error('Error deleting todo'));
  };

  const dates = [...new Set(todos.map(todo => new Date(todo.createdAt).toLocaleDateString()))]; // Unique dates
  const completedTodosByDate = dates.map(date => todos.filter(todo => todo.isComplete && new Date(todo.createdAt).toLocaleDateString() === date).length);
  const pendingTodosByDate = dates.map(date => todos.filter(todo => !todo.isComplete && new Date(todo.createdAt).toLocaleDateString() === date).length);

  const chartData = {
    labels: dates,
    datasets: [
      {
        label: 'Completed Todos',
        data: completedTodosByDate,
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Pending Todos',
        data: pendingTodosByDate,
        borderColor: '#FFEB3B',
        backgroundColor: 'rgba(255, 235, 59, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const exportToExcel = () => {
    const data = chartData.labels.map((label, index) => ({
      Date: label,
      'Completed Todos': chartData.datasets[0].data[index],
      'Pending Todos': chartData.datasets[1].data[index],
    }));
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    saveAs(blob, 'todos_data.xlsx');
  };

  const avatars = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeBGZHsTpIn5ATxnOecH-CTE1EqSFpdLQ2bQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOUcIfLx52km-4juGIkHokHxTvKgZCWTZHpg&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKIgMnN5GceDQMx_B9GbeHSUvNeY4S3p38hQ&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyfVutx1L9LX19cD3xXITzLfB9St39BnJ7o_M5FvfrGWjotHe47W4HtPI00EU8-AifX-g&usqp=CAU'
  ];

  return (
    <div className='relative w-full h-auto bg-gray-900 text-gray-300'>
      <ToastContainer />
      <div className='flex justify-between items-center p-8'>
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
              <p className="font-semibold text-lg uppercase">Hi {user.name}!</p>
              <p className="text-sm">{user.email}</p>
            </div>
          </div>
        )}

        <div>
          <h1 className='text-3xl mr-14 font-bold text-slate-200'>Focus Dashboard</h1>
          <h6 className='text-slate-200'>Stay on track</h6>
        </div>
      </div>

      {/* Slab boxes */}
      <div className='flex justify-around mt-6'>
        <div className='bg-yellow-400 text-gray-900 p-4 rounded-lg shadow-md'>
          <h2 className='text-xl font-bold'>Pending Tasks</h2>
          <p className='text-2xl font-semibold'>{pendingCount}</p>
        </div>
        <div className='bg-green-400 text-gray-900 p-4 rounded-lg shadow-md'>
          <h2 className='text-xl font-bold'>Done Tasks</h2>
          <p className='text-2xl font-semibold'>{doneCount}</p>
        </div>
      </div>

      <div>
        <Activity todos={todos} />
      </div>
      <button
  onClick={exportToExcel}
  className='ml-16 mt-6 text-sm inline-block bg-blue-600 text-neutral-200 px-4 py-2 rounded hover:bg-blue-700 flex items-center'
>
  <FontAwesomeIcon icon={faDownload} className='mr-2' />
  Download Report
</button>

      <div className='flex justify-center mt-10'>
        <div className='w-full max-w-4xl'>
          <Line data={chartData} options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Todo Efficiency Over Time',
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Date',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Number of Todos',
                },
                min: 0,
                ticks: {
                  stepSize: 1,
                },
              },
            },
          }} />
        </div>

      </div>

      <hr className='my-6' />
      <a className='ml-16 mt-6 text-sm inline-block bg-green-600 text-neutral-200 px-2 py-1 rounded' href='/create-todo'>
        Create Task +
      </a>

    

      <div ref={ref} className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8'>
        {Array.isArray(todos) && todos.length > 0 ? (
          todos.map(item => (
            <div
              key={item.id}
              className={`rounded-lg shadow-lg ${item.isComplete ? 'bg-green-300' : 'bg-yellow-300'}`}
            >
              <div className='rounded-lg text-gray-100 p-4 border shadow-sm bg-cyan-950'>
                <div className='flex justify-between items-center mb-2'>
                  <h3 className='text-lg font-semibold'>{item.description
                  }</h3>
                  <div className='flex space-x-2'>
                    <button
                      onClick={() => navigate(`/edit/${item.id}`)}
                      className='text-blue-500 hover:text-blue-700'
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className='text-red-500 hover:text-red-700'
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
                <div className='text-sm text-gray-400 mb-2'>
                  <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
                <p className='text-sm mb-4'>{item.details}</p>
                <div className='flex space-x-4'>
                  <button
                    onClick={() => handleStatusChange(item.id, !item.isComplete)}
                    className='bg-blue-500 text-white px-4 py-2 rounded'
                  >
                    {item.isComplete ? 'Mark as Pending' : 'Mark as Done'}
                  </button>
                </div>
                {item.isComplete !== null && (
                  <div className={`mt-4 text-sm ${item.isComplete ? 'text-green-600' : 'text-yellow-600'}`}>
                    <FontAwesomeIcon icon={item.isComplete ? faCheckCircle : faTimesCircle} />{' '}
                    {item.isComplete ? 'Completed' : 'Pending'}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className='text-center text-gray-400'>No todos available</p>
        )}
      </div>
    </div>
  );
}

export default Index;





// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useAuth } from './context/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { FaRegFileAlt } from 'react-icons/fa';
// import { LuDownload } from 'react-icons/lu';
// import { IoCloseOutline } from 'react-icons/io5';
// import { motion } from 'framer-motion';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEdit, faTrashAlt, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
// import { formatDistanceToNow } from 'date-fns';

// const API_BASE_URL = "https://ellitefocus-backend-production.up.railway.app"; // Define API_BASE_URL here


// function Index() {
//   const { user } = useAuth(); // Get user info from context
//   const [todos, setTodos] = useState([]);
//   const navigate = useNavigate();
//   const ref = useRef(null); // Reference for drag constraints

//   useEffect(() => {
//     if (!user) {
//       // Redirect to login if no user is authenticated
//       navigate('/login');
//       return;
//     }
//     console.log("user", user);
//     console.log("Fetching todos for user ID:", user.id);
//     // Fetch todos for the logged-in user
//     axios.get(`${API_BASE_URL}/api/todos/user/${user.id}`)
//       .then(response => {
//         setTodos(response.data);
//         console.log("Todos received:", response.data);
//       })
//       .catch(error => {
//         console.error(error);
//         toast.error('Error fetching todos');
//       });
//   }, [user, navigate]);

//   const handleDelete = (id) => {
//     axios.delete(`${API_BASE_URL}/api/todos/${id}`)
//       .then(() => {
//         setTodos(todos.filter(todo => todo.id !== id));
//         toast.success('Todo deleted successfully');
//       })
//       .catch(error => {
//         console.error(error);
//         toast.error('Error deleting todo');
//       });
//   };
//     const avatars = [
//     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeBGZHsTpIn5ATxnOecH-CTE1EqSFpdLQ2bQ&s',
//     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOUcIfLx52km-4juGIkHokHxTvKgZCWTZHpg&s',
//     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKIgMnN5GceDQMx_B9GbeHSUvNeY4S3p38hQ&s',
//     'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyfVutx1L9LX19cD3xXITzLfB9St39BnJ7o_M5FvfrGWjotHe47W4HtPI00EU8-AifX-g&usqp=CAU'
//   ];

//   return (
//     <div className='relative w-full h-screen  bg-gray-900 text-gray-300'>
//       <ToastContainer />
//       <div className='flex justify-between items-center  p-8'>
       
//        {/* User Profile Section */}
//        {user && (
//           <div className="flex items-center space-x-4 ml-6 p-4 ">
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
              
//               <p className="font-semibold text-lg uppercase">Hi {user.name} !</p>
//               <p className="text-sm ">{user.email}</p>
//             </div>
//           </div>
//         )}
       
       
       
       
//         <div>
//           <h1 className=' text-3xl mr-14 font-bold text-slate-200'>Focus Dashboard</h1>
//           <h6 className=' text-slate-200'>stay on track</h6>
//         </div>

        
       
//       </div>
//       <hr className='' />
//       <a className=' ml-16 mt-6 text-sm inline-block bg-green-600 text-neutral-200 px-2 py-1 rounded' href='/create-todo'>
//         Create Task +
//       </a>
      
//       <div ref={ref} className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8'>
//         {Array.isArray(todos) && todos.length > 0 ? (
//           todos.map(item => (
//             <motion.div
//               key={item.id}
//               drag
//               dragConstraints={ref}
//               whileDrag={{ scale: 1.2 }}
//               dragElastic={0.2}
//               dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
//               className={` rounded-lg shadow-lg shadow-blue-700/30 ${item.isComplete ? 'bg-green-300' : 'bg-yellow-300'}`}
//               onDragEnd={(event, info) => {
//                 // Reset position after drag ends
//                 event.target.style.transform = 'none';
//               }}
           
//            >
//                <div className='rounded-lg text-gray-100 p-4 border  shadow-sm bg-cyan-950'>
//       <div className='flex justify-between items-center mb-4'>
//         <h2 className='text-xl font-bold '>{item.description}</h2>
//         <span className={`px-2 py-1 rounded-lg text-sm ${item.isComplete ? 'bg-green-600 text-neutral-300' : 'bg-red-600 text-neutral-300'}`}>
//   {item.isComplete ? 'Done' : 'Pending'}


//           <FontAwesomeIcon icon={item.isComplete ? faCheckCircle : faTimesCircle} />
//         </span>
//       </div>
//       <p className='text-gray-400 text-xs '>
//         <strong>Created At:</strong> {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
//       </p>
//       <p className='text-gray-400 text-xs'>
//         <strong>Updated At:</strong> {formatDistanceToNow(new Date(item.updatedAt), { addSuffix: true })}
//       </p>
//       <div className='mt-4 flex justify-between items-center'>
//         <a className='bg-blue-500 text-white px-2 py-1 rounded-lg' href={`/edit/${item.id}`}>
//           <FontAwesomeIcon icon={faEdit} />
//         </a>
//         <button
//           className='bg-red-500 text-white px-2 py-1 rounded-md'
//           onClick={() => handleDelete(item.id)}
//         >
//           <FontAwesomeIcon icon={faTrashAlt} />
//         </button>
//       </div>
//     </div>
//             </motion.div>
//           ))
//         ) : (
//           <p className='col-span-3 text-center text-gray-600'>No Todos Created yet</p>
//         )}
//       </div>
      
//     </div>
//   );
// }

// export default Index;



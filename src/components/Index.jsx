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

const API_BASE_URL = "https://joyful-stillness-production.up.railway.app"; // Define API_BASE_URL here

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

const [searchQuery, setSearchQuery] = useState('');
const [sortDirection, setSortDirection] = useState('asc'); // 'asc' for ascending, 'desc' for descending


const filteredAndSortedTodos = todos
  .filter((todo) =>
    todo.description.toLowerCase().includes(searchQuery.toLowerCase())
  )
  .sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
  });






  
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
    <div className='relative w-full h-auto bg-gray-900 text-gray-300' >
      <ToastContainer />
      <div className='flex flex-col md:flex-row justify-between items-center p-4 md:p-8'>
       

      
      </div>

      <div className='grid grid-cols-1 m-14 md:grid-cols-2 gap-6 mt-0'>
 {/* Slab Boxes */}
<div className='flex flex-col md:flex-row w-full gap-6'>
  <div className='bg-gradient-to-br from-white to-yellow-100 bg-white bg-opacity-50 backdrop-blur-md border border-gray-300 p-4 rounded-lg shadow-lg w-full md:w-1/2 flex items-center'>
    <i className='fas fa-tasks text-xl md:text-2xl text-gray-700 mr-4'></i>
    <div>
      <h2 className='text-lg md:text-xl font-bold text-gray-800'>Pending Tasks: {pendingCount}</h2>
      {/* <p className='text-xl md:text-2xl font-semibold text-gray-700'>{pendingCount}</p> */}
    </div>
  </div>

  <div className='bg-gradient-to-br from-white to-green-200 bg-opacity-50 backdrop-blur-md border border-gray-300 p-4 rounded-lg shadow-lg w-full md:w-1/2 flex items-center'>
    <i className='fas fa-check-circle text-xl md:text-2xl text-gray-700 mr-4'></i>
    <div>
      <h2 className='text-lg md:text-xl font-bold text-gray-800'>Completed Tasks: {doneCount}</h2>
      {/* <p className='text-xl md:text-2xl font-semibold text-gray-700'>{doneCount}</p> */}
    </div>
  </div>
</div>


  
  
  {/* Button */}
  <div className='  bg-gray-900 bg-opacity-50 backdrop-blur-md border border-gray-300 p-4 rounded-lg shadow-lg flex justify-between items-center'>
    
  <div className='flex justify-center'>
        <a className='text-sm inline-block bg-green-600 text-neutral-200 px-4 py-2 rounded hover:bg-green-700' href='/create-todo'>
          Create Task +
        </a>
      </div>
    
    
    
    <button
      onClick={exportToExcel}
      className='text-sm bg-blue-600 text-neutral-200 px-4 py-2 rounded hover:bg-blue-700 flex items-center'
    >
      <FontAwesomeIcon icon={faDownload} className='mr-2' />
      Download Report
    </button>
  </div>

  {/* Activity Component */}
  <div className='bg-gray-900 bg-opacity-50 backdrop-blur-md  p-4 rounded-lg shadow-lg'>
  
    <Activity todos={todos} />
  </div>

  {/* Graph Component */}
  <div className='bg-gray-900 bg-opacity-50 backdrop-blur-md  p-4 rounded-lg shadow-lg'>
    <div className='w-full max-w-full lg:max-w-2xl'>
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
</div>
{/*search feature */}
<div className="flex flex-col sm:flex-row justify-between items-center m-12 mb-2 gap-4">
  <input
    type="text"
    placeholder="Search todos..."s
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-full sm:w-auto border bg-gray-900 border-x-gray-700 p-1 rounded"
  />
  <button
    onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
    className="w-full sm:w-auto binline-block px-2 py-1 text-gray-300 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg  font-medium rounded-md transition-all
"
  >
    Sort by Date {sortDirection === 'asc' ? '▲' : '▼'}
  </button>
</div>

<hr className="my-6" />

     







     <div ref={ref} className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8'>
    

{Array.isArray(todos) && todos.length > 0 ? (
  todos
    .filter((todo) =>
      todo.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
    })
    .map((item) => (
      <div
        key={item.id}
        className={`rounded-lg shadow-lg ${item.isComplete ? 'bg-green-300' : 'bg-yellow-300'}`}
      >
        <div className='rounded-lg text-gray-100 p-4 border shadow-sm bg-cyan-950'>
          <div className='flex justify-between items-center mb-2'>
            <h3 className='text-lg font-semibold'>{item.description}</h3>
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

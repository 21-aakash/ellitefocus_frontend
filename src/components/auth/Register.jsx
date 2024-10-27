import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for Toastify
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faSpinner } from '@fortawesome/free-solid-svg-icons';


const API_BASE_URL = "https://joyful-stillness-production.up.railway.app"; // Define API_BASE_URL here

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate(); // Use useNavigate for navigation

  const validateForm = () => {
    const newErrors = {};
    const namePattern = /^[A-Za-z\s]+$/; // Only alphabets and spaces
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Valid email
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/; // Min 8 chars, 1 special char, 1 uppercase, 1 number


    if (!name.match(namePattern)) {
      newErrors.name = 'Name must contain only alphabets and spaces.';
    }

    if (!email.match(emailPattern)) {
      newErrors.email = 'Invalid email address.';
    }

    if (!password.match(passwordPattern)) {
      newErrors.password =
        'Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.';
    }

    if (password !== retypePassword) {
      newErrors.retypePassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsLoading(true); // Start loading

      axios
        .post(`${API_BASE_URL}/api/users/register`, { name, email, password })
        .then((response) => {
          // Handle successful registration
          console.log('Register done', response);
          toast.success('Registration successful! Redirecting to login...', {
            position: 'top-center',
            autoClose: 2000,
          });
          setTimeout(() => {
            navigate('/login');
          }, 2000);
        })
        .catch((error) => {
          console.error(error);

          if (error.response) {
            // Server responded with a status other than 200 range
            if (error.response.status === 400) {
              toast.error(
                'Invalid data provided. Please check your input and try again.',
                {
                  position: 'top-center',
                }
              );
            } else if (error.response.status === 500) {
              toast.error(
                'Email already registered. Please try a different email.',
                {
                  position: 'top-center',
                }
              );
            } else {
              toast.error('Server error. Please try again later.', {
                position: 'top-center',
              });
            }
          } else if (error.request) {
            // Request was made but no response was received
            toast.error(
              'No response from server. Please check your internet connection.',
              {
                position: 'top-center',
              }
            );
          } else {
            // Something else caused the error
            toast.error('An error occurred. Please try again.', {
              position: 'top-center',
            });
          }
        })
        .finally(() => {
          setIsLoading(false); // Stop loading
        });
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 my-24 rounded shadow-md relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
          {/* Loader */}
          <FontAwesomeIcon icon={faSpinner} spin size="3x" className="text-blue-500" />
        </div>
      )}
      <ToastContainer /> {/* Toast container for displaying toasts */}
      <h2 className="text-2xl font-semibold mb-6">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.name ? 'border-red-500' : ''
            }`}
            placeholder="Enter your name"
          />
          {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.email ? 'border-red-500' : ''
            }`}
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
        </div>
        <div className="mb-4 relative">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.password ? 'border-red-500' : ''
            }`}
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none"
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} className="text-gray-600 mt-6" />
          </button>
          {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
        </div>
        <div className="mb-4 relative">
          <label htmlFor="retypePassword" className="block text-gray-700 text-sm font-bold mb-2">
            Retype Password
          </label>
          <input
            type={showRetypePassword ? 'text' : 'password'}
            id="retypePassword"
            value={retypePassword}
            onChange={(e) => setRetypePassword(e.target.value)}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.retypePassword ? 'border-red-500' : ''
            }`}
            placeholder="Retype your password"
          />
          <button
            type="button"
            onClick={() => setShowRetypePassword(!showRetypePassword)}
            className="absolute inset-y-0 right-0 flex items-center px-2 focus:outline-none"
          >
            <FontAwesomeIcon
              icon={showRetypePassword ? faEyeSlash : faEye}
              className="text-gray-600 mt-6"
            />
          </button>
          {errors.retypePassword && (
            <p className="text-red-500 text-xs italic">{errors.retypePassword}</p>
          )}
        </div>
        <button
          type="submit"
          className={`w-full flex items-center justify-center bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline ${
            isLoading ? 'cursor-not-allowed opacity-50' : ''
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <FontAwesomeIcon icon={faSpinner} spin className="mr-2" />
              Registering...
            </>
          ) : (
            'Register'
          )}
        </button>
      </form>
      <p className="mt-4 text-center">
        Already have an account? <a href="/login" className="text-blue-500">Login here</a>.
      </p>
    </div>
  );
}

export default Register;

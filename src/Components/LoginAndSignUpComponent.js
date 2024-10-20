import { useState } from 'react';
import DOMPurify from 'dompurify'; // To prevent XSS attacks
import { useFormik } from 'formik';
import validationSchema from '../Validations/validationSchema';

import axios from 'axios';


const LoginAndSignUpComponent = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const formik = useFormik({
    initialValues: {
        username: '',
        email: '',
        password: '',
        dateOfBirth: '',
    },
    validationSchema,
    onSubmit: (values) => {
        //Sanitize inputs with dompurify
        const username = isLogin ? null : DOMPurify.sanitize(values.username);
        const email = DOMPurify.sanitize(values.email);
        const password = DOMPurify.sanitize(values.password);
        const dateOfBirth = isLogin ? null : DOMPurify.sanitize(values.dateOfBirth);

        console.log('Sanitized Email:', email);
        console.log('Sanitized Password:', password);

        const userData = {
            username,
            email,
            password,
            dateOfBirth,
        };

        try {
          if(!isLogin){
              const newUserResponse = axios.post(`${process.env.REACT_APP_BACKEND_API}/sign-in`, {email, password});
              console.log('User response:', newUserResponse.data);
          } else {
              const existingUserResponse = axios.post(`${process.env.REACT_APP_BACKEND_API}/sign-up`, userData);
              console.log('New user response:', existingUserResponse.data);
          }

        } catch (error) {
            console.error('Error submitting data:', error);
        }

    }
  })


return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>
  
        <form onSubmit={formik.handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Username:</label>
              <input
                required
                type="text"
                name="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                className="border border-gray-600 rounded p-3 w-full bg-gray-700 text-white"
                placeholder="Enter your username"
              />
              {formik.errors.username && <p className="text-red-500">{formik.errors.username}</p>}
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Email:</label>
            <input
              required
              type="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              className="border border-gray-600 rounded p-3 w-full bg-gray-700 text-white"
              placeholder="Enter your email"
            />
            {formik.errors.email && <p className="text-red-500">{formik.errors.email}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Password:</label>
            <input
              required
              type="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              className="border border-gray-600 rounded p-3 w-full bg-gray-700 text-white"
              placeholder="Enter your password"
            />
            {formik.errors.password && <p className="text-red-500">{formik.errors.password}</p>}
          </div>
  
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Date of Birth:</label>
              <input
                required
                type="date"
                name="dateOfBirth"
                onChange={formik.handleChange}
                value={formik.values.dateOfBirth}
                className="border border-gray-600 rounded p-3 w-full bg-gray-700 text-white"
              />
              {formik.errors.dateOfBirth && <p className="text-red-500">{formik.errors.dateOfBirth}</p>}
            </div>
          )}
  
          {isLogin && (
            <div className="mb-4">
              <a href="/forgot-password" className="text-blue-400 hover:underline text-sm">
                Forgot Password?
              </a>
            </div>
          )}
  
          <button
            type="submit"
            className={`${
              isLogin ? 'bg-blue-500' : 'bg-green-500'
            } hover:bg-opacity-80 text-white text-lg py-3 px-8 rounded-full w-full transition-all duration-300`}
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
  
        <p className="mt-6 text-center text-sm">
          {isLogin
            ? "Don't have an account? "
            : 'Already have an account? '}
          <button
            onClick={handleToggle}
            className="text-blue-400 hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
  
};

export default LoginAndSignUpComponent;

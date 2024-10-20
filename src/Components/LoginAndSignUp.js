//Toggle between login and sign up form
//Must do a forgot password.

import { useState } from 'react';
import DOMPurify from 'dompurify'; //Prevent XSS attacks (Cross-Site Scripting Malicious Script Attacks)

const LoginAndSignUp = () => {

  const [isLogin, setIsLogin] = useState(true); 

  const handleToggle = () => {
    setIsLogin(!isLogin); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = DOMPurify.sanitize(e.target.email.value);
    const password = DOMPurify.sanitize(e.target.password.value);

    console.log(' Sanitized Email:', email);
    console.log('Sanitized Password:', password);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-gray-100 p-8 rounded-lg shadow-md">
        {isLogin ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Email:</label>
                <input required
                  type="email"
                  name='email'
                  className="border rounded p-2 w-full"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password:</label>
                <input required
                  type="password"
                  name='password'
                  className="border rounded p-2 w-full"
                  placeholder="Enter your password"
                />
              </div>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Login
              </button>
            </form>
            <p className="mt-4 text-sm">
              Don't have an account?{' '}
              <button className="text-blue-500 underline" onClick={handleToggle}>
                Sign Up
              </button>
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Email:</label>
                <input
                  type="email"
                  name='email'
                  className="border rounded p-2 w-full"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Password:</label>
                <input
                  type="password"
                  name='password'
                  className="border rounded p-2 w-full"
                  placeholder="Enter your password"
                />
              </div>
              <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                Sign Up
              </button>
            </form>
            <p className="mt-4 text-sm">
              Already have an account?{' '}
              <button className="text-blue-500 underline" onClick={handleToggle}>
                Login
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginAndSignUp;

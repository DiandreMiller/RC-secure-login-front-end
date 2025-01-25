import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';



const LoginAndSignUpComponent = ({ formik, userError, isLogin, setIsLogin, signupUserMessage }) => {
   // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);


  const handleToggle = () => {
    setIsLogin(!isLogin);
  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (signupUserMessage) {
      setIsLogin(true);
    }
  }, [signupUserMessage, setIsLogin]);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>
        {userError && <p className="text-red-500 mb-4">{userError}</p>}
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
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Phone Number:</label>
              <input
                required
                type="text"
                name="phoneNumber"
                onChange={formik.handleChange}
                value={formik.values.phoneNumber}
                className="border border-gray-600 rounded p-3 w-full bg-gray-700 text-white"
                placeholder="Enter your phone number"
              />
              {formik.errors.phoneNumber && <p className="text-red-500">{formik.errors.phoneNumber}</p>}
            </div>
          )}
          <div className="mb-4 relative">
            <label className="block text-gray-300 mb-2">Password:</label>
            <input
              required
              type={showPassword ? 'text' : 'password'}
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              className="border border-gray-600 rounded p-3 w-full bg-gray-700 text-white"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
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
              <Link to="/forgot-password" className="text-blue-400 hover:underline text-sm">
                Forgot Password?
              </Link>
            </div>
          )}
  
          <button
            type="submit"
            className={`${isLogin ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600'} text-white font-bold py-2 px-4 rounded w-full`}
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
  
        </form>
        <p className="mt-4">
          {isLogin ? 'Don\'t have an account?' : 'Already have an account?'}
          <button onClick={handleToggle} className="text-blue-400 hover:underline">
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
  
  
  
};

export default LoginAndSignUpComponent;

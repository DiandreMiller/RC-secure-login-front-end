import { useState } from 'react';
import DOMPurify from 'dompurify'; // To prevent XSS attacks

const LoginAndSignUp = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = DOMPurify.sanitize(e.target.email.value);
    const password = DOMPurify.sanitize(e.target.password.value);
    
    // If signing up, get the username and date of birth
    const username = isLogin ? null : DOMPurify.sanitize(e.target.username.value);
    const dateOfBirth = isLogin ? null : DOMPurify.sanitize(e.target.dateOfBirth.value);

    console.log('Sanitized Email:', email);
    console.log('Sanitized Password:', password);
    if (!isLogin) {
      console.log('Sanitized Username:', username);
      console.log('Sanitized Date of Birth:', dateOfBirth);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Username:</label>
              <input
                required
                type="text"
                name="username"
                className="border border-gray-600 rounded p-3 w-full bg-gray-700 text-white"
                placeholder="Enter your username"
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Email:</label>
            <input
              required
              type="email"
              name="email"
              className="border border-gray-600 rounded p-3 w-full bg-gray-700 text-white"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Password:</label>
            <input
              required
              type="password"
              name="password"
              className="border border-gray-600 rounded p-3 w-full bg-gray-700 text-white"
              placeholder="Enter your password"
            />
          </div>

          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Date of Birth:</label>
              <input
                required
                type="date"
                name="dateOfBirth"
                className="border border-gray-600 rounded p-3 w-full bg-gray-700 text-white"
              />
            </div>
          )}

          {isLogin && (
            <div className="mb-4">
              <a href="#" className="text-blue-400 hover:underline text-sm">
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

export default LoginAndSignUp;

import React, { useState } from "react";
import DOMPurify from 'dompurify'; // Prevent XSS attacks

const ForgotPasswordComponent = () => {
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const sanitizedEmail = DOMPurify.sanitize(e.target.email.value);
    console.log('Sanitized Email:', sanitizedEmail);
    setEmailSent(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-100 p-8 rounded-lg shadow-md max-w-md w-full">
        {!emailSent ? (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Forgot Password</h2>
            <p className="text-sm text-gray-600 mb-6 text-center">
              Enter your email below and we’ll send you a link to reset your password.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Email:</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="border rounded p-2 w-full"
                  placeholder="Enter your email"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white text-lg py-3 px-8 rounded-full transition-all duration-300 w-full">
                Send Reset Link
              </button>
            </form>
            <p className="mt-6 text-sm text-center text-gray-600">
              Remember your password?{' '}
              <a href="/login-signup" className="text-blue-500 underline">
                Login
              </a>
            </p>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Check your email</h2>
            <p className="text-gray-600 mb-6">
              We've sent a password reset link to your email. Please follow the instructions to reset your password.
            </p>
            <a href="/login" className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-full transition-all duration-300">
              Go to Login
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordComponent;

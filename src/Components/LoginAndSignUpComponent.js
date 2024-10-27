import { useState } from 'react';
import DOMPurify from 'dompurify';
import { useFormik } from 'formik';
import validationSchema from '../Validations/validationSchema';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../authenthication/AuthContext';
import Cookies from 'js-cookie';
import axios from 'axios';

import { base64ToArrayBuffer } from '../utils/arrayBufferUtils';

const LoginAndSignUpComponent = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleToggle = () => {
    setIsLogin(!isLogin);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const signUpUser = async (userData) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_API}/sign-up`, userData);
      // console.log('Sign-up response:', response.data);
      return response.data; 
    } catch (error) {
      // console.error('Error during sign-up:', error);
      throw error; 
    }
  };

  const loginUser = async (identifier, password) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_API}/sign-in`, { identifier, password });
      console.log('Login response:', response.data);
      return response.data; 
    } catch (error) {
      console.error('Error during login:', error);
      throw error; 
    }
  };

  const formik = useFormik({
    initialValues: {
      identifier: '',
      username: '',
      email: '',
      password: '',
      dateOfBirth: '',
      phoneNumber: '',
    },

    validationSchema,
    onSubmit: async (values) => {
      const username = isLogin ? null : DOMPurify.sanitize(values.username);
      const email = DOMPurify.sanitize(values.email);
      const password = values.password;
      const dateOfBirth = isLogin ? null : DOMPurify.sanitize(values.dateOfBirth);
      const phoneNumber = isLogin ? null : DOMPurify.sanitize(values.phoneNumber);
  
      console.log('Formik values before submission:', formik.values);
  
      const userData = {
          username, 
          identifier: isLogin ? email : username,
          email,
          password,
          dateOfBirth,
          phoneNumber,
          webauthnid: '',
          webauthnpublickey: ''
      };
  
      console.log('userData:', userData);
      try {
          if (!isLogin) {
              // Sign up logic
              // console.log('Sending sign-up request with:', userData);
              const newUserResponse = await signUpUser(userData); 
              // console.log('signUpUser response:', newUserResponse);
              const { webauthnid, webauthnpublickey } = await registerPasskey(newUserResponse.user.id, userData.identifier); 
              userData.webauthnid = webauthnid;
              userData.webauthnpublickey = webauthnpublickey;
              // console.log('Updated userData:', userData);
              navigate('/movies');
          } else {
              // Login logic
              console.log('Sending login request with identifier:', userData.identifier);
              const loginResponse = await loginUser(userData.identifier, password); 
              console.log('Login response:', loginResponse);
  
              // Successful login 
              const { token, expiresIn } = loginResponse;
              const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
              console.log('Expiration date:', expirationDate);
              Cookies.set('token', token, { expires: expirationDate, secure: true, sameSite: 'strict' });
              console.log('Token:', token);
              login(token);
              navigate('/movies');
          }
      } catch (error) {
          console.error('Error submitting data:', error);
          setError(error.response?.data?.error || 'Invalid Credentials. Please try again.');
      }
    }
  });

  const registerPasskey = async (userId, email) => {
    // console.log('Registering passkey for user ID:', userId);
    // console.log('Registering passkey for email:', email);
    
    // Call to backend to initiate passkey registration
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_API}/register-passkey`, { userId });
    // console.log('Public Key Credential Creation Options:', response.data);
    const publicKeyCredentialCreationOptions = response.data;

    // Log the response from the server
    // console.log('Public Key Credential Creation Options:', publicKeyCredentialCreationOptions);

    // Convert the challenge from base64 to ArrayBuffer
    const challengeBuffer = base64ToArrayBuffer(publicKeyCredentialCreationOptions.challenge);
    const testWithoutBase64 = publicKeyCredentialCreationOptions.challenge;
    console.log('Test buffer:', testWithoutBase64);
    console.log('Converted challenge buffer front End:', challengeBuffer);
    publicKeyCredentialCreationOptions.challenge = challengeBuffer;
    // console.log('Challenge buffer:', challengeBuffer);

    // Update the user ID to be an ArrayBuffer
    publicKeyCredentialCreationOptions.user.id = new TextEncoder().encode(userId); 
    // console.log('User ID buffer:', publicKeyCredentialCreationOptions.user.id);

    // Use WebAuthn API to create a passkey
    let credential;
    try {
        credential = await navigator.credentials.create({ publicKey: publicKeyCredentialCreationOptions });
        console.log('Created credential:', credential);
    } catch (error) {
        console.error('Error during credential creation:', error);
        throw error; 
    }

    // Extracting the webauthnid and webauthnpublickey
    const webauthnid = credential.id; 
    const webauthnpublickey = credential.rawId; 
    

    // Log the webauthnid and webauthnpublickey
    console.log('Generated webauthnid:', webauthnid);
    console.log('Generated webauthnpublickey:', webauthnpublickey);

    // Send the created credential back to your server for verification
    await axios.post(`${process.env.REACT_APP_BACKEND_API}/verify-passkey`, {
        credential,
        email,
        userId,
        webauthnid,
        webauthnpublickey
    });

    console.log('Final Public Key Credential Creation Options before WebAuthn:', response.data);

    return { webauthnid, webauthnpublickey };
  };

  const authenticateWithPasskey = async (identifier, password) => {
    console.log('Initiating passkey authentication for user input:',identifier); 
    // console.log('Password 1:', password);

    try {

        const payload = { identifier, password };
        console.log('Payload:', payload);
        // console.log('password 2:', password);
        console.log('Identifier being sent:', identifier);


        const response = await axios.post(`${process.env.REACT_APP_BACKEND_API}/authenticate-passkey`, { identifier });
        const publicKeyCredentialRequestOptions = response.data;
        console.log('Public Key Credential Request Options:', publicKeyCredentialRequestOptions); // Log the options received

        const credential = await navigator.credentials.get({ publicKey: publicKeyCredentialRequestOptions });
        console.log('Created credential:', credential); // Log the credential created

        // Extract the necessary data
        const webauthnid = credential.id;
        const webauthnpublickey = credential.rawId;

        console.log('WebAuthn ID:', webauthnid); // Log WebAuthn ID
        console.log('WebAuthn Public Key:', webauthnpublickey); // Log WebAuthn public key

        const existingUserResponse = await axios.post(`${process.env.REACT_APP_BACKEND_API}/verify-passkey`, {
            credential,
            identifier,
            password,
            userId: publicKeyCredentialRequestOptions.user.id,
            webauthnid, 
            webauthnpublickey 
        });

        console.log('Verification Response:', existingUserResponse.data); // Log the verification response

        // Handle successful login
        const { token, expiresIn } = existingUserResponse.data;
        console.log('Received token:', token); // Log the token
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        console.log('Token expiration date:', expirationDate); 

        Cookies.set('token', token, { expires: expirationDate, secure: true, sameSite: 'strict' });
        login(token);
        navigate('/movies');
    } catch (error) {
        console.error('Error during authentication:', error); 
    }
};


  const handlePasskeyLogin = async () => {
    try {
        await authenticateWithPasskey(formik.values.identifier, formik.values.password);
    } catch (error) {
        console.error('Error during passkey login:', error);
        setError(error.response?.data?.error || 'Failed to authenticate with passkey. Please try again.');
    }
};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
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
  
          {isLogin ? (
            <button
              onClick={handlePasskeyLogin}
              type="button"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full mt-4"
            >
              Login with Passkey
            </button>
          ) : (
            <button
              onClick={handlePasskeyLogin}
              type="button"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full mt-4"
            >
              Sign Up with Passkey
            </button>
          )}
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

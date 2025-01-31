/* eslint-disable no-unused-vars */


import './App.css';
import axios from 'axios';
import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import DOMPurify from 'dompurify';
import Cookies from 'js-cookie';
import { AuthProvider } from './authenthication/AuthContext';
import ProtectedRoute from './authenthication/ProtectedRoute';
import validationSchema from './Validations/validationSchema';
import { base64ToArrayBuffer } from './utils/arrayBufferUtils';
import { useAuth } from './authenthication/AuthContext';


// Commons
import Navbar from './Common/Navbar';
import Footer from './Common/Footer';

// Pages
import HomePage from './Pages/HomePage';
import AboutPage from './Pages/AboutPage';
import MoviesPage from './Pages/MoviesPage';
import FourOFourPage from './Pages/FourOFourPage';
import LoginAndSignUpPage from './Pages/LoginAndSignUpPage';
import ForgotPasswordPage from './Pages/ForgotPasswordPage';
import LearnMorePage from './Pages/LearnMorePage';
import RegisterPasskey from './Pages/RegisterPasskeyPage';

const AppContent = () => {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [isLogin, setIsLogin] = useState(true);
  // eslint-disable-next-line no-use-before-define
  const [userError, setUserError] = useState('');
  const [signupUserMessage, setSignUpUserMessage] = useState('');
  const [idOfUser, setIdOfUser] = useState('');
  const { login, logout, reset } = useAuth();
  const backEndUrl = process.env.REACT_APP_BACKEND_API;

  const signUpUser = async (userData) => {
    try {
      const response = await axios.post(`${backEndUrl}/sign-up`, userData);
      console.log('Sign-up response:', response.data);
      
      if (response.data && response.data.message === "User created") {
        setSignUpUserMessage(response.data.message);
        return response.data.user; 
      } else {
        throw new Error("Sign-up failed. Please try again."); 
      }
    } catch (error) {
      // Log or rethrow the error for the calling function to handle
      console.error("Error during sign-up:", error);
      throw error.response?.data?.message || error.message; 
  };
}

const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${backEndUrl}/sign-in`, userData);
    if (response.data && response.data.message === "Sign in is a success") {
      setIdOfUser(response.data.user.id);
      return {
        token: response.data.token,
        userId: response.data.user.id,
        email: response.data.email, 
        expiresIn: response.data.expiresIn,
        hasRegisteredPasskey: response.data.hasRegisteredPasskey, 
      };
    } else {
      throw new Error("Login failed. Please try again."); 
    }
  } catch (error) {
    console.error('Error during login:', error);
    throw error.response?.data?.message || error.message; 
  }
};


  const registerPasskey = async (userId, email) => {
    console.log('Registering passkey with userId:', userId, 'and email:', email);

    if (!userId || !email) {
      console.error('User ID or Email is undefined!');
      return;
    }
    const response = await axios.post(`${backEndUrl}/register-passkey`, { userId, email });
    const publicKeyCredentialCreationOptions = response.data;

    const challengeBuffer = base64ToArrayBuffer(publicKeyCredentialCreationOptions.challenge);
    publicKeyCredentialCreationOptions.challenge = challengeBuffer;
    publicKeyCredentialCreationOptions.user.id = new TextEncoder().encode(userId);

    let credential;
    try {
      credential = await navigator.credentials.create({ publicKey: publicKeyCredentialCreationOptions });
      console.log('Created credential:', credential);
    } catch (error) {
      console.error('Error during credential creation:', error);
      throw error;
    }

    const webauthnid = credential.id;
    const webauthnpublickey = credential.rawId;

    await axios.post(`${backEndUrl}/verify-passkey`, {
      credential,
      email,
      userId,
      webauthnid,
      webauthnpublickey,
    });

    return { webauthnid, webauthnpublickey };
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      dateOfBirth: '',
      phoneNumber: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const sanitizedValues = {
          username: isLogin ? null : DOMPurify.sanitize(values.username),
          email: DOMPurify.sanitize(values.email),
          password: values.password,
          dateOfBirth: isLogin ? null : DOMPurify.sanitize(values.dateOfBirth),
          phoneNumber: isLogin ? null : DOMPurify.sanitize(values.phoneNumber),
        };

        if (isLogin) {
          if (!sanitizedValues.identifier && sanitizedValues.email) {
            sanitizedValues.identifier = sanitizedValues.email;
            console.log('Email copied to identifier:', sanitizedValues.identifier);
          }
        }

        const userData = isLogin
          ? {
              identifier: sanitizedValues.email || sanitizedValues.username || sanitizedValues.phoneNumber,
              password: sanitizedValues.password,
            }
          : {
              email: sanitizedValues.email,
              password: sanitizedValues.password,
              username: sanitizedValues.username,
              dateOfBirth: sanitizedValues.dateOfBirth,
              phoneNumber: sanitizedValues.phoneNumber,
            };

        console.log('userData before login:', userData);

        let response;

        if (isLogin) {
          response = await loginUser(userData);
        } else {
          response = await signUpUser(sanitizedValues);
          navigate('/movies');
          return;
        }

        console.log('Login response:', response);

        const { token, expiresIn, hasRegisteredPasskey } = response;

        if (token) {
          if (!expiresIn) {
            console.error('Token expiration not found in login response. Cannot set token.');
            throw new Error('Token expiration not found in login response. Cannot set token.');
          }

          const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
          console.log('Expiration date:', expirationDate);
          Cookies.set('token', token, { expires: expirationDate, secure: true, sameSite: 'strict' });
          console.log('Token:', token);
          login(token);

          if (!hasRegisteredPasskey) {
            navigate('/register-passkey', {state: {userId: response.userId, email: sanitizedValues.email}});
          } else {
            navigate('/movies');
          }
        }
      } catch (error) {
        console.error('Error submitting data:', error);
        setUserError(error.response?.data?.error || 'Invalid Credentials. Please try again.');
      }
    },
  });

    // Define the logout function
    const handleLogout = () => {
      logout(); 
      reset(); 
      formik.resetForm(); 
      navigate('/'); 
  };


  

  return (
    <>
      <Navbar idOfUser={idOfUser} onLogOut={handleLogout}/>
      <Routes>
        <Route element={<HomePage />} path='/' />
        <Route element={<AboutPage />} path='/about' />
        <Route element={<ForgotPasswordPage />} path='/forgot-password' />
        <Route element={<LearnMorePage />} path='/learn-more' />
        <Route
          element={<LoginAndSignUpPage userError={userError} formik={formik} loginUser={loginUser} 
          registerPasskey={registerPasskey} signupUserMessage={signupUserMessage}
          isLogin={isLogin} setIsLogin={setIsLogin}/>} 
          path='/login-signup'
        />
        <Route
          element={<RegisterPasskey formik={formik.values} loginUser={loginUser} registerPasskey={registerPasskey} signUpUser={signUpUser} />}
          path='/register-passkey'
        />
        <Route element={<ProtectedRoute><MoviesPage /></ProtectedRoute>} path='/movies' />
        <Route element={<FourOFourPage />} path='*' />
      </Routes>
      <Footer />
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

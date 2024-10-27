import './App.css';
// import axios from 'axios';
// import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './authenthication/AuthContext';
import ProtectedRoute from './authenthication/ProtectedRoute';

//Commons
import Navbar from './Common/Navbar';
import Footer from './Common/Footer';

//Pages
import HomePage from './Pages/HomePage';
import AboutPage from './Pages/AboutPage';
import MoviesPage from './Pages/MoviesPage';
import FourOFourPage from './Pages/FourOFourPage';
import LoginAndSignUpPage from './Pages/LoginAndSignUpPage';
import ForgotPasswordPage from './Pages/ForgotPasswordPage';
import LearnMorePage from './Pages/LearnMorePage';
import RegisterPasskey from './Pages/RegisterPasskeyPage';



function App() {

  const backEndUrl = process.env.REACT_APP_BACKEND_API;


  console.log('All environment variables:', process.env);
  console.log('backEndUrl', backEndUrl);

  return (

  <AuthProvider>
    <div>
      <BrowserRouter>
         <Navbar />
        <Routes>
          <Route element={<HomePage />} path='/' />
          <Route element={<AboutPage />} path='/about' />
          <Route element={<ForgotPasswordPage />} path='/forgot-password' />
          <Route element={<LearnMorePage />} path='/learn-more' />
          <Route element={<LoginAndSignUpPage />} path='/login-signup' />
          <Route element={<RegisterPasskey />} path='/register-passkey' />
          <Route element={<ProtectedRoute><MoviesPage /></ProtectedRoute>} path='/movies' />
          {/* <Route element={<MoviesPage />} path='/movies' /> */}
          <Route element={<FourOFourPage />} path='*' />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  </AuthProvider>
  );
}

export default App;

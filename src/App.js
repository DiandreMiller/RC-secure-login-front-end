import './App.css';
// import axios from 'axios';
// import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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


function App() {

  const backEndUrl = process.env.REACT_APP_BACKEND_API;

  console.log('All environment variables:', process.env);
  console.log('backEndUrl', backEndUrl);

  return (

    <div>
      <BrowserRouter>
         <Navbar />
        <Routes>
          <Route element={<HomePage />} path='/' />
          <Route element={<AboutPage />} path='/about' />
          <Route element={<ForgotPasswordPage />} path='/forgot-password' />
          <Route element={<LoginAndSignUpPage />} path='/login-signup' />
          <Route element={<MoviesPage />} path='/movies' />
          <Route element={<FourOFourPage />} path='*' />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

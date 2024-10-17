import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Pages
import HomePage from './Pages/HomePage';
import AboutPage from './Pages/AboutPage';
import Navbar from './Common/Navbar';

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

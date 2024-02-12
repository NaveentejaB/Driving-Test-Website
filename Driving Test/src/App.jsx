import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Home from './components/home/Home';
import User_profile from './components/user_profile/User_profile';
import Exam from './components/test_take/Exam';
import Result from './components/test_take/Result';
import './App.css'

const App = () => {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<User_profile />} />
          <Route path='/test' element={<Exam />} />
          <Route path='/result' element={<Result />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

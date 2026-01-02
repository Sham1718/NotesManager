import { useState } from 'react'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import './App.css'
import Navbar from './Component/Navbar'
import Login from './Pages/Login'
import Register from './Pages/Register'
import ProtectedRoute from './utils/ProtectedRoute'
import Home from './Pages/Home'
import Profile from'./Pages/Profile'

function App() {
  

  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
      <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App

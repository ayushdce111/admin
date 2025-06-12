import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import {Routes,Route} from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import { Link, Navigate } from 'react-router-dom';
import RefreshHandler from "./RefreshHandler";
import AdminDashboard from './components/admin/Dashboard';
import AgentDashboard from './components/agent/Dashboard';
import CustomerDashboard from './components/customer/Dashboard';

const PrivateRoute=({element,isAuthenticated})=>{
    return isAuthenticated===true ? element : <Navigate to="/login" />
  }

function App() {
// const Navigate = useNavigate();
  const [isAuthenticated,setisAuthenticated]=useState(false);
  

  return (
    <>
    <RefreshHandler setisAuthenticated={setisAuthenticated}/>
    <Routes>
      <Route path='/' element={<Signup/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/admin/dashboard' element={<AdminDashboard/>} />
      <Route path='/customer/dashboard' element={<CustomerDashboard/>} />
      <Route path='/agent/dashboard' element={<AgentDashboard/>} />
      {/* <Route path='/home' element={<PrivateRoute element={<Home/>} isAuthenticated={isAuthenticated}/>} /> */}

    </Routes>
      
    </>
  )
}

export default App

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
import DemoDesign from "./components/DemoDesign.jsx"

const PrivateRoute=({element,isAuthenticated})=>{
    return isAuthenticated===true ? element : <Navigate to="/login" />
  }

function App() {
// const Navigate = useNavigate();
  // const [isAuthenticated,setisAuthenticated]=useState(false);
  

  return (
    <>
    {/* <RefreshHandler setisAuthenticated={setisAuthenticated}/> */}
    <Routes>
      <Route path='/' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/admin/*' element={<AdminDashboard/>} />
      <Route path='/customer/*' element={<CustomerDashboard/>} />
      <Route path='/agent/*' element={<AgentDashboard/>} />
      <Route path='/DemoDesign/' element={<DemoDesign/>} />

      
      {/* <Route path='/home' element={<PrivateRoute element={<Home/>} isAuthenticated={isAuthenticated}/>} /> */}

    </Routes>
      
    </>
  )
}

export default App

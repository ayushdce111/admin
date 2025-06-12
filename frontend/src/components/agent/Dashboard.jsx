import React from 'react'
import { useNavigate } from 'react-router-dom';
import {ToastContainer} from "react-toastify";
import {handleSuccess} from "../Toast.jsx";


const Dashboard = () => {
   const navigate=useNavigate();
          
      const handleLogout=()=>{
  
  
          localStorage.removeItem("loggedinuser");
          localStorage.removeItem("token");
                  handleSuccess("LoggedOut Successfully");
          setTimeout(() => {
                navigate("/login");
              }, 1000);
      
        }
  return (
    <div>    <button onClick={handleLogout}>LOGOUT</button>
    Agent Dashboard
    <ToastContainer/>
    </div>
  )
}

export default Dashboard
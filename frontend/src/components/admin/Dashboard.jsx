import React from 'react';
import { useNavigate } from 'react-router-dom';
import {ToastContainer} from "react-toastify";
import {handleSuccess} from "../Toast.jsx";

const Dashboard = () => {
        const navigate=useNavigate();

    const handleLogout=()=>{

        handleSuccess("LoggedOut Successfully");
        localStorage.removeItem("loggedinuser");
        localStorage.removeItem("token");


        
        setTimeout(() => {
              navigate("/login");
            }, 1000);
    
      }
  return (
    <>
    <button onClick={handleLogout}>LOGOUT</button>
        <div>ADMIN Dashboard</div>
        <ToastContainer/>
    </>

  )
}

export default Dashboard
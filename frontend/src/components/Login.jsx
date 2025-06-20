import React from 'react';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {ToastContainer} from "react-toastify";
import { handleError,handleSuccess } from './Toast';
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [formData,setformData]=useState({email:"",password:""});
  const handleChange = (e)=>{
    setformData({...formData,[e.target.name]:e.target.value})
  }
  const handleLogin = async (e)=>{
    e.preventDefault();
    const {email,password}=formData;
    if(email===""||password===""){
        return handleError("All fields required")

    }
    try{
      const res = await axios.post("http://localhost:8000/auth/login",formData);
      const resJson = await res.data;
      // console.log(resJson,"<----------------------------responsone signup");
      // console.log(resJson,"<----------------resposne LOCAL");
      const {message,success,error,jwtToken,name,existingUser} =resJson;
      // console.log(resJson,"<----------message",resJson);
      if(success){
        handleSuccess(message);
        localStorage.setItem("token",jwtToken);
        localStorage.setItem("loggedinuser",name);
        localStorage.setItem("userEmail",existingUser.email);
        // localStorage.setItem("loggedinuser",existingUser.userrole);
        // console.log(existingUser?.userrole,"<--------------userrole");
        setTimeout(() => {
          switch(existingUser.userrole){

            case "adminrole":
              navigate("/admin/");
              break;
            
              case "customerrole":
            navigate("/customer/");
            break;
            
            case "agentrole":
                navigate("/agent/");
                break;
            
            default:
              navigate("/login");
                  
          }
          // navigate("/home");
        }, 1000);
      }else if(error){
        handleError(error?.details[0]?.message);
      }else if(!success){
        handleError(message);
      }
      // if(msg){
      //   handleError(msg);
      // }
      }catch(error){
        // console.log(error,"<-------------")
        
        error.status===403 && handleError(error?.response?.data?.message);
        error.status===400 && handleError(error?.response?.data?.error?.details[0]?.message);
      }
  }
  return (
    <>
            <form onSubmit={handleLogin}>
    <div className="bg-gray-100 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-xl shadow-sm w-full max-w-xs sm:max-w-sm md:max-w-md relative ">
                        {/* Yellow header with curved bottom */}
                        {/* <div className='backgroundCurve absolute bottom-0 left-0 right-0'>
                              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <path fill="#FF0066" d="M47.9,-72.5C62.7,-65,75.8,-52.8,82.5,-37.8C89.1,-22.8,89.4,-5,84.9,10.8C80.5,26.6,71.4,40.3,60.7,52.7C50.1,65.1,37.9,76.2,22.8,83.2C7.7,90.1,-10.2,92.9,-27,89.2C-43.8,85.5,-59.4,75.3,-67.7,61.2C-76,47.1,-76.8,29.1,-77,12.5C-77.2,-4.2,-76.8,-19.5,-71.8,-33.7C-66.8,-48,-57.2,-61.1,-44.5,-69.6C-31.8,-78.1,-15.9,-82,0.3,-82.4C16.5,-82.9,33,-80,47.9,-72.5Z" transform="translate(100 100)" />
</svg>
                            </div> */}
                        <div className="curvedBottom bg-gray-900 text-white text-center py-4 sm:py-18 rounded-t-xl relative overflow-hidden">
                           <div className='relative z-9'>
                            <h1 className="text-2xl sm:text-3xl font-bold">Welcome </h1>
                            <p className="mt-2 text-sm sm:text-base">Please sign-in to continue!</p>
                            </div>
                            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#0099ff" fill-opacity="1" d="M0,320L48,277.3C96,235,192,149,288,122.7C384,96,480,128,576,133.3C672,139,768,117,864,112C960,107,1056,117,1152,112C1248,107,1344,85,1392,74.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg> */}
                            {/* Curved bottom effect */}
                            {/* <div className="absolute bottom-0 left-0 right-0 h-8 sm:h-10 bg-blue-300 rounded-t-[50%]"></div> */}
                            
                        </div>
                        {/* Form section */}
                        <div className="p-4 sm:p-6">
                            <div className="mb-4">
                                <input
                                    type="email"
                                    placeholder="Email"
                                    name='email'
                                    onChange={handleChange}
                                    className="w-full p-2 sm:p-3 shadow rounded-lg focus:outline-none focus:bg-[#EEEEEE] text-[#2A4759] text-sm sm:text-base"
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    name='password'
                                    onChange={handleChange}
                                    className="w-full p-2 sm:p-3 shadow rounded-lg focus:outline-none focus:bg-[#EEEEEE] text-[#2A4759]  text-sm sm:text-base"
                                />
                            </div>
                            {/* <div className="text-right mb-4">
                                <a href="#" className="text-xs sm:text-sm text-gray-600 hover:underline">
                                    Forgot your password?
                                </a>
                            </div> */}
                            <button type='submit' className="cursor-pointer w-full bg-gray-900 text-white py-2 sm:py-3 rounded-full hover:bg-[#f79a72d0] transition text-sm sm:text-base">
                                Sign in
                            </button>
                            <div className="text-center mt-4">
                                <p className="text-xs sm:text-sm text-gray-600">
                                    Don't have an account?{' '}
                                    <Link to="/Signup" className="text-[#2A4759] font-bold hover:underline">
                                        Signup
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            
            
        </form>
        <ToastContainer/>
    </>
  )
}

export default Login;
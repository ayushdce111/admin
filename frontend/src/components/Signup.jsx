import React from 'react';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {ToastContainer} from "react-toastify";
import { handleError,handleSuccess } from './Toast';
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const [formData,setformData]=useState({name:"",email:"",password:"",userrole:"adminrole"});
  const handleChange = (e)=>{
    setformData({...formData,[e.target.name]:e.target.value});
    // console.log(formData,"<----------local");
  }
  const handleSignup = async (e)=>{
    e.preventDefault();
    const {name,email,password,userrole}=formData;
    if(name===""||email===""||password==="" || userrole===""){
        return handleError("All fields required")

    }
    try{
      const res = await axios.post("http://localhost:8000/auth/signup",formData);
      const resJson = await res.data;
      // console.log(resJson,"<----------------------------responsone signup");
      console.log(resJson,"<----------------resposne LOCAL");
      const {message,success,error,msg} =resJson;
      
      if(success){
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
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
        // console.log(error,"<-------------------------------error");
        
        error.status===400 && handleError(error.response.data.error.details[0].message) 
      }
  }
  return (
    <>
        <form onSubmit={handleSignup}>
            <div>
                <input
                    type='text'
                    name='name'
                    placeholder='name'
                    onChange={handleChange}
                    />
                    <input
                    type='text'
                    name='email'
                    placeholder='email'
                    onChange={handleChange}
                    />
                    <input
                    type='text'
                    name='password'
                    placeholder='password'
                    onChange={handleChange}
                    />
                    <select onChange={handleChange} name='userrole'>
                      <option value={"adminrole"}>Admin</option>
                      <option value={"agentrole"}>Agent</option>
                      <option value={"customerrole"}>Customer</option>
                    </select>
            </div>
            <button type='submit'>Signup</button>
            <span>
                already have account <Link to="/Login">Login</Link>
            </span>
        </form>
        <ToastContainer/>
    </>
  )
}

export default Signup
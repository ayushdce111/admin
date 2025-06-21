import React from 'react';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {ToastContainer} from "react-toastify";
import { handleError,handleSuccess } from './Toast';
import axios from "axios";
import Logo from "../assets/images/logo.png"
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaCircleArrowRight } from "react-icons/fa6";
import { FaCircleArrowLeft } from "react-icons/fa6";

export const NextArrowSliderUnit = (props) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      style={{
        position: 'absolute',
        // right: '10px',
        right:'2rem',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1,
        cursor: 'pointer',
        color: '#000',
        fontSize: '24px',
      }}
    >
<FaCircleArrowRight size={30} color="#000"/>
    </div>
  );
};

export const PrevArrowSliderUnit = (props) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      style={{
        position: 'absolute',
        left: '2rem',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1,
        cursor: 'pointer',
        color: '#000',
        fontSize: '24px',
      }}
    >
            <FaCircleArrowLeft size={30} color="#000"/>
    </div>
  );
};

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    // nextArrow: <NextArrowSliderUnit />,
    // prevArrow: <PrevArrowSliderUnit />,
    arrows: null,
    responsive: [
      {
        breakpoint: 768, // For tablets
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // For mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    appendDots: dots => (
    <div
      style={{
        position: 'absolute',
        bottom: '10px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        zIndex: 2,
      }}
    >
      <ul style={{ margin: 0 }}>{dots}</ul>
    </div>
  ),
  };

function Signup() {
  const navigate = useNavigate();
  const [formData,setformData]=useState({name:"",email:"",password:"",userrole:""});
  const handleChange = (e)=>{
    setformData({...formData,[e.target.name]:e.target.value});
    console.log(formData,"<----------local");
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
      // console.log(resJson,"<----------------resposne LOCAL");
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
        
        error.status===400 && handleError(error.response.data.error.details[0].message);
        error.status===409 && handleError(error.response.data.message) 
      }
  }
  return (
    <>
     
        
           
           
            
  
        <ToastContainer/>
        <div className='w-[100vw] h-[100vh] bg-[#00809D] p-4   relative overflow-hidden'>
                            <div className='w-[80%] mx-auto h-full grid grid-cols-1 md:grid-cols-2   p-2 rounded-2xl  relative z-50 '>
                                <div className='hidden h-full  rounded-l-2xl md:flex flex-col justify-between bg-transparent border-10 border-[#FCECDD]'>
                
                                    <div className=' w-full h-1/7 '>
                                        <div className=' w-40 h-full  p-2 text-left '>
                                            <img src={Logo} className=' h-full object-contain' />
                
                                        </div>
                
                                    </div>
                                    <div className=' w-full h-1/3 '>
                                        <Slider {...settings} className='h-full'>
                
                                            <div className='h-[31vh]  rounded-b-2xl'>
                                                <div className='h-full flex justify-center items-center'>
                                                    <p className='text-[#FCECDD] text-center text-3xl leading-14 font-semibold tracking-wider'> Be yourself <br/> Everyone else is already taken </p>
                                                </div>
                                                
                                            </div>
                                            <div className='h-[31vh]  rounded-b-2xl'>
                                                <div className='h-full flex justify-center items-center'>
                                                    <p className='text-[#FCECDD] text-center text-3xl leading-14 font-semibold tracking-wider'> Be yourself <br/> Everyone else is already taken </p>
                                                </div>
                                                
                                            </div>
                                            <div className='h-[31vh]  rounded-b-2xl'>
                                                <div className='h-full flex justify-center items-center'>
                                                    <p className='text-[#FCECDD] text-center text-3xl leading-14 font-semibold tracking-wider'> Be yourself <br/> Everyone else is already taken </p>
                                                </div>
                                                
                                            </div>
                                            <div className='h-[31vh]  rounded-b-2xl'>
                                                <div className='h-full flex justify-center items-center'>
                                                    <p className='text-[#FCECDD] text-center text-3xl leading-14 font-semibold tracking-wider'> Be yourself <br/> Everyone else is already taken </p>
                                                </div>
                                                
                                            </div>
                
                                        </Slider>
                
                                    </div>
                
                                </div>
                                <div className='bg-[#FCECDD] rounded-r-2xl h-min md:h-full w-full py-10 md:p-0'>
                                    <div className=' flex flex-col gap-6 justify-center items-center tracking-wide h-full p-2'>
                                        <div className=' p-2 w-[70%]'>
                                            <p className='text-5xl text-[#00809D] inline-block font-bold'>SignUp</p>
                                        </div>
                                        <div className='w-[70%]'>
                                            <p className='text-[#FF7601]'>Already have an account ? <Link to="/Login" className='font-bold '>Login</Link></p>
                                           
                                        </div>
                                        <div className='w-[70%]'>
                                          <form onSubmit={handleSignup} className=' flex flex-col gap-6 w-full '>
        
        
                    <div>
                          <input
                        type='text'
                        name='name'
                        placeholder='Name'
                        onChange={handleChange}
                        className="font-semibold text-[#183B4E] border-2 border-gray-200 outline-none hover:border-[#F3A26D] placeholder:text-[#183B4E] rounded p-2 w-full bg-[#FF7601] h-11"
                        />
                    </div>
                    <div>
                       <input
                                              type="email"
                                              placeholder="Email"
                                              name='email'
                                              onChange={handleChange}
                                              className="font-semibold text-[#183B4E] border-2 border-gray-200 outline-none hover:border-[#F3A26D] placeholder:text-[#183B4E] rounded p-2 w-full bg-[#FF7601] h-11"
                                          />
                    </div>
                    <div>
                      <input
                                              type="password"
                                              placeholder="Password"
                                              name='password'
                                              onChange={handleChange}
                                              className="font-semibold text-[#183B4E] border border-gray-200 outline-none hover:border-[#F3A26D] placeholder:text-[#183B4E] rounded p-2 w-full bg-[#FF7601] h-11"
                                          />
                    </div>
                    <div>
                      <select onChange={handleChange} name='userrole' className=' font-semibold text-[#183B4E] border border-gray-200 outline-none hover:border-[#F3A26D] placeholder:text-[#183B4E] rounded p-2 w-full bg-[#FF7601] h-11 cursor-pointer'>
                      <option value={""}>Select Role</option>
                      <option value={"adminrole"}>Admin</option>
                      <option value={"agentrole"}>Agent</option>
                      <option value={"customerrole"}>Customer</option>
                    </select>
                    </div>
                    
          
                                            
                                                
                                                
                                                
                                                <div>
                                                  
                                                    <button type='submit' className='bg-[#00809D] p-2 w-full rounded-md text-[#FCECDD] font-bold h-12 cursor-pointer'>SignUp</button>
                                                </div>
                                            
                </form>
                                        </div>
                
                                    </div>
                
                                </div>
                           </div>
                {/* custom */}
                <div id="container" className='absolute left-0 right-0 bottom-[-1rem] z-1'>
                  <div id="container-inside">
                      <div id="circle-small"></div>
                      <div id="circle-medium"></div>
                      <div id="circle-large"></div>
                      <div id="circle-xlarge"></div>
                      <div id="circle-xxlarge"></div>
                  </div>
                </div>
                {/* custom */}
                        </div>
    </>
  )
}

export default Signup
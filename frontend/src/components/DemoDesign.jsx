import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaCircleArrowRight } from "react-icons/fa6";
import { FaCircleArrowLeft } from "react-icons/fa6";
import Logo from "../assets/images/logo.png"
import "../assets/css/Demo.css"


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

  
const DemoDesign = () => {
  return (
    <>
        <div className='w-[100vw] h-[100vh] bg-[#00809D] p-4   relative overflow-hidden'>
            <div className='h-full grid grid-cols-1 md:grid-cols-2   p-2 rounded-2xl  relative z-50 '>
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
                            <p className='text-5xl text-[#00809D] inline-block font-bold'>Login</p>
                        </div>
                        <div className='w-[70%]'>
                            <p className='text-[#FF7601]'>Don't have account ? <span className='font-bold '>SignUp</span></p>
                        </div>
                        <div className='flex flex-col gap-6 w-[70%] '>
                            
                                
                                <div>
                                    <input type='email' placeholder='Email' className='font-semibold text-[#183B4E] border-2 border-gray-200 outline-none hover:border-[#F3A26D] placeholder:text-[#183B4E] rounded p-2 w-full bg-[#FF7601] h-11'/>
                                </div>
                                <div>
                                    <input type='text' placeholder='Password' className='font-semibold text-[#183B4E] border border-gray-200 outline-none hover:border-[#F3A26D] placeholder:text-[#183B4E] rounded p-2 w-full bg-[#FF7601] h-11'/>
                                </div>
                                <div>
                                    <button className='bg-[#00809D] p-2 w-full rounded-md text-[#FCECDD] font-bold h-12 cursor-pointer'>LOGIN</button>
                                </div>
                            

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

export default DemoDesign
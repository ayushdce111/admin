import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {ToastContainer} from "react-toastify";
import {handleSuccess} from "../Toast.jsx";
import axios from "axios";
import AddPackages from "./AddPackages.jsx";
// const { FaHome, FaUsers, FaFolder, FaCalendar, FaFileAlt, FaCog, FaBars, FaBell, FaChevronDown, FaSearch } = window.ReactIcons;
import { FaHome, FaUsers, FaFolder, FaCalendar, FaFileAlt, FaCog, FaBars, FaBell, FaChevronDown, FaSearch } from 'react-icons/fa';
const Dashboard = () => {
        const navigate=useNavigate();

    const handleLogout=()=>{

        handleSuccess("LoggedOut Successfully");
        localStorage.removeItem("loggedinuser");
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");


        
        setTimeout(() => {
              navigate("/login");
            }, 1000);
    
      }
          
      // demo start
const [isSidebarOpen, setIsSidebarOpen] = useState(false);

            const toggleSidebar = () => {
                setIsSidebarOpen(!isSidebarOpen);
            };
      // demo end
  return (
    <>
    
        <div className="flex min-h-screen overflow-hidden ">
                    {/* Sidebar */}
                    <div className={`fixed md:static  left-0 bg-gray-900 text-white transition-all duration-300 z-50 
                        ${isSidebarOpen ? 'w-64' : 'w-16'} md:w-64 flex flex-col`}>
                        {/* Logo and Toggle Button */}
                        <div className="flex items-center justify-between p-4">
                            <div className="flex items-center space-x-2">
                                <svg className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-2h2v2h-2zm1-3c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                                </svg>
                                {isSidebarOpen && <span className="text-lg font-bold hidden md:block">LOGO</span>}
                            </div>
                            <button onClick={toggleSidebar} className="md:hidden text-red-700">
                                <FaBars className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Menu Items */}
                        <nav className="flex-1">
                            <a href="#" className="flex items-center space-x-3 p-4 hover:bg-gray-700">
                                <FaHome className="w-5 h-5" />
                                {(isSidebarOpen || window.innerWidth >= 768) && <span>Dashboard</span>}
                            </a>
                            <a href="#" className="flex items-center space-x-3 p-4 hover:bg-gray-700">
                                <FaUsers className="w-5 h-5" />
                                {(isSidebarOpen || window.innerWidth >= 768) && <span>Add Packages</span>}
                            </a>
                            <a href="#" className="flex items-center space-x-3 p-4 hover:bg-gray-700">
                                <FaUsers className="w-5 h-5" />
                                {(isSidebarOpen || window.innerWidth >= 768) && <span>Team</span>}
                            </a>
                            <a href="#" className="flex items-center space-x-3 p-4 hover:bg-gray-700">
                                <FaFolder className="w-5 h-5" />
                                {(isSidebarOpen || window.innerWidth >= 768) && <span>Projects</span>}
                            </a>
                            <a href="#" className="flex items-center space-x-3 p-4 hover:bg-gray-700">
                                <FaCalendar className="w-5 h-5" />
                                {(isSidebarOpen || window.innerWidth >= 768) && <span>Calendar</span>}
                            </a>
                            <a href="#" className="flex items-center space-x-3 p-4 hover:bg-gray-700">
                                <FaFileAlt className="w-5 h-5" />
                                {(isSidebarOpen || window.innerWidth >= 768) && <span>Documents</span>}
                            </a>
                            <a href="#" className="flex items-center space-x-3 p-4 hover:bg-gray-700">
                                <FaFileAlt className="w-5 h-5" />
                                {(isSidebarOpen || window.innerWidth >= 768) && <span>Reports</span>}
                            </a>
                        </nav>

                        {/* Teams Section */}
                        {(isSidebarOpen || window.innerWidth >= 768) && (
                            <div className="p-4">
                                <h3 className="text-sm font-semibold mb-2">Your teams</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">H</div>
                                        <span className="text-sm">Heroicons</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">T</div>
                                        <span className="text-sm">Tailwind Labs</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">W</div>
                                        <span className="text-sm">Workcation</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Settings */}
                        <a href="#" className="flex items-center space-x-3 p-4 hover:bg-gray-700 mt-auto">
                            <FaCog className="w-5 h-5" />
                            {(isSidebarOpen || window.innerWidth >= 768) && <span>Settings</span>}
                        </a>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 flex flex-col max-h-screen overflow-y-auto ">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 bg-white shadow-sm sticky top-0">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="border rounded-sm py-2 px-4 pl-10 w-40 sm:w-64 focus:border-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                <FaSearch className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                            </div>
                            <div className="flex items-center space-x-3">
                                <FaBell className="w-5 h-5 text-gray-500" />
                                <img src="#" alt="User" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border" />
                                <div className=' border p-1 rounded-sm relative'>
                                    <div className='flex gap-2 items-center'>
                                        <span className="hidden sm:inline text-sm sm:text-base">Tom Cook</span>
                                        <FaChevronDown className="w-4 h-4 text-gray-500" />
                                    </div>
                                    <div className='absolute top-[100%] shadow w-full flex flex-col bg-gray-300 text-sm'>
                                        <button onClick={handleLogout} className='cursor-pointer border border-amber-600 rounded hover:bg-blue-200  px-2 py-1 '>LOGOUT</button>
                                    </div>
                                </div>
                                
                            </div>
                        </div>

                        {/* Main Area */}
                        <div className="flex-1  sm:px-6 sm:py-3 bg-gray-100">
                            
                                <AddPackages />
                           
                        </div>
                    </div>
                </div>
        <ToastContainer/>
    </>

  )
}

export default Dashboard
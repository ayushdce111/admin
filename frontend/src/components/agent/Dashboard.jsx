import React,{useEffect, useState} from 'react';
import { useNavigate,Routes,Route,Link, useLocation } from 'react-router-dom';
import {ToastContainer} from "react-toastify";
import {handleSuccess} from "../Toast.jsx";
// import axios from "axios";
import AgentAddPackages from "./AgentAddPackages.jsx";
import AgentViewPackages from "./AgentViewPackages.jsx";
import AgentViewLeads from "./AgentViewLeads.jsx";
import { WalletProvider } from '../WalletContext.jsx';
// import ViewEnquiry from "./ViewEnquiry.jsx"
import { IoCaretDownSharp } from "react-icons/io5";
import { AiFillDingtalkCircle } from "react-icons/ai";
import DashboardHeader from "./DashboardHeader.jsx";

// const { FaHome, FaUsers, FaFolder, FaCalendar, FaFileAlt, FaCog, FaBars, FaBell, FaChevronDown, FaSearch } = window.ReactIcons;
import { FaHome, FaUsers, FaFolder, FaCalendar, FaFileAlt, FaCog, FaBars, FaBell, FaChevronDown, FaSearch } from 'react-icons/fa';
import AgentMain from './AgentMain.jsx';
const Dashboard = () => {
        const navigate=useNavigate();
        const { pathname } = useLocation();
        const userEmail = localStorage.getItem("userEmail");
        const userLoggedin = localStorage.getItem("loggedinuser");
// console.log(userEmailLoggedin,userEmail,"<-----------my data" );
// !userEmail && (<>{navigate("/login"); return}</>)
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

            const [openMenus, setOpenMenus] = useState({
                menu1: false,
                submenu12: false,
              });

  const toggleMenu = (menu) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };
      // demo end

      useEffect(() => {
    if (!userEmail) {
      navigate("/login");
    }
  }, [userEmail, navigate]);
  return (
    <>
    <WalletProvider>
        <div className="flex min-h-screen overflow-hidden ">
                    {/* Sidebar */}
                    <div className={`max-h-screen overflow-auto fixed md:static  left-0 bg-gray-900 text-white transition-all duration-300 z-50 
                        ${isSidebarOpen ? 'w-64' : 'w-16'} md:w-64 flex flex-col`}>
                        {/* Logo and Toggle Button */}
                        <div className="flex items-center justify-between p-4 border-b-1">
                            <div className="flex items-center space-x-2">
                                {/* <svg className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-2h2v2h-2zm1-3c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                                </svg> */}
                                <span className="text-lg font-bold text-white capitalize" style={{padding:"3px"}}>{userLoggedin} </span>
                                {/* {isSidebarOpen && <span className="text-lg font-bold hidden md:block text-white">ADMIN</span>} */}
                            </div>
                            <button onClick={toggleSidebar} className="md:hidden text-red-700">
                                <FaBars className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Menu Items */}
                        <nav className="flex-1">
                            <ul className="space-y-2">
                                     
                                          <li >
                                           <Link to={"/agent/"} className={` flex items-center space-x-3 p-4 hover:bg-gray-700 ${pathname === '/agent/' ? 'bg-gray-700' : ''}`}>
                                            <FaHome className="w-5 h-5" />
                                            {(isSidebarOpen || window.innerWidth >= 768) && <span>Dashboard</span>}
                                            </Link>
                                          </li>
                                      
                                
                                        {/* Menu 1 with children */}
                                        <li>
                                          <Link to={""}
                                            onClick={() => toggleMenu('menu1')}
                                            className={` flex items-center space-x-3 p-4 hover:bg-gray-700 ${pathname === '/agent/AddPackages/' || pathname === '/agent/ViewPackages/' ? 'bg-gray-700' : ''}`}
                                          >
                                            <FaHome className="w-5 h-5" />
                                           {(isSidebarOpen || window.innerWidth >= 768) && <span>Packages</span>}
                                            <span className={`transform transition-transform ml-auto ${openMenus.menu1 ? 'rotate-90' : ''}`}><IoCaretDownSharp /></span>
                                          </Link>
                                
                                          {openMenus.menu1 && (
                                            <ul className="pl-6 mt-1 space-y-1">
                                              <li>
                                                <Link to={"/agent/AgentAddPackages/"} className={` flex items-center space-x-3 p-4 hover:bg-gray-700 ${pathname === '/agent/AgentAddPackages/' ? 'bg-gray-700' : ''}`}>
                                                  Add Packages
                                                </Link>
                                              </li>
                                              <li>
                                                <Link to={"/agent/AgentViewPackages/"} className={` flex items-center space-x-3 p-4 hover:bg-gray-700 ${pathname === '/agent/AgentViewPackages/' ? 'bg-gray-700' : ''}`}>
                                                  View Packages
                                                </Link>
                                              </li>
                                
                                              
                                              
                                            </ul>
                                          )}
                                        </li>
                                        <li >
                                           <Link to={"/agent/viewleads"} className={` flex items-center space-x-3 p-4 hover:bg-gray-700 ${pathname === '/agent/viewleads' ? 'bg-gray-700' : ''}`}>
                                            <FaHome className="w-5 h-5" />
                                            {(isSidebarOpen || window.innerWidth >= 768) && <span>View Leads</span>}
                                            </Link>
                                          </li>
                                         {/* <li >
                                           <Link to={"/admin/ViewEnquiry/"} className={` flex items-center space-x-3 p-4 hover:bg-gray-700 ${pathname === '/admin/ViewEnquiry/' ? 'bg-gray-700' : ''}`}>
                                            <FaHome className="w-5 h-5" />
                                            {(isSidebarOpen || window.innerWidth >= 768) && <span>View Enquiry</span>}
                                            </Link>
                                          </li> */}
                                {/* <li >
                                           <Link to={""} className={` flex items-center space-x-3 p-4 hover:bg-gray-700 ${pathname === '/menu/' ? 'bg-gray-700' : ''}`}>
                                            <FaHome className="w-5 h-5" />
                                            {(isSidebarOpen || window.innerWidth >= 768) && <span>MNEU</span>}
                                            </Link>
                                          </li> */}
                                        
                                      </ul>
                                      
                            
                            
                                {/* <a href="#" className="flex items-center space-x-3 p-4 hover:bg-gray-700">
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
                                </a> */}
                        </nav>

                        {/* Teams Section */}
                        {/* {(isSidebarOpen || window.innerWidth >= 768) && (
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
                        )} */}

                        {/* Settings */}
                        <ul>
                         <li >
                            <Link to={""} className={` flex items-center space-x-3 p-4 hover:bg-gray-700 ${pathname === '' ? 'bg-gray-700' : ''}`}>
                            <FaCog className="w-5 h-5" />
                            {(isSidebarOpen || window.innerWidth >= 768) && <span>Settings</span>}
                            </Link>
                        </li>
                        </ul>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 flex flex-col max-h-screen overflow-y-auto ">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 bg-white shadow-sm sticky top-0">
                            {/* <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="border rounded-sm py-2 px-4 pl-10 w-40 sm:w-64 focus:border-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />
                                <FaSearch className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                            </div> */}
                            <DashboardHeader userEmail={userEmail} handleLogout={handleLogout}/>
                        </div>

                        {/* Main Area */}
                        <div className="flex-1 px-3  bg-gray-100">
                            <Routes>
                                <Route path="/" element={<AgentMain />} />
                                 <Route path="/AgentAddPackages/" element={<AgentAddPackages />} />
                                <Route path="/AgentViewPackages/" element={<AgentViewPackages />} />
                                
                                <Route path="/viewleads/" element={<AgentViewLeads />} />

                                {/*<Route path="/ViewEnquiry/" element={<ViewEnquiry />} /> */}
                            </Routes>
                                {/* <AddPackages /> */}
                           
                        </div>
                    </div>
                </div>
                </WalletProvider>
        <ToastContainer/>
    </>

  )
}

export default Dashboard
import React,{useContext,useState,useEffect} from 'react'
import { WalletContext } from '../WalletContext.jsx';
import API from "../../../axios.jsx";

function DashboardHeader({userEmail,handleLogout}) {
    const { setWallet, wallet } = useContext(WalletContext);
    // const localuserEmail = localStorage.getItem("userEmail");
    const[AgentCredit,setAgentCredit] = useState("");
    const getagentCredit =async ()=>{ 
         try{
            const Alldata = await API.get('/agent/api/getagentcredit',{
            params: { userEmail }
        });
            // console.log(Alldata.data[0].agentCredit,"<--------Alldata.data")
            // setAgentCredit(Alldata.data)
            // console.log(Alldata.data.length);
            setWallet(Alldata.data[0].agentCredit);
            
        }catch(error){
            console.log(error);
        }
    }
    // const updateagentCredit =async ()=>{
    //     try{
            
    //           const Alldata = await axios.post('http://localhost:8000/agent/api/updatecredittoagent',completeLeadtoSend);
    //           const responsData = await Alldata.data;
    //           console.log(responsData,"<--------------",responsData.message);
    //           handleSuccess(responsData.message);
    //           setrefreshTable(prev=>prev+1);
    //           // setAgentName("")
    //       }catch(error){
    //         console.error(error);
    //       }
    // }
    useEffect(()=>{
           
        getagentCredit();
        // updateagentCredit();
    },[])
  return (
    <>
        <div className="flex items-center space-x-3 ml-auto">
                                {/* <FaBell className="w-5 h-5 text-gray-500" /> */}
                                {/* <img src="" alt="User" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border" /> */}
                                {/* <AiFillDingtalkCircle className="w-8 h-8 sm:w-10 sm:h-10 rounded-full" /> */}
                                <span className='capitalize text-sm'>{userEmail} </span>
                                <div className='bg-[#e0c0ab] text-gray-900 p-1 px-2 rounded'>
                                    <p>Credit  ₹<span className='text-gray-900 font-bold'>{wallet}</span></p>
                                </div>
                                <button onClick={handleLogout} className='cursor-pointer border border-gray-900 rounded bg-gray-900 text-white hover:bg-gray-700  px-2 py-1 '>LOGOUT</button>
                                {/* <div className=' border p-1 rounded-sm relative'>
                                    <div className='flex gap-2 items-center'>
                                        <span className="hidden sm:inline text-sm sm:text-base">Tom Cook</span>
                                        <FaChevronDown className="w-4 h-4 text-gray-500" />
                                    </div>
                                    <div className='absolute top-[100%] shadow w-full flex flex-col bg-gray-300 text-sm'>
                                        <button onClick={handleLogout} className='cursor-pointer border border-amber-600 rounded hover:bg-blue-200  px-2 py-1 '>LOGOUT</button>
                                    </div>
                                </div> */}
                                
                            </div>
    </>
  )
}

export default DashboardHeader
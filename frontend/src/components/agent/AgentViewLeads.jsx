import React,{useState,useContext} from 'react';
import axios from 'axios';
import { useEffect } from 'react';
// import "../../assets/css/viewpackages.css";
// import ViewDataTable from "./ViewDataTable";
import { DataGrid } from '@mui/x-data-grid';
import { WalletContext } from '../WalletContext.jsx';

function AgentViewLeads() {
    // const UserEmail= localStorage.getItem("userEmail");
    const [allAgentLeads, setallAgentLeads] = useState([]);
    const userEmail = localStorage.getItem("userEmail");
    const { setWallet, wallet } = useContext(WalletContext);
  useEffect(()=>{
    try{
    const getallagentLeads =async ()=>{ 
        const Alldata = await axios.get('http://localhost:8000/agent/api/allleads',{
        params: { userEmail }
      });
        setallAgentLeads(Alldata.data)
    // console.log(Alldata.data.length);
    // setWallet(prev=> prev - Alldata.data.length*100);
    }
    getallagentLeads();
    }catch(error){
        console.log(error);
    }
},[])
// 


const ChangeStatusButton = ({ row }) => {

  const Buystatus = ['Buy', 'Active'];


  const handleClick = () => {
    const currentIndex = Buystatus.indexOf("Buy");
    const nextStatus = Buystatus[(currentIndex + 1) % Buystatus.length];

    // Update state with new status
    // console.log(allAgentLeads,"<------------nextStatus",row._id)

    setallAgentLeads((prevPackages) =>
      prevPackages.map((pkg) =>
        pkg._id === row._id ? { ...pkg, boughtby: [userEmail] } : pkg
      )
    );
    
    
    // nextStatus==="" ? setupdatedTextStatus("Pending") : setupdatedTextStatus(nextStatus);
    // console.log(row,"<==========row",allAgentLeads);
    // console.log(row.boughtby.includes(userEmail),"<--------row.statusnow")
    handleSubmit(row._id,userEmail);
  };
// console.log(row.agentStatus,"<-----------row.agentStatus")
  // return <button onClick={handleClick} className={`customButtom ${row.agentStatus ==="Approved" ? "bg-green-300 px-2 rounded-md cursor-pointer " : row.agentStatus ==="Pending" ? "bg-yellow-300 px-2 rounded-md cursor-pointer" : row.agentStatus ==="Rejected" ? "bg-red-300 px-2 rounded-md cursor-pointer" : ""} `}>{row.agentStatus}</button>;
  return <button onClick={handleClick} className={` px-2 text-white customButtom rounded ${row.boughtby.includes(userEmail) ? "bg-green-500" : "bg-gray-800" }`}>{row.boughtby.includes(userEmail) ? "ACTIVE" : "BUY"}</button>
};
const columns = [
  {
    field: 'buy',
    headerName: 'Buy',
    width: 100,
    renderCell: (params) => <ChangeStatusButton row={params.row} />,
    editable: false,headerClassName: 'custom-dataGrid-Column-design',
  },
  { field: 'name', headerName: 'name', width: 200,headerClassName: 'custom-dataGrid-Column-design' },
  { field: 'phone', headerName: 'phone', width: 200 ,headerClassName: 'custom-dataGrid-Column-design'},
  { field: 'travelernumber', headerName: 'travelernumber', width: 300 ,headerClassName: 'custom-dataGrid-Column-design'},
  {field:"leavingFrom",headerName:"leavingFrom",width:300,headerClassName: 'custom-dataGrid-Column-design'},
  {field:"goingTo",headerName:"goingTo",width:300,headerClassName: 'custom-dataGrid-Column-design'},
  { field: 'additionalDetails', headerName: 'additionalDetails', width: 200 ,headerClassName: 'custom-dataGrid-Column-design'},
  { field: 'submittedAt', headerName: 'submittedAt', width: 300,headerClassName: 'custom-dataGrid-Column-design' },
  

];
const rows=allAgentLeads;
const getRowId = (allAgentLeads) => {
      return allAgentLeads._id; 
    };

    const handleSubmit = async (updated_id,userEmail) => {
  // console.log('Submitted data:', allAgents);
  console.log(updated_id,"-==============",userEmail)

  // try{
  
  
  //           const response = await axios.post("http://localhost:8000/admin/api/agentslist", {updated_id, nextStatus});
  //           const responsData = await response.data;
  //           console.log(responsData,"<-------------responsData");
  
  //           handleSuccess("form submitted")
  // }catch(error){
  //   // console.log(error,"<--------to handlew");
  //   error.status===409 ? handleError(error.response.data.message + " with same name") :"";
    
  // }
};


    return (
    <>
    <div style={{ height: "calc(100vh - 5rem)", width: '100%',paddingTop:"1rem" }}>
          <DataGrid 
            rows={rows} 
            columns={columns}    
            autoPageSize 
            getRowId={getRowId} 
            rowHeight={45} 
            
            sx={{
    '& .MuiDataGrid-columnHeaders': {
      backgroundColor: 'red', 
    //   color: '#fff',  
    
    fontWeight: 'bold', 
    height:"45px"           
    },
  }}/>
        </div>
   
    </>
  )
}

export default AgentViewLeads
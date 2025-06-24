import React,{useState} from 'react';
import axios from 'axios';
import { useEffect } from 'react';
// import "../../assets/css/viewpackages.css";
// import ViewDataTable from "./ViewDataTable";
import { DataGrid } from '@mui/x-data-grid';

function AgentViewLeads() {
    // const UserEmail= localStorage.getItem("userEmail");
    const [allAgentLeads, setallAgentLeads] = useState([]);
    const userEmail = localStorage.getItem("userEmail");
  useEffect(()=>{
    try{
    const getallagentLeads =async ()=>{ 
        const Alldata = await axios.get('http://localhost:8000/agent/api/allleads',{
        params: { userEmail }
      });
        setallAgentLeads(Alldata.data)
    console.log(allAgentLeads.data);
    }
    getallagentLeads();
    }catch(error){
        console.log(error);
    }
},[])
// 
const columns = [
  { field: 'name', headerName: 'name', width: 200 },
  { field: 'phone', headerName: 'phone', width: 200 },
  { field: 'travelernumber', headerName: 'travelernumber', width: 300 },
  {field:"leavingFrom",headerName:"leavingFrom",width:300},
  {field:"goingTo",headerName:"goingTo",width:300},
  { field: 'additionalDetails', headerName: 'additionalDetails', width: 200 },
  { field: 'submittedAt', headerName: 'submittedAt', width: 300 },

];
const rows=allAgentLeads;
const getRowId = (allAgentLeads) => {
      return allAgentLeads._id; 
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
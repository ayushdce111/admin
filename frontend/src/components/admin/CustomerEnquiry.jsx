import React,{useState} from 'react';
import axios from 'axios';
import { useEffect } from 'react';
// import "../../assets/css/viewpackages.css";
// import ViewDataTable from "./ViewDataTable";
import { DataGrid } from '@mui/x-data-grid';

function CustomerEnquiry() {
    const UserEmail= localStorage.getItem("userEmail");
    const [allEnquiry, setAllEnquiry] = useState([]);
  useEffect(()=>{
    try{
    const getallEnquiry =async ()=>{ 
        const Alldata = await axios.get('http://localhost:8000/admin/api/enquiry');
        setAllEnquiry(Alldata.data)
    // console.log(Alldata.data);
    }
    getallEnquiry();
    }catch(error){
        console.log(error);
    }
},[])
// 
const columns = [
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'phone', headerName: 'Phone', width: 300 },
  {field:"message",headerName:"Message",width:300},
  
];
const rows=allEnquiry;
const getRowId = (allEnquiry) => {
      return allEnquiry._id; 
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

export default CustomerEnquiry
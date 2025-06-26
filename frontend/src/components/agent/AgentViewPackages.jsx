import React,{useState} from 'react';
import API from "../../../axios.jsx";
import { useEffect } from 'react';
// import "../../assets/css/viewpackages.css";
// import ViewDataTable from "./ViewDataTable";
import { DataGrid } from '@mui/x-data-grid';

function ViewPackages() {
    const UserEmail= localStorage.getItem("userEmail");
    const [alltravelPackages, setAllTravelPackages] = useState([]);
    const userEmail = localStorage.getItem("userEmail");
  useEffect(()=>{
    try{
    const getallPackages =async ()=>{ 
        const Alldata = await API.get('/agent/api/travelpackages',{
        params: { userEmail }
      });
        setAllTravelPackages(Alldata.data)
    console.log(Alldata.data);
    }
    getallPackages();
    }catch(error){
        console.log(error);
    }
},[])
// 
const columns = [
  { field: 'travelcategory', headerName: 'Category', width: 200 },
  { field: 'title', headerName: 'Title', width: 200 },
  { field: 'inclusions', headerName: 'Inclusions', width: 300 },
  {field:"travelMode",headerName:"TravelMode",width:300},
  {field:"prices",headerName:"Prices",width:300},
  { field: 'duration', headerName: 'Duration', width: 200 },
  { field: 'destinations', headerName: 'Destinations', width: 300 },
  { field: 'description', headerName: 'Description', width: 200 },
  { field: 'availability', headerName: 'Availability', width: 300 },
];
const rows=alltravelPackages;
const getRowId = (alltravelPackages) => {
      return alltravelPackages._id; 
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

export default ViewPackages
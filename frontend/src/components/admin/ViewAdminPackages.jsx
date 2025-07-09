import React,{useState} from 'react';
import API from "../../../axios.jsx";
import { useEffect } from 'react';
// import "../../assets/css/viewpackages.css";
// import ViewDataTable from "./ViewDataTable";
import { MdOutlineEdit } from "react-icons/md";
import { DataGrid } from '@mui/x-data-grid';
import "../../assets/css/DataGridTable.css";
import { Link, useNavigate } from 'react-router-dom';

function ViewAdminPackages() {
    const navigate = useNavigate();
    const UserEmail= localStorage.getItem("userEmail");
    const [alltravelPackages, setAllTravelPackages] = useState([]);
  useEffect(()=>{
    try{
    const getallPackages =async ()=>{ 
        const Alldata = await API.get('/admin/api/admintravelpackages');
        setAllTravelPackages(Alldata.data)
    // console.log(Alldata.data);
    }
    getallPackages();
    }catch(error){
        console.log(error);
    }
},[])
// 

const ChangeStatusButton = ({ row }) => {
  
  const handleClick = () => {
    // console.log(row._id)
    const updateRow = row._id;
    localStorage.setItem("updating_row", updateRow);
    navigate(`/admin/AddPackages/${updateRow}`);

  };

  return <button onClick={handleClick} className="cursor-pointer"><MdOutlineEdit /></button>;
};


const columns = [

  
  { field: '', headerName: 'Edit', width: 55 ,headerClassName: 'custom-dataGrid-Column-design',renderCell: (params) => <ChangeStatusButton row={params.row} />},
  { field: 'travelcategory', headerName: 'Category', width: 150 ,headerClassName: 'custom-dataGrid-Column-design'},
  { field: 'title', headerName: 'Title', width: 150,headerClassName: 'custom-dataGrid-Column-design' },
  { field: 'inclusions', headerName: 'Inclusions', width: 150,headerClassName: 'custom-dataGrid-Column-design' },
  { field:"travelMode",headerName:"TravelMode",width:150,headerClassName: 'custom-dataGrid-Column-design'},
  { field:"prices",headerName:"Prices",width:150,headerClassName: 'custom-dataGrid-Column-design'},
  { field: 'duration', headerName: 'Duration', width: 150,headerClassName: 'custom-dataGrid-Column-design' },
  { field: 'destinations', headerName: 'Destinations', width: 150,headerClassName: 'custom-dataGrid-Column-design' },
  { field: 'description', headerName: 'Description', width: 150,headerClassName: 'custom-dataGrid-Column-design' },
  { field: 'availability', headerName: 'Availability', width: 150,headerClassName: 'custom-dataGrid-Column-design' },
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
      // backgroundColor: 'red', 
    //   color: '#fff',  
    
    // fontWeight: 'bold', 
    height:"45px"           
    },
  }}/>
        </div>
   
    </>
  )
}

export default ViewAdminPackages
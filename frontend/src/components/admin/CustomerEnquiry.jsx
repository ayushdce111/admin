import React,{useState} from 'react';
import axios from 'axios';
import { useEffect } from 'react';
// import "../../assets/css/viewpackages.css";
// import ViewDataTable from "./ViewDataTable";
import { DataGrid } from '@mui/x-data-grid';
import "../../assets/css/DataGridTable.css"

function CustomerEnquiry() {
    const UserEmail= localStorage.getItem("userEmail");
    const [allEnquiry, setAllEnquiry] = useState([]);
     const [selectionModel, setSelectionModel] = useState([]);
    console.log(selectionModel,"<---------------------------selectionModel",selectionModel.ids.size);


    const getallEnquiry =async ()=>{ 
      try{
        const Alldata = await axios.get('http://localhost:8000/admin/api/enquiry');
        setAllEnquiry(Alldata.data)
    // console.log(Alldata.data);
    }catch(error){
        console.log(error);
    }
    
  }


  useEffect(()=>{
    
    
    getallEnquiry();
},[])
// 
const columns = [
  { field: 'id', headerName: 'S.No.', width: 200 ,headerClassName: 'custom-dataGrid-Column-design'},
  { field: 'name', headerName: 'Name', width: 200 ,headerClassName: 'custom-dataGrid-Column-design'},
  { field: 'phone', headerName: 'Phone', width: 200 ,headerClassName: 'custom-dataGrid-Column-design'},
  {field:"travelernumber",headerName:"Traveler Number",width:200,headerClassName: 'custom-dataGrid-Column-design'},
  {field:"leavingFrom",headerName:"Leaving From",width:200,headerClassName: 'custom-dataGrid-Column-design'},
  {field:"goingTo",headerName:"Going To",width:200,headerClassName: 'custom-dataGrid-Column-design'},
  {field:"additionalDetails",headerName:"Additional Details",width:200,headerClassName: 'custom-dataGrid-Column-design'},
    {field:"submittedAt",headerName:"Submitted At",width:200,headerClassName: 'custom-dataGrid-Column-design'},
  
];
// const rows=allEnquiry.map((item, index) => ({ id: index + 1, ...item }));
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
            checkboxSelection 
            rowSelectionModel={ selectionModel}
            onRowSelectionModelChange={(newSelection) => {
                                              setSelectionModel(newSelection);
                                            }}
             
            
            sx={{
                '& .MuiDataGrid-columnHeaders': {

                height:"45px"           
                },
              }}
              />
        </div>
   
    </>
  )
}

export default CustomerEnquiry

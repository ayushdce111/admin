import React,{useState} from 'react';
import axios from 'axios';
import { useEffect } from 'react';
// import "../../assets/css/viewpackages.css";
// import ViewDataTable from "./ViewDataTable";
import { DataGrid } from '@mui/x-data-grid';
import "../../assets/css/DataGridTable.css"
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { handleSuccess } from '../Toast';

function CustomerEnquiry() {
    const UserEmail= localStorage.getItem("userEmail");
    const [allEnquiry, setAllEnquiry] = useState([]);
    const [AllAgents, setAllAgents] = useState([]);
    const [selectionModel, setSelectionModel] = useState(undefined);
const [AgentName, setAgentName] = useState([]);
const [refreshTable,setrefreshTable]=useState(0);
    
    


    const getallEnquiry =async ()=>{ 
      try{
        const Alldata = await axios.get('http://localhost:8000/admin/api/enquiry');
        setAllEnquiry(Alldata.data)
        // setSelectionModel(Alldata.data[0]._id)
    // console.log(Alldata.data);
    }catch(error){
        console.log(error);
    }
    
  }
const getAllAgentName = async ()=>{
  try {
        const Alldata = await axios.get('http://localhost:8000/admin/api/agentslist');
         setAllAgents(Alldata?.data?.filter((data)=>data.agentStatus ==="Approved"))
        // setAllAgents(Alldata.data);
        // setupdatedTextStatus(Alldata.data)
        // console.log(Alldata.data);
      } catch (error) {
        console.log(error);
      }


      
}

  useEffect(()=>{
    
    
    getallEnquiry();
    getAllAgentName();
},[refreshTable])
// 
const columns = [
  // { field: 'id', headerName: 'S.No.', width: 200 ,headerClassName: 'custom-dataGrid-Column-design'},
  { field: 'agentassigned', headerName: 'Agent Assigned', width: 180 ,headerClassName: 'custom-dataGrid-Column-design'},
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
const getRowId = (row) => {
      // console.log("getRowId called for row:", row);
      if (row && row._id) {
        return row._id;
      }
      return undefined;
    };
  //  console.log(rows,"<---------rows")
if (!allEnquiry.length) {
    return <p>Loading enquiries...</p>;
  }
// if(selectionModel.length==0){
//   return <p>Loading : selectionModel is empty</p>
// }
    // console.log("Current selectionModel:", selectionModel);


    if(selectionModel){
       const AllSelectedDataNOW =Array.from(selectionModel.ids);
       console.log(AllSelectedDataNOW,"checked Row")
    }
const CurrentAgentSelected = () =>{
    console.log(event.target.value,"<----------------sleecrt")
    setAgentName(event.target.value)
}


const sendLeadstoAgents = async ()=>{
  const AllSelectedData =Array.from(selectionModel.ids);
  // console.log(AgentName,"----",AllSelectedData);
  const completeLeadtoSend = {AgentName:AgentName, AllSelectedData:AllSelectedData}

  try{
      const Alldata = await axios.post('http://localhost:8000/admin/api/sendleadstoagent',completeLeadtoSend);
      const responsData = await Alldata.data;
      console.log(responsData,"<--------------",responsData.message);
      handleSuccess(responsData.message);
      setrefreshTable(prev=>prev+1)
  }catch(error){
    console.error(error);
  }

}

    return (
    <>
    <div className='flex gap-3 mt-3'>
        <select className='border-0 text-white rounded p-2 cursor-pointer bg-[#69bacd]' onChange={CurrentAgentSelected}>
            <option>Select Agent</option>
             {AllAgents?.map((data,index)=>{
                return (<option>{data.email}</option>)
             })}
             
             { }
             
        </select>
        <button className='bg-[#e5a570] rounded text-white font-bold p-2 cursor-pointer' onClick={sendLeadstoAgents}>Click to Send Leads</button>
    </div>
    <div style={{ height: "calc(100vh - 7.6rem)", width: '100%',paddingTop:"1rem" }}>
            <DataGrid 
            
            rows={rows} 
            columns={columns}    
            autoPageSize 
            getRowId={getRowId} 
            rowHeight={45} 
            checkboxSelection 
            disableRowSelectionOnClick
            rowSelectionModel={selectionModel}
            onRowSelectionModelChange={(newSelection) => {
                                              // console.log("New selection:", newSelection);
                                              // if (newSelection instanceof Set) {
                                                setSelectionModel(newSelection);
                                              // } else {
                                                // setSelectionModel(undefined);
                                              // }
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

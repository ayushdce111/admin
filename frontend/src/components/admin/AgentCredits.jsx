import React,{useState} from 'react';
import axios from 'axios';
import { useEffect } from 'react';
// import "../../assets/css/viewpackages.css";
// import ViewDataTable from "./ViewDataTable";
import { DataGrid } from '@mui/x-data-grid';
import "../../assets/css/DataGridTable.css"
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { handleError, handleSuccess } from '../Toast';

function AgentCredits() {
    const UserEmail= localStorage.getItem("userEmail");
    // const [allAgents, setAllAgents] = useState([]);
    const [AllAgents, setAllAgents] = useState([]);
    const [selectionModel, setSelectionModel] = useState(undefined);
const [Credit, setCredit] = useState([]);
const [refreshTable,setrefreshTable]=useState(0);
    
    


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
    
    
    getAllAgentName();
},[refreshTable])
// 
const columns = [
  // { field: 'id', headerName: 'S.No.', width: 200 ,headerClassName: 'custom-dataGrid-Column-design'},
//   { field: 'agentassigned', headerName: 'Agent Assigned', width: 180 ,headerClassName: 'custom-dataGrid-Column-design'},
    {field:"agentCredit",headerName:"agentCredit",width:200,headerClassName: 'custom-dataGrid-Column-design'},
  { field: 'name', headerName: 'Name', width: 200 ,headerClassName: 'custom-dataGrid-Column-design'},
  { field: 'email', headerName: 'email', width: 200 ,headerClassName: 'custom-dataGrid-Column-design'},
  {field:"agentStatus",headerName:"agentStatus",width:200,headerClassName: 'custom-dataGrid-Column-design'},
  {field:"submittedAt",headerName:"submittedAt",width:200,headerClassName: 'custom-dataGrid-Column-design',flex:1},

 
  
];
// const rows=allEnquiry.map((item, index) => ({ id: index + 1, ...item }));
const rows=AllAgents;
const getRowId = (row) => {
      // console.log("getRowId called for row:", row);
      if (row && row._id) {
        return row._id;
      }
      return undefined;
    };
  //  console.log(rows,"<---------rows")
if (!AllAgents.length) {
    return <p>Loading Agents...</p>;
  }
// if(selectionModel.length==0){
//   return <p>Loading : selectionModel is empty</p>
// }
    // console.log("Current selectionModel:", selectionModel);


    if(selectionModel){
       const AllSelectedDataNOW =Array.from(selectionModel.ids);
       console.log(AllSelectedDataNOW,"checked Row")
    }
const CreditSupplied = () =>{
    console.log(event.target.value,"<----------------Credit")
    setCredit(event.target.value)
}


const sendCredittoAgents = async ()=>{
  // console.log(  selectionModel,"<--------",Array.from(selectionModel.ids))
  (selectionModel===undefined || Array.from(selectionModel.ids).length===0) && handleError("Select agent first");
  Credit.length===0 && handleError("Enter credit amount");

  const AllSelectedData =Array.from(selectionModel.ids);
  // console.log(AllSelectedData.length,"<----------AllSelectedData.length",selectionModel)

  // console.log(Credit,"--fgfg--",AllSelectedData);
  const completeLeadtoSend = {Credit:Credit, AllSelectedData:AllSelectedData}
if(Credit && AllSelectedData){


  try{
    
      const Alldata = await axios.post('http://localhost:8000/admin/api/addcredittoagent',completeLeadtoSend);
      const responsData = await Alldata.data;
      console.log(responsData,"<--------------",responsData.message);
      handleSuccess(responsData.message);
      setrefreshTable(prev=>prev+1);
      // setAgentName("")
  }catch(error){
    console.error(error);
  }
}
}





    return (
    <>
    <div className='flex justify-between'>
    <div className='flex gap-3 mt-3'>
        <input type='text' onChange={CreditSupplied} className='border-2 border-[#69bacd] outline-none px-2 rounded text-amber-900' placeholder='Add Credit to Agent . . . .' />
        <button className='bg-[#e5a570] rounded text-white font-bold p-2 cursor-pointer' onClick={sendCredittoAgents}>Add Credit</button>
    </div>


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

export default AgentCredits

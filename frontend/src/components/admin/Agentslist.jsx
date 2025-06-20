import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";
// import CustomSelectEditor from './CustomSelectEditor.jsx';

const Agentslist = () => {
//   const UserEmail = localStorage.getItem("userEmail");
  const [allAgents, setAllAgents] = useState([]);
  // const [updatedTextStatus,setupdatedTextStatus] = useState("");

  useEffect(() => {
    const getallAgents = async () => {
      try {
        const Alldata = await axios.get('http://localhost:8000/admin/api/agentslist');
        setAllAgents(Alldata.data);
        // setupdatedTextStatus(Alldata.data)
        // console.log(Alldata.data);
      } catch (error) {
        console.log(error);
      }
    };
    getallAgents();
  }, []);
const statusOptions = ['Approved', 'Rejected'];

// console.log(updatedTextStatus,"<--------------updatedTextStatus");
const ChangeStatusButton = ({ row }) => {
  const handleClick = () => {
    const currentIndex = statusOptions.indexOf(row.agentStatus);
    const nextStatus = statusOptions[(currentIndex + 1) % statusOptions.length];

    // Update state with new status
    setAllAgents((prevPackages) =>
      prevPackages.map((pkg) =>
        pkg._id === row._id ? { ...pkg, agentStatus: nextStatus } : pkg
      )
    );
    // console.log(nextStatus,"<------------nextStatus")
    
    // nextStatus==="" ? setupdatedTextStatus("Pending") : setupdatedTextStatus(nextStatus);
    handleSubmit(row._id,nextStatus);
  };
// console.log(row.agentStatus,"<-----------row.agentStatus")
  return <button onClick={handleClick} className={`${row.agentStatus ==="Approved" ? "bg-green-300 px-2 rounded-md cursor-pointer " : row.agentStatus ==="Pending" ? "bg-yellow-300 px-2 rounded-md cursor-pointer" : row.agentStatus ==="Rejected" ? "bg-red-300 px-2 rounded-md cursor-pointer" : ""} `}>{row.agentStatus}</button>;
};

const columns = [
  {
    field: 'agentStatus',
    headerName: 'Status',
    width: 100,
    renderCell: (params) => <ChangeStatusButton row={params.row} />,
    editable: false
  },
    { field: 'name', headerName: 'Name', width: 150,editable: false  },
  { field: 'email', headerName: 'Email', width: 200, editable: false },
  { field: 'password', headerName: 'Password', width: 300, editable: false },
  { field: "submittedAt", headerName: "Submitted At", width: 300, editable: false },
  
];
const rows = allAgents;

const getRowId = (row) => {
  return row._id;
};


const handleSubmit = async (updated_id,nextStatus) => {
  // console.log('Submitted data:', allAgents);

  try{
  
  
            const response = await axios.post("http://localhost:8000/admin/api/agentslist", {updated_id, nextStatus});
            const responsData = await response.data;
            console.log(responsData,"<-------------responsData");
  
            handleSuccess("form submitted")
  }catch(error){
    // console.log(error,"<--------to handlew");
    error.status===409 ? handleError(error.response.data.message + " with same name") :"";
    
  }
};

return (
  <>
    {/* <div className='flex flex-col'> */}
      {/* <button onClick={handleSubmit} className='bg-blue-600 self-start px-3 py-2'>
        Submit
      </button> */}
      <div style={{ height: "calc(100vh - 5rem)", width: '100%', paddingTop: "1rem" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          autoPageSize
          getRowId={getRowId}
          rowHeight={45}
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: 'red',
              fontWeight: 'bold',
              height: "45px"
            },
          }}
        />
      </div>
    {/* </div> */}
  </>
);
}
export default Agentslist;

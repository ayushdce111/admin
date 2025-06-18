import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";
// import CustomSelectEditor from './CustomSelectEditor.jsx';

const Agenttravelpackages = () => {
  const UserEmail = localStorage.getItem("userEmail");
  const [allAgentPackages, setAllAgentPackages] = useState([]);
  // const [updatedTextStatus,setupdatedTextStatus] = useState("");

  useEffect(() => {
    const getallAgentPackages = async () => {
      try {
        const Alldata = await axios.get('http://localhost:8000/admin/api/agenttravelpackages');
        setAllAgentPackages(Alldata.data);
        // setupdatedTextStatus(Alldata.data)
        console.log(Alldata.data);
      } catch (error) {
        console.log(error);
      }
    };
    getallAgentPackages();
  }, []);
const statusOptions = ['Approved', 'Rejected'];

// console.log(updatedTextStatus,"<--------------updatedTextStatus");
const ChangeStatusButton = ({ row }) => {
  const handleClick = () => {
    const currentIndex = statusOptions.indexOf(row.package_status);
    const nextStatus = statusOptions[(currentIndex + 1) % statusOptions.length];

    // Update state with new status
    setAllAgentPackages((prevPackages) =>
      prevPackages.map((pkg) =>
        pkg._id === row._id ? { ...pkg, package_status: nextStatus } : pkg
      )
    );
    // console.log(nextStatus,"<------------nextStatus")
    
    // nextStatus==="" ? setupdatedTextStatus("Pending") : setupdatedTextStatus(nextStatus);
    handleSubmit(row._id,nextStatus);
  };

  return <button onClick={handleClick} className={`${row.package_status}`}>{row.package_status}</button>;
};

const columns = [
  {
    field: 'package_status',
    headerName: 'Status',
    width: 300,
    renderCell: (params) => <ChangeStatusButton row={params.row} />,
    editable: false
  },
  { field: 'title', headerName: 'Title', width: 200, editable: false },
  { field: 'inclusions', headerName: 'Inclusions', width: 300, editable: false },
  { field: "travelMode", headerName: "TravelMode", width: 300, editable: false },
  { field: "prices", headerName: "Prices", width: 300, editable: false },
  { field: 'duration', headerName: 'Duration', width: 200, editable: false },
  { field: 'destinations', headerName: 'Destinations', width: 300, editable: false },
  { field: 'description', headerName: 'Description', width: 200, editable: false },
  { field: 'availability', headerName: 'Availability', width: 300, editable: false },
  { field: 'user_email', headerName: 'Agent Email', width: 300, editable: false },
  { field: 'submittedAt', headerName: 'Added On', width: 300, editable: false },
];
const rows = allAgentPackages;

const getRowId = (row) => {
  return row._id;
};


const handleSubmit = async (updated_id,nextStatus) => {
  console.log('Submitted data:', allAgentPackages);

  // Example: Send to server
  // axios.post('/api/save', allAgentPackages)
  try{
  
  
            const response = await axios.post("http://localhost:8000/admin/api/updateagentpackages", {updated_id, nextStatus});
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
export default Agenttravelpackages;

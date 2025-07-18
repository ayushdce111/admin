import React, { useState } from 'react';
import {ToastContainer} from "react-toastify";
import { handleError,handleSuccess } from '../Toast';
import API from "../../../axios.jsx";
import { useEffect } from 'react';
import { useParams} from 'react-router-dom';

function AddPackages() {
  const { updateRow } = useParams();
  // console.log(updateRow,"<===");
  const[blobImage,setBlobImage]= useState("");
  const [formData, setFormData] = useState({
    title: '',
    destinations: '',
    duration: '',
    description: '',
    prices: '',
    travelMode: '',
    inclusions: '',
    availability: '',
    travelcategory:'',
    image_upload:null,
    image_url: '',
    image_id: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {

    // console.log(formData,"<===========before formData ON Change")

    if(e.target.name ==="image_upload"){
      
      setFormData({ ...formData, ["image_upload"]: e.target.files[0] });
      setBlobImage({...blobImage,["image_upload"]: e.target.files[0]})
      
    }else{
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
    // console.log(formData,"<=========== after formData ON Change")
    };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.destinations) newErrors.destinations = 'Destinations are required';
    if (!formData.duration) newErrors.duration = 'Duration is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.prices || isNaN(formData.prices)) newErrors.prices = 'Valid price is required';
    if (!formData.travelMode) newErrors.travelMode = 'Travel mode is required';
    if (!formData.inclusions) newErrors.inclusions = 'Inclusions are required';
    if (!formData.availability) newErrors.availability = 'Availability is required';
    if (!formData.travelcategory) newErrors.travelcategory = 'Travel category is required';
    // if (!formData.image_upload) newErrors.image_upload = 'Image is required';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      // console.log('Form submitted:', formData);
      

      const Token= localStorage.getItem("token");
      const UserEmail= localStorage.getItem("userEmail");
 
      // cloudinary Starts
      const CLOUDINARY_UPLOAD_PRESET = 'my_preset';
      const CLOUDINARY_CLOUD_NAME = 'dkidq9wlq';

      const uploadToCloudinary = async () => {
        // console.log(formData.image_upload,"uploadToCloudinary")
          const data = new FormData();
          data.append('file', formData.image_upload);
          data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
          const res = await API.post(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
            data
          );
          return res.data;
  };
  const cloudinaryRes = await uploadToCloudinary();
  // cloudinary ENDS
    

      if(Token && UserEmail){
        


       const SubmitTravelPackages = async ()=>{

          try{


                    const response = await API.post("/admin/api/travelpackages", {UserEmail,formData,imageUrl: cloudinaryRes.secure_url,publicId: cloudinaryRes.public_id,});
                    const responsData = await response.data;
                    // console.log(responsData,"<-------------responsData");

                    handleSuccess("form submitted")
          }catch(error){
            // console.log(error,"<--------to handlew");
            error.status===409 ? handleError(error.response.data.message + " with same name") :"";
            
          }

        }
        const UpdateTravelPackages = async ()=>{

          try{


                    const response = await API.put("/admin/api/updateadmintravelpackages", {updateRow_id:updateRow,formData,imageUrl: cloudinaryRes.secure_url,publicId: cloudinaryRes.public_id,});
                    const responsData = await response.data;
                    // console.log(responsData,"<-------------responsData");

                    handleSuccess("package updated")
          }catch(error){
            // console.log(error,"<--------to handlew");
            error.status===409 ? handleError(error.response.data.message + " with same name") :"";
            
          }

        }

        if(updateRow){
          // console.log("yes")
          // console.log(formData,"<===========formData")
          // console.log(cloudinaryRes.secure_url,"cloudinaryRes.secure_url");
          setFormData({ ...formData, ["image_url"]: cloudinaryRes.secure_url, ["image_id"]: cloudinaryRes.public_id });
          UpdateTravelPackages();

        }else{
          // console.log("No");
          // console.log(formData,"<===========formData")
          SubmitTravelPackages();
        }

        
        // Reset form or send to API
      // setFormData({
      //   title: '',
      //   destinations: '',
      //   duration: '',
      //   description: '',
      //   prices: '',
      //   travelMode: '',
      //   inclusions: '',
      //   availability: '',
      // });
      setErrors({});
        
      

    }
   } else {
      setErrors(formErrors);
      handleError("Can't save Packages");

    }
  }
    // const [alltravelPackages, setAllTravelPackages] = useState([]);
const updateDatafunction = async ()=>{
  if (updateRow) {

    const Alldata = await API.get('/admin/api/admintravelpackages');
        // setAllTravelPackages();

        const updatingRowData = Alldata.data.filter((data,index)=> data._id===updateRow);

        // console.log(Alldata.data.filter((data,index)=> data._id===updateRow));

      // console.log(updateRow,"=================",updatingRowData[0]);
      // axios.get(/api/items/${id}).then((res) => {
        // setFormData(res.data);
      // }).catch(console.error);

      setFormData({
        availability:updatingRowData[0].availability,
        description:  updatingRowData[0].description,
        destinations:  updatingRowData[0].destinations,
        image_upload:  updatingRowData[0].image_url || null,
        duration:  updatingRowData[0].duration,
        inclusions:  updatingRowData[0].inclusions,
        prices:  updatingRowData[0].prices,
        travelMode:  updatingRowData[0].travelMode,
        travelcategory: updatingRowData[0].travelcategory,
        title:  updatingRowData[0].title,

      });


    }else{
      setFormData({
        title: '',
        destinations: '',
        duration: '',
        description: '',
        prices: '',
        travelMode: '',
        inclusions: '',
        availability: '',
      });
    }
}
  
    
 useEffect(() => {
    
  updateDatafunction();

      

  }, [updateRow]);


// console.log(formData,"formData")
  return (
    <div className='pt-2'>
      <h2 className='font-bold text-2xl text-[#FCECDD] py-2 px-2 mb-4 bg-[#e5a570]'>{updateRow ? 'Update' : 'Add'} Travel Package </h2>
<div className='pb-3'>
            {/* {console.log(blobImage,"formData.image_upload")} */}
            {formData.image_upload && (
            <img
              src={formData.image_upload}
              alt="Current"
              className="mt-2 max-h-40 rounded-md"
            />
          )}
</div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className='grid grid-cols-2 gap-4 '>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="travelcategory"
            value={formData.travelcategory}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Category</option>
            <option value="International">International</option>
            <option value="Domestic">Domestic</option>
            <option value="Corporate">Corporate</option>
            <option value="Adventure">Adventure</option>
          </select>
          {errors.travelcategory && <p className="text-red-500 text-sm">{errors.travelcategory}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="e.g., European Adventure"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Destinations</label>
          <input
            type="text"
            name="destinations"
            value={formData.destinations}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="e.g., Paris, Rome, Barcelona"
          />
          {errors.destinations && <p className="text-red-500 text-sm">{errors.destinations}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Duration</label>
          <input
             type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="e.g., 4"
          />
          {errors.duration && <p className="text-red-500 text-sm">{errors.duration}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Prices </label>
          <input
            type="number"
            name="prices"
            value={formData.prices}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="e.g., 1500"
          />
          {errors.prices && <p className="text-red-500 text-sm">{errors.prices}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Travel Mode</label>
          <select
            name="travelMode"
            value={formData.travelMode}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select travel mode</option>
            <option value="Flight">Flight</option>
            <option value="Train">Train</option>
            <option value="Bus">Bus</option>
            <option value="Cruise">Cruise</option>
          </select>
          {errors.travelMode && <p className="text-red-500 text-sm">{errors.travelMode}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Seats Availability</label>
          <input
             type="number"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="e.g., 20 "
          />
          {errors.availability && <p className="text-red-500 text-sm">{errors.availability}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Image</label>
          <input 
            type="file" 
            name="image_upload"
            onChange={handleChange} 
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            // required
             />
          {errors.image_upload && <p className="text-red-500 text-sm">{errors.image_upload}</p>}
        </div>
</div>
        

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="Describe the travel package..."
            rows="3"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>

        

        

        <div>
          <label className="block text-sm font-medium text-gray-700">Inclusions</label>
          <textarea
            name="inclusions"
            value={formData.inclusions}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="e.g., Meals, Accommodation, Tours"
            rows="3"
          />
          {errors.inclusions && <p className="text-red-500 text-sm">{errors.inclusions}</p>}
        </div>

        

        <button
          type="submit"
          className="w-full bg-[#e5a570] text-white p-2 rounded-md hover:bg-[#F3A26D] font-semibold mb-2 cursor-pointer"
        >
         {updateRow ? 'Update' : 'Add'} Travel Packages
        </button>
      </form>
      <ToastContainer/>
    </div>
  )
}


export default AddPackages;
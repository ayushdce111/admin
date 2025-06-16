import React, { useState } from 'react';
import {ToastContainer} from "react-toastify";
import { handleError,handleSuccess } from '../Toast';
import axios from 'axios';

function AddPackages() {

  const [formData, setFormData] = useState({
    title: '',
    destinations: '',
    duration: '',
    description: '',
    prices: '',
    travelMode: '',
    inclusions: '',
    availability: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      console.log('Form submitted:', formData);
      

      const Token= localStorage.getItem("token");
      const UserEmail= localStorage.getItem("userEmail");

      if(Token && UserEmail){
        
       const SubmitTravelPackages = async ()=>{
try{


          const response = await axios.post("http://localhost:8000/admin/api/travelpackages", {UserEmail,formData});
          const responsData = await response.data;
          console.log(responsData,"<-------------responsData");

          handleSuccess("form submitted")
}catch(error){
  // console.log(error,"<--------to handlew");
  error.status===409 ? handleError(error.response.data.message + " with same name") :"";
  
}
        }

        SubmitTravelPackages();
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

  return (
    <div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className='grid grid-cols-2 gap-4 '>
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
            type="text"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="e.g., 7 days"
          />
          {errors.duration && <p className="text-red-500 text-sm">{errors.duration}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Prices ($)</label>
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
          <label className="block text-sm font-medium text-gray-700">Availability</label>
          <input
            type="text"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            placeholder="e.g., 20 seats available"
          />
          {errors.availability && <p className="text-red-500 text-sm">{errors.availability}</p>}
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
            rows="4"
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
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 cursor-pointer"
        >
          Add Tour Packages
        </button>
      </form>
      <ToastContainer/>
    </div>
  )
}


export default AddPackages;

import axios from 'axios';

const API = axios.create({
  baseURL: "https://admin-backend-kf09.onrender.com",
  // baseURL: "http://localhost:8000"
});

export default API;
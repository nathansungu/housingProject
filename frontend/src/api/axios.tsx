//axios instance

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http:4000//api',
  headers: {
    
    'Content-Type': 'application/json',
    },    
    withCredentials: true,  
});

export default axiosInstance;
import axios from 'axios';

// Create the axios instance
export const makeRequest = axios.create({
  baseURL: 'http://localhost:8800/api', 
  withCredentials: true,
});



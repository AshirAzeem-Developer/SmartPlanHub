import axios from 'axios';
import endPoints from '../constants/apiEndPoints';

// Setup base thing
const api = axios.create({
  baseURL: endPoints.BASE_URL,
  responseType: 'json',
  headers: { 'Content-Type': 'application/json' },
});

// Add request interceptor to log full endpoint details
api.interceptors.request.use((config) => {
  const fullUrl = `${config.baseURL}${config.url ?? ''}`;
  
  console.log('================= API REQUEST =================');
  console.log(`URL: ${fullUrl}`);
  console.log(`Method: ${config.method?.toUpperCase()}`);
  console.log(`Headers: ${JSON.stringify(config.headers)}`);
  
  if (config.data) {
    console.log(`Body: ${JSON.stringify(config.data)}`);
  }

  if (config.params) {
    console.log(`Query Params: ${JSON.stringify(config.params)}`);
  }

  console.log('================================================');
  return config;
}, (error) => {
  console.error('Request Error:', error);
  return Promise.reject(error);
});

// // Add response interceptor to log response details
api.interceptors.response.use((response) => {
  console.log('================= API RESPONSE =================');
  console.log(`URL: ${response.config.baseURL}${response.config.url}`);
  console.log(`Status: ${response.status}`);
  console.log(`Headers: ${JSON.stringify(response.headers)}`);
  console.log('================================================');
  return response;
}, (error) => {
  console.error('Response Error:', error);
  return Promise.reject(error);
});

export default api;

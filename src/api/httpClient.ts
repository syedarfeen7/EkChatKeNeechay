import axios from 'axios';
import {BASE_URL} from './urls';

const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Attach Auth Token Before Requests
httpClient.interceptors.request.use(async config => {
  //   const token = localStorage.getItem('token'); // Adjust this for React Native
  //   if (token) {
  //     config.headers.Authorization = `Bearer ${token}`;
  //   }
  return config;
});

// ✅ Handle API Errors
httpClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data?.message);
    return Promise.reject(error.response?.data?.message || error?.message);
  },
);

export default httpClient;

import axios from 'axios';
import {BASE_URL} from './urls';

const httpClient = axios.create({
  baseURL: BASE_URL,
});

// 🔁 Dynamically Attach Headers Before Each Request
httpClient.interceptors.request.use(async config => {
  const token = ''; // Fetch from SecureStore, AsyncStorage, etc.

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Only set Content-Type if not already provided
  if (!config.headers['Content-Type']) {
    config.headers['Content-Type'] = 'application/json';
  }

  return config;
});

// 🔐 Error Handling
httpClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error.response?.data?.message);
    return Promise.reject(error.response?.data?.message || error?.message);
  },
);

export default httpClient;

import axios from 'axios';

const API_BASE_URL = 'https://data-collection-mig2.onrender.com/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // This is correct and necessary for your CORS issue
});

// Add a request interceptor to dynamically include the token
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the latest token for each request
    const token = localStorage.getItem('token');

    // Only add the header if a token exists
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

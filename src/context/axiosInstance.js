import axios from "axios";
const API_BASE_URL = "http://localhost:8888/api/"
const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: `${API_BASE_URL}`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
  withCredentials: true, 
});

export default axiosInstance;

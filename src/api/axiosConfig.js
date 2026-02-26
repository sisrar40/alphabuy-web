import axios from 'axios';

// Create a generic axios instance for testing/placeholders
export const api = axios.create({
  baseURL: 'https://api.example.com/v1', // This is just a placeholder endpoint
});

// Request interceptor to attach token dynamically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;

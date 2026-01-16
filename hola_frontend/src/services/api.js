import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available (skip for public routes)
api.interceptors.request.use(
  (config) => {
    // List of public routes that don't need authentication
    const publicRoutes = ['/auth/register', '/auth/login', '/auth/verify-otp', '/auth/resend-otp', '/auth/google/verify'];
    const isPublicRoute = publicRoutes.some(route => config.url?.includes(route));
    
    // Only add token if it's not a public route
    if (!isPublicRoute) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only redirect to login for 401 on protected routes
    const publicRoutes = ['/auth/register', '/auth/login', '/auth/verify-otp', '/auth/resend-otp', '/auth/google/verify'];
    const isPublicRoute = publicRoutes.some(route => error.config?.url?.includes(route));
    
    if (error.response?.status === 401 && !isPublicRoute) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

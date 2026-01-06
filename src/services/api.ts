import axios from 'axios';

const api = axios.create({
  baseURL: '/', // The base URL will be handled by the proxy
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Unauthorized access
      localStorage.removeItem('token'); // Clear expired token
      // Redirect to login page
      window.location.href = '/login'; 
    }
    return Promise.reject(error);
  }
);

export default api;

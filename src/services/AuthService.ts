
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const API_URL = 'http://localhost:5045/api/users';

export const register = async (userData: any) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const login = async (credentials: any) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getCurrentUser = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decodedToken: any = jwtDecode(token);
      return {
        username: decodedToken.sub,
        email: decodedToken.email,
        id: decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']
      }; 
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  return null;
};

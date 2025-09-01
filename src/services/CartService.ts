
import axios from 'axios';

const API_URL = 'http://localhost:5045/api/cart';

const getAuthToken = () => {
  // Replace with your actual token retrieval logic
  return localStorage.getItem('token');
};

const getAuthHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getAuthToken()}`,
  },
});

export const getCart = async () => {
  const response = await axios.get(API_URL, getAuthHeaders());
  return response.data;
};

export const addToCart = async (productId: string, quantity: number) => {
  const response = await axios.post(API_URL, { productId, quantity }, getAuthHeaders());
  return response.data;
};

export const removeFromCart = async (productId: string) => {
  const response = await axios.delete(`${API_URL}/${productId}`, getAuthHeaders());
  return response.data;
};

export const clearCart = async () => {
  await axios.delete(API_URL, getAuthHeaders());
};

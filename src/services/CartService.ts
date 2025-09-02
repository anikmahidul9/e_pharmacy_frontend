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

interface CartItem {
  productId: string;
  quantity: number;
  productName: string;
  productPrice: number;
  productImage: string;
}

export const addToCart = async (item: CartItem) => {
  const response = await axios.post(`${API_URL}/`, item, getAuthHeaders());
  return response.data;
};

export const removeFromCart = async (productId: string) => {
  const response = await axios.delete(`${API_URL}/${productId}`, getAuthHeaders());
  return response.data;
};

export const clearCart = async () => {
  await axios.delete(API_URL, getAuthHeaders());
};
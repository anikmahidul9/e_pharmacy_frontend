import api from './api';

const API_URL = '/api/cart'; // The base URL is now handled by the proxy and api.ts

export const getCart = async () => {
  const response = await api.get(API_URL);
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
  const response = await api.post(`${API_URL}/`, item);
  return response.data;
};

export const removeFromCart = async (productId: string) => {
  const response = await api.delete(`${API_URL}/${productId}`);
  return response.data;
};

export const clearCart = async () => {
  await api.delete(API_URL);
};
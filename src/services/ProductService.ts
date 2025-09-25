
import api from './api';

const API_URL = '/api/products';

export interface ProductData {
    title: string;
    brand: string;
    price: number;
    stock: number;
    image: string;
    description: string;
    ingredients: string;
    howToUse: string;
}

export const addProduct = async (productData: ProductData) => {
    const response = await api.post(API_URL, productData);
    return response.data;
};

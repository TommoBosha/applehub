import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


axios.defaults.baseURL = 'https://applehub.onrender.com';

export const getProductByCategory = createAsyncThunk(
    'products/getProductByCategory',
    async ({ category, page = 1, limit = 12 }, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(
                `/products?category=${category}&page=${page}&limit=${limit}`
            );
            console.log(data);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getProductByModel = createAsyncThunk(
    'products/getProductByModel',
    async ({  model, page = 1, limit = 12 }, { rejectWithValue }) => {
        try {
            // Форматуємо модель у відповідний формат (наприклад, "iphone-14-pro" -> "Iphone 14 pro")
            

            const { data } = await axios.get(
                `/products?model=${encodeURIComponent(model)}&page=${page}&limit=${limit}`
            );
            console.log(data);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getSingleProduct = createAsyncThunk(
    'products/getSingleProduct',
    async (id, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`/products/${id}`);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const getProductByQuery = createAsyncThunk(
    'products/getProductByQuery',
    async ({ query, page = 1, limit = 10 }, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(
                `products/find?title=${query}&page=${page}&limit=${limit}`
            );
            console.log(data)
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);




import { createSlice } from '@reduxjs/toolkit';
import { getProductByCategory, getSingleProduct, getProductByQuery, getProductByModel } from './productOperations';

const initialState = {
    productList: [],
    singleProduct: null,
    loading: false,
    error: null,
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getProductByCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductByCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.productList = action.payload;
            })
            .addCase(getProductByCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getProductByModel.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductByModel.fulfilled, (state, action) => {
                state.loading = false;
                state.productList = action.payload;
            })
            .addCase(getProductByModel.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getSingleProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSingleProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.singleProduct = action.payload;
            })
            .addCase(getSingleProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getProductByQuery.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProductByQuery.fulfilled, (state, action) => {
                state.loading = false;
                state.productList = action.payload;
            })
            .addCase(getProductByQuery.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default productSlice.reducer;
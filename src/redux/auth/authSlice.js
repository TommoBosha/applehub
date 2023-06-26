import { createSlice } from '@reduxjs/toolkit';


const authInitialState = {
    user: {},
    token: null,
    isLoggedIn: false,
    isLoading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    extraReducers: builder => { }

})

export const authReducer = authSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';


const authInitialState = {
    user: {},
    isLoggedIn: false,
    isLoading: false,
    error: null,
    email: localStorage.getItem("email"),
    phone: localStorage.getItem("phone"),
    token: localStorage.getItem("token"),
    uid: localStorage.getItem("id"),
};

const authSlice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: {
        setUser(state, { payload }) {
            state.email = payload.email;
            state.phone = payload.phone;
            state.role = payload.role;
            state.token = payload.token;
            state.id = payload.id;
            localStorage.setItem("email", payload.email);
            localStorage.setItem("phone", payload.phone);
            localStorage.setItem("token", payload.token);
            localStorage.setItem("id", payload.id);
        },
        getUser(state) {
            state.email = localStorage.getItem("email");
            state.phone = localStorage.getItem("phone");
            state.token = localStorage.getItem("token");
            state.id = localStorage.getItem("id");
        },
        removeUser(state) {
            state.email = null;
            state.phone = null;
            state.role = null;
            state.token = null;
            state.id = null;
            localStorage.clear();
        },
    },

})
export const { setUser, getUser, removeUser } = authSlice.actions;

export const authReducer = authSlice.reducer;
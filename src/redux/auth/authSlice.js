import { createSlice } from '@reduxjs/toolkit';


const authInitialState = {
    user: {},
    isLoggedIn: false,
    isLoading: false,
    error: null,
    email: null,
    phone: null,
    accessToken: "",
    userId: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: authInitialState,
    reducers: {
        setUser(state, { payload }) {
            console.log("accessToken in reducer:", payload.accessToken);
            console.log("userId in reducer:", payload.uid);
            state.email = payload.email;
            state.phone = payload.phone;
            state.accessToken = payload.accessToken;
            state.userId = payload.uid;

        },
        getUser(state, { payload }) {
            state.email = payload.email;;
            state.phone = payload.phone;
            state.accessToken = payload.accessToken;
            state.uid = payload.uid;

        },
        removeUser(state) {
            state.email = null;
            state.phone = null;
            state.accessToken = null;
            state.uid = null;

        },
    },

})
export const { setUser, getUser, removeUser } = authSlice.actions;

export const authReducer = authSlice.reducer;
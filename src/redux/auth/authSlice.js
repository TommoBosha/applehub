import { createSlice } from "@reduxjs/toolkit";

const authInitialState = {
  userId: null,
  userEmail: null,
  userPhoneNumber: "",
  userName: null,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    registerUser: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      accessToken: payload.accessToken,
      refreshToken: payload.refreshToken,
    }),
    updateUser: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      userEmail: payload.userEmail,
      userName: payload.userName,
      userPhoneNumber: payload.phoneNumber,
      accessToken: payload.accessToken,
      refreshToken: payload.refreshToken,
    }),
    logout: () => authInitialState,

    // getUser(state, { payload }) {
    //   state.email = payload.email;
    //   state.phone = payload.phone;
    //   state.accessToken = payload.accessToken;
    //   state.uid = payload.uid;
    // },
    // removeUser(state) {
    //   state.email = null;
    //   state.phone = null;
    //   state.accessToken = null;
    //   state.uid = null;
    // },
  },
});
export const { registerUser, updateUser, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const authInitialState = {
  userId: null,
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
      accessToken: payload.accessToken,
      refreshToken: payload.refreshToken,
    }),
    logout: () => authInitialState,
  },
});
export const { registerUser, updateUser, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;

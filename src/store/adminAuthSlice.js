import { createSlice } from "@reduxjs/toolkit";

const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState: {
    token: localStorage.getItem("adminToken") || null,
    isAuthenticated: !!localStorage.getItem("adminToken"),
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem("adminToken", action.payload.token);
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("adminToken");
    },
  },
});

export const { loginSuccess, logout } = adminAuthSlice.actions;
export default adminAuthSlice.reducer;

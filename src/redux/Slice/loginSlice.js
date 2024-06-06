import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')) || false,
    isError: false,
    user: [],
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.isError = false;
      state.user = action.payload;
      localStorage.setItem('isLoggedIn', true);

    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.isError = false;
      state.user = [];

    },
    loginFailed: (state) => {
      state.isLoggedIn = false;
      state.isError = true;
      state.user = [];

    },
  },
});

export const { loginSuccess, logout, loginFailed } = loginSlice.actions;
export default loginSlice.reducer;

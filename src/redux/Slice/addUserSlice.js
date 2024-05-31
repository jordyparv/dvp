import { createSlice } from "@reduxjs/toolkit";

const addUserSlice = createSlice({
  name: "addUser",
  initialState: {
    isAdded: false,
    isError: false,
    user: [],
  },
  reducers: {
    addUserSuccess: (state, action) => {
      state.isAdded = true;
      state.isError = false;
      state.user = action.payload;
    },
    addUserError: (state, action) => {
      state.isAdded = false;
      state.isError = true;
      state.user = [];
    },
  },
});

export const { addUserSuccess, addUserError } = addUserSlice.actions;
export default addUserSlice;

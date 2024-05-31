import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const initialState = {
  roleApi: { data: null, status: "idle", error: null },
  userApi: { data: null, status: "idle", error: null },
  employeeApi: { data: null, status: "idle", error: null },
};

const settingsApiSlice = createSlice({
  name: "apiSettings",
  initialState,
  reducers: {
    fetchRoleApiStart(state) {
      state.roleApi.status = "loading";
    },
    fetchRoleApiSuccess(state, action) {
      state.roleApi.status = "succeeded";
      state.roleApi.data = action.payload;
    },
    fetchRoleApiFailed(state, action) {
      state.roleApi.status = "failed";
      state.roleApi.error = action.payload;
    },

    fetchUserApiStart(state) {
      state.userApi.status = "loading";
    },
    fetchUserApiSuccess(state, action) {
      state.userApi.status = "succeeded";
      state.userApi.data = action.payload;
    },
    fetchUserApiFailed(state, action) {
      state.userApi.status = "failed";
      state.userApi.error = action.payload;
    },

    fetchEmployeeStart(state) {
      state.employeeApi.status = "loading";
    },
    fetchEmployeeSuccess(state, action) {
      state.employeeApi.status = "succeeded";
      state.employeeApi.data = action.payload;
    },
    fetchEmployeeFailed(state, action) {
      state.employeeApi.status = "failed";
      state.employeeApi.error = action.payload;
    },
  },
});

export const {
  fetchRoleApiStart,
  fetchRoleApiSuccess,
  fetchRoleApiFailed,
  fetchUserApiStart,
  fetchUserApiSuccess,
  fetchUserApiFailed,
  fetchEmployeeStart,
  fetchEmployeeSuccess,
  fetchEmployeeFailed,
} = settingsApiSlice.actions;




export default settingsApiSlice.reducer;




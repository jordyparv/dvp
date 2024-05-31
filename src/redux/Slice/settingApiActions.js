import axios from "axios";
import {
  fetchEmployeeFailed,
  fetchEmployeeStart,
  fetchEmployeeSuccess,
  fetchRoleApiFailed,
  fetchRoleApiStart,
  fetchRoleApiSuccess,
  fetchUserApiFailed,
  fetchUserApiStart,
  fetchUserApiSuccess,
} from "./settingsApiSlice";

export const fetchRoleApi = () => async (dispatch) => {
  dispatch(fetchRoleApiStart());
  try {
    const response = await axios.get(
      `http://172.17.18.255:8080/dvp_app/roles/`
    );
    dispatch(fetchRoleApiSuccess(response.data));

  } catch (error) {
    dispatch(fetchRoleApiFailed(error.toString()));

  }
};

export const fetchUserApi = () => async (dispatch) => {
  dispatch(fetchUserApiStart());
  try {
    const response = await axios.get(
      "http://172.17.18.255:8080/dvp_app/user_create/"
    );
    dispatch(fetchUserApiSuccess(response.data));

  } catch (error) {
    dispatch(fetchUserApiFailed(error));
    console.log(error, "USER FAILED");
  }
};

export const fetchEmployeeApi = () => async (dispatch) => {
  dispatch(fetchEmployeeStart());
  try {
    const response = await axios.get(
      "http://172.17.18.255:8080/dvp_app/employee_registration/"
    );
    dispatch(fetchEmployeeSuccess(response.data));
    console.log(response.data, "EMPLOYEE SUCCESS");
  } catch (error) {
    dispatch(fetchEmployeeFailed(error));
    console.log(error, error.toString(), "ERROROROROROOROR");
  }
};



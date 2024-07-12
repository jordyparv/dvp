import axios from "axios";
import { addUserError, addUserSuccess } from "./addUserSlice";
import { message } from "antd";

export const addUserAction = (userData) => async (dispatch) => {
  try {
    let config = {
      url: `http://172.17.19.25:8080/dvp_app/user_create/`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */*",
      },
      data: userData,
    };

    const addUserRequest = await axios(config);
    dispatch(addUserSuccess(addUserRequest?.data));
    message.success("User added successfully")

  } catch (error) {
    dispatch(addUserError(error));
    console.log(error, "ADD USER FAILED");
    message.warning(error?.response?.data?.message[0]  )
  }
};

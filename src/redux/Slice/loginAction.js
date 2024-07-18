import axios from "axios";
import { loginSuccess, loginFailed, logout } from "./loginSlice";
import { message } from "antd";

export const loginUser = (email, password, navigate) => async (dispatch) => {
  try {
    const data = {
      user_email: email,
      password: password,
    };
    const config = {
      url: `http://172.17.19.25:8080/dvp_app/login/`,
      // url: `http://172.17.19.40:8080/dvp_app/login/`,

      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json, text/plain, */*",
      },
      data,
    };

    const LoginRequest = await axios(config);

    if (LoginRequest && LoginRequest?.data?.access) {
      const loginToken = localStorage.setItem(
        "prod_cred",
        JSON.stringify(LoginRequest?.data)
      );
      sessionStorage.setItem("loginMessage", `${LoginRequest?.data?.message}`)

      const permissions = LoginRequest?.data?.permission_names || [];
      localStorage.setItem("permissions", JSON.stringify(permissions));
      
      dispatch(loginSuccess(LoginRequest?.data));
      // if(permissions?.includes("Lesson Plan")) {
      //   navigate("/lesson-plan")
      // }else{
      //   navigate("/dashboard");
      // }
      // navigate("/dashboard");
      window.location.href = "/dashboard";
    } else {
      message.warning(LoginRequest?.response?.data?.message);
      dispatch(loginFailed(LoginRequest?.data));
    }
  } catch (error) {
    message.warning(error?.response?.data?.message ? error.response?.data?.message :error?.message)
    console.log(error);
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    dispatch(logout());
    localStorage.removeItem("prod_cred");
    window.location.href = "/login";

  } catch (error) {
    console.log(error);
  }
};

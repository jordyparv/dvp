import React, { useEffect, useState } from "react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/Slice/loginAction";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { loginSuccess, loginFailed, logout } = useSelector(
    (state) => state.login
  );

  useEffect(() => {
    const logoutMessage = localStorage.getItem("prod_cred");
    if (!logoutMessage) {
      message.success("Logout Success");
    }
  }, []);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(loginUser(email, password, navigate));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <header className="showcase">
        <div className="showcase-content">
          <div className="showcase-top">
            <h1 style={{ color: "white" }}>LOGIN</h1>
          </div>
          <div className="formm">
            <form onSubmit={handleSubmit}>
              <h2 style={{ color: "white" }}>Welcome user!</h2>
              <div className="info">
                <input
                  className="email"
                  type="email"
                  placeholder="Email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />{" "}
                <br />
                <input
                  className="email"
                  type="password"
                  placeholder="Password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="btn">
                <button className="btn-primary" type="submit">
                  Log In
                </button>
              </div>
              <div className="help">
                <div>
                  <input value="true" type="checkbox" />
                  <label style={{ color: "white" }}>Remember me</label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </header>
    </>
  );
};

export default Login;

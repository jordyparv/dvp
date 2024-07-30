import React, { useEffect, useState } from "react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/Slice/loginAction";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { getVideos } from "../api/pixelsAuth";
import Spinner from "../components/Sidebar/Spinner";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
// import lock from "../assets/images/lock.png";
import lock from "../assets/images/lock1.png";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showForgetPass, setShowForgetPass] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [ emailReset, setEmailReset ] = useState("")

  const [videoUrl, setVideoUrl] = useState("");

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
    setLoading(true);
    e.preventDefault();
    try {
      dispatch(loginUser(email, password, navigate));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const data = await getVideos("nature"); // You can change the query as needed
        if (data.videos && data.videos.length > 0) {
          // Select the best quality video link
          const videoFile =
            data.videos[0].video_files.find(
              (file) => file.quality === "hd" || file.quality === "uhd"
            ) || data.videos[0].video_files[0];
          setVideoUrl(videoFile.link);
        }
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    fetchVideo();
  }, []);

  const showForget = () => {
    setShowForgetPass(!showForgetPass);
    setShowLogin(false);
  };

  const showLOginPage = () => {
    setShowForgetPass(false);
    setShowLogin(true);
  };

  const forgetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        `http://172.17.19.25:8080/dvp_app/password_reset/<${emailReset}>/`
      );
      message.success("Your new password has been sent to your email.");
      setLoading(false);
      setShowForgetPass(false);
      setShowLogin(true);
    } catch (error) {
      console.error("Error resetting password:", error);
      message.error(`${error?.response?.data?.message}`);
      setLoading(false);
    }
  };

  return (
    <>
      <header className="showcase">
        <div className="showcase-content">
          <div className="showcase-top">
            {showLogin ? (
              <>
                {" "}
                <h3 style={{ color: "white" }}>LOGIN</h3>
              </>
            ) : (
              ""
            )}
          </div>
          {loading !== true ? (
            <>
              {showLogin ? (
                <>
                  {" "}
                  <div className="formm">
                    <form onSubmit={handleSubmit}>
                      <h4 style={{ color: "white" }}>Welcome user!</h4>
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
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <input
                            className="email"
                            type={passwordVisible ? "text" : "password"}
                            placeholder="Password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setPasswordVisible(!passwordVisible)}
                          >
                            {passwordVisible ? (
                              <AiFillEyeInvisible />
                            ) : (
                              <AiFillEye />
                            )}
                          </button>
                        </div>
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

                      <div
                        style={{ float: "right", marginTop: "-22px" }}
                        className="help"
                      >
                        <div>
                          <label
                            onClick={showForget}
                            style={{ color: "white", cursor: "pointer" }}
                          >
                            Forget Password ?
                          </label>
                        </div>
                      </div>
                    </form>
                  </div>
                </>
              ) : (
                ""
              )}
              {showForgetPass ? (
                <>
                  {" "}
                  <div className="formm formm-forget">
                    <div className="f1">
                      <img style={{ width: "100px" }} src={lock} alt="lock" />
                    </div>
                    <div className="f1">
                      <h5 style={{ color: "white" }}>Forget Password?</h5>
                    </div>
                    <div>
                      <p style={{ color: "white" }}>
                        You can reset your password here.
                      </p>
                    </div>
                    <form onSubmit={forgetPassword}>
                      <div className="info">
                        <input
                          style={{ width: "300px" }}
                          className="email"
                          type="email"
                          placeholder="Email"
                          id="email"
                          value={emailReset}
                          onChange={(e) => setEmailReset(e.target.value)}
                          required
                        />{" "}
                        <br />
                      </div>
                      <div className="btn">
                        <button className="btn-primary" type="submit">
                          Reset Password
                        </button>
                      </div>
                      <div style={{ display: "flex", float: "right" }}>
                        <label
                          onClick={showLOginPage}
                          style={{
                            color: "white",
                            cursor: "pointer",
                            fontSize: "12px",
                          }}
                        >
                          Login {"-->"}
                        </label>
                      </div>
                    </form>
                  </div>
                </>
              ) : (
                ""
              )}
            </>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "400px",
                height: "100px",
              }}
            >
              <Spinner />
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Login;

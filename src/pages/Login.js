import React, { useEffect, useState } from "react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/Slice/loginAction";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { getVideos } from "../api/pixelsAuth";
import Spinner from "../components/Sidebar/Spinner";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

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

  return (
    <>
      {/* style={{ backgroundImage: `url(${videoUrl})` }} */}
      <header className="showcase">
        <div className="showcase-content">
          <div className="showcase-top">
            <h3 style={{ color: "white" }}>LOGIN</h3>
          </div>
          {loading !== true ? (
            <>
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
                    <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
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
                        {passwordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
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

                  <div style={{float:"right", marginTop:"-22px"}} className="help">
                    <div >
                     
                      <label  style={{ color: "white", cursor:"pointer" }}>Forget Password ?</label>
                    </div>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <Spinner />
          )}
        </div>
      </header>
    </>
  );
};

export default Login;

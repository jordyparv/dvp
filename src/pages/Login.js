import React, { useEffect, useState } from "react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/Slice/loginAction";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { getVideos } from "../api/pixelsAuth";
import Spinner from "../components/Sidebar/Spinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
            <h1 style={{ color: "white" }}>LOGIN</h1>
          </div>
          {loading !== true ? (
            <>
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

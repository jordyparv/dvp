import "./App.css";
import SideBar from "./components/Sidebar/SideBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";

import Profile from "./pages/Profile";
import UserRegistration from "./pages/UserRegistration";
import AddUser from "./pages/AddUser";
import Settings from "./components/Sidebar/Settings";
import CourseSettings from "./components/Sidebar/CourseSettings";

import CourseAllotment from "./components/Sidebar/CourseAllotment";

function App() {
  return (
    <Router>
      {/* <SideBar> */}
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/dashboard" element={<Profile />}></Route>
        <Route path="/erf" element={<UserRegistration />}></Route>
        <Route path="/add-user" element={<AddUser />}></Route>
        <Route path="/admin-settings" element={<Settings />}></Route>
        <Route path="/course-settings" element={<CourseSettings />}></Route>
        <Route path="/course-allotment" element={<CourseAllotment />}></Route>
      </Routes>
      {/* </SideBar> */}
    </Router>
  );
}

export default App;

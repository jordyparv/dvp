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
import ProtectedRoute from "./protectedRouting/ProtectedRoute";
import LessonPlan from "./components/Sidebar/LessonPlan";

function App() {
  return (
    <Router>
      {/* <SideBar> */}
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/erf"
          element={
            <ProtectedRoute>
              <UserRegistration />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/add-user"
          element={
            <ProtectedRoute>
              <AddUser />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/admin-settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/course-settings"
          element={
            <ProtectedRoute>
              <CourseSettings />
            </ProtectedRoute>
          }
        ></Route>
         <Route
          path="/lesson-plan"
          element={
            <ProtectedRoute>
              <LessonPlan />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/course-allotment"
          element={
            <ProtectedRoute>
              <CourseAllotment />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
      {/* </SideBar> */}
    </Router>
  );
}

export default App;

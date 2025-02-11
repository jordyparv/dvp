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
import { useEffect } from "react";
import ProgramCoordinator from "./pages/ProgramCoordinator";
import ViewLessonPlan from "./components/Sidebar/ViewLessonPlan";
import ApprovalStatus from "./components/Sidebar/ApprovalStatus";
import BookedSlots from "./Slots/BookedSlots";
import ViewSlots from "./Slots/ViewSlots";
import SlotCoordinator from "./Slots/SlotCoordinator";
import ScriptStatus from "./components/Sidebar/ScriptStatus";
import StudioSettings from "./Slots/StudioSettings";

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
          path="/program-coordinator"
          element={
            <ProtectedRoute>
              <ProgramCoordinator />
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
         <Route
          path="/view-lesson-plan"
          element={
            <ProtectedRoute>
              <ViewLessonPlan />
            </ProtectedRoute>
          }
        ></Route>
         <Route
          path="/approval-status"
          element={
            <ProtectedRoute>
             <ApprovalStatus />
            </ProtectedRoute>
          }
        ></Route>
         <Route
          path="/book-slot"
          element={
            <ProtectedRoute>
             <BookedSlots />
            </ProtectedRoute>
          }
        ></Route>
         <Route
          path="/view-slots"
          element={
            <ProtectedRoute>
             <ViewSlots />
            </ProtectedRoute>
          }
        ></Route>
         <Route
          path="/slot-coordinator"
          element={
            <ProtectedRoute>
             <SlotCoordinator />
            </ProtectedRoute>
          }
        ></Route>
         <Route
          path="/script-status"
          element={
            <ProtectedRoute>
             <ScriptStatus />
            </ProtectedRoute>
          }
        ></Route>
         <Route
          path="/studio-settings"
          element={
            <ProtectedRoute>
             <StudioSettings />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;

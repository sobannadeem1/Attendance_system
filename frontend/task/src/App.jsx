import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Registration from "./pages/Register";
import Login from "./pages/Login";
import MarkAttendance from "./components/MarkAttendance";
import ViewAttendance from "./components/AttendanceView";
import LeaveRequest from "./components/LeaveRequest";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import ViewRecords from "./components/AdminView";
import GenerateReport from "./components/GenerateReport";
import LeaveApproval from "./components/LeaveApproval";
import Home from "./pages/Home";
import Navbar from "./Navbar";
import AdminRegister from "./components/AdminRegister";
import {
  AttendanceProvider,
  AttendanceContext,
} from "./components/AttendanceContext";

const App = () => {
  return (
    <AttendanceProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />

          <Route
            path="/mark-attendance"
            element={
              <ProtectedRoute role="user">
                <MarkAttendance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/view-attendance"
            element={
              <ProtectedRoute role="user">
                <ViewAttendance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leave-request"
            element={
              <ProtectedRoute role="user">
                <LeaveRequest />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/view-records"
            element={
              <ProtectedRoute role="admin">
                <ViewRecords />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/generate-report"
            element={
              <ProtectedRoute role="admin">
                <GenerateReport />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/leave-approval"
            element={
              <ProtectedRoute role="admin">
                <LeaveApproval />
              </ProtectedRoute>
            }
          />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AttendanceProvider>
  );
};

const ProtectedRoute = ({ role, children }) => {
  const { role: userRole } = useContext(AttendanceContext);

  if (userRole !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

export default App;

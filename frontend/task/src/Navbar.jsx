import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AttendanceContext } from "./components/AttendanceContext";
import "./Navbar.css";

const Navbar = () => {
  const { role, setUserRole } = useContext(AttendanceContext);

  const handleAdminClick = () => {
    setUserRole("admin");
  };

  const handleUserClick = () => {
    setUserRole("user");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserRole(null);
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">
            Home
          </Link>
        </li>
        {role === "admin" ? (
          <>
            <li className="navbar-item">
              <Link to="/admin/dashboard" className="navbar-link">
                View Attendance
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/admin/leave-approval" className="navbar-link">
                Leave Approval
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/admin/register" className="navbar-link">
                Admin Register
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/admin/login" className="navbar-link">
                Admin Login
              </Link>
            </li>
            <li className="navbar-item">
              <button className="navbar-button" onClick={handleUserClick}>
                Switch to User
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="navbar-item">
              <Link to="/login" className="navbar-link">
                Login
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/register" className="navbar-link">
                Register
              </Link>
            </li>
            <li className="navbar-item">
              <Link to="/mark-attendance" className="navbar-link">
                Mark Attendance
              </Link>
            </li>
            <li className="navbar-item">
              <button className="navbar-button" onClick={handleAdminClick}>
                Switch to Admin
              </button>
            </li>
          </>
        )}
        {role && (
          <li className="navbar-item">
            <button className="navbar-button" onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

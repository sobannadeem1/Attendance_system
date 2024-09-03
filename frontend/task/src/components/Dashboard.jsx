import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-container">
      <h1>Admin Dashboard</h1>
      <div className="admin-dashboard-links">
        <Link className="admin-link" to="/admin/view-attendance">
          View User Attendance
        </Link>
        <Link className="admin-link" to="/admin/edit-attendance">
          Edit Attendance
        </Link>
        <Link className="admin-link" to="/admin/generate-report">
          Generate Report
        </Link>
        <Link className="admin-link" to="/admin/leave-approval">
          Leave Approval
        </Link>
        <Link className="admin-link" to="/admin/grading-system">
          Grading System
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;

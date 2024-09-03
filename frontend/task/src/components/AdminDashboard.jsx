import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendances = async () => {
      try {
        const response = await axios.get("/api/admin/attendance");
        setAttendances(response.data);
      } catch (error) {
        console.error("Error fetching attendances:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendances();
  }, []);

  const deleteAttendance = async (id) => {
    try {
      await axios.delete(`/api/admin/attendance/${id}`);
      setAttendances(attendances.filter((attendance) => attendance._id !== id));
    } catch (error) {
      console.error("Error deleting attendance:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="admin-dashboard-container">
      <h1 className="dashboard-title">Admin Attendance View</h1>
      <ul className="attendance-list">
        {attendances.map((attendance) => (
          <li key={attendance._id} className="attendance-item">
            <span className="attendance-user">{attendance.userId.name}</span>
            <span className="attendance-date">{attendance.date}</span>
            <button
              onClick={() => deleteAttendance(attendance._id)}
              className="delete-button"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;

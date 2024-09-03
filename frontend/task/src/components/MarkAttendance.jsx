import React, { useState } from "react";
import axios from "axios";
import "./MarkAttendance.css";

const MarkAttendance = () => {
  const [attendanceData, setAttendanceData] = useState({
    date: "",
    status: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!attendanceData.status || !attendanceData.date) {
      alert("Please select an attendance status and date.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await axios.post("/api/attendance", attendanceData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Attendance marked successfully");
    } catch (error) {
      console.error(
        "Error marking attendance:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="attendance-container">
      <form onSubmit={handleSubmit} className="attendance-form">
        <h2 className="attendance-title">Mark Your Attendance</h2>
        <label className="attendance-label">
          Date:
          <input
            type="date"
            value={attendanceData.date}
            onChange={(e) =>
              setAttendanceData({ ...attendanceData, date: e.target.value })
            }
            required
            className="attendance-input"
          />
        </label>
        <label className="attendance-label">
          Status:
          <select
            value={attendanceData.status}
            onChange={(e) =>
              setAttendanceData({ ...attendanceData, status: e.target.value })
            }
            required
            className="attendance-select"
          >
            <option value="">Select Status</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </label>
        <button type="submit" className="attendance-button">
          Mark Attendance
        </button>
      </form>
    </div>
  );
};

export default MarkAttendance;

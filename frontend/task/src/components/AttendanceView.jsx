import React, { useState, useEffect } from "react";
import axios from "axios";

const AttendanceView = () => {
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendances = async () => {
      try {
        const response = await axios.get("/api/admin/admin/attendance");
        setAttendances(response.data);
      } catch (error) {
        console.error(
          "Error fetching attendance:",
          error.response ? error.response.data : error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAttendances();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Attendance Records</h1>
      <ul>
        {attendances.map((attendance) => (
          <li key={attendance._id}>
            {attendance.userId.name} - {attendance.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AttendanceView;

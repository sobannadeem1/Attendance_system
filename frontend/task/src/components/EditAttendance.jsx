import React, { useState, useEffect } from "react";
import "./EditAttendance.css";

const EditAttendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/admin/attendance",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setAttendanceRecords(data.records);
        } else {
          alert(data.message || "Failed to fetch attendance records");
        }
      } catch (error) {
        alert("An error occurred: " + error.message);
      }
    };

    fetchAttendance();
  }, []);

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/attendance/${selectedRecord._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        alert("Attendance updated successfully");
        setStatus("");
        setSelectedRecord(null);
        // Refresh the attendance records
        const fetchAttendance = async () => {
          try {
            const response = await fetch(
              "http://localhost:5000/api/admin/attendance",
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                },
              }
            );
            const data = await response.json();
            if (response.ok) {
              setAttendanceRecords(data.records);
            } else {
              alert(data.message || "Failed to fetch attendance records");
            }
          } catch (error) {
            alert("An error occurred: " + error.message);
          }
        };

        fetchAttendance();
      } else {
        alert(result.message || "Failed to update attendance");
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  };

  return (
    <div className="edit-attendance-container">
      <h2>Edit Attendance</h2>
      <select
        onChange={(e) =>
          setSelectedRecord(
            attendanceRecords.find((record) => record._id === e.target.value)
          )
        }
      >
        <option value="">Select Record</option>
        {attendanceRecords.map((record) => (
          <option key={record._id} value={record._id}>
            {record.date} - {record.username}
          </option>
        ))}
      </select>
      {selectedRecord && (
        <>
          <input
            type="text"
            placeholder="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
          <button onClick={handleUpdate}>Update Attendance</button>
        </>
      )}
    </div>
  );
};

export default EditAttendance;

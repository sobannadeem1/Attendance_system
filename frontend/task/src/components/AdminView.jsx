// ViewRecords.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewRecords = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/admin/view-records"
        );
        setRecords(response.data);
      } catch (error) {
        console.error(error);
        alert("Failed to fetch records.");
      }
    };

    fetchRecords();
  }, []);

  return (
    <div className="view-records-container">
      <h2>View Student Records</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index}>
              <td>{record.name}</td>
              <td>{record.email}</td>
              <td>{record.attendance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewRecords;

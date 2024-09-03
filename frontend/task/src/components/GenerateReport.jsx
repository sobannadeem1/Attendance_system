import React, { useState } from "react";
import axios from "axios";

const UserReport = () => {
  const [userId, setUserId] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reportData, setReportData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleGenerateReport = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`/api/admin/report/${userId}`, {
        params: { from: fromDate, to: toDate },
      });
      setReportData(response.data);
      setErrorMessage("");
    } catch (error) {
      setReportData([]);
      setErrorMessage(
        error.response ? error.response.data.message : "An error occurred"
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleGenerateReport}>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="User ID"
          required
        />
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          required
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          required
        />
        <button type="submit">Generate Report</button>
      </form>

      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {reportData.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Attendance Status</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((record) => (
              <tr key={record._id}>
                <td>{new Date(record.date).toLocaleDateString()}</td>
                <td>{record.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserReport;

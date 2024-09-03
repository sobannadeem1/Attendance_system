import React, { useState } from "react";
import axios from "axios";

const LeaveRequestForm = () => {
  const [reason, setReason] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        "/api/leave/leave",
        { reason },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccessMessage("Leave request submitted successfully!");
      setReason("");
    } catch (error) {
      console.error("Error submitting leave request:", error);
      setErrorMessage("Failed to submit leave request.");
    }
  };

  return (
    <div>
      <h1>Leave Request Form</h1>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Reason:
          <input
            type="text"
            value={reason}
            name="reason"
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default LeaveRequestForm;

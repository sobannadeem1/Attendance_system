import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LeaveApproval.css";

const LeaveApproval = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await axios.get("/api/admin/leave");
        setLeaveRequests(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching leave requests");
        setLoading(false);
      }
    };

    fetchLeaveRequests();
  }, []);

  const handleApprove = async (leaveId) => {
    try {
      const response = await axios.patch(`/api/admin/leave/${leaveId}`, {
        status: "approved",
      });
      console.log("Leave approved successfully:", response.data);

      // Update the state to reflect the approved leave
      setLeaveRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== leaveId)
      );
    } catch (error) {
      console.error("Error approving leave request:", error);
      setError("Failed to approve leave request.");
    }
  };

  const handleReject = async (leaveId) => {
    try {
      const response = await axios.patch(`/api/admin/leave/${leaveId}`, {
        status: "rejected",
      });
      console.log("Leave rejected successfully:", response.data);

      // Update the state to reflect the rejected leave
      setLeaveRequests((prevRequests) =>
        prevRequests.filter((request) => request._id !== leaveId)
      );
    } catch (error) {
      console.error("Error rejecting leave request:", error);
      setError("Failed to reject leave request.");
    }
  };

  if (loading) {
    return <div>Loading leave requests...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="leave-approval-container">
      <h2 className="leave-approval-title">Leave Approval</h2>
      {leaveRequests.length === 0 ? (
        <div>No leave requests to approve/reject.</div>
      ) : (
        leaveRequests.map((request) => (
          <div key={request._id} className="leave-request-card">
            <h3 className="leave-request-name">{request.userId.name}</h3>
            <p className="leave-request-reason">{request.reason}</p>
            <p className="leave-request-status">Status: {request.status}</p>
            <button
              onClick={() => handleApprove(request._id)}
              className="approve-button"
            >
              Approve
            </button>
            <button
              onClick={() => handleReject(request._id)}
              className="reject-button"
            >
              Reject
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default LeaveApproval;

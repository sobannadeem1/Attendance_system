import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AttendanceContext = createContext();

export const AttendanceProvider = ({ children }) => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (user) {
      setRole(user.role);
    }
  }, [user]);

  const setUserRole = (newRole) => {
    setRole(newRole);
    if (user) {
      setUser({ ...user, role: newRole });
    }
  };

  const markAttendance = async (status) => {
    if (!user) {
      setMessage("You need to log in to mark attendance.");
      return {
        success: false,
        message: "You need to log in to mark attendance.",
      };
    }

    const date = new Date().toISOString().split("T")[0];
    const alreadyMarked = attendanceRecords.some(
      (record) => record.date === date && record.email === user.email
    );

    if (alreadyMarked) {
      setMessage("You have already marked your attendance for today.");
      return {
        success: false,
        message: "You have already marked your attendance for today.",
      };
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/user/mark-attendance",
          { status },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setAttendanceRecords((prevRecords) => [...prevRecords, response.data]);
        setMessage(`Attendance marked as ${status}.`);
        return { success: true, message: `Attendance marked as ${status}.` };
      } catch (error) {
        console.error(error);
        setMessage("Failed to mark attendance.");
        return { success: false, message: "Failed to mark attendance." };
      }
    }
  };

  return (
    <AttendanceContext.Provider
      value={{
        user,
        setUserRole,
        setUser,
        role,
        markAttendance,
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};

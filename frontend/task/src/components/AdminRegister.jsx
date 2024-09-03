import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminRegister.css";

const AdminRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/api/admin/register", { name, email, password });
      setName("");
      setEmail("");
      setPassword("");
      setErrorMessage("");
      navigate("/admin/login");
    } catch (error) {
      console.error(
        "Registration error:",
        error.response ? error.response.data : error.message
      );
      setErrorMessage(
        error.response?.data?.error || "An error occurred. Please try again."
      );
    }
  };

  return (
    <div className="admin-register-container">
      <form onSubmit={handleRegister} className="admin-register-form">
        <h1 style={{ textAlign: "center" }}>Register</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default AdminRegister;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/admin/admin/login", {
        email,
        password,
      });
      localStorage.setItem("adminToken", response.data.token);
      navigate("/admin/dashboard");
      setErrorMessage("");
    } catch (error) {
      if (error.response && error.response.data.error === "Admin not found") {
        setErrorMessage(
          'Admin not found. Please try registering <a href="/admin/register">Register Here</a>'
        );
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="admin-login-container">
      <form onSubmit={handleLogin} className="admin-login-form">
        <h1 style={{ textAlign: "center" }}>Login</h1>
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
        <button type="submit">Login</button>
        {errorMessage && (
          <p dangerouslySetInnerHTML={{ __html: errorMessage }} />
        )}
      </form>
    </div>
  );
};

export default AdminLogin;

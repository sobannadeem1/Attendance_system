import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to the Attendance System</h1>
      <div className="home-content">
        <p className="home-message">
          You have to login to mark attendance.{" "}
          <a href="/login" className="home-link">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Home;

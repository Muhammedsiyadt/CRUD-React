import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", height: "60vh" }}>
      <h2 style={{ marginBottom: "1rem", textAlign: "center" }}>ADMIN DELETED YOUR ACCOUNT</h2>
      <p style={{ textAlign: "center" }} className="profile-prompt">
        You must register again.{" "}
        <span onClick={() => navigate("/login")} className="profile-link" style={{ cursor: "pointer", color: "blue", textDecoration: "none" }}>
          Add your profile
        </span>
        .
      </p>
    </div>
  );
};

export default Error; 

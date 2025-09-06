// src/pages/Login.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const start = async () => {
    // Simulating login and navigating to home
    navigate("/home");  
  };

  return (
    <div style={{ padding: 24, textAlign: "center", fontFamily: "Poppins, Inter, sans-serif" }}>
      <h1 style={{ color: "#2e7d32" }}>Chirayu 🌿</h1>
      <p>Your Mind’s Companion</p>
      <button onClick={start} style={{ padding: "10px 18px", fontSize: 16, cursor: "pointer" }}>
        Continue as Guest
      </button>
    </div>
  );
}

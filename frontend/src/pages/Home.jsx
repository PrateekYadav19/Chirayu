// src/pages/Home.jsx
import React from "react";
import MoodPicker from "../components/MoodPicker";
import ChatBox from "../components/ChatBox";
import Dashboard from "../components/Dashboard";
import SOS from "../components/SOS";

export default function Home() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, padding: 20 }}>
      <div>
        <h2>Chat with Chirayu 🤝</h2>
        <ChatBox />
        <h2 style={{ marginTop: 20 }}>Log Your Mood 🌈</h2>
        <MoodPicker />
         
        <SOS />
      </div>
      <div>
        <h2>Your Progress 📊</h2>
        <Dashboard />
      </div>
    </div>
  );
}

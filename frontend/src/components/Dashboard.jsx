import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { computeMRI } from "../utils/mri";

export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch mood data from the backend API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/get-moods');
        const moods = await response.json();
        const chartData = moods.reverse().map(d => ({
          time: new Date(d.createdAt).toLocaleTimeString(),
          score: d.score,
        }));
        setData(chartData);
      } catch (err) {
        console.error("Failed to fetch mood data:", err);
      }
    };

    fetchData();
    // You could use a polling mechanism or WebSockets here for real-time updates
    // For now, it will only fetch the data once on component load
  }, []);

  // Calculate the average score of the last 7 mood entries
  const last7 = data.slice(-7);
  const sum = last7.reduce((s, x) => s + ((x.score + 1) / 2), 0);
  const recentAvg = last7.length ? sum / last7.length : 0.6;
  
  // Calculate the Chirayu Index
  const chirayuIndex = computeMRI({ recentMoodAvg: recentAvg || 0.6 });

  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <h3>Your Chirayu Index: {chirayuIndex}/100</h3>
        <p style={{ marginTop: 4, color: "#555" }}>A higher score means better mental resilience 🌿</p>
      </div>

      <LineChart width={420} height={220} data={data}>
        <CartesianGrid stroke="#eee" />
        <XAxis dataKey="time" />
        <YAxis domain={[-1, 1]} />
        <Tooltip />
        <Line type="monotone" dataKey="score" stroke="#4caf50" />
      </LineChart>
    </div>
  );
}

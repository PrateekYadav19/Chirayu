// src/components/MoodPicker.jsx
import React, { useState } from "react";

const emojis = [
  { e: "😃", val: 1 },
  { e: "🙂", val: 0.5 },
  { e: "😔", val: -0.2 },
  { e: "😢", val: -1 },
];

export default function MoodPicker() {
  const [note, setNote] = useState("");

  async function saveMood(item) {
    try {
      // Send data to the backend server
      const response = await fetch('http://localhost:3000/api/save-mood', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          emoji: item.e,
          score: item.val,
          note,
        }),
      });
      const data = await response.json();
      if (data.status === 'success') {
        setNote("");
        alert("Chirayu: mood saved 🌿");
      } else {
        alert("Error saving mood.");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving mood. Check console.");
    }
  }

  return (
    <div>
      <div>
        {emojis.map((it) => (
          <button
            key={it.e}
            onClick={() => saveMood(it)}
            style={{ fontSize: 32, margin: 8, cursor: "pointer" }}
            aria-label={`mood-${it.e}`}
          >
            {it.e}
          </button>
        ))}
      </div>
      <textarea
        placeholder="Add a short note (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        style={{ width: "100%", height: 80, marginTop: 8 }}
      />
    </div>
  );
}

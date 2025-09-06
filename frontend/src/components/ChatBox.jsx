// src/components/ChatBox.jsx
import React, { useState } from "react";
import Sentiment from "sentiment";

const sentiment = new Sentiment();
const CRITICAL_KEYWORDS = ["suicide", "kill myself", "end my life", "want to die", "die"];

export default function ChatBox() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  async function handleSend() {
    if (!input.trim()) return;

    const low = input.toLowerCase();
    // Check for critical keywords
    if (CRITICAL_KEYWORDS.some((k) => low.includes(k))) {
      const botText =
        "⚠️ Chirayu Care Alert: If you are feeling unsafe, please reach out immediately. You are not alone. Helpline: 9152987821 (Vandrevala), 1800-599-0019 (AASRA).";
      setMessages((m) => [...m, { from: "user", text: input }, { from: "bot", text: botText }]);
      await fetch('http://localhost:3000/api/save-alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: "critical_keyword", message: input }),
      });
      setInput("");
      return;
    }

    const result = sentiment.analyze(input);
    const score = result.score;
    let reply = "I hear you. Tell me more about how you feel.";
    if (score > 1) reply = "That's great to hear! Keep up the good vibes 😊";
    else if (score === 0) reply = "Thanks for sharing. Would you like a quick tip to feel better?";
    else if (score < 0) reply = "I’m sorry you’re feeling this way. Try a 2-minute breathing exercise or note 3 things you're grateful for today.";

    setMessages((m) => [...m, { from: "user", text: input }, { from: "bot", text: reply }]);
    setInput("");
    
    // Save chat messages to the backend
    await fetch('http://localhost:3000/api/save-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input, sentimentScore: score, source: "user" }),
    });
    await fetch('http://localhost:3000/api/save-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: reply, sentimentScore: null, source: "bot" }),
    });
  }

  return (
    <div>
      <div style={{ minHeight: 140, border: "1px solid #ddd", padding: 10, borderRadius: 8 }}>
        {messages.map((m, idx) => (
          <div key={idx} style={{ textAlign: m.from === "bot" ? "left" : "right", margin: "6px 0" }}>
            <div style={{ display: "inline-block", background: m.from === "bot" ? "#f3f3f3" : "#dff7e0", padding: 8, borderRadius: 8 }}>
              <small>{m.text}</small>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="How are you feeling? (type here)"
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={handleSend} style={{ padding: "8px 12px", cursor: "pointer" }}>
          Send
        </button>
      </div>
    </div>
  );
}

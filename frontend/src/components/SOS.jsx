// src/components/SOS.jsx
import React, { useState } from 'react';

export default function SOS() {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  async function handleSOS() {
    if (isSending) return;
    setIsSending(true);

    try {
      const response = await fetch('http://localhost:3000/api/sos-alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'SOS', message: 'User needs help.', createdAt: new Date() }),
      });
      const result = await response.json();
      if (result.status === 'success') {
        alert('SOS alert sent successfully!');
      } else {
        alert('Failed to send SOS alert.');
      }
    } catch (err) {
      console.error('SOS request failed:', err);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div style={{ marginTop: 24 }}>
      <h2 style={{ color: '#d32f2f' }}>Need Help?</h2>
      <p style={{ color: '#555' }}>
        If you are in immediate distress, please click the button below to send an anonymous alert.
      </p>
      <button 
        onClick={handleSOS} 
        disabled={isSending} 
        style={{ backgroundColor: '#d32f2f', marginTop: 12 }}
      >
        {isSending ? 'Sending...' : 'Send SOS Alert'}
      </button>
    </div>
  );
}

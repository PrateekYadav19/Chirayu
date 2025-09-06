// Backend Server: Node.js + Express + Mongoose
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors()); // Allow requests from your React app
app.use(express.json()); // For parsing JSON data from requests

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/chirayu_db')
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('MongoDB connection failed:', err));

// Database schemas and models
const moodSchema = new mongoose.Schema({
  emoji: String,
  score: Number,
  note: String,
  createdAt: { type: Date, default: Date.now },
});
const chatSchema = new mongoose.Schema({
  text: String,
  sentimentScore: Number,
  createdAt: { type: Date, default: Date.now },
  source: String,
});
const alertSchema = new mongoose.Schema({
  type: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

// Models
const Mood = mongoose.model('Mood', moodSchema);
const Chat = mongoose.model('Chat', chatSchema);
const Alert = mongoose.model('Alert', alertSchema);

// --- API Endpoints ---

// API to save a mood log
app.post('/api/save-mood', async (req, res) => {
  try {
    const newMood = new Mood(req.body);
    await newMood.save();
    res.status(200).send({ status: 'success' });
  } catch (err) {
    res.status(500).send({ status: 'error', message: err.message });
  }
});

// API to get recent mood logs
app.get('/api/get-moods', async (req, res) => {
  try {
    const moods = await Mood.find().sort({ createdAt: -1 }).limit(30);
    res.status(200).send(moods);
  } catch (err) {
    res.status(500).send({ status: 'error', message: err.message });
  }
});

// API to save a chat message
app.post('/api/save-chat', async (req, res) => {
  try {
    const newChat = new Chat(req.body);
    await newChat.save();
    res.status(200).send({ status: 'success' });
  } catch (err) {
    res.status(500).send({ status: 'error', message: err.message });
  }
});

// API to save a critical alert
app.post('/api/save-alert', async (req, res) => {
  try {
    const newAlert = new Alert(req.body);
    await newAlert.save();
    res.status(200).send({ status: 'success' });
  } catch (err) {
    res.status(500).send({ status: 'error', message: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
// ... (your existing code for imports, connection, and schemas) ...

// --- API Endpoints ---

// API to save a mood log
app.post('/api/save-mood', async (req, res) => {
  // ...
});

// API to get recent mood logs
app.get('/api/get-moods', async (req, res) => {
  // ...
});

// API to save a chat message
app.post('/api/save-chat', async (req, res) => {
  // ...
});

// API to save a critical alert
app.post('/api/save-alert', async (req, res) => {
  // ...
});

// New API to save an anonymous SOS alert
app.post('/api/sos-alert', async (req, res) => {
  try {
    const newAlert = new Alert(req.body);
    await newAlert.save();
    res.status(200).send({ status: 'success' });
  } catch (err) {
    res.status(500).send({ status: 'error', message: err.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});

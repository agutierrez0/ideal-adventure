const express = require('express');
const db = require('./database');
const axios = require('axios');

const app = express();
app.use(express.json());

// Use environment variable for user service URL, default to Docker network
const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://user-service:3001';

app.post('/payments', async (req, res) => {
  const { userId, amount } = req.body;
  try {
    // Verify user exists by calling user-service
    const userResponse = await axios.get(`${USER_SERVICE_URL}/users/${userId}`);
    if (!userResponse.data) {
      return res.status(400).json({ error: 'User not found' });
    }
    // Create payment
    db.run('INSERT INTO payments (userId, amount, status) VALUES (?, ?, ?)', [userId, amount, 'completed'], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, status: 'completed' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify user or create payment' });
  }
});

app.get('/payments/:id', (req, res) => {
  const id = req.params.id;
  db.get('SELECT * FROM payments WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Payment not found' });
    res.json(row);
  });
});

app.listen(3002, () => console.log('Payment service listening on port 3002'));
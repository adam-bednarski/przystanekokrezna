const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/przystanek-okrezna')

app.get('/', (req, res) => {
  res.send('Przystanek Okrężna API');
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  res.json({ success: true, message: 'Wiadomość wysłana' });
});
app.get('/health', (req, res) => {
  const conn = mongoose.connection;
  const statusMap = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
  res.json({
    ok: true,
    service: 'Przystanek Okrężna API',
    mongodb: {
      readyState: conn.readyState,
      status: statusMap[conn.readyState] || 'unknown',
      name: conn.name || undefined,
      host: (conn.host || (conn.client && conn.client.s && conn.client.s.options && conn.client.s.options.host)) || 'localhost',
      port: (conn.port || (conn.client && conn.client.s && conn.client.s.options && conn.client.s.options.port)) || 27017,
      uriFromEnv: Boolean(process.env.MONGODB_URI)
    }
  });
});

app.listen(PORT, () => { });

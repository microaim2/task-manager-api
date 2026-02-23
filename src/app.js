const express = require('express');
const db = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const taskRoutes = require('./routes/tasks.routes');

console.log('APP LOADED FROM:', __filename);

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

console.log('TASK ROUTES MOUNTED');

app.get('/', (req, res) => {
  res.json({ message: 'API is working' });
});

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.get('/health/db', async (req, res) => {
  try {
    const r = await db.query('SELECT NOW() AS now');
    res.json({ ok: true, dbTime: r.rows[0].now });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

module.exports = app;
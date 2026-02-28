const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const db = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const taskRoutes = require('./routes/tasks.routes');

const app = express();

// security + logs
app.use(helmet());
app.use(morgan('dev'));

// rate limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// body
app.use(express.json());

// routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

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

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// error handler (last)
app.use((err, req, res, next) => {
  console.error('ERROR:', err);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

module.exports = app;
// Load .env only for local development (NOT in Docker/production)
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
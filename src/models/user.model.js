const db = require('../config/db');

async function findByEmail(email) {
  const { rows } = await db.query('SELECT id, email, password_hash FROM users WHERE email = $1', [email]);
  return rows[0];
}

async function create(email, passwordHash) {
  const { rows } = await db.query(
    'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, created_at',
    [email, passwordHash]
  );
  return rows[0];
}

module.exports = { findByEmail, create };
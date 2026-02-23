const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

function signToken(user) {
  return jwt.sign(
    { email: user.email },
    process.env.JWT_SECRET,
    { subject: String(user.id), expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

async function register(req, res) {
  const { email, password } = req.body;

  if (!email || !password || password.length < 6) {
    return res.status(400).json({ error: 'Email and password (min 6 chars) are required' });
  }

  const existing = await User.findByEmail(email);
  if (existing) return res.status(409).json({ error: 'User already exists' });

  const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS || 10);
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = await User.create(email, passwordHash);
  const token = signToken(user);

  return res.status(201).json({ user, token });
}

async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const userRow = await User.findByEmail(email);
  if (!userRow) return res.status(401).json({ error: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, userRow.password_hash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

  const token = signToken({ id: userRow.id, email: userRow.email });

  return res.json({
    user: { id: userRow.id, email: userRow.email },
    token
  });
}

module.exports = { register, login };
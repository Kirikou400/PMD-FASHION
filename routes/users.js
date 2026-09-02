const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

function tokenFor(user) {
  return jwt.sign({ sub: user._id.toString(), isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: '7d' });
}

function publicUser(user) {
  return { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin };
}

router.post('/register', async (req, res) => {
  try {
    if (!process.env.JWT_SECRET) return res.status(503).json({ error: 'JWT_SECRET is not configured' });
    if (mongoose.connection.readyState !== 1) return res.status(503).json({ error: 'MongoDB is unavailable. Check Atlas Network Access and MONGO_URI.' });
    const { name, email, password } = req.body;
    if (!name || !email || !password || password.length < 8) return res.status(400).json({ error: 'Name, email, and a password of at least 8 characters are required' });
    const exists = await User.exists({ email: email.toLowerCase() });
    if (exists) return res.status(409).json({ error: 'Email is already registered' });
    const user = await User.create({ name, email, passwordHash: await bcrypt.hash(password, 12) });
    res.status(201).json({ user: publicUser(user), token: tokenFor(user) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  if (!process.env.JWT_SECRET) return res.status(503).json({ error: 'JWT_SECRET is not configured' });
  if (mongoose.connection.readyState !== 1) return res.status(503).json({ error: 'MongoDB is unavailable. Check Atlas Network Access and MONGO_URI.' });
  try {
    const user = await User.findOne({ email: req.body.email?.toLowerCase() }).select('+passwordHash');
    if (!user || !(await bcrypt.compare(req.body.password || '', user.passwordHash))) return res.status(401).json({ error: 'Invalid email or password' });
    res.json({ user: publicUser(user), token: tokenFor(user) });
  } catch (error) {
    res.status(503).json({ error: 'MongoDB is unavailable. Check Atlas Network Access and MONGO_URI.' });
  }
});

router.get('/me', requireAuth, (req, res) => res.json({ user: publicUser(req.user) }));

router.get('/', requireAuth, requireAdmin, async (req, res) => {
  res.json(await User.find().select('name email isAdmin createdAt').sort({ createdAt: -1 }));
});

router.patch('/:id', requireAuth, requireAdmin, async (req, res) => {
  const updates = {};
  if (typeof req.body.name === 'string') updates.name = req.body.name.trim();
  if (typeof req.body.isAdmin === 'boolean') updates.isAdmin = req.body.isAdmin;
  const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('name email isAdmin createdAt');
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  if (req.params.id === req.user._id.toString()) return res.status(400).json({ error: 'You cannot delete your own admin account' });
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({ success: true });
});

module.exports = router;

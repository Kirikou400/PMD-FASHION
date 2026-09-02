const express = require('express');
const axios = require('axios');
const Product = require('../models/Product');
const Order = require('../models/Order');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

router.use(requireAuth, requireAdmin);

router.get('/products', async (req, res) => {
  res.json(await Product.find().sort({ createdAt: -1 }));
});

router.post('/products', async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

router.patch('/products/:id', async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

router.delete('/products/:id', async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json({ success: true });
});

router.get('/orders', async (req, res) => {
  res.json(await Order.find().sort({ createdAt: -1 }));
});

router.patch('/orders/:id/status', async (req, res) => {
  const allowed = ['pending', 'paid', 'processing', 'shipped', 'completed', 'cancelled'];
  if (!allowed.includes(req.body.status)) return res.status(400).json({ error: 'Invalid order status' });
  const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});

router.get('/cac/status', (req, res) => {
  res.json({ configured: Boolean(process.env.CAC_API_URL && process.env.CAC_API_KEY), message: 'CAC provider hook is ready for configured credentials' });
});

router.post('/cac/verify', async (req, res) => {
  if (!process.env.CAC_API_URL || !process.env.CAC_API_KEY) return res.status(501).json({ error: 'CAC verification is not configured' });
  try {
    const response = await axios.post(process.env.CAC_API_URL, req.body, { headers: { Authorization: `Bearer ${process.env.CAC_API_KEY}` } });
    res.status(response.status).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 502).json({ error: 'CAC verification provider unavailable' });
  }
});

module.exports = { router, requireAdmin };

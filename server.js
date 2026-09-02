const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.startsWith('replace-with-')) {
  process.env.JWT_SECRET = require('crypto').randomBytes(32).toString('hex');
  console.warn('JWT_SECRET is not configured; using a temporary development secret');
}

const orderRoutes = require('./routes/order');
const { router: adminRoutes } = require('./routes/admin');
const userRoutes = require('./routes/users');
const Product = require('./models/Product');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const app = express();
app.use(bodyParser.json({ verify: (req, res, buffer) => { req.rawBody = buffer; } }));
app.use(cors());

// Serve frontend and images
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/pmd-store';
mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.warn('MongoDB connection warning:', err.message));

// Simple product list (uses images from /images)
const products = [
  { id: 1, name: 'Society 001 Jersey', category: 'Jerseys', price: 85, priceUSD: 85, image: '/images/jersey black.jpeg', detail: 'Black / White', sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'White'], status: 'available' },
  { id: 2, name: 'Pressure Jersey', category: 'Jerseys', price: 95, priceUSD: 95, image: '/images/heavy weight jersey 002.jpeg', detail: 'Gold / Forest', sizes: ['S', 'M', 'L', 'XL'], colors: ['Gold', 'Forest'], status: 'coming-soon' },
  { id: 3, name: 'PMD Essential Tee', category: 'T-Shirts', price: 65, priceUSD: 65, image: '/images/t shirt.jpeg', detail: 'Black / Red', sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: ['Black', 'Red'], status: 'out-of-stock' },
  { id: 4, name: 'Diamond White Tee', category: 'T-Shirts', price: 65, priceUSD: 65, image: '/images/T-shirt white.jpeg', detail: 'White / Black', sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: ['White', 'Black'], status: 'out-of-stock' },
  { id: 5, name: 'Society Polo', category: 'Polos', price: 75, priceUSD: 75, image: '/images/polo.jpeg', detail: 'Signature edition', sizes: ['S', 'M', 'L', 'XL'], colors: ['Black', 'Red'], status: 'coming-soon' },
  { id: 6, name: 'PMD Blackout Tee', category: 'T-Shirts', price: 65, priceUSD: 65, image: '/images/t-shit black.jpeg', detail: 'Black / Chrome', sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: ['Black', 'Chrome'], status: 'out-of-stock' }
];

app.get('/products', async (req, res) => {
  try {
    const managedProducts = await Product.find({ active: true }).lean();
    res.json(managedProducts.length ? managedProducts : products);
  } catch (error) {
    res.json(products);
  }
});

app.use('/order', orderRoutes);
app.use('/orders', orderRoutes);
app.use('/admin', adminRoutes);
app.use('/users', userRoutes);

const seedProducts = async () => {
  if (await Product.countDocuments()) return;
  await Product.insertMany(products);
  console.log('Product catalog seeded');
};

const seedAdmin = async () => {
  if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) return;
  const email = process.env.ADMIN_EMAIL.toLowerCase();
  const passwordHash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
  await User.findOneAndUpdate(
    { email },
    { name: process.env.ADMIN_NAME || 'PMD Admin', email, passwordHash, isAdmin: true },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  console.log('Admin account synchronized');
};

mongoose.connection.once('open', () => {
  seedProducts().then(seedAdmin).catch(error => console.warn('Database seed warning:', error.message));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

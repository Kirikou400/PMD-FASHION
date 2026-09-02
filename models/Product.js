const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  priceUSD: { type: Number, required: true, min: 0 },
  image: { type: String, required: true },
  detail: String,
  sizes: [String],
  colors: [String],
  status: {
    type: String,
    enum: ['available', 'coming-soon', 'out-of-stock'],
    default: 'available'
  },
  active: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);

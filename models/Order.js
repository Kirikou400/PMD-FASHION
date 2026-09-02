const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  customerEmail: String,
  products: [
    {
      name: String,
      price: Number,
      quantity: Number,
      size: String,
      color: String
    }
  ],
  totalAmount: Number,
  paymentRef: String,
  status: { type: String, default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);

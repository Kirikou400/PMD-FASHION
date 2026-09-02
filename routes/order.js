const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const Order = require('../models/Order');
const router = express.Router();

// Create new order
router.post('/create', async (req, res) => {
  try {
    const { customerEmail, products } = req.body;
    if (!customerEmail || !products || !Array.isArray(products)) {
      return res.status(400).json({ error: 'Invalid order payload' });
    }

    const totalAmount = products.reduce((sum, p) => sum + ((p.priceUSD ?? p.price) || 0) * (p.quantity || 0), 0);

    const order = new Order({ customerEmail, products, totalAmount });
    await order.save();

    res.json({ orderId: order._id, totalAmount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Verify Paystack payment
router.post('/verify', async (req, res) => {
  try {
    const { reference, orderId } = req.body;

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      { headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` } }
    );

    if (response.data && response.data.data && response.data.data.status === 'success') {
      await Order.findByIdAndUpdate(orderId, { status: 'paid', paymentRef: reference });
      res.json({ success: true, message: 'Payment verified and order updated' });
    } else {
      res.json({ success: false, message: 'Payment not successful' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Paystack webhook: configure this URL in the Paystack dashboard.
router.post('/webhook', async (req, res) => {
  const signature = req.get('x-paystack-signature');
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret || !signature || !req.rawBody) return res.status(401).send('Invalid webhook signature');
  const expected = crypto.createHmac('sha512', secret).update(req.rawBody).digest('hex');
  if (signature.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return res.status(401).send('Invalid webhook signature');

  if (req.body.event === 'charge.success') {
    const reference = req.body.data?.reference;
    await Order.findOneAndUpdate({ paymentRef: reference }, { status: 'paid' });
  }
  res.sendStatus(200);
});

module.exports = router;

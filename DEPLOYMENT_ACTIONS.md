# 🚀 Deployment Action Items - PMD Store

## Immediate Actions Required (Before Going Live)

### 1. **Update Paystack Keys to LIVE** 🔑
When ready for production:
```env
PAYSTACK_SECRET_KEY=sk_live_<your-actual-live-key>
PAYSTACK_PUBLIC_KEY=pk_live_<your-actual-live-key>
```
Get live keys from: https://dashboard.paystack.com/settings/developer

### 2. **Configure Webhook in Paystack Dashboard** 🔗
1. Log in to Paystack Dashboard
2. Go to: Settings → API Keys & Webhooks
3. Under "Webhook URL", enter: `https://yourdomain.com/order/webhook`
4. Webhook endpoint is ready at: `POST /order/webhook`
5. Click "Send Test Event" to verify connection

### 3. **Add Production Server IP to MongoDB** 🌍
1. Get your deployment server's IP address
2. Go to MongoDB Atlas → Network Access → IP Whitelist
3. Add the production IP (or use 0.0.0.0/0 to allow all - use with caution)
4. Save and verify connection works

### 4. **Set Strong JWT_SECRET** 🔐
Generate a random 32-character secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Update `.env`:
```env
JWT_SECRET=<paste-generated-secret-here>
```

### 5. **Change Admin Password** 🔐
Update in `.env`:
```env
ADMIN_PASSWORD=<new-secure-password>
```

### 6. **Deploy to HTTPS** 🔒
Choose one:
- **Vercel** (easiest): Deploy directly from Git
- **Railway.app**: Simple Node.js + MongoDB hosting
- **Heroku**: Classic choice
- **AWS/DigitalOcean**: More control, more setup

---

## Testing Before Launch

### Local Test:
```bash
1. npm start
2. Visit http://localhost:5000
3. Add items to cart
4. Enter email and proceed to checkout
5. Use test card: 4111 1111 1111 1111
6. Verify order appears in admin panel
7. Check email field is pre-filled on repeat visits
```

### Production Test:
1. After deploying, repeat above steps on live domain
2. Test with real payment method (you'll be refunded)
3. Verify webhook triggers in Paystack dashboard
4. Check order status updates correctly

---

## Environment Checklist

**Must Set Before Launch:**
- [ ] `MONGO_URI` - Production database
- [ ] `JWT_SECRET` - Strong random string
- [ ] `ADMIN_EMAIL` - Your admin email
- [ ] `ADMIN_PASSWORD` - Strong password
- [ ] `PAYSTACK_SECRET_KEY` - Live key
- [ ] `PAYSTACK_PUBLIC_KEY` - Live key

**Optional But Recommended:**
- [ ] `ADMIN_NAME` - Your business name
- [ ] `CAC_API_URL` - Business verification API (if using)
- [ ] `CAC_API_KEY` - Verification API key (if using)

---

## Post-Deployment Monitoring

### Check these after launch:
- [ ] Server logs for errors (use `pm2 logs` if using PM2)
- [ ] MongoDB connection is stable
- [ ] Paystack webhooks are being received
- [ ] Customer emails are being sent correctly
- [ ] Order status updates work from admin panel
- [ ] Static assets (images, CSS) load correctly

### Monitor these metrics:
- Server uptime
- Database performance
- Payment success rate
- Customer support tickets about checkout

---

## Quick Deployment Guides

### Vercel (Node.js):
```bash
npm i -g vercel
vercel
# Follow prompts, set env variables in dashboard
```

### Railway.app (Recommended):
```bash
1. Push code to GitHub
2. Sign in to railway.app
3. Create new project from GitHub
4. Add environment variables
5. Deploy with one click
```

### Local VPS with PM2:
```bash
npm i -g pm2
pm2 start server.js --name "pmd-store"
pm2 startup
pm2 save
# Server will auto-restart on reboot
```

---

## Security Reminders

✅ DO:
- Use HTTPS in production
- Keep JWT_SECRET private
- Rotate secrets periodically
- Monitor Paystack webhook logs
- Keep dependencies updated

❌ DON'T:
- Commit `.env` to Git
- Use test keys in production
- Expose sensitive errors to users
- Store passwords in plain text
- Share JWT_SECRET with anyone

---

## Support Resources

- **Paystack Docs**: https://paystack.com/docs
- **MongoDB Docs**: https://docs.mongodb.com
- **Express Docs**: https://expressjs.com
- **Deployment Platforms**:
  - Vercel: https://vercel.com/docs
  - Railway: https://docs.railway.app
  - Heroku: https://devcenter.heroku.com

---

## FAQ

**Q: Can I test Paystack locally?**
A: Yes! Use test keys and test card: 4111 1111 1111 1111

**Q: What if webhook doesn't work?**
A: Check firewall, verify domain is accessible, check logs for 404s

**Q: How do I update products?**
A: Use `/admin/products` endpoint with authentication (need to implement login UI first)

**Q: What about email notifications?**
A: Currently order emails aren't sent automatically. You can add a service like SendGrid/Mailgun to send customer receipts.

---

*Generated: Sept 1, 2026*
*Last tested: Local environment with Node.js and MongoDB Atlas*

# 🎯 QUICK REFERENCE CARD - PMD STORE

## ⚡ INSTANT START

```bash
npm start
```

Then open:
- **Store:** http://localhost:5000/
- **Admin:** http://localhost:5000/admin

---

## 🔐 ADMIN CREDENTIALS
```
Email: pmdwears@gmail.com
Password: Ayomide247
```

---

## 💳 PAYSTACK TEST CARD
```
Card: 4111111111111111
Date: Any future date
CVC: Any 3 digits
```

---

## 📁 KEY FILES

| Task | File | What |
|------|------|------|
| Start server | `server.js` | Backend entry point |
| Admin panel | `public/admin.html` | Dashboard (600+ lines) |
| Store | `public/main.html` | Customer checkout |
| Config | `.env` | Settings & keys |
| Auth | `middleware/auth.js` | JWT verification |
| Products API | `routes/admin.js` | CRUD endpoints |
| Login API | `routes/users.js` | Authentication |
| DB Models | `models/` | Schemas |

---

## 📚 DOCUMENTATION

| Task | File | Time |
|------|------|------|
| First read | `README_START_HERE.md` | 5 min |
| Overview | `PROJECT_COMPLETION_SUMMARY.md` | 10 min |
| Guide | `ADMIN_PANEL_GUIDE.md` | 15 min |
| Test | `TESTING_GUIDE.md` | 60 min |
| Deploy | `DEPLOYMENT_ACTIONS.md` | Varies |

---

## ✨ KEY FEATURES

✅ Browse products (public)  
✅ Checkout with email (public)  
✅ Create products (admin)  
✅ **Edit prices** (admin) ⭐  
✅ Manage orders (admin)  
✅ View revenue (admin)  
✅ Add admins (admin)  
✅ Verify business (admin)  

---

## 🧪 QUICK TESTS

### Test 1: Customer Store
1. Go to http://localhost:5000/
2. ✅ See 6 products
3. ✅ Add item to cart
4. ✅ Enter email in checkout
5. ✅ See Paystack modal

### Test 2: Admin Panel
1. Go to http://localhost:5000/admin
2. ✅ Login with credentials above
3. ✅ See dashboard with 6 tabs
4. ✅ Go to Products tab
5. ✅ Create new product
6. ✅ Edit product price
7. ✅ View Revenue tab

### Test 3: End-to-End
1. Create order as customer
2. Verify in admin Orders tab
3. Change status to "completed"
4. Check Revenue tab for amount
5. ✅ All data synced

---

## 🔑 API ENDPOINTS

### Public (No Auth)
- `GET /products` - Product list
- `POST /order/create` - Create order
- `POST /order/verify` - Verify payment
- `POST /users/login` - Login

### Protected (Needs JWT + Admin Flag)
- `GET /admin/products` - List products
- `POST /admin/products` - Create product
- `PATCH /admin/products/:id` - Edit product (+ price)
- `DELETE /admin/products/:id` - Delete product
- `GET /admin/orders` - List orders
- `PATCH /admin/orders/:id/status` - Update status

---

## ⚙️ ENVIRONMENT VARIABLES (.env)

```
MONGO_URI=mongodb+srv://[user]:[pass]@cluster0...
JWT_SECRET=[auto-generates if missing]
ADMIN_EMAIL=pmdwears@gmail.com
ADMIN_PASSWORD=Ayomide247
PAYSTACK_PUBLIC_KEY=pk_test_08c8ea...
PAYSTACK_SECRET_KEY=sk_test_48f68...
```

---

## 🚀 PRODUCTION CHECKLIST

- [ ] Read: `DEPLOYMENT_ACTIONS.md`
- [ ] Generate: JWT secret
- [ ] Change: Admin password
- [ ] Get: Paystack live keys
- [ ] Choose: Hosting platform
- [ ] Set: Environment variables
- [ ] Test: Full workflow
- [ ] Deploy: Go live!

---

## 💡 COMMON COMMANDS

```bash
# Start server
npm start

# Stop server
Ctrl+C

# View logs
[See terminal output]

# Check port 5000
netstat -ano | findstr :5000

# Edit config
code .env

# View admin panel
# public/admin.html (in browser)
```

---

## 🎯 ADMIN WORKFLOWS

### Add Product
1. Admin → Products tab
2. Click "New piece"
3. Fill form
4. Save → appears in list

### Edit Price
1. Admin → Products tab
2. Find product
3. Click Edit
4. Change "Price USD"
5. Save → updates immediately

### Process Order
1. Admin → Orders tab
2. Find order by email
3. Click status dropdown
4. Select next state
5. Updates real-time

### View Revenue
1. Admin → Revenue tab
2. See total revenue metric
3. See per-status breakdown
4. Refreshes with each order

---

## 📊 SYSTEM STATS

- **Seeded Products:** 6
- **Default Admin:** pmdwears@gmail.com
- **Database:** MongoDB Atlas (pmd-store)
- **Server Port:** 5000
- **Authentication:** JWT (7-day expiry)
- **Paystack Mode:** Test (switch to live for production)

---

## 🐛 QUICK FIXES

### Server won't start
```
npm start
# Check: "Server running on port 5000"
# Check: "MongoDB connected"
```

### Admin page blank
```
F12 → Application → Storage
# Check: localStorage has "pmdAdminToken"
# If not: Login again
```

### Products not showing
```
F5 (refresh page)
# Check server is running: npm start still showing output
```

### Payment not working
```
Use card: 4111111111111111
Check: Paystack keys in .env
Check: public/main.html has correct public key
```

---

## 📈 ORDER STATUS FLOW

```
pending (new order)
   ↓
paid (payment received)
   ↓
processing (packing)
   ↓
shipped (sent)
   ↓
completed (delivered)
   
OR at any point: cancelled
```

---

## 🔐 SECURITY BASICS

✅ Passwords: Hashed with bcryptjs  
✅ Auth: JWT tokens with 7-day expiry  
✅ API: Protected routes require JWT + admin flag  
✅ Payment: Webhook signature verified  
✅ Secrets: Not stored in code, only in .env  

---

## 📞 HELP RESOURCES

**Get stuck?**
1. Check `TESTING_GUIDE.md` Troubleshooting
2. Check `ADMIN_PANEL_GUIDE.md` Common Tasks
3. Check `FILE_STRUCTURE_GUIDE.md` Common Edits
4. Restart: `npm start`

---

## ✅ READY?

1. ✅ Read `README_START_HERE.md`
2. ✅ Run `npm start`
3. ✅ Visit http://localhost:5000/admin
4. ✅ Login with credentials above
5. ✅ Explore all 6 tabs
6. ✅ Follow `TESTING_GUIDE.md` for full verification

---

**Your e-commerce platform is ready to use!** 🚀

Print this card. Keep it handy.
Reference it while learning the system.

Questions? Check the 8 documentation files in your project folder.

Good luck! 🎉

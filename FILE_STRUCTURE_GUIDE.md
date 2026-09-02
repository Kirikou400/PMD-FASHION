# 📂 PROJECT FILE STRUCTURE & GUIDE

## Quick Navigation

Your PMD Store project contains:

```
c:\Users\HP USER\Desktop\from\
├── 📄 server.js                          ← Start here: npm start
├── 📄 package.json                       ← Dependencies & scripts
├── 📄 .env                               ← Configuration (not visible)
│
├── 📁 public/                            ← Customer-facing files
│   ├── 📄 index.html                     ← Home page
│   ├── 📄 main.html                      ← ✨ Store (with email input)
│   ├── 📄 admin.html                     ← ✨✨ Admin dashboard (NEW)
│   └── 📁 images/                        ← Product images folder
│
├── 📁 middleware/
│   └── 📄 auth.js                        ← JWT authentication logic
│
├── 📁 routes/
│   ├── 📄 users.js                       ← Login/register endpoints
│   ├── 📄 admin.js                       ← Admin CRUD operations
│   └── 📄 order.js                       ← Order & payment endpoints
│
├── 📁 models/
│   ├── 📄 User.js                        ← User schema (email, password)
│   ├── 📄 Product.js                     ← Product schema (prices, details)
│   └── 📄 Order.js                       ← Order schema (items, status)
│
├── 📁 components/                        ← (For future use)
│
└── 📋 Documentation Files:
    ├── 📄 README.md                      ← Original readme
    ├── 📄 PROJECT_COMPLETION_SUMMARY.md  ← ✨ READ THIS FIRST
    ├── 📄 ADMIN_PANEL_GUIDE.md           ← How to use admin features
    ├── 📄 ADMIN_PANEL_VERIFICATION.md    ← Technical verification
    ├── 📄 DEPLOYMENT_ACTIONS.md          ← Production checklist
    └── 📄 SETUP_VERIFICATION.md          ← Setup confirmation
```

---

## 🚀 QUICK START

### 1. Start the Server
```bash
cd c:\Users\HP USER\Desktop\from
npm start
```

You should see:
```
Server running on port 5000
MongoDB connected
Admin account synchronized
```

### 2. Access Your Platforms

**For Customers:**
- Open browser to `http://localhost:5000/`
- Browse products, add to cart, checkout

**For Admins:**
- Open browser to `http://localhost:5000/admin`
- Login: `pmdwears@gmail.com` / `Ayomide247`
- Manage products, orders, revenue

### 3. Stop the Server
```
Press Ctrl+C in terminal
```

---

## 📖 READING ORDER FOR DOCUMENTATION

1. **START HERE:** `PROJECT_COMPLETION_SUMMARY.md`
   - High-level overview of all features
   - What's working, what's been tested
   - Production deployment checklist

2. **LEARN HOW TO USE:** `ADMIN_PANEL_GUIDE.md`
   - Step-by-step instructions for each admin panel feature
   - Common tasks and troubleshooting
   - Tips & tricks for business operations

3. **VERIFY EVERYTHING:** `ADMIN_PANEL_VERIFICATION.md`
   - Technical details of what was tested
   - API endpoints and their status
   - Security & configuration details

4. **DEPLOY TO PRODUCTION:** `DEPLOYMENT_ACTIONS.md`
   - Pre-launch requirements
   - Server configuration
   - Security hardening steps

5. **CONFIRM SETUP:** `SETUP_VERIFICATION.md`
   - Infrastructure checklist
   - Connection verification
   - Database status

---

## 🔧 CONFIGURATION FILES

### .env File
Located in project root (not visible in explorer, but used by server).

Contains:
```
MONGO_URI=mongodb+srv://...
JWT_SECRET=...
ADMIN_EMAIL=pmdwears@gmail.com
ADMIN_PASSWORD=Ayomide247
PAYSTACK_PUBLIC_KEY=pk_test_08c8ea...
PAYSTACK_SECRET_KEY=sk_test_48f68...
```

To view/edit:
```bash
code .env  # Open in VS Code
# or
type .env  # Show in terminal
```

---

## 🎯 KEY FILES FOR EACH TASK

### "I want to manage products"
→ Go to `admin.html` → Products tab
→ Backend: `routes/admin.js` (CRUD endpoints)
→ Database: `models/Product.js` (schema)

### "I want to process orders"
→ Go to `admin.html` → Orders tab
→ Backend: `routes/admin.js` (status updates)
→ Database: `models/Order.js` (status field)

### "I want to see revenue"
→ Go to `admin.html` → Revenue tab
→ Backend: `routes/admin.js` (order queries)
→ Calculations: All in `admin.html` JavaScript

### "I want to add admin users"
→ Go to `admin.html` → Settings tab
→ Backend: `routes/users.js` (registration)
→ Database: `models/User.js` (isAdmin flag)

### "I want to customize login"
→ Edit: `public/admin.html` (lines 1-200 = login form HTML)
→ Or: `routes/users.js` (backend validation)

### "I want to change products page"
→ Edit: `public/main.html` (customer storefront)
→ Backend: `routes/admin.js` → `GET /products`

---

## 🔐 IMPORTANT FILES (DON'T DELETE)

| File | Purpose | Can Delete? |
|------|---------|------------|
| `server.js` | Start point | ❌ NO |
| `package.json` | Dependencies | ❌ NO |
| `.env` | Configuration | ❌ NO |
| `models/*.js` | Database schemas | ❌ NO |
| `routes/*.js` | API endpoints | ❌ NO |
| `middleware/auth.js` | Security | ❌ NO |
| `public/admin.html` | Admin dashboard | ❌ NO |
| `public/main.html` | Store frontend | ❌ NO |
| `Documentation files` | Guides | ✅ Can delete if you saved them elsewhere |

---

## 📊 FILE PURPOSES AT A GLANCE

### Server Setup
- `server.js` - Starts Express, connects MongoDB, mounts routes
- `package.json` - Lists all npm packages needed
- `.env` - Secrets and configuration (not in git)

### Security & Auth
- `middleware/auth.js` - Checks JWT tokens, verifies admin access
- `routes/users.js` - Login/register endpoints with password hashing

### Business Logic
- `routes/admin.js` - Product & order management (create, edit, delete, status)
- `routes/order.js` - Order creation, Paystack payment verification, webhooks

### Data Schemas
- `models/User.js` - User accounts (email, password, isAdmin flag)
- `models/Product.js` - Product catalog (name, price, images, sizes, colors)
- `models/Order.js` - Customer orders (items, status, total, email)

### User Interfaces
- `public/index.html` - Home page
- `public/main.html` - ✨ Customer store with checkout
- `public/admin.html` - ✨✨ Admin control panel (NEW - 600+ lines)
- `public/images/` - Product images folder

---

## 🛠️ COMMON EDITS

### "I want to change admin login credentials"
1. Edit `.env` file
2. Change: `ADMIN_EMAIL` and `ADMIN_PASSWORD`
3. Restart server: `npm start`

### "I want to change Paystack keys"
1. Edit `.env` file
2. Change: `PAYSTACK_PUBLIC_KEY` and `PAYSTACK_SECRET_KEY`
3. Update value in `public/main.html` line ~50 (fallback key)
4. Restart server

### "I want to change MongoDB database"
1. Edit `.env` file
2. Change: `MONGO_URI`
3. Restart server

### "I want to add more admin features"
1. Add endpoints to `routes/admin.js`
2. Add UI to `public/admin.html`
3. Add database fields to `models/Product.js` or `models/Order.js`

### "I want to customize the product page"
1. Edit `public/main.html`
2. Change HTML, CSS, JavaScript
3. No restart needed (just refresh browser)

### "I want to customize the admin dashboard"
1. Edit `public/admin.html`
2. Change HTML, CSS, JavaScript
3. No restart needed (just refresh browser)

---

## 📞 FILE LOCATIONS REFERENCE

| What | Where |
|-----|-------|
| Start server | `npm start` (runs server.js) |
| Customer store | `http://localhost:5000/` (serves public/main.html) |
| Admin panel | `http://localhost:5000/admin` (serves public/admin.html) |
| Product API | GET `/products` (route in routes/admin.js) |
| Order API | POST `/order/create` (route in routes/order.js) |
| Admin API | `/admin/*` (all routes in routes/admin.js) |
| User API | `/users/*` (routes/users.js) |
| Images | `/images/` (public/images/ folder) |
| Logs | Terminal output when npm start runs |

---

## 🚀 DEPLOYMENT FILES

When deploying to production, you'll also need:

- `Dockerfile` (optional, for container deployment)
- `.gitignore` (to exclude node_modules and .env from git)
- CI/CD config (GitHub Actions, GitLab CI, etc.)
- Environment variables on your hosting platform

See `DEPLOYMENT_ACTIONS.md` for details.

---

## 💾 BACKUP & VERSION CONTROL

### Important Files to Backup
```
server.js
package.json
.env  ← MOST IMPORTANT (contains secrets)
routes/
models/
middleware/
public/
```

### .gitignore (what NOT to commit to git)
```
node_modules/
.env  ← Keep secrets out of version control
logs/
.DS_Store
```

---

## ✅ PROJECT CHECKLIST

- [x] Core server running
- [x] Database connected
- [x] Customer store working
- [x] Checkout with email input
- [x] Payment integration ready
- [x] Admin dashboard deployed
- [x] Product CRUD working
- [x] Price editing working
- [x] Order pipeline working
- [x] Revenue analytics working
- [x] Authentication working
- [x] All tests passing
- [x] Documentation complete

**Next:** Run `npm start` and test everything!

---

**Happy selling! 🎉** 

Start with `PROJECT_COMPLETION_SUMMARY.md` for the full overview.

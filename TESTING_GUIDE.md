# 🧪 TESTING GUIDE - VERIFY YOUR SYSTEM

Complete this testing checklist to ensure all features are working correctly.

---

## 🚀 PREREQUISITES

### 1. Start the Server
```bash
cd c:\Users\HP USER\Desktop\from
npm start
```

Wait for output:
```
Server running on port 5000
MongoDB connected
Admin account synchronized
```

### 2. Keep Terminal Open
Leave the terminal running while you test. If you close it, the server stops.

---

## ✅ TEST CHECKLIST

### PART 1: CUSTOMER FEATURES (Public)

#### Test 1.1: Browse Products
1. Open browser: `http://localhost:5000/`
2. **Expected:** See product catalog with 6 items
3. **Verify:** Each product shows name, image, price, details, size/color options
4. ✅ **Pass/Fail:** ____

#### Test 1.2: Add to Cart
1. Click "+" button on any product
2. Select size (if available)
3. Select color (if available)
4. Click "Add to Cart"
5. **Expected:** Item appears in cart counter
6. ✅ **Pass/Fail:** ____

#### Test 1.3: View Cart
1. Click cart icon
2. **Expected:** Drawer shows all added items with quantities
3. Verify: Can change quantities, remove items
4. ✅ **Pass/Fail:** ____

#### Test 1.4: Checkout Form - Email Input ✨
1. In cart drawer, scroll down
2. **Expected:** See email input field with placeholder "your@email.com"
3. Enter email: `test@example.com`
4. **Verify:** Email is required and must contain @
5. Try entering invalid email: `notanemail`
6. **Expected:** Alert shows "Valid email required"
7. Enter valid email again: `test@example.com`
8. ✅ **Pass/Fail:** ____

#### Test 1.5: Submit Order (Don't Complete Payment)
1. With valid items and email in cart
2. Click "CHECKOUT WITH PAYSTACK" button
3. **Expected:** Paystack payment modal appears
4. **Note:** Don't complete payment yet (we'll do full test later)
5. Close the modal (click X or ESC)
6. ✅ **Pass/Fail:** ____

---

### PART 2: ADMIN FEATURES (Protected Access)

#### Test 2.1: Admin Panel Access
1. Open browser: `http://localhost:5000/admin`
2. **Expected:** Login page appears with:
   - Left side: Brand messaging, video background
   - Right side: Login form
3. ✅ **Pass/Fail:** ____

#### Test 2.2: Admin Login
1. Enter email: `pmdwears@gmail.com`
2. Enter password: `Ayomide247`
3. Click "LOGIN" button
4. **Expected:** Dashboard appears with 6 tabs visible
5. **Verify:** Can see sidebar with: Overview, Products, Orders, Revenue, CAC, Settings
6. ✅ **Pass/Fail:** ____

#### Test 2.3: Dashboard/Overview Tab
1. Click "Overview" tab (should be active by default)
2. **Expected:** See 4 metric cards:
   - Catalog pieces: (should show 6 or more)
   - Orders received: (should show at least 1 from tests)
   - Paid orders: (should show 0 or more)
   - Total revenue: (should show amount)
3. **Verify:** Activity feed below shows status
4. ✅ **Pass/Fail:** ____

---

### PART 3: PRODUCTS MANAGEMENT

#### Test 3.1: View Products List
1. Click **Products** tab
2. **Expected:** Product grid appears showing 6+ items
3. **Verify:** Each product card shows:
   - Image (60x60px thumbnail)
   - Name
   - Category
   - Detail text
   - Sizes: [S, M, L, XL, etc]
   - Colors: [Black, White, Red, etc]
   - Price (USD)
   - Edit button (green)
   - Delete button (red)
4. ✅ **Pass/Fail:** ____

#### Test 3.2: Search Products
1. In Products tab, use search bar at top
2. Enter: `shirt` (or any product substring)
3. **Expected:** Product list filters to matching items
4. Clear search
5. **Expected:** All products reappear
6. ✅ **Pass/Fail:** ____

#### Test 3.3: Create New Product ✨
1. Click **"New piece"** button
2. **Expected:** Modal form opens with fields:
   - Name (required)
   - Category (required)
   - Price USD (required)
   - Image Path (required)
   - Sizes (optional, comma-separated)
   - Colors (optional, comma-separated)
   - Detail (optional, textarea)
3. Fill in:
   ```
   Name: Test Polo Shirt
   Category: Shirts
   Price USD: 85
   Image Path: /images/test-polo.jpg
   Sizes: S, M, L, XL
   Colors: Red, Blue, White
   Detail: Premium polo shirt, perfect for casual wear
   ```
4. Click **Save**
5. **Expected:** Modal closes, new product appears in list
6. ✅ **Pass/Fail:** ____

#### Test 3.4: Edit Product (Price Change) ✨✨
1. Find the "Test Polo Shirt" product you just created
2. Click **Edit** button (green)
3. **Expected:** Form pre-populates with all current values
4. Change:
   - Price USD: from 85 → 95
   - Detail: Add " (SALE)" to the end
5. Click **Save**
6. **Expected:** Modal closes, product list updates
7. **Verify:** New product now shows Price: 95
8. ✅ **Pass/Fail:** ____

#### Test 3.5: Delete Product
1. Find "Test Polo Shirt" in product list
2. Click **Delete** button (red)
3. **Expected:** Confirmation dialog appears
4. Confirm deletion
5. **Expected:** Product disappears from list
6. ✅ **Pass/Fail:** ____

---

### PART 4: ORDER MANAGEMENT

#### Test 4.1: View Orders
1. Click **Orders** tab
2. **Expected:** Order list appears (may be empty or show test orders)
3. **Verify:** Each order shows:
   - Customer email
   - Order date
   - Items list with quantities and variants
   - Total amount (USD)
   - Status dropdown
4. ✅ **Pass/Fail:** ____

#### Test 4.2: Search Orders by Email
1. In Orders tab, use search bar
2. Enter email: `test@example.com`
3. **Expected:** Orders matching that email appear
4. Clear search
5. **Expected:** All orders reappear
6. ✅ **Pass/Fail:** ____

#### Test 4.3: Update Order Status
1. If no orders exist, go back to customer store and create one:
   - Add item to cart
   - Checkout with email `test2@example.com`
   - Complete Paystack test payment (use card: 4111111111111111, any future date, any CVC)
2. Return to admin Orders tab
3. **Expected:** New order appears with status: "pending" or "paid"
4. Click status dropdown on any order
5. **Expected:** See 6 options: pending, paid, processing, shipped, completed, cancelled
6. Select: **"processing"**
7. **Expected:** Status updates to "processing" immediately
8. Try: **"shipped"**
9. **Expected:** Status updates to "shipped" immediately
10. Try: **"completed"**
11. **Expected:** Status updates to "completed" immediately
12. ✅ **Pass/Fail:** ____

---

### PART 5: REVENUE ANALYTICS

#### Test 5.1: Revenue Dashboard
1. Click **Revenue** tab
2. **Expected:** See 4 metric cards:
   - **Total Revenue:** Sum of paid/completed/shipped order amounts
   - **Completed Orders:** Count of orders with "completed" status
   - **Average Order Value:** Total revenue ÷ completed orders count
   - **Pending Revenue:** Sum of pending/processing order amounts
3. ✅ **Pass/Fail:** ____

#### Test 5.2: Status Breakdown
1. Scroll down on Revenue tab
2. **Expected:** Table appears showing:
   - Order status (pending, paid, processing, shipped, completed, cancelled)
   - Count of orders in each status
   - Total revenue for each status
3. **Verify:** "completed" row shows 1 order and some revenue (from your status update test)
4. ✅ **Pass/Fail:** ____

---

### PART 6: BUSINESS VERIFICATION (CAC)

#### Test 6.1: CAC Tab
1. Click **CAC** tab
2. **Expected:** Form appears with:
   - "CAC Registration Number" input field
   - "Verify" button
3. Enter: `12345678` (test registration number)
4. Click **Verify**
5. **Expected:** Response shows (may error if CAC API not configured)
   - Green success message (if verified)
   - Red error message (if not available/configured)
6. ✅ **Pass/Fail:** ____

---

### PART 7: ADMIN MANAGEMENT

#### Test 7.1: Add Admin User
1. Click **Settings** tab
2. **Expected:** See "Add Admin User" button
3. Click button
4. **Expected:** Modal form opens with:
   - Name field
   - Email field
   - Password field
5. Fill in:
   ```
   Name: Test Admin
   Email: testadmin@example.com
   Password: TestPass123
   ```
6. Click **Create**
7. **Expected:** Modal closes, new admin appears in list
8. ✅ **Pass/Fail:** ____

#### Test 7.2: List Admin Users
1. In Settings tab
2. **Expected:** See list of admin users with:
   - Email addresses
   - "Admin" badge on each
3. Verify your new test admin appears with "Admin" badge
4. ✅ **Pass/Fail:** ____

---

### PART 8: SECURITY & AUTHENTICATION

#### Test 8.1: Protected Routes
1. Close admin browser tab (or open new private window)
2. Try to access: `http://localhost:5000/admin/products`
3. **Expected:** Blank page or error (endpoint requires JWT)
4. ✅ **Pass/Fail:** ____

#### Test 8.2: Invalid Login
1. Go to `http://localhost:5000/admin`
2. Enter email: `wrong@example.com`
3. Enter password: `wrongpassword`
4. Click Login
5. **Expected:** Error message appears (red text below form)
6. ✅ **Pass/Fail:** ____

#### Test 8.3: Session Persistence
1. Log in with correct credentials
2. Refresh page (F5)
3. **Expected:** Dashboard reappears (no login needed)
4. **Verify:** JWT token persisted in browser localStorage
5. Close browser tab completely
6. Open new tab to `http://localhost:5000/admin`
7. **Expected:** Dashboard appears (token still in localStorage)
8. ✅ **Pass/Fail:** ____

---

### PART 9: RESPONSIVE DESIGN

#### Test 9.1: Desktop View (Full Width)
1. Resize browser to full width (1200px+)
2. **Expected:** Admin panel shows:
   - Full sidebar on left (240px)
   - All tabs clearly visible
   - Multi-column grid layouts
3. ✅ **Pass/Fail:** ____

#### Test 9.2: Tablet View (Medium Width)
1. Resize browser to 800-1000px width
2. **Expected:** Layout adjusts:
   - Sidebar still visible
   - Grid changes from 4 columns to 2 columns
   - Responsive spacing maintained
3. ✅ **Pass/Fail:** ____

#### Test 9.3: Mobile View (Small Width)
1. Resize browser to 500px width
2. **Expected:** Layout adjusts:
   - Single column layout
   - Forms stack vertically
   - Readable on small screens
3. ✅ **Pass/Fail:** ____

---

### PART 10: FULL END-TO-END FLOW

#### Test 10.1: Complete Customer → Admin Workflow
1. **As Customer:**
   - Go to `http://localhost:5000/`
   - Add 2 products to cart
   - Enter email: `e2e@test.com`
   - Complete Paystack payment
   - ✓ Order created

2. **As Admin:**
   - Go to `http://localhost:5000/admin`
   - Login with admin credentials
   - Go to Overview tab
   - ✓ Verify new order counted in "Orders received"
   - Go to Orders tab
   - ✓ Find order with email `e2e@test.com`
   - Change status: pending → paid → processing → shipped → completed
   - Go to Revenue tab
   - ✓ Verify order amount appears in "Total Revenue"
   - ✓ Verify order in "Completed Orders" count
   - ✓ Verify average order value calculated
   - ✓ Verify status breakdown table updated

3. **Result:** 
   - ✅ **Pass/Fail:** ____

---

## 📊 TESTING SUMMARY

### Total Tests: 31
- Part 1 (Customer): 5 tests
- Part 2 (Admin): 3 tests
- Part 3 (Products): 5 tests
- Part 4 (Orders): 3 tests
- Part 5 (Revenue): 2 tests
- Part 6 (CAC): 1 test
- Part 7 (Admin Mgmt): 2 tests
- Part 8 (Security): 3 tests
- Part 9 (Responsive): 3 tests
- Part 10 (E2E): 1 test

### Scoring
- **All Pass (31/31):** ✅ PRODUCTION READY
- **95%+ Pass (30/31):** ✅ Ready (minor issue only)
- **90%+ Pass (28/31):** ⚠️ Ready with known issues
- **Below 90%:** ❌ Review failures before production

### Your Score: ___/31 ✅

---

## 🐛 TROUBLESHOOTING

### "Admin login fails"
- Verify credentials: `pmdwears@gmail.com` / `Ayomide247`
- Check server is running (terminal shows "Server running on port 5000")
- Clear browser cookies: Ctrl+Shift+Delete
- Try incognito/private window

### "Products don't appear"
- Refresh page: F5
- Check MongoDB is connected: See "MongoDB connected" in terminal
- Try: `npm start` again to restart server

### "Can't create product"
- Verify you're logged in as admin
- Check all required fields are filled
- Look for red error message in form
- Check browser console: F12 → Console tab for JavaScript errors

### "Order status won't update"
- Verify you're logged in as admin
- Refresh page and try again
- Check browser internet connection
- Try different order or create new test order

### "Paystack payment not working"
- Use test card: `4111111111111111`
- Use any future expiry date
- Use any 3-digit CVC
- Use test email in checkout
- Verify Paystack keys in .env are correct

### "Can't access admin panel"
- Clear cache: Ctrl+Shift+Delete
- Try incognito window
- Check URL is: `http://localhost:5000/admin`
- Verify server running

---

## ✅ WHEN ALL TESTS PASS

Congratulations! Your system is fully functional:

1. ✅ Customers can browse, cart, and checkout
2. ✅ Admins can manage products and prices
3. ✅ Order pipeline works end-to-end
4. ✅ Revenue tracking is accurate
5. ✅ Security is enforced
6. ✅ UI is responsive

**Next Step:** Follow `DEPLOYMENT_ACTIONS.md` to go live! 🚀

---

**Happy Testing!** 🧪

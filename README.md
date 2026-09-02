# PMD Clothing - Minimal Store

Quick setup:

1. Copy `.env.example` to `.env` and set MongoDB Atlas, Paystack, JWT, and initial admin values.
2. Install dependencies and start the server:

```bash
npm init -y
npm install express mongoose body-parser axios cors dotenv
node server.js
```

3. Open http://localhost:5000 in your browser. The entry page loads first; select "Enter the collection" to open the storefront at `/main.html`.

## Admin and payments

- Admin dashboard: http://localhost:5000/admin.html
- Sign in at `http://localhost:5000/admin.html` with `ADMIN_EMAIL` and `ADMIN_PASSWORD`. The dashboard uses the returned JWT bearer token.
- User routes: `POST /users/register`, `POST /users/login`, `GET /users/me`; admin-only user CRUD is available under `/users` with a bearer token.
- Admin product and order CRUD is available under `/admin/products` and `/admin/orders` with a bearer token and an `isAdmin: true` user.
- Configure the Paystack webhook URL as `https://your-domain.com/order/webhook`.
- Paystack webhook signatures are verified with `PAYSTACK_SECRET_KEY`.
- CAC verification is exposed at `/admin/cac/verify` when `CAC_API_URL` and `CAC_API_KEY` are configured for your chosen provider.

## Custom domain

Deploy the Node service to your host, add the custom domain in the host dashboard, then create the DNS record it provides. Use the resulting HTTPS domain for Paystack webhooks and update the Paystack dashboard webhook URL.

Place product images in the `images/` folder. Sample SVGs are provided.

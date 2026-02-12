# PayPal Setup Guide for DigiStore

## Quick Start

Your payment system is ready to use! Here's how to set it up:

## Option 1: Simple PayPal Button (Easiest - No Backend)

### Step 1: Get Your PayPal Email
1. Go to [PayPal.com](https://www.paypal.com)
2. Sign up for a Business account (or use existing)
3. Note your PayPal email address

### Step 2: Update Payment Page
Open `payment.html` and find this line (around line 107):
```html
<input type="hidden" name="business" id="paypal-email" value="your-paypal-email@example.com">
```

Replace `your-paypal-email@example.com` with your actual PayPal email.

### Step 3: Test It!
1. Open `pricing.html` in your browser
2. Click any "Buy Now" button
3. You'll be redirected to the payment page
4. Click "Pay with PayPal"
5. Complete the test transaction

**That's it!** Payments will now go to your PayPal account.

---

## Option 2: Advanced PayPal Integration (Better UX)

For a better user experience with PayPal's modern checkout:

### Step 1: Get PayPal API Credentials
1. Go to [PayPal Developer](https://developer.paypal.com)
2. Log in with your PayPal account
3. Go to "My Apps & Credentials"
4. Create a new app
5. Copy your **Client ID**

### Step 2: Add PayPal SDK
Open `payment.html` and add this before the closing `</head>` tag:

```html
<script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID&currency=USD"></script>
```

Replace `YOUR_CLIENT_ID` with your actual Client ID.

### Step 3: Update Return URLs
In `payment.html`, update these lines (around line 112-113):
```html
<input type="hidden" name="return" value="https://yourwebsite.com/confirmation.html">
<input type="hidden" name="cancel_return" value="https://yourwebsite.com/pricing.html">
```

Replace `yourwebsite.com` with your actual domain.

---

## How It Works

### Payment Flow:
1. **Customer clicks "Buy Now"** → Redirects to `payment.html` with product info
2. **Customer selects payment method** → PayPal, Card, or Crypto
3. **Customer completes payment** → PayPal processes payment
4. **Confirmation page** → Customer sees success message
5. **You receive notification** → PayPal emails you about the sale
6. **Manual delivery** → You send the product key/account to customer's email

---

## Product Delivery

### For Now (Manual):
1. Check your PayPal email for payment notifications
2. Send the product key/account details to the customer's email
3. Keep a record of sales

### Future (Automated):
To automate product delivery, you'll need:
- Backend server (Node.js, PHP, Python)
- Database to store products and orders
- PayPal IPN (Instant Payment Notification) or webhooks
- Email service (SendGrid, Mailgun)

---

## Testing Payments

### PayPal Sandbox (Test Mode):
1. Go to [PayPal Developer](https://developer.paypal.com)
2. Create sandbox test accounts
3. Use sandbox credentials in your code
4. Test payments without real money

### Test Cards (for Stripe):
```
Card Number: 4242 4242 4242 4242
Expiry: Any future date
CVV: Any 3 digits
```

---

## Important Notes

> [!IMPORTANT]
> **Update Your PayPal Email**
> Don't forget to replace `your-paypal-email@example.com` in `payment.html` with your real PayPal email!

> [!WARNING]
> **Manual Product Delivery**
> Currently, you need to manually send products after receiving payment. For automation, you'll need a backend system.

> [!TIP]
> **Start Simple**
> Use Option 1 (Simple PayPal Button) to start selling immediately. Upgrade to Option 2 later for better UX.

---

## Pricing & Fees

### PayPal Fees:
- **Standard**: 2.9% + $0.30 per transaction
- **International**: 4.4% + fixed fee
- **No monthly fees** for basic account

### Example:
- Product price: $35 (Windows 11 Pro)
- PayPal fee: $1.32
- You receive: $33.68

---

## Alternative Payment Gateways

### Razorpay (India/Sri Lanka):
```html
<!-- Add to payment.html -->
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
```

### Stripe:
```html
<!-- Add to payment.html -->
<script src="https://js.stripe.com/v3/"></script>
```

Contact me if you need help setting up these alternatives!

---

## Security Checklist

- ✅ Use HTTPS (SSL certificate) when hosting
- ✅ Never store customer payment details
- ✅ Let PayPal/Stripe handle all payment processing
- ✅ Validate all transactions before delivering products
- ✅ Keep records of all sales

---

## Next Steps

1. **Update PayPal email** in `payment.html`
2. **Test the payment flow** with a small transaction
3. **Set up product delivery** process
4. **Go live!** Start selling

---

## Support

If you need help:
- PayPal Support: https://www.paypal.com/support
- Stripe Support: https://support.stripe.com
- Contact me for technical assistance

---

## Quick Reference

**Files Created:**
- `payment.html` - Checkout page
- `payment.js` - Payment logic
- `confirmation.html` - Success page

**Key URLs:**
- Shop: `pricing.html`
- Checkout: `payment.html?product=NAME&price=PRICE&description=DESC`
- Confirmation: `confirmation.html?order=ID&product=NAME`

**To Update:**
- PayPal email: Line 107 in `payment.html`
- Return URLs: Lines 112-113 in `payment.html`
- Product prices: `pricing.html`

---

Good luck with your DigiStore! 🚀

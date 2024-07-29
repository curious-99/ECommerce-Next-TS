import express from 'express';
import { adminOnly } from '../middlewares/auth.js';
import { allCoupons, applyDiscount, createPaymentIntent, deleteCoupon, newCoupon } from '../controllers/payment.js';

const app = express();


// Using Routes - api/v1/payment
app.post('/coupon/new', newCoupon);
app.post("/create", createPaymentIntent); // Using Routes - api/v1/payment/create
app.get("/discount", applyDiscount); // Using Routes - api/v1/payment/discount
app.get("/coupon/all", allCoupons);  // Using Routes - api/v1/payment/coupon/all
app.delete("/coupon/:id", deleteCoupon); // Using Routes - api/v1/payment/coupon/:id

export default app; 
import express  from "express";
import { connectDB } from "./utils/features.js";
import { errorHandler } from "./middlewares/error.js";
import NodeCache from "node-cache";
import morgan from "morgan";
import * as dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";
import cors from "cors"; 

import userRoute from "./routes/user.js";
import productRoute from "./routes/products.js";
import orderRoute from "./routes/order.js";
import paymentRoute from "./routes/payment.js";
import dashboardRoute from "./routes/stats.js";

const port = process.env.PORT || 4000;
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || "";
connectDB();

export const stripe = new Stripe(stripeSecretKey);
export const myCache = new NodeCache();
 
const app = express();
//Middlewares
app.use(express.json());   
app.use(morgan("dev"));
app.use(cors());

app.get("/", (req, res) => {
  res.send("API Working with /api/v1");
});

// Using Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/order", orderRoute);  
app.use("/api/v1/payment", paymentRoute);
app.use("/api/v1/dashboard", dashboardRoute);

app.use("/uploads", express.static("uploads"));
app.use(errorHandler);

app.listen(port, ()=>{
  console.log(`Server is running on http://localhost:${port}`);
})
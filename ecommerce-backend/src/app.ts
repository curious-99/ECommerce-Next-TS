import express  from "express";
import { connectDB } from "./utils/features.js";
import { errorHandler } from "./middlewares/error.js";

import userRoute from "./routes/user.js";
import productRoute from "./routes/products.js";

const port = 4000;
connectDB();

const app = express();
//Middlewares
app.use(express.json());   

app.get("/", (req, res) => {
  res.send("API Working with /api/v1");
});

// Using Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/products", productRoute);

app.use("/uploads", express.static("uploads"));
app.use(errorHandler);

app.listen(port, ()=>{
  console.log(`Server is running on http://localhost:${port}`);
})
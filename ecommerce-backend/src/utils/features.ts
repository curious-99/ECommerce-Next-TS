import mongoose from "mongoose"
import * as dotenv from "dotenv";
import { InvalidateCacheProps } from "../types/types.js";
import { myCache } from "../app.js";
dotenv.config();

export const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  mongoose.connect(uri,{
    dbName: "Ecommerce_24",
  })
    .then(() => console.log("Database connected"))
    .catch((e:any) => console.log(e, "Database connection failed"))
}

export const invalidatesCache = async ({product,order,admin}: InvalidateCacheProps) => {
  if(product) {
    const productKeys: string[] = [
      "latest-products",
      "all-products",
      "categories"
    ];

    const products = await Product.find().select("_id");
    products.forEach(product => {
      productKeys.push(`product-${product._id}`);
    });
    
    myCache.del("products");
  }
  if(order) myCache.del("orders");
  if(admin) myCache.del("admin");
}
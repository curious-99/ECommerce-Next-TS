import mongoose from "mongoose"
import * as dotenv from "dotenv";
import { InvalidateCacheProps } from "../types/types.js";
import { myCache } from "../app.js";
import { Product } from "../models/product.js";
dotenv.config();

export const connectDB = async () => {
  const uri = process.env.MONGO_URI || "";

  mongoose.connect(uri,{
    dbName: "Ecommerce_24",
  })
    .then(() => console.log("Database connected"))
    .catch((e:any) => console.log(e, "Database connection failed"))
}

export const invalidateCache = async ({product,order,admin,userId,orderId}: InvalidateCacheProps) => {
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
  if (order) {
    const ordersKeys: string[] = [
      "all-orders",
      `my-orders-${userId}`,
      `order-${orderId}`,
    ];

    myCache.del(ordersKeys);
  }
  if(admin) myCache.del("admin");
}

export const reduceStock = async (orderItems: OrderItemType[]) => {
  for (let i = 0; i < orderItems.length; i++) {
    const order = orderItems[i];
    const product = await Product.findById(order.productId);
    if (!product) throw new Error("Product Not Found");
    product.stock -= order.quantity;
    await product.save();
  }
};
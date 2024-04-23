import mongoose from "mongoose"
import * as dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  mongoose.connect(uri,{
    dbName: "Ecommerce_24",
  })
    .then(() => console.log("Database connected"))
    .catch((e:any) => console.log(e, "Database connection failed"))
}
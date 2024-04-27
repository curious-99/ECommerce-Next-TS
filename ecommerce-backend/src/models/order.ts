import mongoose from "mongoose";
 
const schema = new mongoose.Schema({
  name:{
    type:String,
    required: [true,"Name is required"]
  },
  category:{
    type:String,
    required: [true,"Category is required"],
    trim: true,
  },
  price:{
    type:Number,
    required: [true,"Price is required"]
  },
  stock:{
    type:Number,
    required: [true,"Please enter the stock available"]
  },
  photo:{
    type:String,
    required: [true,"Photo is required"]
  },
},{ timestamps: true });


export const Product = mongoose.model("Product", schema);

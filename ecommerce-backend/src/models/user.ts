import mongoose from "mongoose";
import validator from "validator";

interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  photo: string;
  role: "admin" | "user";
  gender: "male" | "female";
  dob: Date;
  createdAt: Date;
  updatedAt: Date;
  age: number;
}

const schema = new mongoose.Schema({
  _id: {type: String, required:[true,"Id is required"]},
  name:{type:String, required:[true,"Photo is required"]},
  email:{
    type:String, 
    unique: [true, "Email already exists"], 
    required:[true,"Photo is required"],
    validate : validator.default.isEmail,
  },
  photo:{type:String, required:[true,"Photo is required"]},
  role:{type:String, enum:["admin","user"],default:"user"},
  gender:{type:String, enum:["male","female"],required:[true, "Gender is required"]},
  dob:{type:Date,required:[true, "DOB is required"]},
}, { timestamps: true });

schema.virtual("age").get(function(){
  const today = new Date();
  const dob = this.dob;

  let age: number = today.getFullYear() - dob.getFullYear();
  const month = today.getMonth() - dob.getMonth();
  if(month<0 || (month ===0 && today.getDate() < dob.getDate())) age --;

  console.log(age)
  return age;
})

export const User = mongoose.model<IUser>("User", schema);

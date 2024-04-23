import { Request, Response, NextFunction } from "express";
import { User } from "../models/user.js";
import { NewUserRequestBody } from "../types/types.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "../middlewares/error.js";

export const newUser = TryCatch(
  async (
    req: Request<{}, {}, NewUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    // throw new ErrorHandler("Internal Server Error", 403);
    const {name,email,photo,gender,_id,dob} = req.body;
    console.log("Request Body:", req.body);

    let user = await User.findById(_id);
    if(user) return res.status(200).json({
      status: "success",
      message: `Welcome back ${user.name}!`
    });

    if(!_id || !name || !email || !photo || !gender || !dob)
      return next(new ErrorHandler("Please fill in all fields", 400));

    user = await User.create({
      name,
      email,
      photo,
      gender,
      _id,
      dob: new Date(dob), 
    });

    return res.status(201).json({
        status: "success",
        message: `Welcome ${user.name}! Your account has been created successfully.`
    });
  } 
);

export const getAllUsers = TryCatch(async (req, res, next) => {
  const users = await User.find({});
  return res.status(200 ).json({
    status: "success",
    message: "All users fetched successfully",
    data: users
  });
});

export const getUser = TryCatch(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);

  if(!user) return next(new ErrorHandler("User not found", 404));

  return res.status(200).json({
    status: "success",
    message: "User fetched successfully",
    data: user
  });
});

export const deleteUser = TryCatch(async (req, res, next) => {
  const id = req.params.id;
  const user = await User.findById(id);

  if(!user) return next(new ErrorHandler("User not found", 404));

  await user.deleteOne();

  return res.status(200).json({
    status: "success",
    message: "User deleted sucessfully"
  });
});
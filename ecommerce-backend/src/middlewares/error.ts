import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/utility-class.js";
import { ControllerType } from "../types/types.js";

export const errorHandler = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  return res.status(err.statusCode).json({
    status: "failed",
    message: err.message,
  });
};

export const TryCatch = (func: ControllerType) => 
  (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(func(req,res,next)).catch(next);
  }

 
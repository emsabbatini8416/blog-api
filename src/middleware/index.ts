import { NextFunction, Request, Response } from "express";
import { config } from "dotenv";
import CustomAPIError from "../errors/custom.errors";

config();

export function notFoundMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const defaultError = {
    statusCode: 500,
    msg: "Something went wrong, try again later",
  };

  if (err instanceof CustomAPIError) {
    return res
      .status(err.statusCode)
      .json({ message: err.message, success: false });
  }

  res
    .status(defaultError.statusCode)
    .json({ message: defaultError.msg, success: false });
};

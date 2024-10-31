import { NextFunction, Request, Response } from "express";
import { config } from "dotenv";

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

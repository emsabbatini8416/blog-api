import { NextFunction, Request, Response } from "express";

import Item from "../models/item.model";
import CustomAPIError, { ErrorCode } from "../errors/custom.errors";
import { InternalSeverError } from "../errors";

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const docs = await Item.find();
    res.status(200).json({ items: docs, success: true });
  } catch (error) {
    if (!(error instanceof CustomAPIError)) {
      next(
        new InternalSeverError(
          "Failed to fetch items",
          ErrorCode.INTERNAL_SERVER,
        ),
      );
    }
    next(error);
  }
};

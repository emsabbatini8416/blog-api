import { NextFunction, Request, Response } from "express";

import type { ISurvivor } from "../interface/survivor.interface";

import Survivor from "../models/survivor.model";
import CustomAPIError, { ErrorCode } from "../errors/custom.errors";
import { InternalSeverError } from "../errors";

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const docs = await Survivor.find();

    res.status(200).json({ data: { items: docs }, success: true });
  } catch (error) {
    if (!(error instanceof CustomAPIError)) {
      next(
        new InternalSeverError(
          "Failed to fetch survivors",
          ErrorCode.INTERNAL_SERVER,
        ),
      );
    }
    next(error);
  }
};

export const createSurvivor = async (
  req: Request<{}, {}, ISurvivor>,
  res: Response,
  next: NextFunction,
) => {
  const payload = req.body;

  try {
    const newSurvivor = new Survivor(payload);

    await newSurvivor.save();

    res
      .status(201)
      .json({ message: "Survivor created successfully", success: true });
  } catch (error) {
    if (!(error instanceof CustomAPIError)) {
      next(
        new InternalSeverError(
          "Failed to create a survivor",
          ErrorCode.INTERNAL_SERVER,
        ),
      );
    }
    next(error);
  }
};

export const updateSurvivor = async (
  req: Request<{ id: string }, {}, ISurvivor>,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;

  const payload = req.body;

  try {
    await Survivor.findByIdAndUpdate(id, payload, { new: true });

    res
      .status(202)
      .json({ message: "Survivor updated successfully", success: true });
  } catch (error) {
    if (!(error instanceof CustomAPIError)) {
      next(
        new InternalSeverError(
          "Failed to update a survivor",
          ErrorCode.INTERNAL_SERVER,
        ),
      );
    }
    next(error);
  }
};

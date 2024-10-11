import { NextFunction, Request, Response } from "express";

import Survivor from "../models/survivor.model";
import Report from "../models/report.model";
import Item from "../models/item.model";
import { InternalSeverError } from "../errors";
import CustomAPIError, { ErrorCode } from "../errors/custom.errors";

export const getReport = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const all = await Survivor.countDocuments({});
    const infected = await Survivor.countDocuments({ infected: true });
    const nonInfected = all - infected;

    const inventoryResult = await Report.aggregate([
      {
        $unwind: "$itemId",
      },
      {
        $group: {
          _id: "$itemId",
          count: { $sum: "$quantity" },
        },
      },
    ]);

    const inventoryPopulated: any = await Item.populate(inventoryResult, {
      path: "_id",
    });

    res.status(200).json({
      data: {
        survivors: {
          all,
          infected,
          nonInfected,
        },
        items: {
          ...inventoryPopulated.reduce(
            (acc, curr) => ({ ...acc, [curr._id.name]: curr.count }),
            {},
          ),
        },
      },
      success: true,
    });
  } catch (error) {
    if (!(error instanceof CustomAPIError)) {
      next(
        new InternalSeverError(
          "Failed to fetch report",
          ErrorCode.INTERNAL_SERVER,
        ),
      );
    }
    next(error);
  }
};

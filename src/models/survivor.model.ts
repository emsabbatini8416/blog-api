import { Schema, model } from "mongoose";
import type { ISurvivor } from "../interface/survivor.interface";
import type { IInventory } from "../interface/inventory.interface";
import { NextFunction } from "express";

import Report from "./report.model";

const inventorySchema = new Schema<IInventory>(
  {
    itemId: { type: Schema.Types.ObjectId, ref: "Item" },
    quantity: { type: Number },
  },
  { _id: false },
);

const survivorSchema = new Schema<ISurvivor>(
  {
    name: {
      type: String,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
    },
    lastPosition: {
      type: [Number],
    },
    inventory: {
      type: [inventorySchema],
    },
    infected: {
      type: Boolean,
    },
  },
  { timestamps: true },
);

survivorSchema.post("save", async function (doc, next: NextFunction) {
  const reports = doc.inventory.map((inventory) => ({
    itemId: inventory.itemId,
    quantity: inventory.quantity,
  }));
  await Report.create(reports);
  next();
});

export default model<ISurvivor>("Survivor", survivorSchema);

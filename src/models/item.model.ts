import { Schema, model } from "mongoose";
import { IItem } from "../interface/item.interface";

const itemSchema = new Schema<IItem>(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true },
);
export default model<IItem>("Item", itemSchema);

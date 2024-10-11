import { Document, Schema } from "mongoose";

export interface IInventory extends Document {
  itemId: Schema.Types.ObjectId;
  quantity: number;
}

import { Document } from "mongoose";
import type { IItem } from "./item.interface";

export interface ISurvivor extends Document {
  name: string;
  age: number;
  gender: string;
  lastPosition: number[];
  inventory: { itemId: IItem["_id"]; quantity: number }[];
  infected: boolean;
}

import { Document } from "mongoose";

export interface IItem extends Document {
  name: string;
  description: string;
}

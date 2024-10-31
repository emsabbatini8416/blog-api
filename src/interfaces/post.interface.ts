import { Document } from "mongoose";

export interface IPost extends Document {
  title: string;
  content: string;
  user: string;
  createdAt?: Date;
}

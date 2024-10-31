import { Document, Schema } from "mongoose";

export interface IComment extends Document {
  postId: Schema.Types.ObjectId;
  content: string;
  user: string;
  createdAt?: Date;
}

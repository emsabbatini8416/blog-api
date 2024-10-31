import mongoose, { Schema } from "mongoose";
import type { IComment } from "../interfaces";

const commentSchema = new Schema<IComment>({
  postId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  content: { type: String, required: true },
  user: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Comment = mongoose.model<IComment>("Comment", commentSchema);

export default Comment;

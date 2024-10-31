import mongoose, { Schema } from "mongoose";
import type { IPost } from "../interfaces";

const postSchema = new Schema<IPost>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  user: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Post = mongoose.model<IPost>("Post", postSchema);

export default Post;

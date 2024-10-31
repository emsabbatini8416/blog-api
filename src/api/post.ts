import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/post.controller";
import {
  createCommentByPostId,
  deleteCommentByPostId,
  getCommentsByPostId,
  updateCommentByPostId,
} from "../controllers/comment.controller";

const router = express.Router();

//POSTS
router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);
//COMMENTS BY POST
router.get("/:idPost/comments", getCommentsByPostId);
router.post("/:idPost/comments", createCommentByPostId);
router.patch("/:idPost/comments/:idComment", updateCommentByPostId);
router.delete("/:idPost/comments/:idComment", deleteCommentByPostId);

export default router;

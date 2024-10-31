import { Request, Response } from "express";
import Comment from "../models/comment.model";

export const getCommentsByPostId = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const skip = (page - 1) * limit;

    const comments = await Comment.find({ postId: postId })
      .skip(skip)
      .limit(limit);

    const totalComments = await Comment.countDocuments({ postId: postId });

    const totalPages = Math.ceil(totalComments / limit);

    res.status(200).json({
      totalComments,
      totalPages,
      currentPage: page,
      comments,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCommentByPostId = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { content, user } = req.body;
    const newComment = new Comment({ postId, content, user });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCommentByPostId = async (req: Request, res: Response) => {
  try {
    const { idPost, idComment } = req.params;
    const updates = req.body;

    const updatedComment = await Comment.findByIdAndUpdate(
      idComment,
      { ...updates, idPost },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCommentByPostId = async (req: Request, res: Response) => {
  try {
    const { idComment } = req.params;

    const deletedComment = await Comment.findByIdAndDelete(idComment);

    if (!deletedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

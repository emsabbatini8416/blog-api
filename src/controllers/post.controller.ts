import { Request, Response } from "express";
import Post from "../models/post.model";

export const getPost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const postWithComments = await Post.aggregate([
      {
        $match: { $expr: { $eq: ["$_id", { $toObjectId: id }] } },
      },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "postId",
          as: "comments",
        },
      },
    ]);

    if (!postWithComments[0]) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(postWithComments[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPosts = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const skip = (page - 1) * limit;

    const postsWithCommentsCount = await Post.aggregate([
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "postId",
          as: "commentsCount",
        },
      },
      {
        $project: {
          title: 1,
          content: 1,
          user: 1,
          createdAt: 1,
          commentsCount: { $size: "$commentsCount" },
        },
      },
      {
        $facet: {
          posts: [{ $skip: skip }, { $limit: limit }],
          totalCount: [{ $count: "count" }],
        },
      },
    ]);

    res.status(200).json({
      totalPosts: postsWithCommentsCount[0].totalCount[0]?.count,
      totalPages: Math.ceil(
        postsWithCommentsCount[0].totalCount[0]?.count || 0 / limit,
      ),
      currentPage: page,
      posts: postsWithCommentsCount[0].posts,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, user } = req.body;
    const newPost = new Post({ title, content, user });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedPost = await Post.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

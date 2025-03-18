import { Request, Response } from "express";
import { postModel } from "../models/post.model";
import { Post } from "../types/post";

const createPost = (req: Request<{}, {}, Omit<Post, 'id' | 'createdAt' | 'updatedAt'>>, res: Response) => {
  const { title, content, imageUrl } = req.body;
  const newPost = postModel.createPost({ title, content, imageUrl });
  res.status(201).json(newPost);
};

const updatePost = (req: Request<{ id: string }, {}, Partial<Omit<Post, 'id' | 'createdAt' | 'updatedAt'>>>, res: Response) => {
  const { id } = req.params;
  const updatedPost = postModel.updatePost(id, req.body);
  if (!updatedPost) {
    res.status(404).json({ message: 'Post not found' });
    return;
  }
  res.status(200).json(updatedPost);
};

const deletePost = (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const success = postModel.deletePost(id);
  if (!success) {
    res.status(404).json({ message: 'Post not found' });
    return;
  }
  res.status(200).json({ message: 'Post deleted' });
};

const getPosts = (req: Request, res: Response) => {
  const posts = postModel.getPosts();
  res.status(200).json(posts);
};

const getPostById = (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const post = postModel.getPostById(id);
  if (!post) {
    res.status(404).json({ message: 'Post not found' });
    return;
  }
  res.status(200).json(post);
};

export default {
  createPost,
  updatePost,
  deletePost,
  getPosts,
  getPostById,
};
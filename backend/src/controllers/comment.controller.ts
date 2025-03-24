import { Request, Response } from "express";
import { Comment } from "../types/comment";
import { commentModel } from "../models/comment.model";

const createComment = (req: Request<{}, {}, Omit<Comment, 'id' | 'createdAt' | 'updatedAt'>>, res: Response) => {
  const { postId, username, content } = req.body;
  const newComment = commentModel.createComment({ postId, username, content });
  res.status(201).json(newComment);
};

const updateComment = (req: Request<{ id: string }, {}, Partial<Omit<Comment, 'id' | 'createdAt' | 'updatedAt'>>>, res: Response) => {
  const { id } = req.params;
  const updatedComment = commentModel.updateComment(id, req.body);
  if (!updatedComment) {
    res.status(404).json({ message: 'Comment not found' });
    return;
  }
  res.status(200).json(updatedComment);
};

const deleteComment = (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const success = commentModel.deleteComment(id);
  if (!success) {
    res.status(404).json({ message: 'Comment not found' });
    return;
  }
  res.status(200).json({ message: 'Comment deleted' });
};

const getComments = (req: Request, res: Response) => {
  // パスパラメータのpostIdを取得
  const { postId } = req.params;
  const comments = commentModel.getComments(postId as string);
  res.status(200).json(comments);
};

export default {
  createComment,
  updateComment,
  deleteComment,
  getComments,
};
import { Comment } from "../types/comment";
import { v4 as uuidv4 } from 'uuid';

let comments: Comment[] = [];

export const commentModel = {
  createComment: (comment: Omit<Comment, 'id' | 'createdAt' | 'updatedAt'>): Comment => {
    const newComment: Comment = {
      ...comment,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    comments.push(newComment);
    return newComment;
  },

  updateComment: (id: string, comment: Partial<Omit<Comment, 'id' | 'createdAt' | 'updatedAt'>>): Comment | null => {
    const index = comments.findIndex(p => p.id === id);
    if (index === -1) return null;
    comments[index] = { ...comments[index], ...comment, updatedAt: new Date().toISOString() };
    return comments[index];
  },

  deleteComment: (id: string): boolean => {
    const index = comments.findIndex(p => p.id === id);
    if (index === -1) return false;
    comments.splice(index, 1);
    return true;
  },

  getComments: (postId: string): Comment[] => {
    return comments.filter(comment => comment.postId === postId)
  },
};
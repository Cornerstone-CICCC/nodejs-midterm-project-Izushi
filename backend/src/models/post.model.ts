import { Post } from "../types/post";

let posts: Post[] = [];

export const postModel = {
  createPost: (post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Post => {
    const newPost: Post = {
      ...post,
      id: (posts.length + 1).toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    posts.push(newPost);
    return newPost;
  },

  updatePost: (id: string, post: Partial<Omit<Post, 'id' | 'createdAt' | 'updatedAt'>>): Post | null => {
    const index = posts.findIndex(p => p.id === id);
    if (index === -1) return null;
    posts[index] = { ...posts[index], ...post, updatedAt: new Date().toISOString() };
    return posts[index];
  },

  deletePost: (id: string): boolean => {
    const index = posts.findIndex(p => p.id === id);
    if (index === -1) return false;
    posts.splice(index, 1);
    return true;
  },

  getPosts: (): Post[] => {
    return posts;
  },

  getPostById: (id: string): Post | null => {
    return posts.find(p => p.id === id) || null;
  }
};
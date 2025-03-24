"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const post_model_1 = require("../models/post.model");
const createPost = (req, res) => {
    const { title, content, imageUrl } = req.body;
    const newPost = post_model_1.postModel.createPost({ title, content, imageUrl });
    res.status(201).json(newPost);
};
const updatePost = (req, res) => {
    const { id } = req.params;
    const updatedPost = post_model_1.postModel.updatePost(id, req.body);
    if (!updatedPost) {
        res.status(404).json({ message: 'Post not found' });
        return;
    }
    res.status(200).json(updatedPost);
};
const deletePost = (req, res) => {
    const { id } = req.params;
    const success = post_model_1.postModel.deletePost(id);
    if (!success) {
        res.status(404).json({ message: 'Post not found' });
        return;
    }
    res.status(200).json({ message: 'Post deleted' });
};
const getPosts = (req, res) => {
    const posts = post_model_1.postModel.getPosts();
    res.status(200).json(posts);
};
const getPostById = (req, res) => {
    const { id } = req.params;
    const post = post_model_1.postModel.getPostById(id);
    if (!post) {
        res.status(404).json({ message: 'Post not found' });
        return;
    }
    res.status(200).json(post);
};
exports.default = {
    createPost,
    updatePost,
    deletePost,
    getPosts,
    getPostById,
};

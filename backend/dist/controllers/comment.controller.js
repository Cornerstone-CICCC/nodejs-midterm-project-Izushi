"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const comment_model_1 = require("../models/comment.model");
const createComment = (req, res) => {
    const { postId, username, content } = req.body;
    const newComment = comment_model_1.commentModel.createComment({ postId, username, content });
    res.status(201).json(newComment);
};
const updateComment = (req, res) => {
    const { id } = req.params;
    const updatedComment = comment_model_1.commentModel.updateComment(id, req.body);
    if (!updatedComment) {
        res.status(404).json({ message: 'Comment not found' });
        return;
    }
    res.status(200).json(updatedComment);
};
const deleteComment = (req, res) => {
    const { id } = req.params;
    const success = comment_model_1.commentModel.deleteComment(id);
    if (!success) {
        res.status(404).json({ message: 'Comment not found' });
        return;
    }
    res.status(200).json({ message: 'Comment deleted' });
};
const getComments = (req, res) => {
    // パスパラメータのpostIdを取得
    const { postId } = req.params;
    const comments = comment_model_1.commentModel.getComments(postId);
    res.status(200).json(comments);
};
exports.default = {
    createComment,
    updateComment,
    deleteComment,
    getComments,
};

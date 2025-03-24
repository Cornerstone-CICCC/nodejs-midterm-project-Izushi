"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentModel = void 0;
const uuid_1 = require("uuid");
let comments = [];
exports.commentModel = {
    createComment: (comment) => {
        const newComment = Object.assign(Object.assign({}, comment), { id: (0, uuid_1.v4)(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
        comments.push(newComment);
        return newComment;
    },
    updateComment: (id, comment) => {
        const index = comments.findIndex(p => p.id === id);
        if (index === -1)
            return null;
        comments[index] = Object.assign(Object.assign(Object.assign({}, comments[index]), comment), { updatedAt: new Date().toISOString() });
        return comments[index];
    },
    deleteComment: (id) => {
        const index = comments.findIndex(p => p.id === id);
        if (index === -1)
            return false;
        comments.splice(index, 1);
        return true;
    },
    getComments: (postId) => {
        return comments.filter(comment => comment.postId === postId);
    },
};

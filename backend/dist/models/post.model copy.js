"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postModel = void 0;
let posts = [];
exports.postModel = {
    createPost: (post) => {
        const newPost = Object.assign(Object.assign({}, post), { id: (posts.length + 1).toString(), createdAt: new Date(), updatedAt: new Date() });
        posts.push(newPost);
        return newPost;
    },
    updatePost: (id, post) => {
        const index = posts.findIndex(p => p.id === id);
        if (index === -1)
            return null;
        posts[index] = Object.assign(Object.assign(Object.assign({}, posts[index]), post), { updatedAt: new Date() });
        return posts[index];
    },
    deletePost: (id) => {
        const index = posts.findIndex(p => p.id === id);
        if (index === -1)
            return false;
        posts.splice(index, 1);
        return true;
    },
    getPosts: () => {
        return posts;
    },
    getPostById: (id) => {
        return posts.find(p => p.id === id) || null;
    }
};

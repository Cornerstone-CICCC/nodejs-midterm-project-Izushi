"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controller_1 = __importDefault(require("../controllers/post.controller"));
const postRouter = (0, express_1.Router)();
postRouter.post('/posts', post_controller_1.default.createPost);
postRouter.put('/posts/:id', post_controller_1.default.updatePost);
postRouter.delete('/posts/:id', post_controller_1.default.deletePost);
postRouter.get('/posts', post_controller_1.default.getPosts);
postRouter.get('/posts/:id', post_controller_1.default.getPostById);
exports.default = postRouter;

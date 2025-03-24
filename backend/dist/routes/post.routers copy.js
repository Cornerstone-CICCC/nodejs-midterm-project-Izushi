"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controller_1 = __importDefault(require("../controllers/post.controller"));
const postRouter = (0, express_1.Router)();
postRouter.post('/', post_controller_1.default.createPost);
postRouter.put('/:id', post_controller_1.default.updatePost);
postRouter.delete('/:id', post_controller_1.default.deletePost);
postRouter.get('/', post_controller_1.default.getPosts);
postRouter.get('/:id', post_controller_1.default.getPostById);
exports.default = postRouter;

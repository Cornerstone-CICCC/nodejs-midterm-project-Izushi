"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comment_controller_1 = __importDefault(require("../controllers/comment.controller"));
const commentRouter = (0, express_1.Router)();
commentRouter.post('/', comment_controller_1.default.createComment);
commentRouter.put('/:id', comment_controller_1.default.updateComment);
commentRouter.delete('/:id', comment_controller_1.default.deleteComment);
commentRouter.get('/:postId', comment_controller_1.default.getComments);
exports.default = commentRouter;

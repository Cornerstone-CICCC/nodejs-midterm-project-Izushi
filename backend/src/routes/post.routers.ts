import { Router } from "express";
import postController from "../controllers/post.controller";

const postRouter = Router();

postRouter.post('/posts', postController.createPost);
postRouter.put('/posts/:id', postController.updatePost);
postRouter.delete('/posts/:id', postController.deletePost);
postRouter.get('/posts', postController.getPosts);
postRouter.get('/posts/:id', postController.getPostById);

export default postRouter;
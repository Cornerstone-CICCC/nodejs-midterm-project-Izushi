import { Router } from "express";
import postController from "../controllers/post.controller";
import { checkLoggedIn } from "../middleware/auth.middleware";

const postRouter = Router();

postRouter.post('/', postController.createPost);
postRouter.put('/:id', postController.updatePost);
postRouter.delete('/:id', postController.deletePost);
postRouter.get('/', postController.getPosts);
postRouter.get('/:id', postController.getPostById);

export default postRouter;
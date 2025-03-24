import { Router } from "express";
import commentController from "../controllers/comment.controller";
import { checkLoggedIn } from "../middleware/auth.middleware";

const commentRouter = Router();

commentRouter.post('/', commentController.createComment);
commentRouter.put('/:id', commentController.updateComment);
commentRouter.delete('/:id', commentController.deleteComment);
commentRouter.get('/:postId', commentController.getComments);

export default commentRouter;
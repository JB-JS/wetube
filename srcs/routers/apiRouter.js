import express from "express";
import routes from "../routes";
import {
  postRegisterView,
  postAddComment,
  deleteComment
} from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, postRegisterView);
apiRouter.post("/:id/comment", postAddComment);
apiRouter.post("/:id/delete", deleteComment);

export default apiRouter;

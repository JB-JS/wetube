import express from "express";
import {
  editProfile,
  myProfile,
  postEditProfile,
  changePassword,
  postChangePassword,
  publicProfile
} from "../controllers/userController";
import routes from "../routes.js";
import { onlyPrivate, uploadAvatar } from "../middlewares";

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, editProfile);
userRouter.post(routes.editProfile, onlyPrivate, uploadAvatar, postEditProfile);
userRouter.get(routes.changePassword, onlyPrivate, changePassword);
userRouter.post(routes.changePassword, onlyPrivate, postChangePassword);
userRouter.get("/myProfile", onlyPrivate, myProfile);
userRouter.get("/:id", publicProfile);

export default userRouter;

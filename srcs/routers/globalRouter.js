import express from "express";
import routes from "../routes";
import { home, search, videoDetail } from "../controllers/videoController";
import {
  getjoin,
  postJoin,
  getlogin,
  postLogin,
  logout,
  githubLogin,
  postGithubLogin
} from "../controllers/userController";
import { onlyPublic, onlyPrivate, uploadAvatar } from "../middlewares";
import passport from "passport";

// 요청 라우팅하기
const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);

globalRouter.get(routes.join, onlyPublic, getjoin);
globalRouter.post(routes.join, uploadAvatar, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getlogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.videoDetail(), videoDetail);

globalRouter.get(routes.github, githubLogin);
globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", { failureRedirect: "/login" }),
  postGithubLogin
);

export default globalRouter;

import passport from "passport";
import GitHubStrategy from "passport-github";
import User from "./models/User";
import routes from "./routes";
import { githubLoginCallback } from "./controllers/userController";
import dotenv from "dotenv";

dotenv.config();

passport.use(User.createStrategy());

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`
    },
    githubLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

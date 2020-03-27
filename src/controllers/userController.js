import routes from "../routes";
import User from "../models/User";
import passport from "passport";

export const getjoin = (req, res) => {
  res.render("join");
};

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
    file
  } = req;

  if (password !== password2) {
    req.flash("error", "password don't match");
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({
        name,
        email,
        avatarUrl: file.path.replace("build/", "../")
      });
      await User.register(user, password);
      next();
    } catch (error) {
      res.redirect(routes.home);
    }
  }
};

export const getlogin = (req, res) => res.render("login");

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
  successFlash: "Welcome",
  failureFlash: "Can't log in. Check email and/or password"
});

export const githubLogin = passport.authenticate("github", {
  successFlash: "Welcome",
  failureFlash: "Can't log in at this time"
});

export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, avatar_url, name, email }
  } = profile;

  const user = await User.findOne({ email });

  try {
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    } else {
      const newUser = await User.create({
        avatar_url: avatar_url,
        email,
        name,
        githubId: id
      });

      return cb(null, newUser);
    }
  } catch (err) {
    return cb(err);
  }
};

export const postGithubLogin = (req, res) => res.redirect(routes.home);

export const logout = (req, res) => {
  req.flash("info", "Logged out, see you later");
  req.logout();
  res.redirect(routes.home);
};

// GET /users/myprofile
export const myProfile = async (req, res) => {
  const user = await User.findById(req.user).populate("videos");
  res.render("userDetail", { pageTitle: "User Detail", user });
};

// GET /users/:id
export const publicProfile = async (req, res) => {
  const {
    params: { id }
  } = req;

  const user = await User.findById(id).populate("videos");

  res.render("userDetail", { pageTitle: "user Profile", user });
};

// GET /users/editProfile
export const editProfile = (req, res) => res.render("editProfile");

// POST /users/editProfile
export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file
  } = req;
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.path : req.user.avatarUrl
    });
    req.flash("success", "Profile updated");
    res.redirect("/users/myprofile");
  } catch (err) {
    req.flash("error", "Can't update profile");
    res.redirect(`/users${routes.editProfile}`);
  }
};

export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "changePassword" });

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 }
  } = req;
  try {
    if (newPassword !== newPassword1) {
      req.flash("error", "Passwords don't match");
      res.status(400);
      res.redirect(`/users${routes.changePassword}`);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(`/users/myProfile`);
  } catch (err) {
    req.flash("error", "Can't change password");
    res.status(400);
    res.redirect(`/users${routes.changePassword}`);
  }
};

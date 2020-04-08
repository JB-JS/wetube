// Global

const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

// Users

const USERS = "/users";
// const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/editProfile";
const CHANGE_PASSWORD = "/changePassword";
const USER_PROFILE = "/myProfile";

// videos

const VIDEOS = "/videos";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";

// Github

const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";

// API

const API = "/api";
const REGISTER_VIEW = "/:id/view";

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  // userDetail: (id) => {
  //     if (id) {
  //         return `/users/${id}`;
  //     } else {
  //         return USER_DETAIL;
  //     }
  // },
  userProfile: (id = null, loggedId = 0) =>
    id === loggedId ? USER_PROFILE : `/${id}`,
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  videos: VIDEOS,
  upload: UPLOAD,
  videoDetail: id => {
    if (id) {
      return `/${id}`;
    } else {
      return VIDEO_DETAIL;
    }
  },
  editVideo: videoId => (videoId ? `/videos/${videoId}/edit` : EDIT_VIDEO),
  deleteVideo: deleteId =>
    deleteId ? `/videos/${deleteId}/delete` : DELETE_VIDEO,
  github: GITHUB,
  githubCallback: GITHUB_CALLBACK,
  api: API,
  registerView: REGISTER_VIEW
};

export default routes;

import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";

export const home = async (req, res) => {
  const videos = await Video.find({}).sort({ _id: -1 });
  res.render("home", { videos });
};

export const search = async (req, res) => {
  const {
    query: { term: searchingBy }
  } = req;

  let videos = [];

  videos = await Video.find({ title: { $regex: searchingBy, $options: "i" } });

  res.render("search", { searchingBy, videos });
};
export const videos = (req, res) => res.render("videos");
export const getUpload = (req, res) => res.render("upload");
export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path }
  } = req;

  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
    creator: req.user.id
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id }
  } = req;

  const video = await Video.findById(id)
    .populate("creator")
    .populate("comments");

  res.render("videoDetail", { video });
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id }
  } = req;

  const video = await Video.findById(id);

  if (String(video.creator) !== req.user.id) {
    throw Error();
  } else {
    res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description }
  } = req;

  await Video.findOneAndUpdate({ _id: id }, { title, description });

  res.redirect(routes.videoDetail(id));
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id }
  } = req;

  const video = await Video.findById(id);

  if (String(video.creator) !== req.user.id) {
    throw Error();
  } else {
    // 참조 삭제 비디오를 삭제하면 그비디오의 아이디를 가지고있는 모든 댓글 삭제
    await Video.findOneAndRemove({ _id: id });
    await Comment.findOneAndRemove({ videos: id });
  }

  res.redirect(routes.home);
};

export const deleteComment = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    await Comment.findByIdAndRemove(id).populate("videos");
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { text },
    user
  } = req;

  try {
    const video = await Video.findById(id);
    const comment = await Comment.create({
      text,
      creator: user.id
    });

    comment.videos.push(id);
    comment.save();
    video.comments.push(comment.id);
    video.save();
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const postRegisterView = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    const video = await Video.findById(id);

    video.views += 1;
    video.save();
    res.status = 200;
  } catch (error) {
    res.status = 400;
  } finally {
    res.end();
  }
};

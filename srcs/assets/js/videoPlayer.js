const video = document.querySelector(
  ".video-detail__container .video__player video"
);

const registerView = () => {
  const videoId = window.location.href.split("4000")[1];
  fetch(`/api${videoId}/view`, {
    method: "POST"
  });
};

const init = () => {
  video.addEventListener("ended", registerView);
};

if (video) window.onload = init;

import axios from "axios";

const addCommentForm = document.getElementById("comment-form");
const commentList = document.getElementById("list");
const zero = document.querySelector(".zero");
const cds = document.querySelectorAll(".comment-delete");
const vc = document.querySelector(".video__comments");
const videoId = window.location.href.split("4000")[1];

let commentCnt = document.getElementById("commentCnt");

const sendComment = async text => {
  const response = await axios({
    url: `/api${videoId}/comment`,
    method: "POST",
    data: {
      text
    }
  });

  if (response.status === 200) addRealTimeComment(text);
};

const addRealTimeComment = text => {
  const div = document.createElement("div");
  const h1 = document.createElement("h1");
  div.className = "content";
  h1.innerHTML = text;
  div.appendChild(h1);
  commentList.prepend(div);
  commentCnt.innerHTML = ++commentCnt.innerHTML;

  if (zero) zero.style.display = "none";
};

const deleteRealTimeComment = el => {
  el.parentNode.remove();
  commentCnt.innerHTML = --commentCnt.innerHTML;
  const p = document.createElement("p");
  p.className = "zero";
  p.innerHTML = "You first comment write";
  if (+commentCnt.innerHTML === 0) vc.appendChild(p);
};

const handleClick = async function() {
  const res = await axios({
    url: `/api/${this.dataset.id}/delete`,
    method: "POST"
  });

  if (res.status === 200) deleteRealTimeComment(this);
};

const handleSubmit = e => {
  e.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const commentValue = commentInput.value;
  sendComment(commentValue);
  commentInput.value = "";
};

const init = () => {
  cds.forEach(el => el.addEventListener("click", handleClick));

  addCommentForm.addEventListener("submit", handleSubmit);
};

if (addCommentForm) init();

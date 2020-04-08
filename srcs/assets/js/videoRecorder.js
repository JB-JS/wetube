const recoder = document.querySelector(".record"),
  recordBtn = document.querySelector(".record button"),
  video = document.querySelector(".record video");

let videoRecorder;

const downloadVideo = e => {
  const { data: videoFile } = e;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(videoFile);
  link.download = "recorded.webm";
  document.body.appendChild(link);
  link.click();
};

const stopRecording = () => {
  videoRecorder.stop();
};

const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true
    });
    video.srcObject = stream;
    video.play();

    videoRecorder = new MediaRecorder(stream);
    videoRecorder.strat();
    videoRecorder.addEventListener("dataavailable", downloadVideo);
  } catch (err) {
    recordBtn.innerHTML = "Can not Recording";
    recordBtn.removeEventListener("click", toggleState);
  }
};

const toggleState = function() {
  this.classList.toggle("on");
  if (this.className) {
    recordBtn.innerHTML = "stop Recording";
    startRecording();
  } else {
    recordBtn.innerHTML = "start Recording";
    stopRecording();
  }
};

if (video) {
  window.onload = () => {
    recordBtn.addEventListener("click", toggleState);
  };
}

let player = document.querySelector(".player");
let video = player.querySelector("video");
//
let player__controls = player.querySelector(".player__controls");
let progress = player__controls.querySelector(".progress");
let progress__filled = progress.querySelector(".progress__filled");
//
let toggle = player__controls.querySelector(".toggle");
let skipbuttons = player__controls.querySelectorAll("[data-skip]");
let range = player__controls.querySelectorAll(".player__slider");
//
let fullscreen = player__controls.querySelector(".fullscreen");

//play and pause button
let toggleplay = () => {
  if (video.paused) {
    video.play();
    toggle.innerHTML = `▶`;
  } else {
    video.pause();
    toggle.innerHTML = `⏸`;
  }
};
toggle.addEventListener("click", toggleplay);
video.addEventListener("click", toggleplay);

//skipping buttons
function skipvid() {
  video.currentTime += parseFloat(this.dataset.skip);
}
skipbuttons.forEach((e) => e.addEventListener("click", skipvid));

//progress Bar
function progressbar() {
  const percent = (video.currentTime / video.duration) * 100;
  progress__filled.style.flexBasis = `${percent}%`;
}
video.addEventListener("timeupdate", progressbar);

//movevideo
function movevideo(e) {
  const percent = (e.offsetX / 640) * 100;
  video.currentTime = (video.duration * e.offsetX) / 640;
  progress__filled.style.flexBasis = `${percent}%`;
}
progress.addEventListener("click", movevideo);
progress.addEventListener("mousemove", (e) => {
  if (mousedown) {
    movevideo(e);
  }
});
progress.addEventListener("mouseup", () => (mousedown = false));
progress.addEventListener("mousedown", () => (mousedown = true));

// volume control
function changevol() {
  video[this.name] = this.value;
}
range.forEach((e) => e.addEventListener("change", changevol));
range.forEach((e) => e.addEventListener("mousemove", changevol));
//fullscreen
function openFullscreen() {
    if (video.requestFullscreen) {
      video.requestFullscreen();
    } 
  }
fullscreen.addEventListener("click", openFullscreen);

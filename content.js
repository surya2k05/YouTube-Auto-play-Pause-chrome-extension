document.addEventListener("visibilitychange", () => {
  const video = document.querySelector("video");
  if (!video) return;

  if (document.visibilityState === "visible" && video.paused) {
    video.play();
  } else if (document.visibilityState === "hidden" && !video.paused) {
    video.pause();
  }
});

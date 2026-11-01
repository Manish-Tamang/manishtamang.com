/* The concert video player: opens from a thumbnail, click to pause, drag to seek. */
const modal = document.querySelector<HTMLDialogElement>("[data-video-modal]")

if (modal) {
  const video = modal.querySelector<HTMLVideoElement>("[data-video-player]")!
  const toggle = modal.querySelector<HTMLElement>("[data-video-toggle]")!
  const spinner = modal.querySelector<HTMLElement>("[data-video-spinner]")!
  const seek = modal.querySelector<HTMLInputElement>("[data-video-seek]")!
  const caption = modal.querySelector<HTMLElement>("p[data-video-caption]")!

  // Give the buffer a head start so playback doesn't stall straight away, but never
  // wait long: on a slow connection a big video may not reach canplaythrough at all
  const BUFFER_WAIT = 3000
  let bufferTimer: ReturnType<typeof setTimeout> | undefined
  const start = () => {
    clearTimeout(bufferTimer)
    video.removeEventListener("canplaythrough", start)
    video.play().catch(() => (toggle.hidden = false))
  }

  const togglePlay = () => (video.paused ? video.play() : video.pause())

  for (const button of document.querySelectorAll<HTMLElement>("[data-video-open]")) {
    button.addEventListener("click", () => {
      video.src = button.dataset.videoOpen!
      video.setAttribute("aria-label", button.dataset.videoLabel!)
      caption.textContent = button.dataset.videoCaption ?? ""
      caption.hidden = !button.dataset.videoCaption
      seek.value = "0"
      spinner.hidden = false
      modal.showModal()
      video.addEventListener("canplaythrough", start)
      bufferTimer = setTimeout(start, BUFFER_WAIT)
    })
  }

  video.addEventListener("click", togglePlay)
  toggle.addEventListener("click", togglePlay)
  video.addEventListener("play", () => (toggle.hidden = true))
  video.addEventListener("pause", () => (toggle.hidden = false))
  video.addEventListener("waiting", () => (spinner.hidden = false))
  video.addEventListener("playing", () => (spinner.hidden = true))
  video.addEventListener("canplay", () => (spinner.hidden = true))
  video.addEventListener("timeupdate", () => {
    if (video.duration) seek.value = String((video.currentTime / video.duration) * 1000)
  })
  seek.addEventListener("input", () => {
    if (video.duration) video.currentTime = (Number(seek.value) / 1000) * video.duration
  })

  modal.querySelector("[data-video-close]")!.addEventListener("click", () => modal.close())

  // Clicking the dark area around the video closes it too
  modal.addEventListener("click", (event) => {
    if (event.target === modal) modal.close()
  })

  // Dropping the source stops playback and any download still running
  modal.addEventListener("close", () => {
    clearTimeout(bufferTimer)
    video.removeEventListener("canplaythrough", start)
    video.pause()
    video.removeAttribute("src")
    video.load()
    toggle.hidden = true
    spinner.hidden = true
  })
}

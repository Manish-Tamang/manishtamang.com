/*
 * The shared video modal (components/concerts/VideoModal.astro): opens from a
 * VideoThumbnail and plays its clip in the site's Video.js player.
 *
 * A thumbnail's shape (often square) isn't the clip's, so the player stays
 * hidden behind a spinner until the video reports its size, then appears once
 * at the right shape instead of jumping from one to the other.
 */
import { loadVideoJs } from "@/lib/client/video-player"

const REVEAL_FALLBACK = 4000

const modal = document.querySelector<HTMLDialogElement>("[data-video-modal]")

if (modal) {
  const box = modal.querySelector<HTMLElement>("[data-video-box]")!
  const player = box.querySelector("video-player")!
  const video = box.querySelector("video")!
  const caption = modal.querySelector<HTMLElement>("p[data-video-caption]")!
  const spinner = modal.querySelector<HTMLElement>("[data-video-spinner]")!

  let captionText = ""
  let revealTimer: ReturnType<typeof setTimeout> | undefined

  const reveal = () => {
    clearTimeout(revealTimer)
    if (!box.hasAttribute("data-pending")) return
    box.removeAttribute("data-pending")
    spinner.hidden = true
    caption.hidden = !captionText
  }

  for (const button of document.querySelectorAll<HTMLElement>("[data-video-open]")) {
    button.addEventListener("click", () => {
      const { videoOpen = "", videoLabel = "", videoCaption = "", videoPoster, videoRatio } = button.dataset

      box.setAttribute("data-pending", "")
      spinner.hidden = false
      captionText = videoCaption
      caption.textContent = videoCaption
      caption.hidden = true

      box.style.setProperty("--ratio", videoRatio || "1")
      if (videoPoster) player.setAttribute("poster", videoPoster)
      else player.removeAttribute("poster")
      video.setAttribute("aria-label", videoLabel)
      video.preload = "metadata"
      video.src = videoOpen

      modal.showModal()
      // Show it anyway if the size is slow to arrive or the video fails
      revealTimer = setTimeout(reveal, REVEAL_FALLBACK)
      loadVideoJs().then(() => {
        if (modal.open && video.getAttribute("src") === videoOpen) video.play().catch(() => {})
      })
    })
  }

  video.addEventListener("loadedmetadata", () => {
    if (video.videoWidth && video.videoHeight) box.style.setProperty("--ratio", String(video.videoWidth / video.videoHeight))
    reveal()
  })
  video.addEventListener("error", reveal)

  modal.querySelector("[data-video-close]")!.addEventListener("click", () => modal.close())

  // Clicking the dark area around the video closes it too
  modal.addEventListener("click", (event) => {
    if (event.target === modal) modal.close()
  })

  // Dropping the source stops playback and any download still running
  modal.addEventListener("close", () => {
    clearTimeout(revealTimer)
    video.pause()
    video.removeAttribute("src")
    video.load()
    spinner.hidden = true
  })
}

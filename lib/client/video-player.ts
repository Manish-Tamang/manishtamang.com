/*
 * Loads Video.js (v10, neutral skin) for components/ui/VideoPlayer.astro.
 * Nothing is downloaded until a page needs it: inline players load it as
 * they near the screen, and players inside dialogs (photo lightbox, video
 * modal) are marked data-video-deferred and call loadVideoJs() when opened.
 */
let core: Promise<unknown> | undefined
let youtube: Promise<unknown> | undefined

export const loadVideoJs = (withYouTube = false) => {
  core ??= Promise.all([import("@videojs/html/video/player"), import("@videojs/html/video/neutral-skin")])
  if (!withYouTube) return core
  youtube ??= import("@videojs/html/media/youtube-video")
  return Promise.all([core, youtube])
}

export const watchVideoPlayers = () => {
  const boxes = document.querySelectorAll<HTMLElement>("[data-video-box]:not([data-video-deferred])")
  if (!boxes.length) return

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        observer.unobserve(entry.target)
        loadVideoJs(entry.target.querySelector("youtube-video") !== null)
      }
    },
    { rootMargin: "400px" },
  )

  for (const box of boxes) observer.observe(box)
}

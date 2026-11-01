/* Polls /api/now-playing while the tab is visible. */
import type { NowPlaying } from "@/lib/services/lastfm"

const POLL_INTERVAL = 30_000

export function pollNowPlaying(onSong: (song: NowPlaying) => void, onFail?: () => void) {
  let timer: ReturnType<typeof setInterval> | undefined

  const load = async () => {
    try {
      const response = await fetch("/api/now-playing")
      if (!response.ok) throw new Error()
      onSong(await response.json())
    } catch {
      onFail?.()
    }
  }

  const start = () => {
    load()
    timer = setInterval(load, POLL_INTERVAL)
  }
  const stop = () => clearInterval(timer)

  if (!document.hidden) start()
  document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()))
}

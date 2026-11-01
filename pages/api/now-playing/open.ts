import type { APIRoute } from "astro"
import { getNowPlaying } from "@/lib/services/lastfm"

export const prerender = false

// A README link can't change, so it points here and gets sent to whatever is playing
export const GET: APIRoute = async () => {
  let songUrl = "https://open.spotify.com"
  try {
    songUrl = (await getNowPlaying()).songUrl ?? songUrl
  } catch (error) {
    console.error(error)
  }

  return new Response(null, {
    status: 307,
    headers: { location: songUrl, "cache-control": "no-store" },
  })
}

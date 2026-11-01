import type { APIRoute } from "astro"
import { getNowPlaying } from "@/lib/services/lastfm"

export const prerender = false

export const GET: APIRoute = async () => {
  try {
    const song = await getNowPlaying()
    return Response.json(song, {
      headers: { "cache-control": "public, s-maxage=30, stale-while-revalidate=30" },
    })
  } catch (error) {
    console.error(error)
    return Response.json({ isPlaying: false })
  }
}

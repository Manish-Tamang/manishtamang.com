import type { APIRoute } from "astro"
import { getWakaTimeStats } from "@/lib/services/wakatime"

export const prerender = false

export const GET: APIRoute = async () => {
  try {
    return Response.json(await getWakaTimeStats(), {
      headers: { "cache-control": "public, s-maxage=60, stale-while-revalidate=30" },
    })
  } catch (error) {
    console.error("Error fetching WakaTime data:", error)
    return Response.json({ error: "Failed to fetch WakaTime data." }, { status: 500 })
  }
}

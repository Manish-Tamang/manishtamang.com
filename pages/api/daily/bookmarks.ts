import type { APIRoute } from "astro"
import { getDailyBookmarks } from "@/lib/services/daily"

export const prerender = false

// Cached on the CDN for 15 days so daily.dev is hit about twice a month
export const GET: APIRoute = async ({ url }) => {
  const cursor = url.searchParams.get("cursor") ?? undefined
  const limitParam = Number(url.searchParams.get("limit"))
  const limit = Number.isFinite(limitParam) && limitParam > 0 ? limitParam : undefined

  try {
    return Response.json(await getDailyBookmarks({ limit, cursor }), {
      headers: { "cache-control": "public, s-maxage=1296000, stale-while-revalidate=86400" },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Failed to fetch daily.dev bookmarks."
    const status = message.includes("Missing DAILY_API_KEY") ? 401 : 500
    if (status === 500) console.error("Error fetching daily.dev bookmarks:", error)
    return Response.json({ error: message }, { status })
  }
}

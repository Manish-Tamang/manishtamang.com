import { NextRequest, NextResponse } from "next/server"
import { getDailyBookmarks } from "@/lib/daily"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const cursor = searchParams.get("cursor") ?? undefined
  const limitParam = Number(searchParams.get("limit"))
  const limit = Number.isFinite(limitParam) ? limitParam : undefined

  try {
    const payload = await getDailyBookmarks({ limit, cursor })

    return NextResponse.json(payload, {
      status: 200,
      headers: {
        "cache-control": "public, s-maxage=300, stale-while-revalidate=60",
      },
    })
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch daily.dev bookmarks."
    const status = message.includes("Missing DAILY_API_KEY") ? 401 : 500

    if (status === 500) {
      console.error("Error fetching daily.dev bookmarks:", error)
    }

    return NextResponse.json({ error: message }, { status })
  }
}

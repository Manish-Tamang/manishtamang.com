import type { APIRoute } from "astro"
import { getUmamiPayload } from "@/lib/services/umami"

export const prerender = false

export const GET: APIRoute = async ({ url }) => {
  const type = (url.searchParams.get("type") ?? "active").toLowerCase()

  try {
    return Response.json(await getUmamiPayload(type, url.searchParams))
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    const status = message.includes("Missing") || message.includes("Invalid type") ? 400 : 500
    if (status === 500) console.error("Error fetching analytics:", error)
    return Response.json({ error: message }, { status })
  }
}

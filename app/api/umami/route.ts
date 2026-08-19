import { NextResponse } from "next/server"
import { getUmamiPayload } from "@/lib/umami"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const type = (searchParams.get("type") ?? "active").toLowerCase()

  try {
    const payload = await getUmamiPayload(type, searchParams)
    return NextResponse.json(payload, { status: 200 })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    const status = message.includes("Missing required environment")
      ? 400
      : message.includes("Invalid type")
        ? 400
        : 500

    if (status === 500) {
      console.error("Error fetching analytics:", error)
    }

    return NextResponse.json({ error: message }, { status })
  }
}

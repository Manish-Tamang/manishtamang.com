import type { APIRoute } from "astro"
import { WAKATIME_CLIENT_ID, WAKATIME_REDIRECT_URI } from "astro:env/server"

export const prerender = false

export const GET: APIRoute = ({ cookies, redirect }) => {
  if (!WAKATIME_CLIENT_ID || !WAKATIME_REDIRECT_URI) {
    return Response.json({ error: "Missing WAKATIME_CLIENT_ID or WAKATIME_REDIRECT_URI in environment." }, { status: 500 })
  }

  const state = crypto.randomUUID()
  const url = new URL("https://wakatime.com/oauth/authorize")
  url.searchParams.set("client_id", WAKATIME_CLIENT_ID)
  url.searchParams.set("response_type", "code")
  url.searchParams.set("redirect_uri", WAKATIME_REDIRECT_URI)
  url.searchParams.set("scope", "read_stats")
  url.searchParams.set("state", state)

  cookies.set("wakatime_oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: import.meta.env.PROD,
    maxAge: 600,
    path: "/",
  })

  return redirect(url.toString())
}

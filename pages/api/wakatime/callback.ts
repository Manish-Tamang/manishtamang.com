import type { APIRoute } from "astro"
import { WAKATIME_CLIENT_ID, WAKATIME_CLIENT_SECRET, WAKATIME_REDIRECT_URI } from "astro:env/server"

export const prerender = false

export const GET: APIRoute = async ({ cookies, url }) => {
  const code = url.searchParams.get("code")
  const state = url.searchParams.get("state")
  const expectedState = cookies.get("wakatime_oauth_state")?.value

  if (!code) return Response.json({ error: "Missing authorization code from WakaTime callback." }, { status: 400 })
  if (!state || !expectedState || state !== expectedState) {
    return Response.json({ error: "Invalid OAuth state. Please retry from /api/wakatime/auth." }, { status: 400 })
  }
  if (!WAKATIME_CLIENT_ID || !WAKATIME_CLIENT_SECRET || !WAKATIME_REDIRECT_URI) {
    return Response.json({ error: "Missing WakaTime credentials in environment." }, { status: 500 })
  }

  const response = await fetch("https://wakatime.com/oauth/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: WAKATIME_CLIENT_ID,
      client_secret: WAKATIME_CLIENT_SECRET,
      redirect_uri: WAKATIME_REDIRECT_URI,
      grant_type: "authorization_code",
      code,
    }),
  })

  if (!response.ok) {
    return Response.json({ error: "Failed to exchange authorization code for tokens.", message: await response.text() }, { status: 500 })
  }

  const tokens = await response.json()
  cookies.delete("wakatime_oauth_state", { path: "/" })

  return Response.json({
    message: "WakaTime re-authorization succeeded. Copy these into .env.",
    WAKATIME_ACCESS_TOKEN: tokens.access_token ?? null,
    WAKATIME_REFRESH_TOKEN: tokens.refresh_token ?? null,
    expires_in: tokens.expires_in ?? null,
    token_type: tokens.token_type ?? null,
    scope: tokens.scope ?? null,
  })
}

import type { APIRoute } from "astro"
import { SUPABASE_SERVICE_ROLE_KEY } from "astro:env/server"
import { getReactions, isReaction, ReactionLimitError, setReaction } from "@/lib/blog/reactions"

export const prerender = false

const YEAR = 60 * 60 * 24 * 365
const COOKIE = "reactor"
const isPost = (slug: string) => __BLOG_INDEX__.some((post) => post.slug === slug)

// Per-visitor answers: never cached
const json = (body: unknown, status = 200) =>
  Response.json(body, { status, headers: { "cache-control": "private, no-store" } })

// The IP is only kept as an HMAC (keyed with a server secret), just to enforce the limits
async function hashIp(ip: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(SUPABASE_SERVICE_ROLE_KEY ?? ""),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  )
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(ip))
  return [...new Uint8Array(signature)].map((byte) => byte.toString(16).padStart(2, "0")).join("")
}

export const GET: APIRoute = async ({ params, cookies }) => {
  const slug = params.slug!
  if (!isPost(slug)) return json({ error: "Not found" }, 404)

  try {
    return json(await getReactions(slug, cookies.get(COOKIE)?.value))
  } catch (error) {
    console.error(error)
    return json({ error: "Reactions unavailable" }, 503)
  }
}

// Body: { reaction: "thumbs_up" | "heart" | "trophy" | "bookmark" | null }; null removes yours
export const POST: APIRoute = async ({ params, cookies, request, url, clientAddress }) => {
  const slug = params.slug!
  if (!isPost(slug)) return json({ error: "Not found" }, 404)

  // Only this site's own script: same origin and JSON (a cross-site form can't send JSON)
  const origin = request.headers.get("origin")
  if ((origin && origin !== url.origin) || !request.headers.get("content-type")?.includes("application/json")) {
    return json({ error: "Forbidden" }, 403)
  }

  const body = await request.json().catch(() => null)
  const reaction = body?.reaction
  if (reaction !== null && !isReaction(reaction)) return json({ error: "Unknown reaction" }, 400)

  let visitor = cookies.get(COOKIE)?.value
  if (!visitor || !/^[0-9a-f-]{36}$/.test(visitor)) {
    visitor = crypto.randomUUID()
    cookies.set(COOKIE, visitor, {
      httpOnly: true,
      secure: url.protocol === "https:",
      sameSite: "strict",
      path: "/api/blog-reactions",
      maxAge: YEAR,
    })
  }

  try {
    return json(await setReaction(slug, visitor, await hashIp(clientAddress), reaction))
  } catch (error) {
    if (error instanceof ReactionLimitError) return json({ error: "Too many reactions, try again in a minute" }, 429)
    console.error(error)
    return json({ error: "Reactions unavailable" }, 503)
  }
}

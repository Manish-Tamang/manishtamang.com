import type { APIRoute } from "astro"
import { getViews, incrementViews } from "@/lib/blog/views"

export const prerender = false

const WEEK = 60 * 60 * 24 * 7
const isPost = (slug: string) => __BLOG_INDEX__.some((post) => post.slug === slug)

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug!
  if (!isPost(slug)) return Response.json({ error: "Not found" }, { status: 404 })

  try {
    return Response.json({ views: await getViews(slug) })
  } catch (error) {
    console.error(error)
    return Response.json({ error: "Views unavailable" }, { status: 503 })
  }
}

// Counts a reader once a week per post, and returns the current total
export const POST: APIRoute = async ({ params, cookies, url }) => {
  const slug = params.slug!
  if (!isPost(slug)) return Response.json({ error: "Not found" }, { status: 404 })

  const cookie = `viewed-${slug}`

  try {
    if (cookies.has(cookie)) return Response.json({ views: await getViews(slug) })

    const views = await incrementViews(slug)
    cookies.set(cookie, "true", { httpOnly: true, secure: url.protocol === "https:", sameSite: "strict", path: "/", maxAge: WEEK })
    return Response.json({ views })
  } catch (error) {
    console.error(error)
    return Response.json({ error: "Views unavailable" }, { status: 503 })
  }
}

import type { APIRoute } from "astro"
import { site } from "@/lib/site"

export const GET: APIRoute = () =>
  new Response(
    ["User-Agent: *", "Allow: /", "Disallow: /api/", "Disallow: /design-system", "", `Host: ${site.url}`, `Sitemap: ${site.url}/sitemap.xml`, ""].join("\n"),
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  )

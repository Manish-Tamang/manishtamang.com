import type { APIRoute } from "astro"
import { site } from "@/lib/site"
import { legacyProjectSlugs, staticPages } from "@/lib/routes"
import { getPosts, isoDate } from "@/lib/blog"
import { slashPages } from "@/data/slash-pages"

// Served at /sitemap.xml like the Next.js site (not @astrojs/sitemap's sitemap-index.xml),
// so the URL submitted to Search Console keeps working.
export const GET: APIRoute = async () => {
  const posts = await getPosts()
  const entries = [
    ...staticPages.map((page) => ({ ...page, path: page.path === "/" ? "" : page.path })),
    ...posts.map(({ id, data }) => ({
      path: `/blog/${id}`,
      changefreq: "monthly",
      priority: 0.8,
      lastmod: isoDate(data.updated ?? data.date),
    })),
    ...legacyProjectSlugs.map((slug) => ({ path: `/projects/${slug}`, changefreq: "monthly", priority: 0.7 })),
    ...slashPages.map(({ href }) => ({ path: href, changefreq: "monthly", priority: 0.4 })),
  ]

  const urls = entries
    .map(
      ({ path, changefreq, priority, ...rest }) =>
        `<url><loc>${site.url}${path}</loc>${"lastmod" in rest ? `<lastmod>${rest.lastmod}</lastmod>` : ""}<changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`,
    )
    .join("")

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  )
}

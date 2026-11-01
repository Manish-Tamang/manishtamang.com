import type { APIRoute } from "astro"
import { site } from "@/lib/site"
import { getPosts } from "@/lib/blog"

const escapeXml = (text: string) =>
  text.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[char]!)

// Same URL as the Next.js site, so existing subscribers keep receiving posts
export const GET: APIRoute = async () => {
  const posts = await getPosts()

  const items = posts
    .map(({ id, data }) => {
      const url = `${site.url}/blog/${id}`
      return `<item><title>${escapeXml(data.title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><description>${escapeXml(data.description)}</description><pubDate>${data.date.toUTCString()}</pubDate></item>`
    })
    .join("")

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${escapeXml(site.name)}</title><link>${site.url}</link><description>${escapeXml(site.description)}</description><language>en</language><atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml"/>${items}</channel></rss>`,
    { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } },
  )
}

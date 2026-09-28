import { siteConfig } from "@/lib/seo"

export type FeedItem = {
  title: string
  url: string
  description: string
  date: string
  category: string
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;")
}

function toRfc822(value?: string) {
  const date = value ? new Date(value) : new Date()
  return Number.isNaN(date.getTime()) ? new Date().toUTCString() : date.toUTCString()
}

export function toFeedDescription(excerpt?: string | null, fallback?: string | null) {
  const text = (excerpt || fallback || "").replace(/\s+/g, " ").trim()
  if (!text) return siteConfig.description
  return text.length > 280 ? `${text.slice(0, 277).trim()}...` : text
}

export function buildRssFeed(items: FeedItem[]) {
  const lastBuildDate = toRfc822(items[0]?.date)
  const rssItems = items
    .map(
      (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.url)}</link>
      <guid isPermaLink="true">${escapeXml(item.url)}</guid>
      <pubDate>${toRfc822(item.date)}</pubDate>
      <category>${escapeXml(item.category)}</category>
      <description>${escapeXml(item.description)}</description>
    </item>`,
    )
    .join("\n")

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${siteConfig.url}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${siteConfig.feed}" rel="self" type="application/rss+xml"/>
${rssItems}
  </channel>
</rss>
`
}

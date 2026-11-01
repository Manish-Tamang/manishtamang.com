import { site } from "@/lib/site"
import type { GuestbookEntry } from "@/lib/guestbook"

const pageUrl = `${site.url}/guestbook`

/** Page description and JSON-LD, built from the messages themselves. */
export function guestbookSeo(entries: GuestbookEntry[]) {
  const notes = entries.flatMap((entry) => [entry, ...(entry.replies ?? [])]).filter((entry) => entry.message.trim())

  const preview = notes
    .slice(0, 6)
    .map((entry) => `${entry.name}: ${entry.message.replace(/\s+/g, " ").trim()}`)
    .join(" · ")
  const description = !preview
    ? "Sign Manish Tamang's guestbook. Leave a message, a note, or a bit of humor."
    : preview.length > 220
      ? `${preview.slice(0, 217).trim()}...`
      : preview

  const comments = notes.map((entry) => ({
    "@type": "Comment",
    "@id": `${pageUrl}#${entry.id}`,
    url: `${pageUrl}#${entry.id}`,
    text: entry.message,
    dateCreated: entry.timestamp,
    author: { "@type": "Person", name: entry.name },
  }))

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": pageUrl,
    url: pageUrl,
    name: `Guestbook | ${site.name}`,
    description,
    isPartOf: { "@type": "WebSite", name: site.name, url: site.url },
    mainEntity: {
      "@type": "ItemList",
      name: "Guestbook messages",
      numberOfItems: comments.length,
      itemListElement: comments.map((item, index) => ({ "@type": "ListItem", position: index + 1, item })),
    },
  }

  return { description, jsonLd }
}

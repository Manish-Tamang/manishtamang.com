import type { Metadata } from "next"
import { GuestbookView } from "@/components/guestbook/guestbook-view"
import { getPublicGuestbookEntries } from "@/lib/guestbook-data"
import type { GuestbookEntry } from "@/lib/guestbook"
import { siteConfig } from "@/lib/seo"

export const revalidate = 60

const SITE_URL = siteConfig.url
const PAGE_URL = `${SITE_URL}/guestbook`
const OG_IMAGE = `${PAGE_URL}/opengraph-image`

function flattenEntries(entries: GuestbookEntry[]) {
  return entries.flatMap((entry) => [entry, ...(entry.replies || [])])
}

function buildDescription(entries: GuestbookEntry[]) {
  const notes = flattenEntries(entries).filter((entry) => entry.message.trim())

  if (!notes.length) {
    return "Sign Manish Tamang's guestbook. Leave a message, a note, or a bit of humor."
  }

  const preview = notes
    .slice(0, 6)
    .map((entry) => `${entry.name}: ${entry.message.replace(/\s+/g, " ").trim()}`)
    .join(" · ")

  return preview.length > 220 ? `${preview.slice(0, 217).trim()}...` : preview
}

export async function generateMetadata(): Promise<Metadata> {
  let entries: GuestbookEntry[] = []

  try {
    entries = await getPublicGuestbookEntries()
  } catch {
    entries = []
  }

  const names = [...new Set(flattenEntries(entries).map((entry) => entry.name))]
  const title = "Guestbook | Manish Tamang"
  const description = buildDescription(entries)

  return {
    title,
    description,
    alternates: {
      canonical: PAGE_URL,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: PAGE_URL,
      type: "website",
      siteName: siteConfig.name,
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: names.length
            ? `Guestbook messages from ${names.slice(0, 8).join(", ")}`
            : "Manish Tamang guestbook",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  }
}

function guestbookJsonLd(entries: GuestbookEntry[]) {
  const comments = flattenEntries(entries)
    .filter((entry) => entry.message.trim())
    .map((entry) => ({
      "@type": "Comment",
      "@id": `${PAGE_URL}#${entry.id}`,
      url: `${PAGE_URL}#${entry.id}`,
      text: entry.message,
      dateCreated: entry.timestamp,
      author: {
        "@type": "Person",
        name: entry.name,
      },
    }))

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": PAGE_URL,
        url: PAGE_URL,
        name: "Guestbook | Manish Tamang",
        description: buildDescription(entries),
        isPartOf: {
          "@type": "WebSite",
          name: siteConfig.name,
          url: SITE_URL,
        },
        mainEntity: {
          "@type": "ItemList",
          name: "Guestbook messages",
          numberOfItems: comments.length,
          itemListElement: comments.map((comment, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: comment,
          })),
        },
      },
    ],
  }
}

export default async function GuestbookPage() {
  let entries: GuestbookEntry[] = []

  try {
    entries = await getPublicGuestbookEntries()
  } catch {
    entries = []
  }

  const jsonLd = guestbookJsonLd(entries)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <GuestbookView initialEntries={entries} />
    </>
  )
}

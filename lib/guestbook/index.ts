/* Guestbook entries in Supabase (public.guestbook_entries), ported from the Next.js site. */
import { adminEmail } from "@/lib/auth"
import { supabase } from "@/lib/services/supabase"
import type { MessageFormat } from "./rich-text"

export const TABLE = "guestbook_entries"

export type GuestbookReaction = { emoji: string; count: number }

export type GuestbookEntry = {
  id: string
  name: string
  image_url: string | null
  message: string
  /** "plain" for messages from before rich text; see lib/guestbook/rich-text.ts */
  format: MessageFormat
  timestamp: string
  parent_id: string | null
  attachment_url: string | null
  isAdminAuthor: boolean
  isMine: boolean
  likesCount: number
  likedByMe: boolean
  likedByAdmin: boolean
  reactions: GuestbookReaction[]
  myReaction: string | null
  replies?: GuestbookEntry[]
}

type RawGuestbookEntry = {
  id: string
  name: string
  email?: string | null
  image_url: string | null
  message: string | null
  message_format?: string | null
  timestamp: string
  parent_id: string | null
  likes?: string[] | null
  reactions?: string[] | null
  attachment_url: string | null
}

const normalizeEmail = (email?: string | null) => (email || "").trim().toLowerCase()

// Reactions are stored as "emoji:email"; the oldest are a bare email
const reactionEmoji = (reaction: string) => (reaction.includes(":") ? reaction.slice(0, reaction.indexOf(":")) : "🙏")
const reactionEmail = (reaction: string) =>
  normalizeEmail(reaction.includes(":") ? reaction.slice(reaction.indexOf(":") + 1) : reaction)

function toPublicEntry(entry: RawGuestbookEntry, viewerEmail?: string | null): GuestbookEntry {
  const viewer = normalizeEmail(viewerEmail)
  const author = normalizeEmail(entry.email)
  const likes = entry.likes || []
  const reactions = entry.reactions || []

  const counts = new Map<string, number>()
  for (const reaction of reactions) {
    const emoji = reactionEmoji(reaction)
    counts.set(emoji, (counts.get(emoji) ?? 0) + 1)
  }
  const myReaction = viewer ? reactions.find((reaction) => reactionEmail(reaction) === viewer) : undefined

  return {
    id: entry.id,
    name: entry.name,
    image_url: entry.image_url,
    message: entry.message || "",
    format: entry.message_format === "markdown" ? "markdown" : "plain",
    timestamp: entry.timestamp,
    parent_id: entry.parent_id,
    attachment_url: entry.attachment_url,
    isAdminAuthor: Boolean(adminEmail) && author === adminEmail,
    isMine: Boolean(viewer) && author === viewer,
    likesCount: likes.length,
    likedByMe: Boolean(viewer) && likes.some((email) => normalizeEmail(email) === viewer),
    likedByAdmin: Boolean(adminEmail) && likes.some((email) => normalizeEmail(email) === adminEmail),
    reactions: [...counts].map(([emoji, count]) => ({ emoji, count })),
    myReaction: myReaction ? reactionEmoji(myReaction) : null,
  }
}

/** Top-level entries, newest first, each with its replies oldest first. */
export async function getGuestbookEntries(viewerEmail?: string | null): Promise<GuestbookEntry[]> {
  const entries: RawGuestbookEntry[] = await supabase(
    `${TABLE}?select=id,name,email,image_url,message,message_format,timestamp,parent_id,likes,reactions,attachment_url&order=timestamp.desc`,
  )
  const replies = entries.filter((entry) => entry.parent_id)

  return entries
    .filter((entry) => !entry.parent_id)
    .map((entry) => ({
      ...toPublicEntry(entry, viewerEmail),
      replies: replies
        .filter((reply) => reply.parent_id === entry.id)
        .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
        .map((reply) => toPublicEntry(reply, viewerEmail)),
    }))
}

const relativeTime = new Intl.RelativeTimeFormat("en", { numeric: "auto" })
const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 31536000],
  ["month", 2592000],
  ["day", 86400],
  ["hour", 3600],
  ["minute", 60],
]

export function timeAgo(timestamp: string) {
  const seconds = (new Date(timestamp).getTime() - Date.now()) / 1000
  if (Number.isNaN(seconds)) return "just now"
  for (const [unit, size] of UNITS) {
    if (Math.abs(seconds) >= size) return relativeTime.format(Math.round(seconds / size), unit)
  }
  return "just now"
}

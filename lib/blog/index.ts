import { getCollection, type CollectionEntry } from "astro:content"
import blogViews from "@/data/blog/views.json"

export type Post = CollectionEntry<"blog">

/** Published posts, newest first. */
export async function getPosts() {
  const posts = await getCollection("blog", ({ data }) => !data.draft)
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
}

/** View count at build time; the post page swaps in the live one from /api/blog-views. */
export const viewCount = (post: Post) => (blogViews as Record<string, number>)[post.id] ?? 0

/** Rough reading time from the raw MDX body (code counts as words too). */
export function readingTime(post: { body?: string }) {
  const words = (post.body ?? "").split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 220))
}

export const formatDate = (date: Date, options: Intl.DateTimeFormatOptions = { day: "numeric", month: "long", year: "numeric" }) =>
  date.toLocaleDateString("en-GB", { timeZone: "UTC", ...options })

/** YYYY-MM-DD, as used by PageLayout's `updated` prop. */
export const isoDate = (date: Date) => date.toISOString().slice(0, 10)

/* daily.dev bookmarks, ported from the Next.js site. */
import { DAILY_API_KEY } from "astro:env/server"
import type { Contribution } from "@/lib/services/github"

export type DailyBookmarkSource = {
  id: string
  name: string
  handle: string
  image: string | null
}

export type DailyBookmark = {
  id: string
  title: string
  url: string
  image: string | null
  summary: string | null
  type: string
  publishedAt: string | null
  createdAt: string
  commentsPermalink: string | null
  source: DailyBookmarkSource | null
  tags: string[]
  readTime: number | null
  numUpvotes: number
  numComments: number
  bookmarkedAt: string | null
}

export type DailyBookmarksPagination = {
  hasNextPage: boolean
  cursor: string | null
}

export type DailyBookmarksResponse = {
  data: DailyBookmark[]
  pagination: DailyBookmarksPagination
}

const DAILY_API_BASE = "https://api.daily.dev/public/v1"
const DEFAULT_LIMIT = 20
// Hit daily.dev at most twice every 30 days.
const DAILY_REVALIDATE_SECONDS = 60 * 60 * 24 * 15

type DailyApiBookmark = {
  id?: unknown
  title?: unknown
  url?: unknown
  image?: unknown
  summary?: unknown
  type?: unknown
  publishedAt?: unknown
  createdAt?: unknown
  commentsPermalink?: unknown
  source?: {
    id?: unknown
    name?: unknown
    handle?: unknown
    image?: unknown
  } | null
  tags?: unknown
  readTime?: unknown
  numUpvotes?: unknown
  numComments?: unknown
  bookmarkedAt?: unknown
}

function asString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value : null
}

function asNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null
}

function getDailyApiKey(): string {
  const apiKey = DAILY_API_KEY

  if (!apiKey) {
    throw new Error("Missing DAILY_API_KEY environment variable.")
  }

  return apiKey
}

// Next's data cache did this before; the CDN covers production via /api/daily/bookmarks
const cache = new Map<string, { value: unknown; expiresAt: number }>()

async function dailyRequest<T>(path: string): Promise<T> {
  const hit = cache.get(path)
  if (hit && hit.expiresAt > Date.now()) return hit.value as T

  const response = await fetch(`${DAILY_API_BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${getDailyApiKey()}`,
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`daily.dev API Error: ${response.status} - ${errorText}`)
  }

  const value = (await response.json()) as T
  cache.set(path, { value, expiresAt: Date.now() + DAILY_REVALIDATE_SECONDS * 1000 })
  return value
}

function normalizeSource(
  source: DailyApiBookmark["source"]
): DailyBookmarkSource | null {
  if (!source || typeof source !== "object") {
    return null
  }

  const id = asString(source.id)
  const name = asString(source.name)
  const handle = asString(source.handle)

  if (!id || !name || !handle) {
    return null
  }

  return {
    id,
    name,
    handle,
    image: asString(source.image),
  }
}

function normalizeBookmark(item: DailyApiBookmark): DailyBookmark | null {
  const id = asString(item.id)
  const title = asString(item.title)
  const url = asString(item.url)

  if (!id || !title || !url) {
    return null
  }

  return {
    id,
    title,
    url,
    image: asString(item.image),
    summary: asString(item.summary),
    type: asString(item.type) ?? "article",
    publishedAt: asString(item.publishedAt),
    createdAt: asString(item.createdAt) ?? "",
    commentsPermalink: asString(item.commentsPermalink),
    source: normalizeSource(item.source),
    tags: Array.isArray(item.tags)
      ? item.tags.filter((tag): tag is string => typeof tag === "string")
      : [],
    readTime: asNumber(item.readTime),
    numUpvotes: asNumber(item.numUpvotes) ?? 0,
    numComments: asNumber(item.numComments) ?? 0,
    bookmarkedAt: asString(item.bookmarkedAt),
  }
}

export async function getDailyBookmarks(options?: {
  limit?: number
  cursor?: string
}): Promise<DailyBookmarksResponse> {
  const params = new URLSearchParams()
  const limit = options?.limit ?? DEFAULT_LIMIT
  params.set("limit", String(Math.min(Math.max(limit, 1), 50)))

  if (options?.cursor) {
    params.set("cursor", options.cursor)
  }

  const payload = await dailyRequest<{
    data?: DailyApiBookmark[]
    pagination?: {
      hasNextPage?: boolean
      cursor?: string | null
      endCursor?: string | null
    }
  }>(`/bookmarks/?${params}`)

  return {
    data: Array.isArray(payload.data)
      ? payload.data
          .map((item) => normalizeBookmark(item))
          .filter((item): item is DailyBookmark => item !== null)
      : [],
    pagination: {
      hasNextPage: Boolean(payload.pagination?.hasNextPage),
      cursor:
        asString(payload.pagination?.cursor) ??
        asString(payload.pagination?.endCursor),
    },
  }
}

const DAY = 24 * 60 * 60 * 1000
const DAILY_USER_ID = "9bTEOLMUm8JBRVg82HmiV"
const toDay = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kathmandu" }).format

export type ReadingActivity = {
  days: Contribution[]
  streak: { current: number; longest: number; total: number } | null
}

// Reads per day for the last year, plus the streak. Comes from the GraphQL API daily.dev's own app
// uses: no key or monthly quota, but undocumented, so it may change without notice.
export async function getReadingActivity(): Promise<ReadingActivity> {
  const now = Date.now()
  const response = await fetch("https://api.daily.dev/graphql", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      query: "query($id: ID!, $after: String!, $before: String!) { userReadHistory(id: $id, after: $after, before: $before) { date reads } userStreakProfile(id: $id) { current max total } }",
      variables: { id: DAILY_USER_ID, after: new Date(now - 371 * DAY).toISOString(), before: new Date(now + DAY).toISOString() },
    }),
  })
  if (!response.ok) throw new Error(`daily.dev GraphQL ${response.status}`)

  const { data, errors } = await response.json()
  if (errors?.length || !data?.userReadHistory) throw new Error("daily.dev GraphQL returned no read history")

  const reads = new Map<string, number>()
  for (const { date, reads: count } of data.userReadHistory as { date: string; reads: number }[]) {
    const day = toDay(new Date(date))
    reads.set(day, (reads.get(day) ?? 0) + count)
  }

  // Only days with reads come back, so fill the gaps to keep the graph's columns aligned
  const days = Array.from({ length: 371 }, (_, index) => {
    const date = toDay(new Date(now - (370 - index) * DAY))
    const count = reads.get(date) ?? 0
    return { date, count, level: Math.min(Math.ceil(count / 2), 4) }
  })

  const profile = data.userStreakProfile as { current: number; max: number; total: number } | null
  return { days, streak: profile && { current: profile.current, longest: profile.max, total: profile.total } }
}

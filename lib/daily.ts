import type {
  DailyBookmark,
  DailyBookmarkSource,
  DailyBookmarksResponse,
} from "@/lib/daily-types"

const DAILY_API_BASE = "https://api.daily.dev/public/v1"
const DEFAULT_LIMIT = 20

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
  const apiKey = process.env.DAILY_API_KEY

  if (!apiKey) {
    throw new Error("Missing DAILY_API_KEY environment variable.")
  }

  return apiKey
}

async function dailyRequest<T>(path: string): Promise<T> {
  const response = await fetch(`${DAILY_API_BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${getDailyApiKey()}`,
    },
    next: { revalidate: 300 },
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`daily.dev API Error: ${response.status} - ${errorText}`)
  }

  return (await response.json()) as T
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
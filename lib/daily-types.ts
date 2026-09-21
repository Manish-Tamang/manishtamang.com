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

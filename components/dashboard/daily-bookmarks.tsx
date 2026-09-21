import Link from "next/link"
import { Bookmark, Clock3, ExternalLink, MessageCircle, ThumbsUp } from "lucide-react"
import type { DailyBookmark } from "@/lib/daily-types"

interface DailyBookmarksProps {
  bookmarks: DailyBookmark[]
}

function formatDate(value: string | null): string | null {
  if (!value) {
    return null
  }

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return null
  }

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

function hostnameFromUrl(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return url.replace(/^https?:\/\//, "")
  }
}

export function DailyBookmarks({ bookmarks }: DailyBookmarksProps) {
  if (!bookmarks.length) {
    return (
      <div className="rounded-xl bg-zinc-50/70 p-4 text-sm text-zinc-600 dark:bg-zinc-900/60 dark:text-zinc-400">
        No daily.dev bookmarks available right now.
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {bookmarks.map((bookmark) => {
        const savedAt = formatDate(bookmark.bookmarkedAt ?? bookmark.createdAt)
        const tags = bookmark.tags.slice(0, 3)

        return (
          <article
            key={bookmark.id}
            className="group flex items-start gap-4 rounded-2xl bg-zinc-50/70 px-4 py-3 transition-all hover:bg-zinc-100/80 dark:bg-zinc-900/60 dark:hover:bg-zinc-800/60"
          >
            {bookmark.image ? (
              <img
                src={bookmark.image}
                alt=""
                className="mt-0.5 h-16 w-16 shrink-0 rounded-xl object-cover bg-zinc-200 dark:bg-zinc-800"
              />
            ) : (
              <div className="mt-0.5 flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-zinc-200/80 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                <Bookmark className="h-4 w-4" />
              </div>
            )}
            <div className="min-w-0 flex-1 space-y-1.5">
              <Link
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2"
              >
                <p className="min-w-0 flex-1 text-[15px] font-semibold leading-snug text-zinc-900 dark:text-zinc-100 group-hover:underline">
                  {bookmark.title}
                </p>
                <ExternalLink className="mt-1 h-3.5 w-3.5 shrink-0 text-zinc-400" />
              </Link>
              {bookmark.summary ? (
                <p className="line-clamp-2 text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {bookmark.summary}
                </p>
              ) : null}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-zinc-500 dark:text-zinc-400">
                <span className="rounded-md bg-zinc-200/70 px-2 py-0.5 dark:bg-zinc-800/80">
                  {bookmark.source?.name ?? hostnameFromUrl(bookmark.url)}
                </span>
                {bookmark.readTime ? (
                  <span className="inline-flex items-center gap-1">
                    <Clock3 className="h-3 w-3" />
                    {bookmark.readTime} min
                  </span>
                ) : null}
                <span className="inline-flex items-center gap-1">
                  <ThumbsUp className="h-3 w-3" />
                  {bookmark.numUpvotes}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MessageCircle className="h-3 w-3" />
                  {bookmark.numComments}
                </span>
                {savedAt ? <span>{savedAt}</span> : null}
              </div>
              {tags.length ? (
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {tags.map((tag) => (
                    <span
                      key={`${bookmark.id}-${tag}`}
                      className="rounded-md bg-zinc-200/50 px-1.5 py-0.5 text-[11px] text-zinc-500 dark:bg-zinc-800/60 dark:text-zinc-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </article>
        )
      })}
    </div>
  )
}

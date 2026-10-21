import Link from "next/link"
import { ExternalLink, Music } from "lucide-react"
import type { RecentTrack } from "@/lib/lastfm"

interface RecentlyListenedProps {
  tracks: RecentTrack[]
}

function formatDateTime(timestamp?: number): string | null {
  if (!timestamp) {
    return null
  }

  return new Date(timestamp).toLocaleString("en-US", {
    timeZone: "Asia/Kathmandu",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function RecentlyListened({ tracks }: RecentlyListenedProps) {
  if (!tracks.length) {
    return (
      <div className="rounded-xl bg-zinc-50/70 p-4 text-sm text-zinc-600 dark:bg-zinc-900/60 dark:text-zinc-400">
        No recent tracks available right now.
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {tracks.map((track, index) => {
        const playedAt = formatDateTime(track.playedAt)

        return (
          <Link
            key={`${track.title}-${track.playedAt ?? "now"}-${index}`}
            href={track.songUrl ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-2xl bg-zinc-50/70 px-3 py-2.5 transition-all hover:bg-zinc-100/80 dark:bg-zinc-900/60 dark:hover:bg-zinc-800/60"
          >
            {track.albumImageUrl ? (
              <img
                src={track.albumImageUrl}
                alt=""
                loading="lazy"
                className="h-11 w-11 shrink-0 rounded-lg object-cover bg-zinc-200 dark:bg-zinc-800"
              />
            ) : (
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-zinc-200/80 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                <Music className="h-4 w-4" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-[14px] font-semibold text-zinc-900 dark:text-zinc-100 group-hover:underline">
                {track.title}
              </p>
              <p className="truncate text-[12px] text-zinc-500 dark:text-zinc-400">
                {track.artist}
                {track.album ? ` · ${track.album}` : null}
              </p>
            </div>
            {track.isPlaying ? (
              <span className="inline-flex shrink-0 items-center gap-1.5 text-[11px] font-semibold text-[#1DB954]">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1DB954] opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#1DB954]" />
                </span>
                Now playing
              </span>
            ) : playedAt ? (
              <span className="shrink-0 text-[11px] text-zinc-500 dark:text-zinc-400">{playedAt}</span>
            ) : null}
            <ExternalLink className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
          </Link>
        )
      })}
    </div>
  )
}

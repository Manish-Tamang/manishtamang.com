/*
 * Scrobbles per day for the dashboard heatmap. Last.fm has no daily totals, so
 * scrobbles are counted here and kept in Supabase (listening_days); each visit
 * only asks Last.fm for the days since the last sync.
 */
import { LASTFM_USERNAME } from "astro:env/server"
import type { Contribution } from "@/lib/services/github"
import { lastfm, mapLimit } from "@/lib/services/scrobbles"
import { supabase } from "@/lib/services/supabase"

const DAY = 24 * 60 * 60 * 1000
// Kathmandu days, same as /scrobbles
const TZ_OFFSET = (5 * 60 + 45) * 60 * 1000
const HISTORY_DAYS = 53 * 7
// A cold start backfills the year a few windows per visit instead of all at once
const WINDOW_DAYS = 14
const SYNC_BUDGET = 2000

interface Row {
  date: string
  plays: number
}

const dateOf = (ms: number) => new Date(ms + TZ_OFFSET).toISOString().slice(0, 10)
const startOf = (date: string) => Date.parse(`${date}T00:00:00Z`) - TZ_OFFSET
const addDays = (date: string, days: number) => dateOf(startOf(date) + days * DAY)
const seconds = (ms: number) => String(Math.floor(ms / 1000))

const countScrobbles = async (from: number, to: number) => {
  const page = (number: number) =>
    lastfm("user.getrecenttracks", {
      user: LASTFM_USERNAME!,
      from: seconds(from),
      to: seconds(to),
      limit: "200",
      page: String(number),
    })

  const first = await page(1)
  const pages = Number(first.recenttracks?.["@attr"]?.totalPages ?? 1)
  const rest = await mapLimit(
    Array.from({ length: Math.max(0, pages - 1) }, (_, i) => i + 2),
    4,
    page,
  )

  const counts = new Map<string, number>()
  for (const data of [first, ...rest]) {
    // Last.fm sends a lone track as an object rather than a one-item array
    for (const track of [data.recenttracks?.track ?? []].flat()) {
      // The song playing right now has no date until it's scrobbled
      if (!track.date) continue
      const date = dateOf(Number(track.date.uts) * 1000)
      counts.set(date, (counts.get(date) ?? 0) + 1)
    }
  }
  return counts
}

const syncWindow = async (from: string, today: string): Promise<Row[]> => {
  const last = [addDays(from, WINDOW_DAYS - 1), today].sort()[0]
  const counts = await countScrobbles(startOf(from), startOf(addDays(last, 1)) - 1000)

  const rows: Row[] = []
  for (let date = from; date <= last; date = addDays(date, 1)) rows.push({ date, plays: counts.get(date) ?? 0 })

  await supabase("listening_days?on_conflict=date", {
    method: "POST",
    headers: { prefer: "resolution=merge-duplicates" },
    body: JSON.stringify(rows.map((row) => ({ ...row, updated_at: new Date().toISOString() }))),
  })
  return rows
}

export async function getListeningActivity(): Promise<Contribution[]> {
  const today = dateOf(Date.now())
  const first = addDays(today, -(HISTORY_DAYS - 1))

  const stored: Row[] = (await supabase(`listening_days?select=date,plays&date=gte.${first}&order=date`)) ?? []
  const plays = new Map(stored.map((row) => [row.date, row.plays]))

  // The newest stored day may have been synced halfway through, so it's counted again
  let cursor = stored.at(-1)?.date ?? first
  const deadline = Date.now() + SYNC_BUDGET
  try {
    while (cursor <= today && Date.now() < deadline) {
      const rows = await syncWindow(cursor, today)
      for (const row of rows) plays.set(row.date, row.plays)
      cursor = addDays(rows.at(-1)!.date, 1)
    }
  } catch (error) {
    console.error("Failed to sync Last.fm listening days:", error)
  }

  // Scaled to a busy day rather than the busiest, so one marathon doesn't wash out the year
  const busy = [...plays.values()].filter(Boolean).sort((a, b) => a - b)
  const cap = busy[Math.floor(busy.length * 0.95)] ?? 1

  const days: Contribution[] = []
  for (let date = first; date <= today; date = addDays(date, 1)) {
    // Not backfilled yet: a blank tile keeps today in the last column without claiming 0 plays
    if (date >= cursor && !plays.has(date)) {
      days.push({ date: "", count: 0, level: 0 })
      continue
    }
    const count = plays.get(date) ?? 0
    days.push({ date, count, level: count ? Math.min(4, Math.ceil((count / cap) * 4)) : 0 })
  }
  return days
}

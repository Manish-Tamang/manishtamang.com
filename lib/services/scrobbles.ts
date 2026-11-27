/*
 * Weekly listening report for /scrobbles, modelled on Last.fm's own weekly report.
 *
 * Everything comes from one pull of the last five weeks of scrobbles, plus a few lookups:
 * all-time top lists (to tell new artists, albums and tracks from old ones), artist tags,
 * track lengths and album release years. Lookups that rarely change are kept in memory for
 * days, so a warm instance only asks Last.fm for the scrobbles themselves.
 */
import { LASTFM_API_KEY, LASTFM_USERNAME } from "astro:env/server"
import { getDeezerArtistImage, getItunesArtwork, largeImage, type LastfmImage } from "@/lib/services/lastfm"

const API = "https://ws.audioscrobbler.com/2.0/"
const DEEZER = "https://api.deezer.com"

const DAY = 24 * 60 * 60 * 1000
const WEEK = 7 * DAY
// Nepal has no daylight saving, so a fixed offset gives Kathmandu days and hours
const TZ_OFFSET = (5 * 60 + 45) * 60 * 1000
// Weeks shown on the tags chart, the current one included
const TAG_WEEKS = 5

// --- Types the page renders -------------------------------------------------

export interface RankedItem {
  name: string
  artist?: string
  plays: number
  imageUrl?: string
  url: string
}

export interface Comparison {
  value: number
  previous: number
}

export interface Fingerprint {
  key: string
  label: string
  description: string
  value: number
  previous: number
}

export interface Decade {
  label: string
  plays: number
  top?: RankedItem
}

export interface TagSeries {
  name: string
  weeks: number[]
}

export interface ScrobbleReport {
  username: string
  profileUrl: string
  /** Kathmandu midnight that opens the week, as Unix ms. */
  start: number
  /** Kathmandu midnight that closes it (exclusive). */
  end: number
  scrobbles: Comparison
  days: { date: number; plays: number; previous: number }[]
  hours: number[]
  artists: Comparison
  albums: Comparison
  tracks: Comparison
  topArtists: RankedItem[]
  topAlbums: RankedItem[]
  topTracks: RankedItem[]
  newArtists: { share: Comparison; top?: RankedItem }
  newAlbums: { share: Comparison; top?: RankedItem }
  newTracks: { share: Comparison; top?: RankedItem }
  fingerprint: Fingerprint[]
  tags: { weekStarts: number[]; series: TagSeries[] }
  decades: { list: Decade[]; dated: number }
  /** Minutes listened; `null` when no track lengths could be found. */
  listeningMinutes: Comparison | null
  busiestDay: { date: number; plays: number; previous: number }
}

// --- Small helpers ------------------------------------------------------------

const dayStart = (ms: number) => Math.floor((ms + TZ_OFFSET) / DAY) * DAY - TZ_OFFSET
const hourOf = (ms: number) => new Date(ms + TZ_OFFSET).getUTCHours()
const key = (...parts: string[]) => parts.map((part) => part.toLowerCase()).join("\u0000")
const share = (part: number, whole: number) => (whole ? Math.round((part / whole) * 100) : 0)

/** Runs `fn` over `items`, `limit` at a time, so a cold start doesn't flood the APIs. */
export async function mapLimit<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results = new Array<R>(items.length)
  let next = 0
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (next < items.length) {
      const index = next++
      results[index] = await fn(items[index])
    }
  })
  await Promise.all(workers)
  return results
}

/** Remembers lookups per server instance; track lengths and release years hardly ever change. */
const memo = new Map<string, { value: unknown; expires: number }>()
async function remember<T>(id: string, ttl: number, load: () => Promise<T>): Promise<T> {
  const hit = memo.get(id)
  if (hit && hit.expires > Date.now()) return hit.value as T
  const value = await load()
  memo.set(id, { value, expires: Date.now() + ttl })
  return value
}

export const lastfm = async (method: string, params: Record<string, string>, attempt = 0): Promise<any> => {
  if (!LASTFM_API_KEY || !LASTFM_USERNAME) throw new Error("Missing LASTFM_API_KEY or LASTFM_USERNAME")

  const query = new URLSearchParams({ method, api_key: LASTFM_API_KEY, format: "json", ...params })
  const response = await fetch(`${API}?${query}`, { signal: AbortSignal.timeout(8000) })
  const data = response.ok ? await response.json() : null

  // 29 is Last.fm's rate limit; 8 and 16 are its "try again" errors
  if (!data || [8, 16, 29].includes(data.error)) {
    if (attempt < 2) {
      await new Promise((resolve) => setTimeout(resolve, 800 * (attempt + 1)))
      return lastfm(method, params, attempt + 1)
    }
    throw new Error(`Last.fm ${method} failed (${data?.error ?? response.status})`)
  }
  return data
}

const deezer = async (path: string) => {
  const response = await fetch(`${DEEZER}${path}`, { signal: AbortSignal.timeout(3000) })
  if (!response.ok) return null
  const data = await response.json()
  return data?.error ? null : data
}

const sameName = (a: string, b: string) => {
  const x = a.toLowerCase()
  const y = b.toLowerCase()
  return x === y || x.includes(y) || y.includes(x)
}

// --- Scrobbles ----------------------------------------------------------------

interface Scrobble {
  at: number
  track: string
  artist: string
  album: string
  image?: string
}

interface RawTrack {
  name: string
  artist: { "#text": string }
  album: { "#text": string }
  image: LastfmImage[]
  date?: { uts: string }
}

const getScrobbles = async (from: number): Promise<Scrobble[]> => {
  const page = (number: number) =>
    lastfm("user.getrecenttracks", {
      user: LASTFM_USERNAME!,
      from: String(Math.floor(from / 1000)),
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

  return [first, ...rest]
    .flatMap((data) => (data.recenttracks?.track ?? []) as RawTrack[])
    // The song playing right now has no date yet; it counts once it's scrobbled
    .filter((track) => track.date)
    .map((track) => ({
      at: Number(track.date!.uts) * 1000,
      track: track.name,
      artist: track.artist["#text"],
      album: track.album["#text"],
      image: largeImage(track.image),
    }))
}

// --- All-time play counts, to tell what's new ----------------------------------

interface Library {
  counts: Map<string, number>
  /** True when the whole library came back, so a missing item has never been played. */
  complete: boolean
  ranked: string[]
}

const getLibrary = async (kind: "artist" | "album" | "track"): Promise<Library> => {
  const method = `user.gettop${kind}s`
  const pageOf = (number: number) =>
    lastfm(method, { user: LASTFM_USERNAME!, period: "overall", limit: "1000", page: String(number) })

  const first = await pageOf(1)
  const total = Number(first[`top${kind}s`]?.["@attr"]?.totalPages ?? 1)
  // Three pages is 3,000 items; anything past that has only a play or two
  const extra = await mapLimit(
    Array.from({ length: Math.min(total, 3) - 1 }, (_, i) => i + 2),
    2,
    pageOf,
  )

  const counts = new Map<string, number>()
  const ranked: string[] = []
  for (const data of [first, ...extra]) {
    for (const item of data[`top${kind}s`]?.[kind] ?? []) {
      const id = kind === "artist" ? key(item.name) : key(item.artist.name, item.name)
      counts.set(id, Number(item.playcount))
      ranked.push(id)
    }
  }
  return { counts, complete: total <= 3, ranked }
}

// --- Tags, track lengths, release years ------------------------------------------

// Tags that say how someone feels about an artist rather than what it sounds like
const IGNORED_TAGS = new Set(["seen live", "favorites", "favourites", "favorite", "favourite", "love", "awesome", "beautiful", "check out", "spotify"])

const getArtistTags = (artist: string) =>
  remember(`tags:${key(artist)}`, 7 * DAY, async () => {
    try {
      const data = await lastfm("artist.gettoptags", { artist, autocorrect: "1" })
      const tags: { name: string; count: number }[] = data.toptags?.tag ?? []
      return tags
        .filter((tag) => tag.count >= 10)
        .map((tag) => tag.name.toLowerCase().trim())
        .filter((tag) => tag && !IGNORED_TAGS.has(tag) && tag !== artist.toLowerCase())
        .slice(0, 5)
    } catch {
      return []
    }
  })

/** Track length in seconds, from Last.fm, else Deezer. */
const getTrackLength = (artist: string, track: string) =>
  remember(`length:${key(artist, track)}`, 30 * DAY, async (): Promise<number | null> => {
    try {
      const data = await lastfm("track.getinfo", { artist, track, autocorrect: "1" })
      const ms = Number(data.track?.duration)
      if (ms > 0) return Math.round(ms / 1000)
    } catch {
      // fall through to Deezer
    }
    try {
      const data = await deezer(`/search/track?${new URLSearchParams({ q: `artist:"${artist}" track:"${track}"`, limit: "5" })}`)
      const match = (data?.data ?? []).find((item: { artist: { name: string } }) => sameName(item.artist.name, artist))
      return match?.duration > 0 ? match.duration : null
    } catch {
      return null
    }
  })

// "Superunknown (20th Anniversary)" and "Abbey Road (Remastered)" are dated by the original
const EDITION = /\s*[([][^)\]]*(remaster|anniversary|deluxe|edition|version|expanded|mono|stereo|bonus)[^)\]]*[)\]]|\s+-\s+.*(remaster|edition).*$/gi

const getReleaseYear = (artist: string, album: string) =>
  remember(`year:${key(artist, album)}`, 30 * DAY, async (): Promise<number | null> => {
    try {
      const title = album.replace(EDITION, "").trim() || album
      const search = await deezer(`/search/album?${new URLSearchParams({ q: `artist:"${artist}" album:"${title}"`, limit: "5" })}`)
      const matches = ((search?.data ?? []) as { id: number; title: string; artist: { name: string } }[])
        .filter((item) => sameName(item.artist.name, artist) && sameName(item.title.replace(EDITION, ""), title))
        .slice(0, 2)
      // Of the matching releases, the earliest is the original
      const years = await Promise.all(
        matches.map(async ({ id }) => {
          const detail = await deezer(`/album/${id}`)
          const year = Number(String(detail?.release_date ?? "").slice(0, 4))
          return year > 1900 ? year : null
        }),
      )
      const found = years.filter((year): year is number => year !== null)
      return found.length ? Math.min(...found) : null
    } catch {
      return null
    }
  })

// --- Tallies ------------------------------------------------------------------

interface Tally {
  name: string
  artist?: string
  plays: number
  image?: string
}

const tally = (scrobbles: Scrobble[], kind: "artist" | "album" | "track") => {
  const map = new Map<string, Tally>()
  for (const s of scrobbles) {
    if (kind === "album" && !s.album) continue
    const id = kind === "artist" ? key(s.artist) : key(s.artist, kind === "album" ? s.album : s.track)
    const entry = map.get(id) ?? {
      name: kind === "artist" ? s.artist : kind === "album" ? s.album : s.track,
      artist: kind === "artist" ? undefined : s.artist,
      plays: 0,
    }
    entry.plays++
    entry.image ??= s.image
    map.set(id, entry)
  }
  return map
}

const byPlays = (map: Map<string, Tally>) => [...map.entries()].sort((a, b) => b[1].plays - a[1].plays || a[1].name.localeCompare(b[1].name))

const musicUrl = (artist: string, item?: string, track = false) => {
  const part = (text: string) => encodeURIComponent(text).replace(/%20/g, "+")
  if (!item) return `https://www.last.fm/music/${part(artist)}`
  return `https://www.last.fm/music/${part(artist)}/${track ? "_/" : ""}${part(item)}`
}

const toRanked = async ([, item]: [string, Tally], kind: "artist" | "album" | "track"): Promise<RankedItem> => ({
  name: item.name,
  artist: item.artist,
  plays: item.plays,
  imageUrl:
    kind === "artist"
      ? await getDeezerArtistImage(item.name)
      : (item.image ?? (await getItunesArtwork(item.name, item.artist!))),
  url: kind === "artist" ? musicUrl(item.name) : musicUrl(item.artist!, item.name, kind === "track"),
})

/** Items heard for the first time ever in the window: no plays before `from`. */
const newItems = (window: Map<string, Tally>, library: Library, playsSince: Map<string, Tally>, heardBefore: Set<string>) =>
  [...window.entries()].filter(([id]) => {
    if (heardBefore.has(id)) return false
    const total = library.counts.get(id)
    if (total === undefined) return library.complete
    return total - (playsSince.get(id)?.plays ?? 0) <= 0
  })

// --- The report ---------------------------------------------------------------

export const getScrobbleReport = (now = Date.now()) =>
  // Rebuilding the report is the slow part, so one copy serves a few minutes of requests
  remember(`report:${dayStart(now)}`, 10 * 60 * 1000, () => buildReport(now))

async function buildReport(now: number): Promise<ScrobbleReport> {
  // Last full week, Kathmandu time, so the numbers stop moving once the day is done
  const end = dayStart(now)
  const start = end - WEEK
  const prevStart = start - WEEK
  const firstTagWeek = end - TAG_WEEKS * WEEK

  const [all, artistLibrary, albumLibrary, trackLibrary] = await Promise.all([
    getScrobbles(firstTagWeek),
    getLibrary("artist"),
    getLibrary("album"),
    getLibrary("track"),
  ])

  const between = (from: number, to: number) => all.filter((s) => s.at >= from && s.at < to)
  const week = between(start, end)
  const previous = between(prevStart, start)

  const artists = tally(week, "artist")
  const albums = tally(week, "album")
  const tracks = tally(week, "track")
  const prevArtists = tally(previous, "artist")
  const prevAlbums = tally(previous, "album")
  const prevTracks = tally(previous, "track")

  // Per day, this week against the one before
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = start + i * DAY
    return {
      date,
      plays: week.filter((s) => s.at >= date && s.at < date + DAY).length,
      previous: previous.filter((s) => s.at >= date - WEEK && s.at < date - WEEK + DAY).length,
    }
  })
  const busiest = days.reduce((best, day) => (day.plays > best.plays ? day : best), days[0])
  const prevBusiest = Math.max(...days.map((day) => day.previous))

  const hours = Array.from({ length: 24 }, () => 0)
  for (const s of week) hours[hourOf(s.at)]++

  // New: nothing played before the window, judged by all-time counts minus plays since
  const newShare = (kind: "artist" | "album" | "track", library: Library) => {
    const sinceStart = tally(between(start, Infinity), kind)
    const sincePrev = tally(between(prevStart, Infinity), kind)
    const beforeStart = new Set(tally(between(firstTagWeek, start), kind).keys())
    const beforePrev = new Set(tally(between(firstTagWeek, prevStart), kind).keys())
    const current = kind === "artist" ? artists : kind === "album" ? albums : tracks
    const prior = kind === "artist" ? prevArtists : kind === "album" ? prevAlbums : prevTracks
    const fresh = newItems(current, library, sinceStart, beforeStart).sort((a, b) => b[1].plays - a[1].plays)
    const freshBefore = newItems(prior, library, sincePrev, beforePrev)
    return {
      fresh,
      share: { value: share(fresh.length, current.size), previous: share(freshBefore.length, prior.size) },
    }
  }

  const newArtistData = newShare("artist", artistLibrary)
  const newAlbumData = newShare("album", albumLibrary)
  const newTrackData = newShare("track", trackLibrary)

  // Tags per week, weighted by plays. Each week's top 15 artists carry almost all of it.
  const weekStarts = Array.from({ length: TAG_WEEKS }, (_, i) => firstTagWeek + i * WEEK)
  const weeklyArtists = weekStarts.map((from) => byPlays(tally(between(from, from + WEEK), "artist")).slice(0, 15))
  const tagArtists = [...new Set(weeklyArtists.flat().map(([, a]) => a.name))]
  const artistTags = new Map(
    await mapLimit(tagArtists, 5, async (name) => [key(name), await getArtistTags(name)] as const),
  )
  const weeklyTags = weeklyArtists.map((list) => {
    const totals = new Map<string, number>()
    for (const [id, artist] of list) {
      for (const tag of artistTags.get(id) ?? []) totals.set(tag, (totals.get(tag) ?? 0) + artist.plays)
    }
    return totals
  })
  const tagTotals = new Map<string, number>()
  for (const totals of weeklyTags) for (const [tag, n] of totals) tagTotals.set(tag, (tagTotals.get(tag) ?? 0) + n)
  const topTags = [...tagTotals.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5)
  const allTags = new Set(tagTotals.keys())

  // Listening fingerprint, this week against last. Scores are 0–100.
  const favourites = new Set(artistLibrary.ranked.slice(0, 10))
  const fingerprintOf = (scrobbles: Scrobble[], uniqueTracks: number, newArtistShare: number, tags: Map<string, number> | undefined) => ({
    consistency: share(new Set(scrobbles.map((s) => dayStart(s.at))).size, 7),
    discovery: newArtistShare,
    variance: share(tags?.size ?? 0, allTags.size),
    concentration: share(scrobbles.filter((s) => favourites.has(key(s.artist))).length, scrobbles.length),
    replay: share(scrobbles.length - uniqueTracks, scrobbles.length),
  })
  const nowPrint = fingerprintOf(week, tracks.size, newArtistData.share.value, weeklyTags.at(-1))
  const prevPrint = fingerprintOf(previous, prevTracks.size, newArtistData.share.previous, weeklyTags.at(-2))
  const fingerprint: Fingerprint[] = [
    { key: "consistency", label: "Consistency", description: "Days of the week you listened on." },
    { key: "discovery", label: "Discovery rate", description: "Share of artists you heard for the first time." },
    { key: "variance", label: "Variance", description: "How many of the last five weeks' tags you touched this week." },
    { key: "concentration", label: "Concentration", description: "Share of plays from your all-time top 10 artists." },
    { key: "replay", label: "Replay rate", description: "Share of plays that were repeats of a song." },
  ].map((item) => ({
    ...item,
    value: nowPrint[item.key as keyof typeof nowPrint],
    previous: prevPrint[item.key as keyof typeof prevPrint],
  }))

  // Release decades. The 30 most-played albums cover nearly all plays and keep lookups few.
  const datedAlbums = byPlays(albums).slice(0, 30)
  const years = await mapLimit(datedAlbums, 4, ([, album]) => getReleaseYear(album.artist!, album.name))
  const decadeOf = (year: number) => (year < 1960 ? "Pre-1960" : `${Math.floor(year / 10) * 10}s`)
  const decadeLabels = ["Pre-1960", "1960s", "1970s", "1980s", "1990s", "2000s", "2010s", "2020s"]
  const decadeMap = new Map<string, { plays: number; top?: [string, Tally] }>(decadeLabels.map((label) => [label, { plays: 0 }]))
  datedAlbums.forEach((entry, i) => {
    const year = years[i]
    if (!year) return
    const label = decadeOf(year)
    const bucket = decadeMap.get(label) ?? { plays: 0 }
    bucket.plays += entry[1].plays
    if (!bucket.top || entry[1].plays > bucket.top[1].plays) bucket.top = entry
    decadeMap.set(label, bucket)
  })
  const decades: Decade[] = await Promise.all(
    [...decadeMap.entries()].map(async ([label, bucket]) => ({
      label,
      plays: bucket.plays,
      top: bucket.top ? await toRanked(bucket.top, "album") : undefined,
    })),
  )

  // Listening time from track lengths; unknown lengths take the average of the known ones
  const minutesOf = async (map: Map<string, Tally>) => {
    const list = byPlays(map).slice(0, 120)
    const lengths = await mapLimit(list, 5, ([, t]) => getTrackLength(t.artist!, t.name))
    let known = 0
    let knownPlays = 0
    list.forEach(([, t], i) => {
      if (lengths[i]) {
        known += lengths[i]! * t.plays
        knownPlays += t.plays
      }
    })
    if (!knownPlays) return null
    const totalPlays = [...map.values()].reduce((sum, t) => sum + t.plays, 0)
    return Math.round(((known / knownPlays) * totalPlays) / 60)
  }
  const [minutes, prevMinutes] = await Promise.all([minutesOf(tracks), minutesOf(prevTracks)])

  const [topArtists, topAlbums, topTracks, newArtist, newAlbum, newTrack] = await Promise.all([
    Promise.all(byPlays(artists).slice(0, 5).map((entry) => toRanked(entry, "artist"))),
    Promise.all(byPlays(albums).slice(0, 5).map((entry) => toRanked(entry, "album"))),
    Promise.all(byPlays(tracks).slice(0, 5).map((entry) => toRanked(entry, "track"))),
    newArtistData.fresh[0] && toRanked(newArtistData.fresh[0], "artist"),
    newAlbumData.fresh[0] && toRanked(newAlbumData.fresh[0], "album"),
    newTrackData.fresh[0] && toRanked(newTrackData.fresh[0], "track"),
  ])

  return {
    username: LASTFM_USERNAME!,
    profileUrl: `https://www.last.fm/user/${LASTFM_USERNAME}`,
    start,
    end,
    scrobbles: { value: week.length, previous: previous.length },
    days,
    hours,
    artists: { value: artists.size, previous: prevArtists.size },
    albums: { value: albums.size, previous: prevAlbums.size },
    tracks: { value: tracks.size, previous: prevTracks.size },
    topArtists,
    topAlbums,
    topTracks,
    newArtists: { share: newArtistData.share, top: newArtist || undefined },
    newAlbums: { share: newAlbumData.share, top: newAlbum || undefined },
    newTracks: { share: newTrackData.share, top: newTrack || undefined },
    fingerprint,
    tags: {
      weekStarts,
      series: topTags.map(([name]) => ({ name, weeks: weeklyTags.map((totals) => totals.get(name) ?? 0) })),
    },
    decades: { list: decades, dated: decades.reduce((sum, d) => sum + d.plays, 0) },
    listeningMinutes: minutes === null ? null : { value: minutes, previous: prevMinutes ?? 0 },
    busiestDay: { date: busiest.date, plays: busiest.plays, previous: prevBusiest },
  }
}

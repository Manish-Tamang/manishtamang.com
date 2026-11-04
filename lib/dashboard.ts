/*
 * Dashboard data. Each source fails on its own, so one API being down leaves
 * the rest of the page working.
 */
import { getAllViews } from "@/lib/blog/views"
import { getAllReactions } from "@/lib/blog/reactions"
import { getReadingActivity, type DailyBookmark, type ReadingActivity } from "@/lib/services/daily"
import { getContributions, type Contribution } from "@/lib/services/github"
import { getRecentTracks, getTopAlbums, getTopArtists, type RecentTrack, type TopItem } from "@/lib/services/lastfm"
import { getUmamiRecentSessions, getUmamiTotals } from "@/lib/services/umami"
import { getCodingActivity, getWakaTimeStats, type WakaTimeApiResponse } from "@/lib/services/wakatime"

const getWakaTime = async (): Promise<WakaTimeApiResponse | null> => {
  try {
    return await getWakaTimeStats()
  } catch (error) {
    console.error("Error fetching WakaTime data:", error)
    return null
  }
}

const getTracks = async (): Promise<RecentTrack[]> => {
  try {
    return await getRecentTracks(8)
  } catch (error) {
    console.error("Error fetching Last.fm recent tracks:", error)
    return []
  }
}

const getArtists = async (): Promise<TopItem[]> => {
  try {
    return await getTopArtists()
  } catch (error) {
    console.error("Error fetching Last.fm top artists:", error)
    return []
  }
}

const getAlbums = async (): Promise<TopItem[]> => {
  try {
    return await getTopAlbums()
  } catch (error) {
    console.error("Error fetching Last.fm top albums:", error)
    return []
  }
}

// Through our own route, so its 15-day CDN cache keeps daily.dev calls rare
const getBookmarks = async (origin: URL): Promise<DailyBookmark[]> => {
  try {
    const response = await fetch(new URL("/api/daily/bookmarks?limit=8", origin))
    return response.ok ? (await response.json()).data : []
  } catch (error) {
    console.error("Error fetching daily.dev bookmarks:", error)
    return []
  }
}

const getGraph = async (): Promise<Contribution[]> => {
  try {
    return await getContributions()
  } catch (error) {
    console.error("Failed to fetch GitHub contributions:", error)
    return []
  }
}

const getReading = async (): Promise<ReadingActivity> => {
  try {
    return await getReadingActivity()
  } catch (error) {
    console.error("Failed to fetch daily.dev reading history:", error)
    return { days: [], streak: null }
  }
}

const getCoding = async (): Promise<Contribution[]> => {
  try {
    return await getCodingActivity()
  } catch (error) {
    console.error("Failed to fetch WakaTime daily activity:", error)
    return []
  }
}

const getViews = async (): Promise<Record<string, number>> => {
  try {
    return await getAllViews()
  } catch (error) {
    console.error("Failed to fetch blog views:", error)
    return {}
  }
}

const getReactionTotals = async (): Promise<Record<string, number>> => {
  try {
    return await getAllReactions()
  } catch (error) {
    console.error("Failed to fetch blog reactions:", error)
    return {}
  }
}

// Past this, a source counts as down and its section renders empty, so one slow API
// can't hold the page. Only matters when the CDN has no copy (see the page's headers).
const SOURCE_TIMEOUT = 3500

function within<T>(promise: Promise<T>, fallback: T, name: string): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined
  const timeout = new Promise<T>((resolve) => {
    timer = setTimeout(() => {
      console.warn(`Dashboard: ${name} took over ${SOURCE_TIMEOUT}ms, rendering without it`)
      resolve(fallback)
    }, SOURCE_TIMEOUT)
  })
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer))
}

// All at once, so the page waits for the slowest source rather than the sum of them
export async function getDashboardData(origin: URL) {
  const [wakatime, totals, sessions, bookmarks, tracks, topArtists, topAlbums, contributions, reading, coding, views, reactions] = await Promise.all([
    within(getWakaTime(), null, "WakaTime"),
    within(getUmamiTotals(), null, "Umami totals"),
    within(getUmamiRecentSessions(3), [], "Umami sessions"),
    within(getBookmarks(origin), [], "daily.dev bookmarks"),
    within(getTracks(), [], "Last.fm tracks"),
    within(getArtists(), [], "Last.fm artists"),
    within(getAlbums(), [], "Last.fm albums"),
    within(getGraph(), [], "GitHub contributions"),
    within(getReading(), { days: [], streak: null }, "daily.dev reading"),
    within(getCoding(), [], "WakaTime days"),
    within(getViews(), {}, "blog views"),
    within(getReactionTotals(), {}, "blog reactions"),
  ])
  return { wakatime, totals, sessions, bookmarks, tracks, topArtists, topAlbums, contributions, reading, coding, views, reactions }
}

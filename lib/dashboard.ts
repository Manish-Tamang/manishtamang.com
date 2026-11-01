/*
 * Dashboard data. Each source fails on its own, so one API being down leaves
 * the rest of the page working.
 */
import { getAllViews } from "@/lib/blog/views"
import type { DailyBookmark } from "@/lib/services/daily"
import { getContributions, type Contribution } from "@/lib/services/github"
import { getRecentTracks, type RecentTrack } from "@/lib/services/lastfm"
import { getUmamiRecentSessions, getUmamiTotals } from "@/lib/services/umami"
import { getWakaTimeStats, type WakaTimeApiResponse } from "@/lib/services/wakatime"

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

const getViews = async (): Promise<Record<string, number>> => {
  try {
    return await getAllViews()
  } catch (error) {
    console.error("Failed to fetch blog views:", error)
    return {}
  }
}

// All at once, so the page waits for the slowest source rather than the sum of them
export async function getDashboardData(origin: URL) {
  const [wakatime, totals, sessions, bookmarks, tracks, contributions, views] = await Promise.all([
    getWakaTime(),
    getUmamiTotals(),
    getUmamiRecentSessions(3),
    getBookmarks(origin),
    getTracks(),
    getGraph(),
    getViews(),
  ])
  return { wakatime, totals, sessions, bookmarks, tracks, contributions, views }
}

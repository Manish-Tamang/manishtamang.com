/*
 * Last.fm "now playing", ported from the Next.js site (lib/lastfm.ts).
 * Spotify's Web API needs Premium, so plays are read from Last.fm scrobbles.
 */
import { LASTFM_API_KEY, LASTFM_USERNAME } from "astro:env/server"

const RECENT_TRACKS_ENDPOINT = "https://ws.audioscrobbler.com/2.0/"
const ITUNES_SEARCH_ENDPOINT = "https://itunes.apple.com/search"
// Last.fm serves this grey star image when a track has no artwork
const PLACEHOLDER_IMAGE_ID = "2a96cbd8b46e442fc41c2b86b821562f"
const ARTWORK_TTL = 24 * 60 * 60 * 1000

export interface NowPlaying {
  isPlaying: boolean
  title?: string
  artist?: string
  album?: string
  albumImageUrl?: string
  songUrl?: string
}

export interface RecentTrack extends NowPlaying {
  title: string
  artist: string
  // Unix ms; missing while the track is still playing
  playedAt?: number
}

interface LastfmTrack {
  name: string
  artist: { "#text": string }
  album: { "#text": string }
  image: { size: string; "#text": string }[]
  "@attr"?: { nowplaying?: string }
  date?: { uts: string }
}

const fetchRecentTracks = async (limit: number): Promise<LastfmTrack[]> => {
  if (!LASTFM_API_KEY || !LASTFM_USERNAME) {
    throw new Error("Missing LASTFM_API_KEY or LASTFM_USERNAME")
  }

  const params = new URLSearchParams({
    method: "user.getrecenttracks",
    user: LASTFM_USERNAME,
    api_key: LASTFM_API_KEY,
    format: "json",
    limit: String(limit),
  })

  const response = await fetch(`${RECENT_TRACKS_ENDPOINT}?${params}`, { cache: "no-store" })
  if (!response.ok) {
    throw new Error(`Last.fm request failed with status ${response.status}`)
  }

  const data = await response.json()
  // While a song is playing, Last.fm returns it in addition to `limit` scrobbles
  return (data.recenttracks?.track ?? []).slice(0, limit)
}

const toRecentTrack = async (track: LastfmTrack): Promise<RecentTrack> => {
  const title = track.name
  const artist = track.artist["#text"]
  const image = track.image.find((img) => img.size === "extralarge")?.["#text"]
  const hasImage = image && !image.includes(PLACEHOLDER_IMAGE_ID)

  return {
    isPlaying: track["@attr"]?.nowplaying === "true",
    title,
    artist,
    album: track.album["#text"] || undefined,
    albumImageUrl: hasImage ? image : await getItunesArtwork(title, artist),
    // Spotify's exact track URL needs their (Premium-only) Web API, so link to a search instead
    songUrl: `https://open.spotify.com/search/${encodeURIComponent(`${title} ${artist}`)}`,
    playedAt: track.date ? Number(track.date.uts) * 1000 : undefined,
  }
}

export const getNowPlaying = async (): Promise<NowPlaying> => {
  const [track] = await fetchRecentTracks(1)
  if (!track) return { isPlaying: false }

  const { playedAt, ...song } = await toRecentTrack(track)
  return song
}

export const getRecentTracks = async (limit = 10): Promise<RecentTrack[]> => {
  const tracks = await fetchRecentTracks(limit)
  return Promise.all(tracks.map(toRecentTrack))
}

// Artwork rarely changes, so remember lookups for a day per server instance
const artworkCache = new Map<string, { url?: string; expires: number }>()

// Last.fm lacks artwork for many smaller releases, so fall back to the iTunes catalog
const getItunesArtwork = async (title: string, artist: string) => {
  const key = `${artist}\u0000${title}`
  const cached = artworkCache.get(key)
  if (cached && cached.expires > Date.now()) return cached.url

  try {
    const params = new URLSearchParams({ term: `${artist} ${title}`, entity: "song", limit: "5" })
    const response = await fetch(`${ITUNES_SEARCH_ENDPOINT}?${params}`)
    if (!response.ok) return undefined

    const { results } = await response.json()
    const wanted = artist.toLowerCase()
    // Only trust a result by the same artist, so we never show an unrelated cover
    const match = (results as { artistName: string; artworkUrl100?: string }[]).find((r) => {
      const name = r.artistName.toLowerCase()
      return name.includes(wanted) || wanted.includes(name)
    })

    const url = match?.artworkUrl100?.replace("100x100bb", "600x600bb")
    artworkCache.set(key, { url, expires: Date.now() + ARTWORK_TTL })
    return url
  } catch {
    return undefined
  }
}

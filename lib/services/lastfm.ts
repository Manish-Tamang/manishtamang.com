/*
 * Last.fm "now playing", ported from the Next.js site (lib/lastfm.ts).
 * Spotify's Web API needs Premium, so plays are read from Last.fm scrobbles.
 */
import { LASTFM_API_KEY, LASTFM_USERNAME } from "astro:env/server"

const RECENT_TRACKS_ENDPOINT = "https://ws.audioscrobbler.com/2.0/"
const ITUNES_SEARCH_ENDPOINT = "https://itunes.apple.com/search"
const DEEZER_ARTIST_ENDPOINT = "https://api.deezer.com/search/artist"
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

export interface TopItem {
  name: string
  // Set on albums; an artist's own name is enough on its tile
  artist?: string
  plays: number
  imageUrl?: string
  url: string
}

interface LastfmImage {
  size: string
  "#text": string
}

interface LastfmTrack {
  name: string
  artist: { "#text": string }
  album: { "#text": string }
  image: LastfmImage[]
  "@attr"?: { nowplaying?: string }
  date?: { uts: string }
}

const fetchLastfm = async (method: string, limit: number, extra: Record<string, string> = {}) => {
  if (!LASTFM_API_KEY || !LASTFM_USERNAME) {
    throw new Error("Missing LASTFM_API_KEY or LASTFM_USERNAME")
  }

  const params = new URLSearchParams({
    method,
    user: LASTFM_USERNAME,
    api_key: LASTFM_API_KEY,
    format: "json",
    limit: String(limit),
    ...extra,
  })

  const response = await fetch(`${RECENT_TRACKS_ENDPOINT}?${params}`, { cache: "no-store" })
  if (!response.ok) {
    throw new Error(`Last.fm request failed with status ${response.status}`)
  }

  return response.json()
}

const fetchRecentTracks = async (limit: number): Promise<LastfmTrack[]> => {
  const data = await fetchLastfm("user.getrecenttracks", limit)
  // While a song is playing, Last.fm returns it in addition to `limit` scrobbles
  return (data.recenttracks?.track ?? []).slice(0, limit)
}

const largeImage = (images: LastfmImage[]) => {
  const image = images.find((img) => img.size === "extralarge")?.["#text"]
  return image && !image.includes(PLACEHOLDER_IMAGE_ID) ? image : undefined
}

const toRecentTrack = async (track: LastfmTrack): Promise<RecentTrack> => {
  const title = track.name
  const artist = track.artist["#text"]

  return {
    isPlaying: track["@attr"]?.nowplaying === "true",
    title,
    artist,
    album: track.album["#text"] || undefined,
    albumImageUrl: largeImage(track.image) ?? (await getItunesArtwork(title, artist)),
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

export const getTopArtists = async (limit = 5): Promise<TopItem[]> => {
  const data = await fetchLastfm("user.gettopartists", limit, { period: "overall" })
  const artists: { name: string; playcount: string; url: string }[] = data.topartists?.artist ?? []
  return Promise.all(
    artists.map(async ({ name, playcount, url }) => ({
      name,
      plays: Number(playcount),
      imageUrl: await getDeezerArtistImage(name),
      url,
    })),
  )
}

export const getTopAlbums = async (limit = 5): Promise<TopItem[]> => {
  const data = await fetchLastfm("user.gettopalbums", limit, { period: "overall" })
  const albums: { name: string; artist: { name: string }; playcount: string; url: string; image: LastfmImage[] }[] =
    data.topalbums?.album ?? []
  return Promise.all(
    albums.map(async ({ name, artist, playcount, url, image }) => ({
      name,
      artist: artist.name,
      plays: Number(playcount),
      imageUrl: largeImage(image) ?? (await getItunesArtwork(name, artist.name)),
      url,
    })),
  )
}

// Artwork rarely changes, so remember lookups for a day per server instance
const artworkCache = new Map<string, { url?: string; expires: number }>()

// Artwork is optional, so a slow lookup gives up rather than holding the page
const ARTWORK_TIMEOUT = 1500

// Last.fm lacks artwork for many smaller releases, so fall back to the iTunes catalog
const getItunesArtwork = async (title: string, artist: string) => {
  const key = `${artist}\u0000${title}`
  const cached = artworkCache.get(key)
  if (cached && cached.expires > Date.now()) return cached.url

  try {
    const params = new URLSearchParams({ term: `${artist} ${title}`, entity: "song", limit: "5" })
    const response = await fetch(`${ITUNES_SEARCH_ENDPOINT}?${params}`, { signal: AbortSignal.timeout(ARTWORK_TIMEOUT) })
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

// Last.fm's API stopped returning artist photos, so look them up on Deezer (no key needed)
const getDeezerArtistImage = async (name: string) => {
  const key = `artist\u0000${name}`
  const cached = artworkCache.get(key)
  if (cached && cached.expires > Date.now()) return cached.url

  try {
    const response = await fetch(`${DEEZER_ARTIST_ENDPOINT}?${new URLSearchParams({ q: name, limit: "10" })}`, {
      signal: AbortSignal.timeout(ARTWORK_TIMEOUT),
    })
    if (!response.ok) return undefined

    const { data } = await response.json()
    // Exact names only, so a similarly named artist's photo never shows up
    const match = ((data ?? []) as { name: string; picture_big?: string }[]).find((artist) => artist.name.toLowerCase() === name.toLowerCase())
    // Deezer leaves the image id empty for artists with no photo
    const url = match?.picture_big?.includes("/artist//") ? undefined : match?.picture_big
    artworkCache.set(key, { url, expires: Date.now() + ARTWORK_TTL })
    return url
  } catch {
    return undefined
  }
}

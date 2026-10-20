const api_key = process.env.LASTFM_API_KEY;
const username = process.env.LASTFM_USERNAME;

const RECENT_TRACKS_ENDPOINT = `https://ws.audioscrobbler.com/2.0/`;
// Last.fm serves this grey star image when a track has no artwork
const PLACEHOLDER_IMAGE_ID = "2a96cbd8b46e442fc41c2b86b821562f";

export interface NowPlaying {
    isPlaying: boolean;
    title?: string;
    artist?: string;
    album?: string;
    albumImageUrl?: string;
    songUrl?: string;
}

interface LastfmTrack {
    name: string;
    artist: { "#text": string };
    album: { "#text": string };
    image: { size: string; "#text": string }[];
    "@attr"?: { nowplaying?: string };
}

export const getNowPlaying = async (): Promise<NowPlaying> => {
    if (!api_key || !username) {
        throw new Error("Missing LASTFM_API_KEY or LASTFM_USERNAME");
    }

    const params = new URLSearchParams({
        method: "user.getrecenttracks",
        user: username,
        api_key,
        format: "json",
        limit: "1",
    });

    const response = await fetch(`${RECENT_TRACKS_ENDPOINT}?${params}`, {
        cache: "no-store",
    });
    if (!response.ok) {
        throw new Error(`Last.fm request failed with status ${response.status}`);
    }

    const data = await response.json();
    const track: LastfmTrack | undefined = data.recenttracks?.track?.[0];
    if (!track) return { isPlaying: false };

    const title = track.name;
    const artist = track.artist["#text"];
    const image = track.image.find((img) => img.size === "extralarge")?.["#text"];

    return {
        isPlaying: track["@attr"]?.nowplaying === "true",
        title,
        artist,
        album: track.album["#text"] || undefined,
        albumImageUrl: image && !image.includes(PLACEHOLDER_IMAGE_ID) ? image : undefined,
        // Spotify's exact track URL needs their (Premium-only) Web API, so link to a search instead
        songUrl: `https://open.spotify.com/search/${encodeURIComponent(`${title} ${artist}`)}`,
    };
};

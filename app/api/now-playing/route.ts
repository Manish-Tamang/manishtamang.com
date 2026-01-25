import { NextRequest, NextResponse } from "next/server";
import { getNowPlaying } from "@/lib/spotify";

export const runtime = "edge";

export async function GET(req: NextRequest) {
    try {
        const response = await getNowPlaying();

        if (response.status === 204 || response.status > 400) {
            return NextResponse.json({ isPlaying: false }, { status: 200 });
        }

        const song = await response.json();

        if (!song.item || song.currently_playing_type !== 'track') {
            return NextResponse.json({ isPlaying: false }, { status: 200 });
        }

        const isPlaying = song.is_playing;
        const title = song.item.name;
        const artist = song.item.artists
            ?.map((artist: { name: string }) => artist.name)
            .join(", ");
        const album = song.item.album.name;
        const albumImageUrl = song.item.album.images[0]?.url;
        const songUrl = song.item.external_urls.spotify;

        return NextResponse.json(
            { album, albumImageUrl, artist, isPlaying, songUrl, title },
            {
                status: 200,
                headers: {
                    "cache-control": "public, s-maxage=60, stale-while-revalidate=30",
                },
            }
        );
    } catch (e) {
        console.error(e);
        return NextResponse.json({ isPlaying: false }, { status: 200 });
    }
}
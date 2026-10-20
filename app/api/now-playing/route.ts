import { NextResponse } from "next/server";
import { getNowPlaying } from "@/lib/lastfm";

export async function GET() {
    try {
        const song = await getNowPlaying();

        return NextResponse.json(song, {
            status: 200,
            headers: {
                "cache-control": "public, s-maxage=30, stale-while-revalidate=30",
            },
        });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ isPlaying: false }, { status: 200 });
    }
}

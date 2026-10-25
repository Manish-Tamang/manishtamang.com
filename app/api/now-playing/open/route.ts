import { NextResponse } from "next/server";
import { getNowPlaying } from "@/lib/lastfm";

// A README link can't change, so it points here and gets sent to whatever is playing
export async function GET() {
    let songUrl = "https://open.spotify.com";
    try {
        songUrl = (await getNowPlaying()).songUrl ?? songUrl;
    } catch (e) {
        console.error(e);
    }

    return NextResponse.redirect(songUrl, {
        status: 307,
        headers: { "cache-control": "no-store" },
    });
}

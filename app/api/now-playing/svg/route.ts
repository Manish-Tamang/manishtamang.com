import { getNowPlaying, type NowPlaying } from "@/lib/lastfm";

// Renders the current (or last played) song as an SVG card so it can be embedded
// where JS can't run, like the GitHub profile README

const FONT = "'Segoe UI', Ubuntu, Helvetica, Arial, sans-serif";
const TEXT_X = 86;

// Matches GitHub's light and dark themes; the README picks one with <picture>
const THEMES = {
    light: { card: "#ffffff", border: "#d0d7de", title: "#1f2328", artist: "#59636e", rim: "#282828" },
    dark: { card: "#0d1117", border: "#30363d", title: "#f0f6fc", artist: "#9198a1", rim: "#3d444d" },
};

// Last good song, so a Last.fm hiccup still shows the last thing listened to
let lastSong: NowPlaying | undefined;

const escapeXml = (text: string) =>
    text.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);

// SVG text doesn't wrap, so cut long names before they run off the card
const truncate = (text: string, max: number) =>
    text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;

// SVG can't size to its text, so estimate the width from rough per-character widths
const textWidth = (text: string, fontSize: number) =>
    [...text].reduce((width, char) => {
        if (/[ il.,:;'|!I]/.test(char)) return width + 0.3;
        if (/[frtj]/.test(char)) return width + 0.4;
        if (/[mwMW]/.test(char)) return width + 0.88;
        if (/[A-Z]/.test(char)) return width + 0.68;
        if (/[\x21-\x7e]/.test(char)) return width + 0.57;
        return width + 0.75;
    }, 0) * fontSize;

// GitHub's image proxy blocks external images inside an SVG, so inline the artwork
const toDataUri = async (url?: string) => {
    if (!url) return undefined;
    try {
        const response = await fetch(url, { next: { revalidate: 86400 } });
        if (!response.ok) return undefined;

        const type = response.headers.get("content-type") ?? "image/jpeg";
        const base64 = Buffer.from(await response.arrayBuffer()).toString("base64");
        return `data:${type};base64,${base64}`;
    } catch {
        return undefined;
    }
};

const renderCard = (song: NowPlaying, theme: keyof typeof THEMES, artwork?: string) => {
    const colors = THEMES[theme];
    const title = truncate(song.title!, 27);
    const artist = truncate(song.artist!, 34);
    // Semibold runs a little wider than the estimate
    const contentWidth = Math.max(textWidth(title, 14) * 1.06, textWidth(artist, 12));
    // The estimate runs a little wide, so a small pad still leaves ~16px after the text
    const width = Math.min(400, Math.ceil(TEXT_X + contentWidth + 10));

    return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="84" viewBox="0 0 ${width} 84" role="img" aria-label="${escapeXml(`${title} by ${artist}`)}">
    <style>
        .title { font: 600 14px ${FONT}; fill: ${colors.title}; }
        .artist { font: 400 12px ${FONT}; fill: ${colors.artist}; }
        .spin { animation: spin 4s linear infinite; transform-origin: 42px 42px; }
        @keyframes spin { to { transform: rotate(360deg); } }
    </style>
    <defs>
        <clipPath id="cover"><circle cx="42" cy="42" r="15" /></clipPath>
    </defs>
    <rect x="0.5" y="0.5" width="${width - 1}" height="83" rx="4" fill="${colors.card}" stroke="${colors.border}" />

    <circle cx="42" cy="42" r="30" fill="#121212" />
    <circle cx="42" cy="42" r="29.2" fill="none" stroke="${colors.rim}" stroke-width="1" />
    <circle cx="42" cy="42" r="26.5" fill="none" stroke="#1f1f1f" stroke-width="0.5" />
    <circle cx="42" cy="42" r="23.5" fill="none" stroke="#1f1f1f" stroke-width="0.5" />
    <circle cx="42" cy="42" r="20.5" fill="none" stroke="#1f1f1f" stroke-width="0.5" />
    <g${song.isPlaying ? ` class="spin"` : ""}>
        <circle cx="42" cy="42" r="16.5" fill="#282828" stroke="#181818" stroke-width="0.5" />
        ${artwork
            ? `<image href="${artwork}" x="27" y="27" width="30" height="30" preserveAspectRatio="xMidYMid slice" clip-path="url(#cover)" />`
            : ""}
    </g>
    <circle cx="42" cy="42" r="1.6" fill="#121212" />
    <circle cx="42" cy="42" r="1.5" fill="none" stroke="#fff" stroke-opacity="0.2" stroke-width="0.5" />

    <text class="title" x="${TEXT_X}" y="38">${escapeXml(title)}</text>
    <text class="artist" x="${TEXT_X}" y="58">${escapeXml(artist)}</text>
</svg>`;
};

export async function GET(request: Request) {
    const theme = new URL(request.url).searchParams.get("theme") === "dark" ? "dark" : "light";

    try {
        const song = await getNowPlaying();
        if (song.title && song.artist) lastSong = song;
    } catch (e) {
        console.error(e);
        // Can't tell if the remembered song is still playing, so stop the spin
        if (lastSong) lastSong = { ...lastSong, isPlaying: false };
    }

    if (!lastSong?.title || !lastSong.artist) {
        // Nothing to show yet; don't let GitHub cache an empty card
        return new Response(null, { status: 503, headers: { "cache-control": "no-store" } });
    }

    const svg = renderCard(lastSong, theme, await toDataUri(lastSong.albumImageUrl));

    return new Response(svg, {
        status: 200,
        headers: {
            "content-type": "image/svg+xml; charset=utf-8",
            // max-age=0 makes GitHub's image proxy refetch instead of holding an old song
            "cache-control": "public, max-age=0, s-maxage=30, stale-while-revalidate=30",
        },
    });
}

import { getNowPlaying, type NowPlaying } from "@/lib/lastfm";

// Renders the now-playing card as an SVG so it can be embedded where JS can't run,
// like the GitHub profile README

const FONT = "'Segoe UI', Ubuntu, Helvetica, Arial, sans-serif";

const escapeXml = (text: string) =>
    text.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);

// SVG text doesn't wrap, so cut long names before they run under the record
const truncate = (text: string, max: number) =>
    text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;

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

const renderCard = (song: NowPlaying, artwork?: string) => {
    const hasSong = Boolean(song.title && song.artist);
    const label = song.isPlaying ? "NOW PLAYING" : hasSong ? "LAST PLAYED" : "SPOTIFY";
    const title = escapeXml(truncate(hasSong ? song.title! : "Not playing right now", 28));
    const artist = escapeXml(truncate(hasSong ? song.artist! : "Check back later", 38));

    return `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="120" viewBox="0 0 400 120" role="img" aria-label="${label}: ${title} by ${artist}">
    <style>
        .card { fill: #fff; stroke: #e4e4e7; }
        .title { font: 700 15px ${FONT}; fill: #18181b; }
        .artist { font: 400 12px ${FONT}; fill: #71717a; }
        .accent { font: 700 10px ${FONT}; fill: #1DB954; letter-spacing: 0.08em; }
        .spin { animation: spin 4s linear infinite; transform-origin: 345px 92px; }
        .ping { animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite; transform-box: fill-box; transform-origin: center; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }
        @media (prefers-color-scheme: dark) {
            .card { fill: #0d1117; stroke: #30363d; }
            .title { fill: #e6edf3; }
            .artist { fill: #8b949e; }
        }
    </style>
    <defs>
        <clipPath id="card"><rect width="400" height="120" rx="12" /></clipPath>
        <clipPath id="album"><circle cx="345" cy="92" r="25" /></clipPath>
    </defs>
    <g clip-path="url(#card)">
        <rect class="card" x="0.5" y="0.5" width="399" height="119" rx="11.5" />

        ${song.isPlaying
            ? `<circle class="ping" cx="23" cy="29" r="3" fill="#1DB954" opacity="0.75" />
        <circle cx="23" cy="29" r="3" fill="#1DB954" />`
            : ""}
        <text class="accent" x="${song.isPlaying ? 32 : 20}" y="32.5">${label}</text>
        <text class="title" x="20" y="58">${title}</text>
        <text class="artist" x="20" y="77">${artist}</text>
        <text class="accent" x="20" y="102">VIEW TRACK ↗</text>

        <g transform="translate(366 12)">
            <path fill="#1DB954" transform="scale(0.6667)" d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.494 17.308c-.216.354-.675.467-1.03.251-2.859-1.747-6.458-2.143-10.697-1.176-.406.093-.815-.162-.908-.568-.093-.406.162-.815.568-.908 4.636-1.06 8.599-.606 11.815 1.357.355.216.468.677.252 1.031v.013zm1.467-3.264c-.273.443-.849.584-1.292.311-3.272-2.012-8.259-2.593-12.127-1.417-.5.152-1.026-.131-1.178-.631-.152-.5.131-1.026.631-1.178 4.414-1.339 9.897-.687 13.655 1.619.443.273.584.85.311 1.296zm.127-3.411c-3.924-2.33-10.387-2.544-14.153-1.401-.602.182-1.242-.164-1.425-.766-.182-.602.164-1.242.766-1.425 4.316-1.31 11.439-1.062 15.961 1.621.542.321.72 1.022.399 1.564-.321.542-1.022.72-1.564.399l.016.008z" />
        </g>

        <circle cx="345" cy="92" r="64" fill="#121212" />
        <circle cx="345" cy="92" r="62.3" fill="none" stroke="#282828" stroke-width="1.5" />
        <circle cx="345" cy="92" r="57.4" fill="none" stroke="#181818" stroke-width="0.5" />
        <circle cx="345" cy="92" r="49.7" fill="none" stroke="#181818" stroke-width="0.5" />
        <circle cx="345" cy="92" r="47.2" fill="none" stroke="#181818" stroke-width="0.5" />
        <circle cx="345" cy="92" r="35.7" fill="none" stroke="#181818" stroke-width="0.5" />
        <g${song.isPlaying ? ` class="spin"` : ""}>
            <circle cx="345" cy="92" r="28" fill="#282828" stroke="#181818" stroke-width="0.5" />
            ${artwork
                ? `<image href="${artwork}" x="320" y="67" width="50" height="50" preserveAspectRatio="xMidYMid slice" clip-path="url(#album)" />`
                : ""}
        </g>
        <circle cx="345" cy="92" r="2.6" fill="#121212" />
        <circle cx="345" cy="92" r="2.4" fill="none" stroke="#fff" stroke-opacity="0.2" stroke-width="0.5" />
    </g>
</svg>`;
};

export async function GET() {
    let song: NowPlaying = { isPlaying: false };
    try {
        song = await getNowPlaying();
    } catch (e) {
        console.error(e);
    }

    const svg = renderCard(song, await toDataUri(song.albumImageUrl));

    return new Response(svg, {
        status: 200,
        headers: {
            "content-type": "image/svg+xml; charset=utf-8",
            // max-age=0 makes GitHub's image proxy refetch instead of holding an old song
            "cache-control": "public, max-age=0, s-maxage=30, stale-while-revalidate=30",
        },
    });
}

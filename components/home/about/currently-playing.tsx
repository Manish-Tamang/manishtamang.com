import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

interface RecentFavoriteData {
    album?: string;
    albumImageUrl?: string;
    artist?: string;
    songUrl?: string;
    title?: string;
}

export function CurrentlyPlaying({ recentFavorite }: { recentFavorite?: any }) {
    const current: RecentFavoriteData | null = recentFavorite
        ? {
            artist: recentFavorite.artist,
            album: recentFavorite.album,
            title: recentFavorite.title,
            albumImageUrl: recentFavorite.albumImageUrl,
            songUrl: recentFavorite.songUrl,
        }
        : null;

    if (!current?.title || !current.artist) return null;

    return (
        <div className="col-span-1 bg-white rounded-[12px] p-4 flex flex-col justify-between border border-zinc-200 relative overflow-hidden group">
            <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                    <div className="flex justify-between items-start mb-2">
                        <div className="text-[10px] text-[#1DB954] font-bold uppercase tracking-wider flex items-center gap-1">
                            Recent Favorite
                        </div>
                        <SpotifyLogo />
                    </div>
                    <div className="overflow-hidden mask-marquee whitespace-nowrap">
                        <div className="animate-marquee inline-block">
                            <h3 className="text-sm font-bold text-zinc-900 inline-block">
                                {current.title}
                            </h3>
                            <h3 className="text-sm font-bold text-zinc-900 inline-block ml-8">
                                {current.title}
                            </h3>
                        </div>
                    </div>
                    <p className="text-[10px] text-zinc-500 line-clamp-1">
                        {current.artist}
                    </p>
                </div>

                <Link
                    href={current.songUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[9px] text-[#1DB954] font-bold hover:underline flex items-center gap-1 group/link"
                >
                    View Track <ArrowUpRight className="w-2 h-2 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                </Link>
            </div>

            <div className="absolute -bottom-10 -right-10 transition-all duration-500 group-hover:-bottom-4 group-hover:-right-4 opacity-100 group-hover:opacity-100 group-hover:z-50 z-10 group-hover:scale-110">
                <Record
                    albumImageUrl={current.albumImageUrl || ""}
                    isPlaying={false}
                />
            </div>
        </div>
    )
}

function Record({
    albumImageUrl,
    isPlaying,
}: {
    albumImageUrl: string;
    isPlaying: boolean;
}) {
    return (
        <div className="relative w-32 h-32">
            <svg
                viewBox="0 0 179 171"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
            >
                <circle cx="89.5" cy="104.5" r="89.5" fill="#121212" />
                <circle
                    cx="89.501"
                    cy="104.5"
                    r="87.06"
                    stroke="#282828"
                    strokeWidth="2"
                />
                <circle
                    cx="89.4992"
                    cy="104.5"
                    r="80.3"
                    stroke="#181818"
                    strokeWidth="0.5"
                />
                <circle
                    cx="89.4995"
                    cy="104.5"
                    r="69.56"
                    stroke="#181818"
                    strokeWidth="0.5"
                />
                <circle
                    cx="89.4995"
                    cy="104.5"
                    r="65.98"
                    stroke="#181818"
                    strokeWidth="0.5"
                />
                <circle
                    cx="89.4999"
                    cy="104.5"
                    r="49.87"
                    stroke="#181818"
                    strokeWidth="0.5"
                />
                <g
                    className={isPlaying ? "animate-[spin_4s_linear_infinite]" : ""}
                    style={{ transformOrigin: "89.5px 104.5px" }}
                >
                    <circle
                        cx="89.5"
                        cy="104.5"
                        r="39.13"
                        fill="#282828"
                        stroke="#181818"
                        strokeWidth="0.5"
                    />
                    <defs>
                        <clipPath id="albumClip">
                            <circle cx="89.5" cy="104.5" r="35" />
                        </clipPath>
                    </defs>
                    <image
                        href={albumImageUrl}
                        x="54.5"
                        y="69.5"
                        width="70"
                        height="70"
                        clipPath="url(#albumClip)"
                    />
                </g>
                <circle cx="89.5" cy="104.5" r="3.58" fill="#121212" />
                <circle
                    cx="89.5"
                    cy="104.5"
                    r="3.33"
                    stroke="white"
                    strokeOpacity="0.2"
                    strokeWidth="0.5"
                />
            </svg>
        </div>
    );
}

function SpotifyLogo() {
    return (
        <svg
            className="w-4 h-4 text-[#1DB954]"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.494 17.308c-.216.354-.675.467-1.03.251-2.859-1.747-6.458-2.143-10.697-1.176-.406.093-.815-.162-.908-.568-.093-.406.162-.815.568-.908 4.636-1.06 8.599-.606 11.815 1.357.355.216.468.677.252 1.031v.013zm1.467-3.264c-.273.443-.849.584-1.292.311-3.272-2.012-8.259-2.593-12.127-1.417-.5.152-1.026-.131-1.178-.631-.152-.5.131-1.026.631-1.178 4.414-1.339 9.897-.687 13.655 1.619.443.273.584.85.311 1.296zm.127-3.411c-3.924-2.33-10.387-2.544-14.153-1.401-.602.182-1.242-.164-1.425-.766-.182-.602.164-1.242.766-1.425 4.316-1.31 11.439-1.062 15.961 1.621.542.321.72 1.022.399 1.564-.321.542-1.022.72-1.564.399l.016.008z" />
        </svg>
    );
}

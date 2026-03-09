import { headers } from "next/headers";
import { WakaTimeOverview } from "@/components/dashboard/wakatime-overview";
import type { WakaTimeApiResponse } from "@/lib/wakatime-types";
import GithubContribution from "@/components/github-contribution";
import { getBlogPostStats } from "@/lib/BlogStats";
import { BlogStatsTable } from "@/components/dashboard/blog-stats-table";
import { RecentUmamiSessions } from "@/components/dashboard/recent-umami-sessions";

export const revalidate = 60;

interface UmamiSession {
    id?: string;
    url?: string;
    hostname?: string;
    browser?: string;
    os?: string;
    device?: string;
    country?: string;
    city?: string;
    createdAt?: number;
    visitedAt?: number;
}

async function getInitialWakaTimeData(): Promise<WakaTimeApiResponse | null> {
    const headerStore = await headers();
    const forwardedHost = headerStore.get("x-forwarded-host");
    const host = forwardedHost ?? headerStore.get("host");

    if (!host) {
        return null;
    }

    const protocol =
        headerStore.get("x-forwarded-proto") ??
        (host.includes("localhost") ? "http" : "https");

    try {
        const response = await fetch(`${protocol}://${host}/api/wakatime`, {
            next: { revalidate: 60 },
        });

        if (!response.ok) {
            return null;
        }

        return (await response.json()) as WakaTimeApiResponse;
    } catch {
        return null;
    }
}

async function getRecentSessions(): Promise<UmamiSession[]> {
    const headerStore = await headers();
    const forwardedHost = headerStore.get("x-forwarded-host");
    const host = forwardedHost ?? headerStore.get("host");

    if (!host) {
        return [];
    }

    const protocol =
        headerStore.get("x-forwarded-proto") ??
        (host.includes("localhost") ? "http" : "https");

    try {
        const response = await fetch(
            `${protocol}://${host}/api/umami?type=sessions&limit=3`,
            {
                next: { revalidate: 60 },
            }
        );

        if (!response.ok) {
            return [];
        }

        const payload = (await response.json()) as { data?: UmamiSession[] };
        if (!Array.isArray(payload.data)) {
            return [];
        }

        return payload.data.slice(0, 3);
    } catch {
        return [];
    }
}

export default async function DashboardPage() {
    const [initialData, blogStats, recentSessions] = await Promise.all([
        getInitialWakaTimeData(),
        getBlogPostStats(),
        getRecentSessions(),
    ]);

    return (
        <main className="min-h-[80vh] px-6 py-8 sm:py-12">
            <section className="mx-auto w-full max-w-152.5 space-y-8">
                <header className="space-y-3 max-w-2xl">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-mono">
                        Dashboard
                    </p>
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        Coding Activity
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed">
                        Real-time coding statistics from <a href="https://wakatime.com/@manishtamang" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline decoration-wavy">WakaTime</a>. Tracking my development journey across all projects and languages.
                    </p>
                </header>

                <WakaTimeOverview initialData={initialData} />
                <section className="space-y-3 max-w-2xl ">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        Contribution Graph
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed">
                        A quick view of my activity and open-source contribution streak on <a href="https://github.com/Manish-Tamang" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline decoration-wavy">GitHub</a>.
                    </p>
                </section>
                <GithubContribution />
                <section className="space-y-3">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        Recent Sessions
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed">
                        Latest 3 visits captured from <a href="https://manish-analytics.vercel.app/share/jFK5VpX2c6h2JgRg/manishtamang.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline decoration-wavy">Umami analytics</a>.
                    </p>
                    <RecentUmamiSessions sessions={recentSessions} />
                </section>
                <section className="space-y-3">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        Blog Statistics
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed">
                        Views and reactions across all blog posts.
                    </p>
                    <BlogStatsTable posts={blogStats} />
                </section>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-8">
                    This page is inspired by <a href="https://theodorusclarence.com/statistics" className="underline">Theodorus Clarence (Blog stats)</a>and <a href="https://victoreke.com/" className="underline">Victor Eke (Contribution Graph)</a>.
                </p>
            </section>
            
        </main>
    );
}

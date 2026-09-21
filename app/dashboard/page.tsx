import { headers } from "next/headers";
import { WakaTimeOverview, GithubContribution, BlogStatsTable, RecentUmamiSessions, UmamiTotals, DailyBookmarks } from "@/components/dashboard";
import type { WakaTimeApiResponse } from "@/lib/wakatime-types";
import type { DailyBookmark } from "@/lib/daily-types";
import { getBlogPostStats } from "@/lib/BlogStats";
import { getUmamiRecentSessions, getUmamiTotals } from "@/lib/umami";
import { getDailyBookmarks } from "@/lib/daily";

export const revalidate = 60;

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

async function getRecentSessions() {
    return getUmamiRecentSessions(3);
}

async function getDailyDevBookmarks(): Promise<DailyBookmark[]> {
    try {
        const payload = await getDailyBookmarks({ limit: 8 });
        return payload.data;
    } catch {
        return [];
    }
}

export default async function DashboardPage() {
    const [initialData, blogStats, recentSessions, umamiTotals, dailyBookmarks] = await Promise.all([
        getInitialWakaTimeData(),
        getBlogPostStats(),
        getRecentSessions(),
        getUmamiTotals(),
        getDailyDevBookmarks(),
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
                <section className="space-y-5">
                    <div className="space-y-3">
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                            Site Traffic
                        </h2>
                        <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed">
                            Visitors, visits, and page views from <a href="https://manish-analytics.vercel.app/share/jFK5VpX2c6h2JgRg/manishtamang.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline decoration-wavy">Umami</a> since Oct 18, 2024. Recent sessions show the latest 3 visits.
                        </p>
                    </div>
                    <UmamiTotals totals={umamiTotals} />
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
                <section className="space-y-3">
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                        Reading List
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-400 text-base leading-relaxed">
                        Latest articles I saved on <a href="https://app.daily.dev/bookmarks" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline decoration-wavy">daily.dev</a>.
                    </p>
                    <DailyBookmarks bookmarks={dailyBookmarks} />
                </section>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-8">
                    This page is inspired by <a href="https://theodorusclarence.com/statistics" target="_blank" rel="noopener noreferrer" className="underline">Theodorus Clarence (Blog stats)</a>and <a href="https://victoreke.com/" target="_blank" rel="noopener noreferrer" className="underline">Victor Eke (Contribution Graph)</a>.
                </p>
            </section>
            
        </main>
    );
}

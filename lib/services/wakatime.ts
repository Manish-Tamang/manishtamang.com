/* WakaTime all-time stats, ported from the Next.js site. */
import { WAKATIME_ACCESS_TOKEN } from "astro:env/server"
import type { Contribution } from "@/lib/services/github"

export interface WakaTimeSummary {
  totalSeconds: number
  totalTimeText: string
  dailyAverageSeconds: number
  dailyAverageText: string
  bestDayDate: string | null
  bestDaySeconds: number
  bestDayText: string
}

export interface WakaTimeApiResponse {
  summary: WakaTimeSummary
  updatedAt: string
}

const STATS_ENDPOINT = "https://wakatime.com/api/v1/users/current/stats/all_time";

function formatDuration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return "0 mins";
  }

  const roundedSeconds = Math.round(seconds);
  const totalHours = Math.floor(roundedSeconds / 3600);
  const minutes = Math.floor((roundedSeconds % 3600) / 60);

  if (totalHours > 0) {
    if (minutes > 0) {
      return `${totalHours}h ${minutes}m`;
    }
    return `${totalHours}h`;
  }

  return `${Math.max(minutes, 1)}m`;
}

export async function getWakaTimeStats(): Promise<WakaTimeApiResponse> {
  const accessToken = WAKATIME_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error("No WakaTime access token found. Please authenticate.");
  }

  const response = await fetch(STATS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`WakaTime API Error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  const statsData = data?.data;

  const totalSeconds = statsData?.categories?.reduce((sum: number, category: any) => {
    return sum + (category.total_seconds || 0);
  }, 0) || 0;

  const totalTimeText = formatDuration(totalSeconds);

  const rangeDays = statsData?.days_minus_holidays || 1;
  const dailyAverageSeconds = totalSeconds / rangeDays;
  const dailyAverageText = formatDuration(dailyAverageSeconds);

  const bestDaySeconds = statsData?.best_day?.total_seconds || 0;
  const bestDayText = statsData?.best_day?.text || formatDuration(bestDaySeconds);
  const bestDayDate = statsData?.best_day?.date || null;

  return {
    summary: {
      totalSeconds,
      totalTimeText,
      dailyAverageSeconds,
      dailyAverageText,
      bestDayDate,
      bestDaySeconds,
      bestDayText,
    },
    updatedAt: new Date().toISOString(),
  };
}

// Hours coded per day for the last year. The public endpoint behind the heatmap on my
// WakaTime profile: needs no token, but it's undocumented, so it may change without notice.
const PUBLIC_DAYS_ENDPOINT = "https://wakatime.com/api/v1/users/683edc2d-f7c3-4c58-a817-73299e89b1b3/insights/days/public";

export async function getCodingActivity(): Promise<Contribution[]> {
  const response = await fetch(PUBLIC_DAYS_ENDPOINT);
  if (!response.ok) throw new Error(`WakaTime days ${response.status}`);

  const days: { date: string; total: number }[] = (await response.json())?.data?.days ?? [];
  return days.map(({ date, total }) => {
    const hours = total / 3600;
    return { date, count: Math.round(hours * 10) / 10, level: Math.min(Math.ceil(hours / 3), 4) };
  });
}

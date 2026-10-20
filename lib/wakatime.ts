import { WakaTimeApiResponse } from "@/lib/wakatime-types";

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
  const accessToken = process.env.WAKATIME_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error("No WakaTime access token found. Please authenticate.");
  }

  let response = await fetch(STATS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    next: { revalidate: 60 },
  });

  if (response.status === 401) {
    const basicToken = btoa(`${accessToken}:`);
    response = await fetch(STATS_ENDPOINT, {
      headers: {
        Authorization: `Basic ${basicToken}`,
      },
      next: { revalidate: 60 },
    });
  }

  if (response.status === 401) {
    response = await fetch(`${STATS_ENDPOINT}?api_key=${accessToken}`, {
      next: { revalidate: 60 },
    });
  }

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

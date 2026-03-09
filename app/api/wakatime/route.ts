import { NextRequest, NextResponse } from "next/server";
import { WakaTimeApiResponse } from "@/lib/wakatime-types";

export const runtime = "edge";

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

export async function GET(req: NextRequest) {
  const accessToken = process.env.WAKATIME_ACCESS_TOKEN;

  if (!accessToken) {
    return NextResponse.json(
      { error: "No WakaTime access token found. Please authenticate." },
      { status: 401 },
    );
  }

  try {
    let response = await fetch(
      "https://wakatime.com/api/v1/users/current/stats/all_time",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.status === 401) {
      const basicToken = btoa(`${accessToken}:`);
      response = await fetch(
        "https://wakatime.com/api/v1/users/current/stats/all_time",
        {
          headers: {
            Authorization: `Basic ${basicToken}`,
          },
        }
      );
    }

    if (response.status === 401) {
      response = await fetch(
        `https://wakatime.com/api/v1/users/current/stats/all_time?api_key=${accessToken}`
      );
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

    const payload: WakaTimeApiResponse = {
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

    return NextResponse.json(payload, {
      status: 200,
      headers: {
        "content-type": "application/json",
        "cache-control": "public, s-maxage=60, stale-while-revalidate=30",
      },
    });
  } catch (error: any) {
    console.error("Error fetching WakaTime data:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch WakaTime data.",
        message: error.message,
      },
      { status: 500 }
    );
  }
}

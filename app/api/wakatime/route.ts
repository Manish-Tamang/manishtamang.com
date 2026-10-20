import { NextResponse } from "next/server";
import { getWakaTimeStats } from "@/lib/wakatime";

export async function GET() {
  if (!process.env.WAKATIME_ACCESS_TOKEN) {
    return NextResponse.json(
      { error: "No WakaTime access token found. Please authenticate." },
      { status: 401 },
    );
  }

  try {
    const payload = await getWakaTimeStats();

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

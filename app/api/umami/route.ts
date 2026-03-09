import { NextResponse } from "next/server";

const UMAMI_API_URL = "https://api.umami.is/v1";
const UMAMI_API_KEY = process.env.UMAMI_API_KEY;
const WEBSITE_ID = process.env.WEBSITE_ID;

const DAY_MS = 24 * 60 * 60 * 1000;

function parsePositiveNumber(value: string | null): number | null {
  if (!value) {
    return null;
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return null;
  }

  return parsed;
}

export async function GET(req: Request) {
  if (!WEBSITE_ID || !UMAMI_API_KEY) {
    return NextResponse.json(
      { error: "Missing required environment variables." },
      { status: 400 }
    );
  }

  const { searchParams } = new URL(req.url);
  const type = (searchParams.get("type") ?? "active").toLowerCase();

  const now = Date.now();
  const endAt = parsePositiveNumber(searchParams.get("endAt")) ?? now;
  const startAt =
    parsePositiveNumber(searchParams.get("startAt")) ?? endAt - 90 * DAY_MS;

  const limit = parsePositiveNumber(searchParams.get("limit"));
  const offset = parsePositiveNumber(searchParams.get("offset"));

  const headers = {
    "x-umami-api-key": UMAMI_API_KEY,
    "Content-Type": "application/json",
  };

  async function fetchUmami(path: string) {
    const response = await fetch(`${UMAMI_API_URL}${path}`, { headers });

    if (!response.ok) {
      const errorText = await response.text();
      try {
        const errorJson = JSON.parse(errorText);
        throw new Error(JSON.stringify(errorJson));
      } catch {
        throw new Error(errorText);
      }
    }

    return response.json();
  }

  try {
    if (!["active", "sessions", "stats", "all"].includes(type)) {
      return NextResponse.json(
        {
          error: "Invalid type. Use one of: active, sessions, stats, all.",
          examples: {
            active: "/api/umami?type=active",
            sessions: `/api/umami?type=sessions&startAt=${startAt}&endAt=${endAt}`,
            stats: `/api/umami?type=stats&startAt=${startAt}&endAt=${endAt}`,
            all: `/api/umami?type=all&startAt=${startAt}&endAt=${endAt}`,
          },
        },
        { status: 400 }
      );
    }

    if (type === "active") {
      const data = await fetchUmami(`/websites/${WEBSITE_ID}/active`);
      return NextResponse.json(data, { status: 200 });
    }

    if (type === "sessions") {
      const params = new URLSearchParams({
        startAt: String(startAt),
        endAt: String(endAt),
      });

      if (limit !== null) {
        params.set("limit", String(limit));
      }
      if (offset !== null) {
        params.set("offset", String(offset));
      }

      const data = await fetchUmami(
        `/websites/${WEBSITE_ID}/sessions?${params.toString()}`
      );
      return NextResponse.json(data, { status: 200 });
    }

    if (type === "stats") {
      const params = new URLSearchParams({
        startAt: String(startAt),
        endAt: String(endAt),
      });

      const data = await fetchUmami(
        `/websites/${WEBSITE_ID}/stats?${params.toString()}`
      );
      return NextResponse.json(data, { status: 200 });
    }

    const params = new URLSearchParams({
      startAt: String(startAt),
      endAt: String(endAt),
    });

    if (limit !== null) {
      params.set("limit", String(limit));
    }
    if (offset !== null) {
      params.set("offset", String(offset));
    }

    const [active, sessions, stats] = await Promise.all([
      fetchUmami(`/websites/${WEBSITE_ID}/active`),
      fetchUmami(`/websites/${WEBSITE_ID}/sessions?${params.toString()}`),
      fetchUmami(
        `/websites/${WEBSITE_ID}/stats?startAt=${startAt}&endAt=${endAt}`
      ),
    ]);

    return NextResponse.json(
      {
        type: "all",
        range: { startAt, endAt },
        active,
        sessions,
        stats,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error fetching analytics:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

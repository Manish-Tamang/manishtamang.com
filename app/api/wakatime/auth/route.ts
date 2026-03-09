import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const WAKATIME_AUTHORIZE_URL = "https://wakatime.com/oauth/authorize";

export async function GET(req: NextRequest) {
  const clientId = process.env.WAKATIME_CLIENT_ID;
  const redirectUri = process.env.WAKATIME_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return NextResponse.json(
      {
        error:
          "Missing WAKATIME_CLIENT_ID or WAKATIME_REDIRECT_URI in environment.",
      },
      { status: 500 },
    );
  }

  const state = crypto.randomUUID();
  const url = new URL(WAKATIME_AUTHORIZE_URL);
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("scope", "read_stats");
  url.searchParams.set("state", state);

  const response = NextResponse.redirect(url.toString());
  response.cookies.set("wakatime_oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 600,
    path: "/",
  });

  return response;
}

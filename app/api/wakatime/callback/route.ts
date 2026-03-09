import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const WAKATIME_TOKEN_ENDPOINT = "https://wakatime.com/oauth/token";

interface TokenResponse {
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
  token_type?: string;
  scope?: string;
}

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  const state = req.nextUrl.searchParams.get("state");
  const expectedState = req.cookies.get("wakatime_oauth_state")?.value;

  if (!code) {
    return NextResponse.json(
      {
        error: "Missing authorization code from WakaTime callback.",
      },
      { status: 400 },
    );
  }

  if (!state || !expectedState || state !== expectedState) {
    return NextResponse.json(
      {
        error: "Invalid OAuth state. Please retry from /api/wakatime/auth.",
      },
      { status: 400 },
    );
  }

  const clientId = process.env.WAKATIME_CLIENT_ID;
  const clientSecret = process.env.WAKATIME_CLIENT_SECRET;
  const redirectUri = process.env.WAKATIME_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    return NextResponse.json(
      {
        error:
          "Missing WAKATIME_CLIENT_ID, WAKATIME_CLIENT_SECRET, or WAKATIME_REDIRECT_URI in environment.",
      },
      { status: 500 },
    );
  }

  const tokenResponse = await fetch(WAKATIME_TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
      code,
    }),
  });

  if (!tokenResponse.ok) {
    const errorText = await tokenResponse.text();
    return NextResponse.json(
      {
        error: "Failed to exchange authorization code for tokens.",
        message: errorText,
      },
      { status: 500 },
    );
  }

  const tokenData = (await tokenResponse.json()) as TokenResponse;
  const response = NextResponse.json(
    {
      message: "WakaTime re-authorization succeeded. Copy these into .env.",
      WAKATIME_ACCESS_TOKEN: tokenData.access_token ?? null,
      WAKATIME_REFRESH_TOKEN: tokenData.refresh_token ?? null,
      expires_in: tokenData.expires_in ?? null,
      token_type: tokenData.token_type ?? null,
      scope: tokenData.scope ?? null,
    },
    { status: 200 },
  );

  response.cookies.set("wakatime_oauth_state", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });

  return response;
}

const UMAMI_API_URL = (process.env.UMAMI_API_URL ?? "https://api.umami.is/v1").replace(/\/$/, "")
const UMAMI_API_KEY = process.env.UMAMI_API_KEY
const UMAMI_USERNAME = process.env.UMAMI_USERNAME
const UMAMI_PASSWORD = process.env.UMAMI_PASSWORD
const WEBSITE_ID = process.env.WEBSITE_ID
const DAY_MS = 24 * 60 * 60 * 1000

export type UmamiTotals = {
  visitors: number
  visits: number
  views: number
}

export type UmamiSession = {
  id?: string
  url?: string
  hostname?: string
  browser?: string
  os?: string
  device?: string
  country?: string
  city?: string
  createdAt?: number
  visitedAt?: number
}

type UmamiSessionRecord = UmamiSession & {
  firstAt?: string | number
  lastAt?: string | number
}

let cachedLoginToken: { token: string; expiresAt: number } | null = null

function parsePositiveNumber(value: string | null): number | null {
  if (!value) {
    return null
  }

  const parsed = Number(value)
  if (!Number.isFinite(parsed) || parsed < 0) {
    return null
  }

  return parsed
}

function toTimestamp(value: string | number | undefined): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value
  }

  if (typeof value === "string") {
    const parsed = Date.parse(value)
    return Number.isNaN(parsed) ? undefined : parsed
  }

  return undefined
}

function extractList(payload: unknown): unknown[] {
  if (Array.isArray(payload)) {
    return payload
  }

  if (payload && typeof payload === "object" && "data" in payload) {
    const data = (payload as { data?: unknown }).data
    if (Array.isArray(data)) {
      return data
    }
  }

  return []
}

export function normalizeUmamiSessions(payload: unknown): UmamiSession[] {
  return extractList(payload).map((item) => {
    const session = item as UmamiSessionRecord
    const createdAt = toTimestamp(session.createdAt) ?? toTimestamp(session.firstAt)
    const visitedAt =
      toTimestamp(session.visitedAt) ??
      toTimestamp(session.lastAt) ??
      createdAt

    return {
      id: session.id,
      url: session.url,
      hostname: session.hostname,
      browser: session.browser,
      os: session.os,
      device: session.device,
      country: session.country,
      city: session.city,
      createdAt,
      visitedAt,
    }
  })
}

function isSelfHosted() {
  return Boolean(UMAMI_USERNAME && UMAMI_PASSWORD)
}

async function getSelfHostedToken() {
  if (cachedLoginToken && cachedLoginToken.expiresAt > Date.now() + 30_000) {
    return cachedLoginToken.token
  }

  const response = await fetch(`${UMAMI_API_URL}/auth/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: UMAMI_USERNAME,
      password: UMAMI_PASSWORD,
    }),
    cache: "no-store",
  })

  if (!response.ok) {
    throw new Error("Umami login failed. Check UMAMI_USERNAME and UMAMI_PASSWORD.")
  }

  const payload = (await response.json()) as { token?: string }
  if (!payload.token) {
    throw new Error("Umami login did not return a token.")
  }

  cachedLoginToken = {
    token: payload.token,
    expiresAt: Date.now() + 50 * 60 * 1000,
  }

  return payload.token
}

async function getAuthHeaders(): Promise<HeadersInit> {
  if (isSelfHosted()) {
    const token = await getSelfHostedToken()
    return {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    }
  }

  if (!UMAMI_API_KEY) {
    throw new Error("Missing UMAMI_API_KEY, or set UMAMI_USERNAME and UMAMI_PASSWORD for self-hosted Umami.")
  }

  return {
    Accept: "application/json",
    Authorization: `Bearer ${UMAMI_API_KEY}`,
    "x-umami-api-key": UMAMI_API_KEY,
  }
}

async function fetchUmami(path: string) {
  if (!WEBSITE_ID) {
    throw new Error("Missing WEBSITE_ID.")
  }

  const headers = await getAuthHeaders()
  const response = await fetch(`${UMAMI_API_URL}${path}`, {
    headers,
    next: { revalidate: 60 },
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(errorText || `Umami request failed with ${response.status}`)
  }

  return response.json()
}

function buildRange(searchParams?: URLSearchParams) {
  const now = Date.now()
  const endAt = parsePositiveNumber(searchParams?.get("endAt") ?? null) ?? now
  const startAt =
    parsePositiveNumber(searchParams?.get("startAt") ?? null) ?? endAt - 90 * DAY_MS
  const limit = parsePositiveNumber(searchParams?.get("limit") ?? null)
  const offset = parsePositiveNumber(searchParams?.get("offset") ?? null)

  return { startAt, endAt, limit, offset }
}

function sessionParams(startAt: number, endAt: number, limit: number | null, offset: number | null) {
  const params = new URLSearchParams({
    startAt: String(startAt),
    endAt: String(endAt),
  })

  if (limit !== null) {
    params.set("pageSize", String(limit))
  }

  if (offset !== null && limit) {
    params.set("page", String(Math.floor(offset / limit) + 1))
  }

  return params
}

function readMetric(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value
  }

  if (value && typeof value === "object" && "value" in value) {
    const inner = (value as { value?: unknown }).value
    if (typeof inner === "number" && Number.isFinite(inner)) {
      return inner
    }
  }

  return 0
}

export async function getUmamiTotals(): Promise<UmamiTotals | null> {
  try {
    const startAt = Date.parse("2024-10-18T00:00:00.000Z")
    const endAt = Date.now()
    const params = new URLSearchParams({
      startAt: String(startAt),
      endAt: String(endAt),
    })
    const payload = await fetchUmami(`/websites/${WEBSITE_ID}/stats?${params.toString()}`) as {
      visitors?: unknown
      visits?: unknown
      pageviews?: unknown
    }

    return {
      visitors: readMetric(payload?.visitors),
      visits: readMetric(payload?.visits),
      views: readMetric(payload?.pageviews),
    }
  } catch (error) {
    console.error("Error fetching analytics totals:", error)
    return null
  }
}

export async function getUmamiRecentSessions(limit = 3): Promise<UmamiSession[]> {
  try {
    const { startAt, endAt } = buildRange()
    const params = sessionParams(startAt, endAt, limit, null)
    const payload = await fetchUmami(`/websites/${WEBSITE_ID}/sessions?${params.toString()}`)
    return normalizeUmamiSessions(payload).slice(0, limit)
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return []
  }
}

export async function getUmamiPayload(type: string, searchParams: URLSearchParams) {
  if (!["active", "sessions", "stats", "all"].includes(type)) {
    throw new Error("Invalid type. Use one of: active, sessions, stats, all.")
  }

  const { startAt, endAt, limit, offset } = buildRange(searchParams)

  if (type === "active") {
    return fetchUmami(`/websites/${WEBSITE_ID}/active`)
  }

  if (type === "sessions") {
    const params = sessionParams(startAt, endAt, limit, offset)
    const payload = await fetchUmami(
      `/websites/${WEBSITE_ID}/sessions?${params.toString()}`
    )
    return { data: normalizeUmamiSessions(payload) }
  }

  if (type === "stats") {
    const params = new URLSearchParams({
      startAt: String(startAt),
      endAt: String(endAt),
    })
    return fetchUmami(`/websites/${WEBSITE_ID}/stats?${params.toString()}`)
  }

  const params = sessionParams(startAt, endAt, limit, offset)
  const [active, sessions, stats] = await Promise.all([
    fetchUmami(`/websites/${WEBSITE_ID}/active`),
    fetchUmami(`/websites/${WEBSITE_ID}/sessions?${params.toString()}`),
    fetchUmami(`/websites/${WEBSITE_ID}/stats?startAt=${startAt}&endAt=${endAt}`),
  ])

  return {
    type: "all",
    range: { startAt, endAt },
    active,
    sessions: { data: normalizeUmamiSessions(sessions) },
    stats,
  }
}

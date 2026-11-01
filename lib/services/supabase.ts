/*
 * Server-side Supabase REST calls with the service role key. Uses the API
 * directly to avoid shipping supabase-js for a few queries.
 */
import { SUPABASE_SERVICE_ROLE_KEY, SUPABASE_URL } from "astro:env/server"

export async function supabase(path: string, init?: RequestInit) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) throw new Error("Supabase is not configured")

  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      "content-type": "application/json",
      ...init?.headers,
    },
  })
  if (!response.ok) throw new Error(`Supabase ${response.status}: ${await response.text()}`)

  // Inserts and updates come back empty
  const body = await response.text()
  return body ? JSON.parse(body) : null
}

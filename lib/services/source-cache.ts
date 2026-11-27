/*
 * Last good reply from a slow API, kept in Supabase (source_cache). The live call
 * gets a head start; if it's late or fails, the stored copy is shown instead.
 */
import { supabase } from "@/lib/services/supabase"

const save = (key: string, value: unknown) =>
  supabase("source_cache?on_conflict=key", {
    method: "POST",
    headers: { prefer: "resolution=merge-duplicates" },
    body: JSON.stringify({ key, value, updated_at: new Date().toISOString() }),
  }).catch((error) => console.error(`Failed to cache ${key}:`, error))

const load = async <T>(key: string): Promise<T | undefined> => {
  try {
    const rows: { value: T }[] | null = await supabase(`source_cache?key=eq.${encodeURIComponent(key)}&select=value`)
    return rows?.[0]?.value
  } catch (error) {
    console.error(`Failed to read cached ${key}:`, error)
    return undefined
  }
}

export async function withFallback<T>(key: string, fetchLive: () => Promise<T>, wait = 2500): Promise<T> {
  const stored = load<T>(key)
  // Saved even when it lands after we've moved on, so a slow reply still refreshes the cache
  const live = fetchLive().then(async (value) => {
    await save(key, value)
    return value
  })

  const late = Symbol()
  const first = await Promise.race([
    live,
    new Promise<typeof late>((resolve) => setTimeout(() => resolve(late), wait)),
  ]).catch(() => late)
  if (first !== late) return first

  const copy = await stored
  if (copy !== undefined) {
    live.catch(() => {})
    return copy
  }
  return live
}

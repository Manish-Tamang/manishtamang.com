/* Per-user limits for guestbook writes, counted in Vercel's Runtime Cache. Close enough, not exact. */
import { getCache } from "@vercel/functions"

const LIMITS = {
  post: { max: 5, seconds: 10 * 60 },
  react: { max: 30, seconds: 60 },
  upload: { max: 5, seconds: 10 * 60 },
}

export type LimitedAction = keyof typeof LIMITS

/** Counts this attempt; false once the user is over the limit for the current window. */
export async function allow(action: LimitedAction, userId: string) {
  const { max, seconds } = LIMITS[action]
  const key = `guestbook-limit:${action}:${userId}`
  const now = Date.now()

  try {
    const cache = getCache()
    const stored = (await cache.get(key)) as { count: number; resetAt: number } | undefined
    const window = stored && stored.resetAt > now ? stored : { count: 0, resetAt: now + seconds * 1000 }
    if (window.count >= max) return false

    const ttl = Math.max(1, Math.ceil((window.resetAt - now) / 1000))
    await cache.set(key, { count: window.count + 1, resetAt: window.resetAt }, { ttl, name: "Guestbook rate limit" })
    return true
  } catch (error) {
    console.error("Guestbook rate limit failed:", error)
    return true
  }
}

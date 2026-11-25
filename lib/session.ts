/*
 * The signed-in user for server routes. Better Auth and its Postgres pool load
 * only when the request carries a session cookie, so signed-out visitors (most
 * of them) skip that work, cold start included.
 */
const SESSION_COOKIE = /(?:^|;\s*)(?:__Secure-)?better-auth\.session_token=/

export async function getUser(request: Request) {
  if (!SESSION_COOKIE.test(request.headers.get("cookie") ?? "")) return null
  const { getUser } = await import("@/lib/auth")
  return getUser(request)
}

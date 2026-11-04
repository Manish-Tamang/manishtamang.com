/*
 * Better Auth, sharing the old site's user/session/account tables and secret,
 * so accounts and signed-in sessions carry over.
 */
import { betterAuth } from "better-auth"
import { admin } from "better-auth/plugins"
import { Pool } from "pg"
import {
  ADMIN_EMAIL,
  BETTER_AUTH_SECRET,
  BETTER_AUTH_URL,
  DATABASE_URL,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from "astro:env/server"

export const adminEmail = (ADMIN_EMAIL ?? "").toLowerCase()

export const auth = betterAuth({
  database: new Pool({ connectionString: DATABASE_URL, ssl: { rejectUnauthorized: false } }),
  secret: BETTER_AUTH_SECRET,
  baseURL: BETTER_AUTH_URL || "https://manishtamang.com",
  trustedOrigins: ["https://manishtamang.com", "http://localhost:4321"],
  // The session rides along in a signed cookie for 5 minutes, so most requests
  // (the guestbook page and its API) skip the database round trip to check it
  session: { cookieCache: { enabled: true, maxAge: 5 * 60 } },
  socialProviders: {
    github: { clientId: GITHUB_CLIENT_ID ?? "", clientSecret: GITHUB_CLIENT_SECRET ?? "" },
    google: { clientId: GOOGLE_CLIENT_ID ?? "", clientSecret: GOOGLE_CLIENT_SECRET ?? "" },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          if (adminEmail && user.email.toLowerCase() === adminEmail) {
            return { data: { ...user, role: "admin" } }
          }
        },
      },
    },
  },
  plugins: [admin()],
})

/** The signed-in user, or null when there is none or auth isn't configured. */
export async function getUser(request: Request) {
  try {
    const session = await auth.api.getSession({ headers: request.headers })
    return session?.user ?? null
  } catch (error) {
    console.error(error)
    return null
  }
}

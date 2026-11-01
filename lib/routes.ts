/*
 * URL inventory carried over from the Next.js site (manishtamang.com).
 * Every URL here must keep working after the migration — `pnpm check:urls`
 * verifies the build against migration/sitemap-urls.txt.
 *
 * Blog posts come from the content collection (content/blog). Project
 * slugs are temporary until projects move into a collection too.
 */

type ChangeFrequency = "daily" | "weekly" | "monthly" | "yearly"

export const staticPages: { path: string; changefreq: ChangeFrequency; priority: number }[] = [
  { path: "/", changefreq: "weekly", priority: 1 },
  { path: "/about", changefreq: "monthly", priority: 0.8 },
  { path: "/projects", changefreq: "weekly", priority: 0.9 },
  { path: "/blog", changefreq: "weekly", priority: 0.9 },
  { path: "/guestbook", changefreq: "daily", priority: 0.7 },
  { path: "/photos", changefreq: "weekly", priority: 0.6 },
  { path: "/uses", changefreq: "monthly", priority: 0.6 },
  { path: "/bookmarks", changefreq: "monthly", priority: 0.6 },
  { path: "/bio", changefreq: "monthly", priority: 0.6 },
  { path: "/contact", changefreq: "yearly", priority: 0.5 },
  { path: "/dashboard", changefreq: "daily", priority: 0.5 },
  { path: "/digitalpathshala", changefreq: "yearly", priority: 0.5 },
  { path: "/colophon", changefreq: "yearly", priority: 0.4 },
  { path: "/manifest", changefreq: "monthly", priority: 0.4 },
]

export const legacyProjectSlugs = [
  "techniwas",
  "himalayan-beauty-and-spa",
  "tech-connects-2027",
  "trek-adviser",
  "travaction-nepal",
  "maltaed-connects",
  "mvti",
  "godawari-lan-2026",
  "beefinance",
  "upaayax",
  "godawari-hacks",
  "yeti-photobooth",
  "newsletter-management-app",
  "web-nepal",
  "mp3-metadata-editor",
  "lyricsverse",
  "imocinema",
  "spotidown",
  "boquet-site",
  "manish-tamang",
  "ghaam-chhaya",
  "github-profile-viewer",
  "opera-surgical-centre",
  "school-diary",
  "my-first-astro-project",
  "blogging-website",
  "todo-list",
  "yabesh-thapa-fanmade-site",
  "school-website-demo",
]

/*
 * Server endpoints from the Next.js app. They need the Vercel adapter and are
 * ported when their features are rebuilt. /api/now-playing/svg is embedded in
 * the GitHub profile README, and the WakaTime OAuth callback URL is registered
 * with WakaTime, so neither path may change.
 */
export const apiEndpoints = [
  "/api/auth/[...better-auth]",
  "/api/blog-views/[slug]",
  "/api/daily/bookmarks",
  "/api/guestbook",
  "/api/guestbook/send-email",
  "/api/now-playing",
  "/api/now-playing/open",
  "/api/now-playing/svg",
  "/api/umami",
  "/api/wakatime",
  "/api/wakatime/auth",
  "/api/wakatime/callback",
]

// Verifies every URL from the old site's sitemap (migration/sitemap-urls.txt)
// is produced by the Astro build. Run after `astro build`.
import { existsSync, readFileSync } from "node:fs"

// The Vercel adapter writes static files to .vercel/output/static; without it they land in dist/
const root = existsSync(".vercel/output/static") ? ".vercel/output/static" : "dist"

const urls = readFileSync(new URL("../migration/sitemap-urls.txt", import.meta.url), "utf8")
  .split("\n")
  .map((line) => line.trim())
  .filter(Boolean)

// Also served by the old site but not listed in its sitemap.
const extras = ["/sitemap.xml", "/robots.txt", "/feed.xml", "/llms.txt", "/404"]

// A page may be built as /about.html or /about/index.html; both serve /about
function isBuilt(path) {
  if (path === "/") return existsSync(`${root}/index.html`)
  if (/\.[a-z]+$/.test(path)) return existsSync(`${root}${path}`)
  return existsSync(`${root}${path}.html`) || existsSync(`${root}${path}/index.html`)
}

// Rendered on request, so there's no file to find.
const serverRendered = ["/guestbook", "/dashboard"]

const missing = [...urls, ...extras].filter((path) => !serverRendered.includes(path) && !isBuilt(path))

if (missing.length) {
  console.error(`✗ ${missing.length} URL(s) missing from the build:\n${missing.map((p) => `  ${p}`).join("\n")}`)
  process.exit(1)
}

console.log(`✓ All ${urls.length + extras.length} URLs are built (${root}).`)

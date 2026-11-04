// @ts-check
import { defineConfig, envField, fontProviders } from "astro/config"
import tailwindcss from "@tailwindcss/vite"
import vercel from "@astrojs/vercel"
import mdx from "@astrojs/mdx"
import { existsSync, readdirSync, readFileSync } from "node:fs"

// Slugs and titles for server routes, so they don't bundle every post's content
const blogIndex = readdirSync("content/blog").flatMap((slug) => {
  const file = `content/blog/${slug}/index.mdx`
  if (!existsSync(file)) return []
  const source = readFileSync(file, "utf8")
  if (/^draft: true$/m.test(source)) return []
  return [{ slug, title: JSON.parse(source.match(/^title: (".*")$/m)[1]) }]
})

// https://astro.build/config
export default defineConfig({
  site: "https://manishtamang.com",

  // Source lives at the repo root (components/, pages/, ...) rather than in src/
  srcDir: ".",

  // Pages are prerendered; only routes with `prerender = false` (the API) run on Vercel.
  adapter: vercel(),
  integrations: [mdx()],

  // Code blocks are highlighted at build time; both themes are emitted as CSS variables
  // and switched by the .dark class in prose.css
  markdown: {
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark" },
      defaultColor: false,
    },
  },

  // Fetch a page's HTML as soon as its link is hovered or focused, so the click opens it
  // from cache, like the Next.js site's <Link> did. Fetch only: Astro's clientPrerender
  // would run the page's scripts on hover and count blog views nobody made.
  prefetch: { prefetchAll: true, defaultStrategy: "hover" },

  // The Next.js site serves /about, never /about/ — keep URLs identical.
  trailingSlash: "never",
  build: {
    format: "file",
    // The site's CSS is ~18 KB (~5 KB compressed). Inlining it saves the round trip that
    // held the first paint on slow phones, for a few KB more per page.
    inlineStylesheets: "always",
  },

  env: {
    schema: {
      LASTFM_API_KEY: envField.string({ context: "server", access: "secret", optional: true }),
      LASTFM_USERNAME: envField.string({ context: "server", access: "secret", optional: true }),
      DATABASE_URL: envField.string({ context: "server", access: "secret", optional: true }),
      BETTER_AUTH_SECRET: envField.string({ context: "server", access: "secret", optional: true }),
      BETTER_AUTH_URL: envField.string({ context: "server", access: "secret", optional: true }),
      GITHUB_CLIENT_ID: envField.string({ context: "server", access: "secret", optional: true }),
      GITHUB_CLIENT_SECRET: envField.string({ context: "server", access: "secret", optional: true }),
      GOOGLE_CLIENT_ID: envField.string({ context: "server", access: "secret", optional: true }),
      GOOGLE_CLIENT_SECRET: envField.string({ context: "server", access: "secret", optional: true }),
      ADMIN_EMAIL: envField.string({ context: "server", access: "secret", optional: true }),
      RESEND_API_KEY: envField.string({ context: "server", access: "secret", optional: true }),
      UMAMI_API_URL: envField.string({ context: "server", access: "secret", optional: true }),
      UMAMI_API_KEY: envField.string({ context: "server", access: "secret", optional: true }),
      UMAMI_USERNAME: envField.string({ context: "server", access: "secret", optional: true }),
      UMAMI_PASSWORD: envField.string({ context: "server", access: "secret", optional: true }),
      WEBSITE_ID: envField.string({ context: "server", access: "secret", optional: true }),
      WAKATIME_ACCESS_TOKEN: envField.string({ context: "server", access: "secret", optional: true }),
      WAKATIME_CLIENT_ID: envField.string({ context: "server", access: "secret", optional: true }),
      WAKATIME_CLIENT_SECRET: envField.string({ context: "server", access: "secret", optional: true }),
      WAKATIME_REDIRECT_URI: envField.string({ context: "server", access: "secret", optional: true }),
      DAILY_API_KEY: envField.string({ context: "server", access: "secret", optional: true }),
      SUPABASE_URL: envField.string({ context: "server", access: "secret", optional: true }),
      SUPABASE_SERVICE_ROLE_KEY: envField.string({ context: "server", access: "secret", optional: true }),
      // Web3Forms access keys are designed to be public; the form posts straight to their API
      PUBLIC_WEB3FORMS_ACCESS_KEY: envField.string({ context: "client", access: "public", optional: true }),
      // Anon key only: the guestbook uploads images straight to Supabase Storage from the browser
      PUBLIC_SUPABASE_URL: envField.string({ context: "client", access: "public", optional: true }),
      PUBLIC_SUPABASE_ANON_KEY: envField.string({ context: "client", access: "public", optional: true }),
      PUBLIC_CALENDLY_URL: envField.string({ context: "client", access: "public", optional: true }),
    },
  },

  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Inter",
      cssVariable: "--font-inter",
      // Full range: section headings use 200, display headings 700.
      weights: ["100 900"],
      styles: ["normal", "italic"],
      subsets: ["latin", "latin-ext"],
      fallbacks: ["ui-sans-serif", "system-ui", "sans-serif"],
    },
    {
      // Custom display face for the name, carried over from the Next.js site.
      // Latin letters only, single weight.
      provider: fontProviders.local(),
      name: "MyFont",
      cssVariable: "--font-myfont",
      options: {
        variants: [{ src: ["./assets/fonts/MyFont-Regular.woff2"], weight: 400, style: "normal" }],
      },
      fallbacks: ["ui-sans-serif", "sans-serif"],
    },
  ],

  // Production images are all built ahead of time, so the on-demand route (and sharp) stay out of
  // the server bundle. The dev server generates images through that route, so it keeps the real one.
  image: process.argv.includes("build") ? { endpoint: { entrypoint: "./lib/image-endpoint.ts" } } : {},

  vite: {
    plugins: [tailwindcss()],
    define: { __BLOG_INDEX__: JSON.stringify(blogIndex) },
  },
})

---
title: "manishtamang.com"
tagline: "My personal site, rebuilt from Next.js to Astro"
description: "My personal website: a blog, projects, photos, a guestbook and a set of IndieWeb slash pages. Rebuilt in late 2026 from Next.js to Astro, so pages ship almost no JavaScript and load fast even on slow phones."
metaDescription: "manishtamang.com, my personal site, rebuilt from Next.js and Sanity to Astro with content in the repo: fast pages, a guestbook, slash pages and more."
date: "2025-03-01T14:52:00.000Z"
updated: "2026-11-04T00:00:00.000Z"
projectUrl: "https://manishtamang.com/"
githubUrl: "https://github.com/Manish-Tamang/manishtamang.com"
tech: ["Astro", "TypeScript", "Tailwind CSS", "MDX", "Supabase", "Better Auth"]
cover: ./cover.webp
coverAlt: "The manishtamang.com home page: sidebar navigation, the hero with my pixel character, and the About cards"
---

This is the site you're on. I first built it in 2025 with Next.js and Sanity, and in late 2026 I rebuilt it from scratch with Astro.

## Why I rebuilt it

The old site shipped 400 to 800 KB of compressed JavaScript on every page, even ones that were mostly text. I wanted pages that are just HTML and CSS unless something on them actually needs a script.

So the rebuild is mostly static: every page is built ahead of time, except the guestbook and the dashboard, which need live data. Content moved out of Sanity into the repo, as Markdown and MDX next to their images. Every URL from the old site still works.

![The previous version of the site, built with Next.js](./previous-version.webp)

## What's on it

- **A blog and projects**, written in MDX, with blurred image previews while photos load and an image viewer for every photo.
- **Story pages** like [/bio](/bio) and [/about](/about), laid out as one calm reading column.
- **A guestbook** where you sign in with GitHub or Google and can write with bold, italic, links and code.
- **Blog reactions and view counts** in Supabase, carried over from the old site's Firebase.
- **A [dashboard](/dashboard)** of live stats: coding time, music, GitHub activity and site traffic.
- **Slash pages** such as [/now](/now), [/uses](/uses), [/ai](/ai) and [/changelog](/changelog).

![The /bio page: a photo banner, then a single reading column](./bio.webp)

## Small details I care about

- The type is Inter, tuned per size, with line heights on whole pixels so text lines up.
- Selecting text draws a rounded marker highlight instead of the browser's default.
- Photos are optimized at build time, with phone-sized crops where it matters.

## How fast it is

On PageSpeed Insights the home page scores 100 on desktop and 96 on a throttled mobile connection, and it weighs well under 1 MB.

/*
 * Content for the slash pages (https://slashpages.net). Edit the lists here;
 * the pages render whatever is in them.
 */

export const slashPages = [
  {
    href: "/now",
    label: "Now",
    description: "What I'm focused on at the moment.",
  },
  {
    href: "/friends",
    label: "Friends",
    description: "People on the internet I like and admire.",
  },
  {
    href: "/nope",
    label: "Nope",
    description: "Things I don't like or don't want to do.",
  },
  { href: "/guy", label: "Guy", description: "The things I'm a guy for." },
  {
    href: "/verify",
    label: "Verify",
    description: "My online identities, and how to check they're really me.",
  },
  { href: "/ai", label: "AI", description: "How I use, and don't use, AI." },
  {
    href: "/changelog",
    label: "Changelog",
    description: "Changes to this website.",
  },
  {
    href: "/concerts",
    label: "Concerts",
    description: "Concerts and live shows I've been to.",
  },
  {
    href: "/slashes",
    label: "Slashes",
    description: "An index of all my slash pages.",
  },
  {
    href: "/chris-cornell",
    label: "Chris Cornell",
    description: "A tribute to Chris Cornell and my favourite songs of his.",
  },
  {
    href: "/blank",
    label: "Blank",
    description: "A page left intentionally blank.",
  },
] as const;

/* Slash pages that live in the main navigation, listed on /slashes only. */
export const otherSlashPages = [
  { href: "/about", description: "Who I am and what I do." },
  { href: "/bio", description: "A personal journal." },
  { href: "/bookmarks", description: "Tools, resources and places on the web I keep coming back to." },
  { href: "/colophon", description: "How this website is made." },
  { href: "/contact", description: "How to get in touch with me." },
  { href: "/dashboard", description: "Live coding activity, site traffic and blog statistics." },
  { href: "/guestbook", description: "Leave a comment and say hello." },
  { href: "/manifest", description: "My goals, bucket list and things I want to do." },
  { href: "/uses", description: "The hardware, software and tools I use." },
];

export const now: { heading: string; items: string[] }[] = [
  {
    heading: "Working on",
    items: [
      "Rebuilding this site in Astro, with every old URL kept and almost no JavaScript.",
      "Freelance websites for clients in Nepal and Finland.",
    ],
  },
  {
    heading: "Life",
    items: ["Finished my +2 at Sushma Godawari College in April 2026."],
  },
  {
    heading: "Learning",
    items: ["To play guitar."],
  },
];

export const nope: { item: string; note?: string }[] = [
  { item: "Receive notifications from Instagram and TikTok" },
  { item: "Get a surprise" },
  { item: "Suggest someone the best laptop for their needs" },
  { item: "Someone asking me to track an IP address or phone number, fuck you" },
  { item: "Someone asking me if I know hacking, fuck you" },
  { item: "Visit AI slop sites" },
  { item: "Listen to AI music" },
  { item: "AI videos and poster designs, fuck them" },
];

export const guy: {
  thing: string;
  /** Replaces the ending "guy." for the odd one out. */
  ending?: string;
  /** Small tooltip on the highlighted word. */
  tooltip?: string;
}[] = [
  { thing: " typography" },
  { thing: " rounded 4px" },
  { thing: " Barahsinghe", tooltip: "It's a Nepali beer" },
  { thing: " slashpages", ending: "guy now!" },
  { thing: " IndieWeb" },
  { thing: " lazy" },
  { thing: " anti-Microslop" },
  { thing: " Figma" },
  { thing: " terminal" },
];

/* Links here get rel="me", which IndieWeb tools use to confirm identity. */
export const verify: {
  platform: string;
  handle: string;
  url: string;
  follow?: true;
}[] = [
  {
    platform: "GitHub",
    handle: "Manish-Tamang",
    url: "https://github.com/Manish-Tamang",
    follow: true,
  },
  {
    platform: "X",
    handle: "@Manishtamangxyz",
    url: "https://x.com/Manishtamangxyz",
    follow: true,
  },
  {
    platform: "daily.dev",
    handle: "manishtamang",
    url: "https://app.daily.dev/manishtamang",
  },
  {
    platform: "Facebook",
    handle: "manishgoletamang",
    url: "https://www.facebook.com/manishgoletamang",
  },
  {
    platform: "Instagram",
    handle: "golecodes",
    url: "https://instagram.com/golecodes",
  },
  {
    platform: "LinkedIn",
    handle: "manish-tamang",
    url: "https://www.linkedin.com/in/manish-tamang",
  },
  {
    platform: "Mastodon",
    handle: "@manishtamang@mastodon.social",
    url: "https://mastodon.social/@manishtamang",
  },
  {
    platform: "roadmap.sh",
    handle: "manishgoletamang",
    url: "https://roadmap.sh/u/manishgoletamang",
  },
  {
    platform: "Spotify",
    handle: "Manish Tamang",
    url: "https://open.spotify.com/user/312oyde775lkkvggafnwvubej5mi",
  },
  {
    platform: "Stack Overflow",
    handle: "manish-tamang",
    url: "https://stackoverflow.com/users/25151640/manish-tamang",
  },
  {
    platform: "TikTok",
    handle: "golecodes",
    url: "https://www.tiktok.com/@golecodes",
  },
  {
    platform: "YouTube",
    handle: "golecodes",
    url: "https://www.youtube.com/@golecodes",
  },
];

export const ai: { title: string; body: string }[] = [
  {
    title: "How this site was built",
    body: "This site was originally made with human effort back in 2024, in Next.js, after I finished my 10th (SEE). It started as a fork of leerob's 2021 portfolio, when I was new to Next.js and AI was barely used for coding. In mid 2025 I used some AI while testing the Cursor IDE, though I've forgotten the model names. This Astro port was migrated using Claude Opus 5.5 in Claude Code, because I wanted to test its potential.",
  },
  {
    title: "Blog posts",
    body: "Some of my blogs are written using AI. Not the full content: they're guided by me, with the actual content I want. Still, that's what people hate, so I've added an AI tag to those posts so you're informed before reading.",
  },
  {
    title: "What I don't use it for",
    body: "I never use AI to write or reply to my emails, and I hope that stays true in the future too.",
  },
  {
    title: "On this site",
    body: "Most of the content on this website is not AI generated. It was migrated to Astro, not rewritten.",
  },
];

export const changelog: { date: string; changes: string[] }[] = [
  {
    date: "2026-11-01",
    changes: ["Added /slashes, an index of all my slash pages."],
  },
  {
    date: "2026-10-31",
    changes: ["Added /now and /friends."],
  },
  {
    date: "2026-10-30",
    changes: [
      "Finished moving the site to Astro: blog, projects, photos, guestbook, dashboard and sign-in all came across.",
      "Blog views moved from Firebase to Supabase, and reactions were archived.",
      "Pages now ship almost no JavaScript, and the homepage dropped to around 400 KB.",
      "Brighter dark mode, a mechanical key theme switch and 88×31 buttons in the footer.",
      "New pages: /chris-cornell and a reworked /verify and /bookmarks.",
    ],
  },
  {
    date: "2026-10-29",
    changes: [
      "Started rebuilding the site in Astro, keeping every existing URL.",
      "New design system: Inter, purple accent, yellow highlights.",
      "Vertical sidebar navigation and a System / Light / Dark theme switcher.",
      "Added slash pages: /nope, /guy, /verify, /ai, /changelog, /concerts and /blank.",
    ],
  },
  {
    date: "2026-10-25",
    changes: [
      "Added a now-playing card as an SVG for my GitHub profile, with light and dark themes.",
      "Added a link that redirects to whatever I'm currently playing.",
    ],
  },
  {
    date: "2026-10-24",
    changes: ["Moved my contact email to hi@manishtamang.com."],
  },
  {
    date: "2026-10-23",
    changes: ["Added Nusa, Minimal YouTube and TranslucentTB to /uses."],
  },
  {
    date: "2026-10-20",
    changes: [
      "Now playing comes from Last.fm instead of the Spotify API, with iTunes as a fallback for missing covers.",
      "Added Recently Listened to the dashboard.",
      "Styled the RSS feed as a highlighted XML tree and added a GitHub stars widget to the colophon.",
    ],
  },
  {
    date: "2026-10-15",
    changes: ["Added Claude and Seelen UI to /uses."],
  },
  {
    date: "2026-10-13",
    changes: [
      "Performance pass: removed framer-motion and lazy-loaded ads and images.",
      "SEO pass: structured data and metadata across the main pages.",
      "Blog posts moved to rich text, with images and media inside the post.",
    ],
  },
  {
    date: "2026-10-06",
    changes: ["Added 1Password, Paper and a terminal screenshot to /uses."],
  },
  {
    date: "2026-10-02",
    changes: ["Added PowerToys, Windhawk and Helium to /uses."],
  },
  {
    date: "2026-10-01",
    changes: [
      "Rebuilt /uses to show hardware, software and tools.",
      "Added /bookmarks.",
      "Upgraded to Next.js 16 and React 19.3.",
    ],
  },
  {
    date: "2026-09-30",
    changes: [
      "New blog typography with Rubik and Roboto, and better tables in posts.",
    ],
  },
  {
    date: "2026-09-28",
    changes: [
      "Added a sitemap, robots.txt and an RSS feed for posts and projects.",
      "Guestbook gets a dynamic social image built from its messages.",
      "Better image loading and a multi-image viewer on /photos.",
    ],
  },
  {
    date: "2026-09-21",
    changes: [
      "Added a reading list from my daily.dev bookmarks.",
      "Added a README and licence to the repository.",
    ],
  },
  {
    date: "2026-09-18",
    changes: ["Added random facts and TikTok to /about."],
  },
  {
    date: "2026-09-01",
    changes: [
      "Added the Hunger Strike quote and CD sticky note to the homepage.",
      'Added an "open for projects" button.',
    ],
  },
  {
    date: "2026-08-20",
    changes: [
      "Added the tools dock to the homepage About section.",
      "Added prayer flags to /about.",
    ],
  },
  {
    date: "2026-08-19",
    changes: [
      "Reorganised the whole codebase into feature folders.",
      "Dashboard gets Site Traffic totals and recent visits with browser and device icons.",
      "Replaced animation library code on sticky notes with plain CSS.",
    ],
  },
  {
    date: "2026-07-08",
    changes: [
      "Added llms.txt for AI crawlers.",
      "Added tables to blog posts and tooltips to the client logos.",
      "Removed /wall.",
    ],
  },
  {
    date: "2026-06-08",
    changes: [
      "Sticky notes can now use images, and /about gets a Gmail contact link.",
    ],
  },
  {
    date: "2026-06-03",
    changes: [
      "Added the Trusted by section to the homepage.",
      "Softer, rounder buttons, forms and avatars.",
    ],
  },
  {
    date: "2026-04-12",
    changes: [
      "Added /digitalpathshala, with a stack of photo cards.",
      "New project cards on /projects.",
      "Added a favourite game section to /about.",
    ],
  },
  {
    date: "2026-04-05",
    changes: ["New header, and an animated pixel character in the hero."],
  },
  {
    date: "2026-03-25",
    changes: ["Added an image preview modal and a new logo."],
  },
  {
    date: "2026-03-18",
    changes: [
      "Added Karla, plus Facebook and TikTok links, and decorated the colophon.",
    ],
  },
  {
    date: "2026-03-17",
    changes: ["Added /bio with a polaroid gallery and journal."],
  },
  {
    date: "2026-03-16",
    changes: ["Reworked /about around a toggle and the spinning Firfirey."],
  },
  {
    date: "2026-03-11",
    changes: ["Added /wall for posters and album covers."],
  },
  {
    date: "2026-03-10",
    changes: [
      "Launched /dashboard with WakaTime, Umami, GitHub contributions and blog stats.",
      "Added education to /about and a copyable colour palette to the colophon.",
    ],
  },
  {
    date: "2026-03-06",
    changes: [
      "Guestbook sends email notifications, and each message has a shareable link.",
      "Faster images and better blog metadata.",
    ],
  },
  {
    date: "2026-03-03",
    changes: [
      "Added /contact and Carbon Ads.",
      "Set up Better Auth and Vercel Speed Insights.",
    ],
  },
  {
    date: "2026-02-25",
    changes: [
      "Added comments to blog posts with Utterances.",
      "Added /photos.",
    ],
  },
  {
    date: "2026-02-19",
    changes: [
      "Added /about with a timeline, certificates and my NTV interview.",
    ],
  },
  {
    date: "2026-02-13",
    changes: [
      "Added the colophon and finished the guestbook, with replies and sorting.",
    ],
  },
  {
    date: "2026-02-11",
    changes: [
      "Added blog view counts, a custom 404 page and a live clock in the footer.",
    ],
  },
  {
    date: "2026-02-09",
    changes: [
      "Homepage content now comes from Sanity.",
      "New footer navigation and the flower button.",
    ],
  },
  {
    date: "2026-02-07",
    changes: [
      "Added the guestbook, with Supabase and sign-in through GitHub and Google.",
    ],
  },
  {
    date: "2026-01-27",
    changes: ["Made the homepage responsive and added a mobile menu."],
  },
  {
    date: "2026-01-26",
    changes: [
      "Added the blog, syntax highlighting, image zoom and UI sound effects.",
    ],
  },
  {
    date: "2026-01-25",
    changes: ["Started this version of the site with Next.js and Sanity."],
  },
];

export const concerts: {
  date: string;
  artist: string;
  /** Only the month is remembered: shows "Dec 2024" rather than a day. */
  approximate?: true;
  venue?: string;
  city?: string;
  image?: string;
  video?: string;
  caption?: string;
}[] = [
  {
    date: "2026-09-27",
    artist: "Chumbak",
    venue: "Moksh, Highlander Ghar Ma Session",
    city: "Jhamsikhel, Lalitpur",
    image: "chumbak-moksh-2026.webp",
    video:
      "https://2iw0lwaklqgp6qdp.public.blob.vercel-storage.com/chumbak/video_20260927_194548-QrXTBvUZjV0L347EcJRRXkBrAYpjBu.mp4",
    caption:
      "Chumbak lead singer Gongba Spikes posing while singing Ahile Bhana",
  },
  {
    date: "2026-02-20",
    artist: "SWAR",
    venue: "Itahari International College, Spring Carnival 2026",
    city: "Itahari",
    image: "swar-spring-carnival-2026.webp",
    caption: "Swapnil Sharma, lead singer of SWAR, singing Aparibhasit",
  },
  {
    date: "2025-09-06",
    artist: "Neetesh Jung Kunwar",
    venue: "Peace Zone School",
    city: "Itahari",
    video:
      "https://2iw0lwaklqgp6qdp.public.blob.vercel-storage.com/njk/video_20250906_180011-2Rlb1tD8LbQHJ3EohEwuV4JcUNPsgR.mp4",
    caption: "Finally seeing my childhood favourite artist live",
  },
  {
    date: "2024-12-01",
    approximate: true,
    artist: "Purna Rai",
    venue: "Itahari International College",
    city: "Itahari",
  },
  {
    date: "2024-10-01",
    approximate: true,
    artist: "Trishna Gurung",
  },
];

/*
 * /colophon content: how this site is made, and who it owes.
 * Tools reuse the /uses icons (assets/uses/icons/<slug>.png).
 */
import type { Tool } from "./uses";

export const launchDate = "2023-04-12";

export const stack: Tool[] = [
  {
    name: "Astro",
    note: "Static pages, zero JS by default",
    url: "https://astro.build/",
    tag: "Primary",
  },
  {
    name: "TypeScript",
    note: "Types across pages and data",
    url: "https://www.typescriptlang.org/",
  },
  {
    name: "Tailwind CSS",
    note: "Styling, driven by design tokens",
    url: "https://tailwindcss.com/",
  },
  {
    name: "Video.js",
    note: "Every video's player, from Mux's guide for Astro",
    url: "https://www.mux.com/video-for/astro",
    iconDomain: "videojs.org",
  },
  {
    name: "Vercel",
    note: "Hosting and the API routes",
    url: "https://vercel.com/",
  },
  {
    name: "Bisup",
    note: "Where manishtamang.com is registered",
    url: "https://www.bisup.com/",
  },
  {
    name: "GitHub",
    note: "Source code, open to read",
    url: "https://github.com/Manish-Tamang/manishtamang.com",
  },
];

export const services: Tool[] = [
  {
    name: "Last.fm API",
    note: "Now playing, /scrobbles and music stats",
    url: "https://www.last.fm/api",
  },
  {
    name: "iTunes Search API",
    note: "Album covers Last.fm is missing",
    url: "https://performance-partners.apple.com/search-api",
  },
  {
    name: "Deezer API",
    note: "Artist photos and release years",
    url: "https://developers.deezer.com/api",
  },
  {
    name: "WakaTime API",
    note: "Coding time and the coding graph",
    url: "https://wakatime.com/developers",
  },
  {
    name: "GitHub Contributions API",
    note: "The contribution graph on /dashboard",
    url: "https://github-contributions-api.jogruber.de",
    iconDomain: "github.com",
  },
  {
    name: "GitHub REST API",
    note: "The star count on this page",
    url: "https://docs.github.com/en/rest",
    iconDomain: "github.com",
  },
  {
    name: "daily.dev API",
    note: "Reading list and reading graph",
    url: "https://api.daily.dev/public/v1/docs",
    iconDomain: "daily.dev",
  },
  {
    name: "Umami API",
    note: "Visitors and recent sessions",
    url: "https://umami.is/docs/api",
  },
  {
    name: "Supabase",
    note: "Guestbook, blog views and reactions",
    url: "https://supabase.com/",
  },
  {
    name: "Resend API",
    note: "Guestbook email notifications",
    url: "https://resend.com/docs/api-reference",
  },
  {
    name: "GitHub and Google sign-in",
    note: "Signing in to the guestbook",
    url: "https://www.better-auth.com/",
  },
  {
    name: "Flagpedia",
    note: "Country flags for recent visits",
    url: "https://flagpedia.net/",
    iconDomain: "flagcdn.com",
  },
];

export const fonts = [
  {
    name: "Inter",
    role: "Body text and headings, with the cv05 and ss03 alternates",
    url: "https://rsms.me/inter/",
    class: "font-sans",
  },
  {
    name: "Custom Font",
    role: "My name and other personal touches",
    class: "font-display",
  },
  {
    name: "System Mono",
    role: "Code snippets",
    class: "font-mono",
  },
];

// Hex values mirror styles/tokens.css (light theme)
export const palette = {
  accents: [
    { name: "Purple", hex: "#966bc3", use: "accent, links and buttons" },
    { name: "Blue", hex: "#4d9bd8", use: "badges and sidebar dots" },
    { name: "Chart blue", hex: "#2a78d6", use: "charts on /scrobbles" },
    { name: "Green", hex: "#3dc06c", use: "success and live dots" },
    { name: "Pink", hex: "#d95a88", use: "errors and deletes" },
    { name: "Orange", hex: "#e6a56e", use: "warm highlights" },
    { name: "Yellow", hex: "#fff480", use: "text selection" },
  ],
  neutrals: [
    { name: "Night", hex: "#161616", use: "dark-theme background" },
    { name: "Ink", hex: "#2a2d2d", use: "headings and text" },
    { name: "Slate", hex: "#626a6a", use: "muted text" },
    { name: "Stone", hex: "#b5bfbf", use: "strong borders" },
    { name: "Mist", hex: "#d7dada", use: "borders" },
    { name: "Fog", hex: "#eef0f0", use: "muted fills and badges" },
    { name: "Paper", hex: "#f7f8f8", use: "surfaces" },
    { name: "White", hex: "#ffffff", use: "background" },
  ],
};

export const designCredits = [
  {
    name: "Banjo Magpi",
    url: "https://banjomagpi.com/",
    thanks: "the sidebar navigation and page dates",
  },
  {
    name: "Saira",
    url: "https://www.instagram.com/uiuxsesh/",
    thanks: "the footer flowers, from the 100 Day Design Challenge",
  },
  {
    name: "Robb Knight",
    url: "https://rknight.me/",
    thanks: "introducing me to slash pages and slashpages.net",
  },
  {
    name: "Uiverse.io",
    url: "https://uiverse.io/",
    thanks: "free UI components, like the colour strip above",
  },
];

export const inspirations = [
  { name: "Ouassim", url: "https://ouassim.tech/" },
  { name: "Jahir Fiquitiva", url: "https://jahir.dev/colophon" },
  { name: "Theodorus Clarence", url: "https://theodorusclarence.com/" },
  { name: "Bona Brian Siagian", url: "https://bonabrian.com/" },
  { name: "Lee Robinson", url: "https://leerob.com/" },
  { name: "Marc Bouchenoire", url: "https://marcbouchenoire.com/" },
  { name: "Victor Eke", url: "https://victoreke.com/" },
  { name: "Ryan Aulia", url: "https://aulianza.id/" },
  { name: "Vijay Verma", url: "https://vjy.me/" },
  { name: "Raphaël Chelly", url: "https://www.raphaelchelly.com/" },
  { name: "Daniel Wirtz", url: "https://danielwirtz.com/" },
  { name: "David Darnes", url: "https://darn.es/" },
  { name: "Sayan Dey", url: "https://sayandey.dev/" },
  { name: "Håvard Brynjulfsen", url: "https://www.havardbrynjulfsen.design/" },
];

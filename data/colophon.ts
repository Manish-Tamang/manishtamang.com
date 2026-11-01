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
    note: "What I'm listening to, in the footer",
    url: "https://www.last.fm/api",
  },
  {
    name: "iTunes Search API",
    note: "Album covers Last.fm is missing",
    url: "https://performance-partners.apple.com/search-api",
  },
];

export const fonts = [
  {
    name: "Inter",
    role: "Body text and headings, with the cv05 and ss03 alternates",
    url: "https://rsms.me/inter/",
    sample: "Namaste from Nepal",
    class: "font-sans",
  },
  {
    name: "Custom font",
    role: "My name and other personal touches",
    sample: "Manish Tamang",
    class: "font-display",
  },
  {
    name: "System mono",
    role: "Code snippets",
    sample: "const greeting = 'namaste'",
    class: "font-mono",
  },
];

// Hex values mirror styles/tokens.css (light theme)
export const palette = [
  { name: "Purple", hex: "#966bc3", use: "Accent and links" },
  { name: "Yellow", hex: "#fff480", use: "Highlights and selection" },
  { name: "Ink", hex: "#2a2d2d", use: "Text" },
  { name: "Slate", hex: "#626a6a", use: "Muted text" },
  { name: "Mist", hex: "#d7dada", use: "Borders" },
  { name: "Paper", hex: "#f7f8f8", use: "Surfaces" },
];

export const designCredits = [
  {
    name: "Recurse Center",
    url: "https://www.recurse.com/",
    note: "Typography and colour",
  },
  {
    name: "Banjo Magpi",
    url: "https://banjomagpi.com/",
    note: "Sidebar navigation and page dates",
  },
  {
    name: "Saira",
    url: "https://www.instagram.com/uiuxsesh/",
    note: "Footer flowers (100 Day Design Challenge)",
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

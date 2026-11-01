import { slashPages } from "@/data/slash-pages"

export const site = {
  name: "Manish Tamang",
  handle: "golecodes",
  title: "Manish Tamang (@golecodes) - Developer & Designer from Nepal",
  titleTemplate: "%s | Manish Tamang",
  description:
    "Hi, I'm Manish Gole Tamang (golecodes), a developer and designer from Kathmandu, Nepal. I build minimal, functional web experiences with modern technologies.",
  url: "https://manishtamang.com",
  ogImage: "/cover-card.jpg",
  locale: "en_US",
  social: {
    github: "https://github.com/Manish-Tamang",
  },
} as const

/*
 * Sidebar navigation, grouped. `marker` is the Tailwind class for the
 * small colour square beside each link in that group.
 */
export const navGroups = [
  {
    label: null,
    marker: "bg-purple",
    links: [
      { href: "/", label: "Home" },
      { href: "/about", label: "About" },
      { href: "/projects", label: "Projects" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    label: "Personal",
    marker: "bg-blue",
    links: [
      { href: "/bio", label: "Bio" },
      { href: "/photos", label: "Photos" },
      { href: "/uses", label: "Uses" },
      { href: "/bookmarks", label: "Bookmarks" },
      { href: "/manifest", label: "Manifest" },
    ],
  },
  {
    label: "Elsewhere",
    marker: "bg-orange",
    links: [
      { href: "/guestbook", label: "Guestbook" },
      { href: "/dashboard", label: "Dashboard" },
      { href: "/colophon", label: "Colophon" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    label: "Slash pages",
    marker: "bg-pink",
    // /chris-cornell stays reachable through /slashes
    links: slashPages.filter(({ href }) => href !== "/chris-cornell").map(({ href, label }) => ({ href, label })),
  },
] as const

/* Rows with icons in the mobile menu, from the Next.js header (react-icons paths). */
export const mobileLinks = [
  {
    href: "/",
    label: "Home",
    viewBox: "0 0 20 20",
    paths: ["M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z"],
  },
  {
    href: "/about",
    label: "About",
    viewBox: "0 0 16 16",
    paths: ["M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2"],
  },
  {
    href: "/projects",
    label: "Projects",
    viewBox: "0 0 24 24",
    paths: [
      "M2 3.75C2 2.784 2.784 2 3.75 2h16.5c.966 0 1.75.784 1.75 1.75v16.5A1.75 1.75 0 0 1 20.25 22H9.75a.75.75 0 0 1 0-1.5h10.5a.25.25 0 0 0 .25-.25V9h-17v3A.75.75 0 0 1 2 12ZM9 7.5h11.5V3.75a.25.25 0 0 0-.25-.25H9Zm-5.5 0h4v-4H3.75a.25.25 0 0 0-.25.25Z",
      "m9.308 14.5-2.104-2.236a.75.75 0 1 1 1.092-1.028l3.294 3.5a.75.75 0 0 1 0 1.028l-3.294 3.5a.75.75 0 1 1-1.092-1.028L9.308 16H6.09a2.59 2.59 0 0 0-2.59 2.59v2.66a.75.75 0 0 1-1.5 0v-2.66a4.09 4.09 0 0 1 4.09-4.09h3.218Z",
    ],
  },
  {
    href: "/blog",
    label: "Blog",
    viewBox: "0 0 448 512",
    paths: ["M128.081 415.959c0 35.369-28.672 64.041-64.041 64.041S0 451.328 0 415.959s28.672-64.041 64.041-64.041 64.04 28.673 64.04 64.041zm175.66 47.25c-8.354-154.6-132.185-278.587-286.95-286.95C7.656 175.765 0 183.105 0 192.253v48.069c0 8.415 6.49 15.472 14.887 16.018 111.832 7.284 201.473 96.702 208.772 208.772.547 8.397 7.604 14.887 16.018 14.887h48.069c9.149.001 16.489-7.655 15.995-16.79zm144.249.288C439.596 229.677 251.465 40.445 16.503 32.01 7.473 31.686 0 38.981 0 48.016v48.068c0 8.625 6.835 15.645 15.453 15.999 191.179 7.839 344.627 161.316 352.465 352.465.353 8.618 7.373 15.453 15.999 15.453h48.068c9.034-.001 16.329-7.474 16.005-16.504z"],
  },
  {
    href: "/guestbook",
    label: "Guestbook",
    viewBox: "0 0 448 512",
    paths: ["M96 0C43 0 0 43 0 96L0 416c0 53 43 96 96 96l288 0 32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l0-64c17.7 0 32-14.3 32-32l0-320c0-17.7-14.3-32-32-32L384 0 96 0zm0 384l256 0 0 64L96 448c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16l192 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16zm16 48l192 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-192 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z"],
  },
  {
    href: "/dashboard",
    label: "Dashboard",
    viewBox: "0 0 24 24",
    paths: ["M3 3h8v8H3zm10 0h8v8h-8zM3 13h8v8H3zm15 0h-2v3h-3v2h3v3h2v-3h3v-2h-3z"],
  },
  {
    href: "/contact",
    label: "Contact",
    viewBox: "0 0 24 24",
    paths: ["M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"],
  },
  {
    href: "/slashes",
    label: "Slashes",
    viewBox: "0 0 24 24",
    paths: ["M14.5 3h2.2L9.5 21H7.3z"],
  },
] as const

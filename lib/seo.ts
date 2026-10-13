import type { Metadata } from "next";

const SITE_URL = "https://manishtamang.com";

export const siteConfig = {
  name: "Manish Tamang",
  title: "Manish Tamang (@golecodes) - Developer & Designer from Nepal",
  description:
    "Hi, I'm Manish Gole Tamang (golecodes), a developer and designer from Kathmandu, Nepal. I build minimal, functional web experiences with modern technologies.",
  url: SITE_URL,
  ogImage: `${SITE_URL}/profile.png`,
  sitemap: `${SITE_URL}/sitemap.xml`,
  feed: `${SITE_URL}/feed.xml`,
  keywords: [
    "manish tamang",
    "golecodes",
    "gole",
    "manish gole tamang",
    "manish tamang developer",
    "manish tamang nepal",
    "golecodes developer",
    "web developer nepal",
    "frontend developer kathmandu",
  ],
};

export const sitePages = [
  { path: "", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/about", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/projects", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/blog", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/guestbook", changeFrequency: "daily" as const, priority: 0.7 },
  { path: "/photos", changeFrequency: "weekly" as const, priority: 0.6 },
  { path: "/uses", changeFrequency: "monthly" as const, priority: 0.6 },
  { path: "/bookmarks", changeFrequency: "monthly" as const, priority: 0.6 },
  { path: "/bio", changeFrequency: "monthly" as const, priority: 0.6 },
  { path: "/contact", changeFrequency: "yearly" as const, priority: 0.5 },
  { path: "/dashboard", changeFrequency: "daily" as const, priority: 0.5 },
  { path: "/digitalpathshala", changeFrequency: "yearly" as const, priority: 0.5 },
  { path: "/colophon", changeFrequency: "yearly" as const, priority: 0.4 },
  { path: "/manifest", changeFrequency: "monthly" as const, priority: 0.4 },
];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: siteConfig.title,
    template: "%s | Manish Tamang",
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: "Manish Tamang", url: SITE_URL }],
  creator: "Manish Tamang",
  alternates: {
    canonical: SITE_URL,
    types: {
      "application/rss+xml": siteConfig.feed,
    },
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: "/icon-light-32x32.png",
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: SITE_URL,
    siteName: "Manish Tamang",
    images: siteConfig.ogImage,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

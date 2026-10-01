import type { Metadata } from "next";

const SITE_URL = "https://manishtamang.com";

export const siteConfig = {
  name: "Manish Tamang",
  title: "Manish Tamang - A young developer",
  description:
    "Hi, I'm Manish Gole Tamang, an 18-year-old from Kathmandu, Nepal, with a fervent passion for web development.",
  url: SITE_URL,
  ogImage: `${SITE_URL}/profile.png`,
  sitemap: `${SITE_URL}/sitemap.xml`,
  feed: `${SITE_URL}/feed.xml`,
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
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: {
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
    images: siteConfig.ogImage,
    type: "website",
  },
};

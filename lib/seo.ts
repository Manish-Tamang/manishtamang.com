import type { Metadata } from "next";

const SITE_URL = "https://manishtamang.com";

export const siteConfig = {
  name: "Manish Tamang",
  title: "Manish Tamang - A young developer",
  description:
    "Hi, I'm Manish Gole Tamang, an 18-year-old from Kathmandu, Nepal, with a fervent passion for web development.",
  url: SITE_URL,
  ogImage: `${SITE_URL}/profile.png`,
};

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
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

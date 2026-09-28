import type { MetadataRoute } from "next"
import { siteConfig } from "@/lib/seo"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/studio/"],
      },
    ],
    sitemap: siteConfig.sitemap,
    host: siteConfig.url,
  }
}

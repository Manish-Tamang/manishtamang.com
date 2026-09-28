import type { MetadataRoute } from "next"
import { siteConfig, sitePages } from "@/lib/seo"
import { client } from "@/sanity/lib/client"
import { SITEMAP_POSTS_QUERY, SITEMAP_PROJECTS_QUERY } from "@/sanity/lib/queries"

export const revalidate = 3600

type SitemapDoc = {
  slug: string | null
  date?: string | null
  _updatedAt?: string | null
}

function lastModified(doc: SitemapDoc) {
  return new Date(doc._updatedAt || doc.date || Date.now())
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, projects] = await Promise.all([
    client.fetch<SitemapDoc[]>(SITEMAP_POSTS_QUERY).catch(() => []),
    client.fetch<SitemapDoc[]>(SITEMAP_PROJECTS_QUERY).catch(() => []),
  ])

  const pages: MetadataRoute.Sitemap = sitePages.map((page) => ({
    url: `${siteConfig.url}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }))

  const postPages: MetadataRoute.Sitemap = posts
    .filter((post): post is SitemapDoc & { slug: string } => Boolean(post.slug))
    .map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: lastModified(post),
      changeFrequency: "monthly",
      priority: 0.8,
    }))

  const projectPages: MetadataRoute.Sitemap = projects
    .filter((project): project is SitemapDoc & { slug: string } => Boolean(project.slug))
    .map((project) => ({
      url: `${siteConfig.url}/projects/${project.slug}`,
      lastModified: lastModified(project),
      changeFrequency: "monthly",
      priority: 0.7,
    }))

  return [...pages, ...postPages, ...projectPages]
}

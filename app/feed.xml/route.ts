import { buildRssFeed, toFeedDescription, type FeedItem } from "@/lib/feed"
import { siteConfig } from "@/lib/seo"
import { client } from "@/sanity/lib/client"
import { FEED_POSTS_QUERY, FEED_PROJECTS_QUERY } from "@/sanity/lib/queries"

export const revalidate = 3600

type FeedDoc = {
  title?: string | null
  slug?: string | null
  excerpt?: string | null
  date?: string | null
}

export async function GET() {
  const [posts, projects] = await Promise.all([
    client.fetch<FeedDoc[]>(FEED_POSTS_QUERY).catch(() => []),
    client.fetch<FeedDoc[]>(FEED_PROJECTS_QUERY).catch(() => []),
  ])

  const postItems: FeedItem[] = posts
    .filter((post): post is FeedDoc & { slug: string } => Boolean(post.slug))
    .map((post) => ({
      title: post.title?.trim() || "Untitled post",
      url: `${siteConfig.url}/blog/${post.slug}`,
      description: toFeedDescription(post.excerpt, post.title),
      date: post.date || new Date().toISOString(),
      category: "Blog",
    }))

  const projectItems: FeedItem[] = projects
    .filter((project): project is FeedDoc & { slug: string } => Boolean(project.slug))
    .map((project) => ({
      title: project.title?.trim() || "Untitled project",
      url: `${siteConfig.url}/projects/${project.slug}`,
      description: toFeedDescription(project.excerpt, project.title),
      date: project.date || new Date().toISOString(),
      category: "Project",
    }))

  const items = [...postItems, ...projectItems].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )

  return new Response(buildRssFeed(items), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  })
}

import { BlogList } from "@/components/blog-list"
import { POSTS_QUERY } from "@/sanity/lib/queries"
import { sanityFetch } from "@/sanity/lib/live"

export default async function BlogPage() {
  const { data: posts } = await sanityFetch({ query: POSTS_QUERY })

  return (
    <div className="min-h-screen flex flex-col items-center">
      <BlogList posts={posts} />
    </div>
  )
}

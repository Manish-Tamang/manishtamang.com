import { BlogList } from "@/components/blog-list"
import { POSTS_QUERY } from "@/sanity/lib/queries"
import { sanityFetch } from "@/sanity/lib/live"

export default async function BlogPage() {
  const { data: posts } = await sanityFetch({ query: POSTS_QUERY })

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-[640px] px-6 py-8">
        <BlogList posts={posts} />
      </div>
    </div>
  )
}

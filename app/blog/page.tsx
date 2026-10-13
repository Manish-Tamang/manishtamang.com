import type { Metadata } from "next"
import { BlogList } from "@/components/blog"
import { POSTS_QUERY } from "@/sanity/lib/queries"
import { sanityFetch } from "@/sanity/lib/live"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles by Manish Tamang (golecodes) on web development, design, and tech.",
  alternates: { canonical: "https://manishtamang.com/blog" },
}

export default async function BlogPage() {
  const { data: posts } = await sanityFetch({ query: POSTS_QUERY })

  return (
    <div className="min-h-screen flex flex-col items-center">
      <BlogList posts={posts} />
    </div>
  )
}

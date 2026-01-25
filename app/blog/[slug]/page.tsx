import { BlogPost } from "@/components/blog-post"
import { notFound } from "next/navigation"
import { POST_BY_SLUG_QUERY, POSTS_QUERY } from "@/sanity/lib/queries"
import { sanityFetch } from "@/sanity/lib/live"
import { urlFor } from "@/sanity/lib/image"
import { client } from "@/sanity/lib/client"

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { data: post } = await sanityFetch({
    query: POST_BY_SLUG_QUERY,
    params: { slug }
  })

  if (!post) {
    notFound()
  }

  // Map Sanity post data to BlogPost props
  const formattedPost = {
    title: post.title || "",
    date: post.date || "",
    content: post.content || "",
    summary: post.excerpt || "", // mapping excerpt to summary
    image: post.coverImage ? urlFor(post.coverImage).url() : undefined,
    // Assuming some default author info for now or you can add more fields to post schema
    author: {
      name: "Manish Tamang",
      role: "Digital Designer & Frontend Developer",
      avatar: "/character/12.png",
      bio: "Focusing on creating immersive digital experiences. He has over 5 years of experience building interfaces that people love."
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center dark:bg-zinc-950">
      <div className="w-full px-6 py-12 md:py-20 lg:py-24">
        <BlogPost {...formattedPost} />
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  const posts = await client.fetch(POSTS_QUERY)
  return posts.map((post: any) => ({
    slug: post.slug?.current || "",
  }))
}

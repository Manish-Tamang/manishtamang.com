import { BlogPost, BlogViewTracker } from "@/components/blog"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { POST_BY_SLUG_QUERY, POSTS_QUERY } from "@/sanity/lib/queries"
import { sanityFetch } from "@/sanity/lib/live"
import { urlFor } from "@/sanity/lib/image"
import { client } from "@/sanity/lib/client"
import { normalizePostContent } from "@/sanity/lib/portable-text-to-markdown"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://manishtamang.com"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params

  const { data: post } = await sanityFetch({
    query: POST_BY_SLUG_QUERY,
    params: { slug },
  })

  if (!post) {
    return {
      title: "Post Not Found | Manish Tamang",
      description: "The blog post you are looking for does not exist.",
      robots: { index: false, follow: false },
    }
  }

  const title = `${post.title || "Blog Post"} | Manish Tamang`
  const description =
    post.excerpt?.trim() || "Read this blog post by Manish Tamang."
  const url = `${SITE_URL}/blog/${slug}`
  const image = post.coverImage
    ? urlFor(post.coverImage).width(1200).height(630).url()
    : `${SITE_URL}/profile.png`

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post.title || "Blog post",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  }
}

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
    content: normalizePostContent(post.content),
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
    <div className="min-h-screen flex flex-col items-center">
      <BlogViewTracker slug={slug} />
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

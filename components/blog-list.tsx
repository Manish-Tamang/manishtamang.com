"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { urlFor } from "@/sanity/lib/image"
import { sounds } from "@/lib/sounds"
import { ArrowUpRight, Search, ListFilter } from "lucide-react"
import { BlogViewDisplay } from "@/components/blog-view-display"

interface Post {
  title?: string
  slug?: { current?: string }
  excerpt?: string
  date?: string
  coverImage?: any
}

interface BlogListProps {
  posts: Post[]
}

export function BlogList({ posts }: BlogListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest")

  // Filter and Sort posts
  const processedPosts = useMemo(() => {
    let filtered = posts.filter((post) =>
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return filtered.sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0
      const dateB = b.date ? new Date(b.date).getTime() : 0
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB
    })
  }, [posts, searchQuery, sortOrder])

  // Group posts by year
  const groupedPosts = useMemo(() => {
    return processedPosts.reduce((acc: { [key: string]: Post[] }, post) => {
      const year = post.date ? new Date(post.date).getFullYear().toString() : "Unknown"
      if (!acc[year]) acc[year] = []
      acc[year].push(post)
      return acc
    }, {})
  }, [processedPosts])

  const years = useMemo(() => {
    return Object.keys(groupedPosts).sort((a, b) =>
      sortOrder === "newest" ? b.localeCompare(a) : a.localeCompare(b)
    )
  }, [groupedPosts, sortOrder])

  const truncateExcerpt = (text: string, wordCount: number) => {
    if (!text) return ""
    const words = text.split(" ")
    if (words.length <= wordCount) return text
    return words.slice(0, wordCount).join(" ") + "..."
  }

  return (
    <main className="w-full max-w-[610px] mx-auto py-8 px-6 space-y-10">
      <div className="space-y-4">
        <h1 className="text-4xl font-medium tracking-tight">Blog</h1>
        <p className="text-[15px] leading-relaxed text-foreground/60 max-w-[540px]">
          Welcome to my blog page, I&apos;ve been writing online since 2023, mostly about web development, blogging & tech. Use the search below to filter by title.
        </p>

        <div className="flex items-center gap-3 pt-2">
          <div className="relative flex-1 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30 group-focus-within:text-foreground/60 transition-colors" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => {
                sounds.tick()
                setSearchQuery(e.target.value)
              }}
              className="w-full pl-9 pr-4 py-2 bg-foreground/5 border border-transparent focus:border-foreground/10 focus:bg-foreground/[0.08] rounded-xl outline-none text-sm transition-all"
            />
          </div>
          <button
            onClick={() => {
              sounds.click()
              setSortOrder(prev => prev === "newest" ? "oldest" : "newest")
            }}
            className="flex items-center gap-2 px-4 py-2 bg-foreground/5 hover:bg-foreground/[0.08] border border-transparent hover:border-foreground/10 rounded-xl transition-all cursor-pointer text-sm font-medium text-foreground/60 hover:text-foreground"
          >
            <ListFilter className="w-4 h-4" />
            {sortOrder === "newest" ? "Newest" : "Oldest"}
          </button>
        </div>
      </div>

      <div className="space-y-12 pt-4">
        {years.length > 0 ? (
          years.map((year) => (
            <div key={year} className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold text-foreground/30 tracking-wider font-mono">{year}</span>
                <div className="flex-1 h-[1px] bg-foreground/5" />
              </div>

              <div className="space-y-3">
                {groupedPosts[year].map((post) => (
                  <Link
                    key={post.slug?.current}
                    href={`/blog/${post.slug?.current}`}
                    onClick={() => sounds.click()}
                    onMouseEnter={() => sounds.tick()}
                    className="group flex gap-5 items-start p-2 -mx-2 rounded-2xl hover:bg-foreground/5 transition-all"
                  >
                    <div className="relative w-[140px] h-[86px] rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shrink-0">
                      {post.coverImage ? (
                        <Image
                          src={urlFor(post.coverImage).url()}
                          alt={post.title || ""}
                          fill
                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-105 group-hover:scale-100"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-900">
                          <span className="text-[10px] uppercase font-bold text-zinc-400">No Image</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col py-0.5 space-y-1.5 flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="font-bold text-[15px] text-zinc-900 dark:text-zinc-100 leading-snug group-hover:text-[#5C2BFF] transition-colors line-clamp-1">
                          {post.title}
                        </h3>
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-zinc-400" />
                      </div>

                      <p className="text-[13px] text-zinc-500 dark:text-zinc-400 leading-snug line-clamp-2">
                        {truncateExcerpt(post.excerpt || "", 20)}
                      </p>

                      <div className="flex items-center gap-2 pt-0.5">
                        <time className="text-[10px] font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-tighter">
                          {post.date ? format(new Date(post.date), "MMM d") : ""}
                        </time>
                        <BlogViewDisplay slug={post.slug?.current || ""} />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-2">
            <p className="text-zinc-800 dark:text-zinc-200 font-medium">No posts found</p>
            <p className="text-sm text-zinc-500">Try searching for something else</p>
          </div>
        )}
      </div>
    </main>
  )
}

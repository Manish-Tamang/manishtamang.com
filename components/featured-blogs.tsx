"use client"

import { BlogCard } from "./blog-card"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { urlFor } from "@/sanity/lib/image"
import { sounds } from "@/lib/sounds"
import { ArrowUpRight } from "lucide-react"

interface FeaturedBlogsProps {
    posts: any[]
}

export function FeaturedBlogs({ posts }: FeaturedBlogsProps) {
    return (
        <section className="max-w-[720px] w-full mt-6 mb-8 px-4">
            <div className="flex flex-col md:h-[350px]">
                <div className="rounded-md p-2 pb-0 flex flex-col items-start relative overflow-hidden">
                    <h2 className="mb-6 text-left text-2xl font-semibold ml-0 md:ml-12 w-full">Latest from Blog</h2>
                    <div className="hidden md:flex flex-row justify-center gap-2 w-full px-2 items-end mt-auto -mb-12">
                        {posts.map((blog: any, i: number) => (
                            <BlogCard key={blog.slug?.current || blog.slug} blog={blog} index={i} />
                        ))}
                    </div>
                    <div className="flex md:hidden flex-col gap-4 w-full">
                        {posts?.map((blog: any) => (
                            <Link
                                key={blog.slug?.current || blog.slug}
                                href={`/blog/${blog.slug?.current || blog.slug}`}
                                onClick={() => sounds.click()}
                                onMouseEnter={() => sounds.tick()}
                                className="group flex gap-4 items-start p-2 rounded-xl bg-foreground/5 hover:bg-foreground/[0.08] transition-all"
                            >
                                <div className="relative w-[100px] h-[64px] rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shrink-0">
                                    {blog.coverImage ? (
                                        <Image
                                            src={urlFor(blog.coverImage).url()}
                                            alt={blog.title || ""}
                                            fill
                                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <span className="text-[10px] text-zinc-400">No Image</span>
                                        </div>
                                    )}
                                </div>
                                <div className="flex flex-col py-0.5 space-y-1 flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2">
                                        <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100 leading-tight truncate">
                                            {blog.title}
                                        </h4>
                                        <ArrowUpRight className="w-3 h-3 shrink-0 text-zinc-400" />
                                    </div>
                                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-tight line-clamp-1">
                                        {blog.excerpt}
                                    </p>
                                    <time className="text-[9px] font-bold text-zinc-400 uppercase">
                                        {blog.date ? format(new Date(blog.date), "MMM d") : ""}
                                    </time>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

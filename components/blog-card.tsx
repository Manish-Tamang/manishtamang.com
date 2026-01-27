"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { format } from "date-fns"
import { sounds } from "@/lib/sounds"
import { urlFor } from "@/sanity/lib/image"
import { GitHub } from "./icons/Github"

interface BlogCardProps {
    blog: any
    index: number
}

export function BlogCard({ blog, index }: BlogCardProps) {
    const rotations = ["-rotate-3", "rotate-1", "rotate-3"]

    return (
        <Link
            href={`/blog/${blog.slug?.current || blog.slug}`}
            onMouseEnter={() => sounds.tick()}
            className={cn(
                "group relative w-[260px] h-[340px] bg-white dark:bg-[#1C1C1C] rounded-xl flex flex-col shadow-2xl border border-border/50 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
                "hover:z-30 hover:scale-105 hover:rotate-0 hover:-translate-y-8",
                rotations[index % rotations.length]
            )}
        >
            <div className="w-full h-36 bg-zinc-100 dark:bg-zinc-900 rounded-t-xl relative overflow-hidden">
                {blog.coverImage ? (
                    <Image
                        src={urlFor(blog.coverImage).url()}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <GitHub className="w-8 h-8 text-zinc-400/20" />
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="p-5 flex flex-col flex-1 bg-[white] dark:bg-[#1C1C1C] rounded-b-xl border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex justify-between items-center mb-3">
                    <span className="inline-block px-2 py-1 rounded-[4px] text-[10px] font-bold uppercase tracking-widest bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 w-fit">
                        {blog.tag || "Blog"}
                    </span>
                    <span className="text-[10px] font-medium text-zinc-400">
                        {blog.date ? format(new Date(blog.date), "MMM d") : ""}
                    </span>
                </div>
                <h4 className="text-[14px] font-bold leading-tight mb-2 text-zinc-900 dark:text-zinc-100 line-clamp-2">
                    {blog.title}
                </h4>
                <p className="text-[11px] text-zinc-500 leading-snug line-clamp-4 opacity-70">
                    {blog.excerpt}
                </p>
            </div>
        </Link>
    )
}

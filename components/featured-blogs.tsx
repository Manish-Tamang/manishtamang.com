"use client"

import Link from "next/link"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { GitHub } from "./icons/Github"

const featuredBlogs = [
    {
        title: "Step-By-Step: Level Up Your UI Design Skills",
        description: "UI is a long-term game of improvement. Progress can feel slow, but there are smart ways to accelerate...",
        date: "Aug 4, 2025",
        slug: "ui-design-skills",
        tag: "UI UX",
        color: "bg-indigo-500/10",
    },
    {
        title: "The Future of Building: When Design Files Become Live...",
        description: "Imagine opening a Figma file and, with a few clicks, watching the interface come alive with production...",
        date: "Jul 13, 2025",
        slug: "design-to-code",
        tag: "Web Development",
        color: "bg-purple-500/10",
    },
    {
        title: "What's Next? Adaptive UI Themes for 2025",
        description: "As web development becomes more sophisticated, our themes need to adapt to user behavior and context...",
        date: "Apr 11, 2025",
        slug: "adaptive-ui",
        tag: "UI UX",
        color: "bg-blue-500/10",
    },
]

export function FeaturedBlogs() {
    return (
        <section className="w-[680px] mt-6 mb-8">
            <div className="flex h-[350px]">
                <div className="rounded-md p-2 pb-0 flex flex-col items-center relative overflow-hidden">
                    <h2 className="text-3xl font-bold mb-6 tracking-tight">Latest from Blog</h2>
                    <div className="flex justify-center gap-2 w-full px-2 items-end mt-auto -mb-12">
                        {featuredBlogs.map((blog, i) => {
                            // Precise rotations from screenshot
                            const rotations = ["-rotate-3", "rotate-1", "rotate-3"]

                            return (
                                <Link
                                    key={blog.slug}
                                    href={`/blog/${blog.slug}`}
                                    className={cn(
                                        "group relative w-[260px] h-[340px] bg-white dark:bg-[#1C1C1C] rounded-xl flex flex-col shadow-2xl border border-border/50 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]",
                                        "hover:z-30 hover:scale-105 hover:rotate-0 hover:-translate-y-8",
                                        rotations[i]
                                    )}
                                >
                                    {/* Card Visual Content (Top area) - Dark like screenshot */}
                                    <div className="w-full h-36 bg-[#0A0A0A] dark:bg-black rounded-t-xl flex items-center justify-center relative overflow-hidden p-6 group-hover:bg-[#111] transition-colors">
                                        <div className="relative w-full h-full flex items-center justify-center">
                                            <div className={cn("w-16 h-16 rounded-lg shadow-2xl rotate-[-10deg] absolute -translate-x-3 transition-transform group-hover:rotate-0 group-hover:translate-x-0 border border-white/5", blog.color === "bg-indigo-500/10" ? "bg-indigo-500" : blog.color === "bg-purple-500/10" ? "bg-purple-500" : "bg-blue-600")} />
                                            <div className="w-12 h-12 bg-white dark:bg-zinc-800 rounded-md shadow-lg absolute translate-x-4 translate-y-3 flex items-center justify-center border border-zinc-200/10">
                                                <div className="w-5 h-5 text-zinc-400">
                                                    <GitHub className="w-full h-full" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="absolute top-2 right-4 text-[10px] font-bold text-white/30 italic text-right leading-tight uppercase tracking-tighter">
                                            {blog.title.split(":")[0]}
                                        </div>
                                    </div>

                                    {/* Card Text Content (Bottom area) */}
                                    <div className="p-5 flex flex-col flex-1 bg-[white] dark:bg-[#1C1C1C] rounded-b-xl border-t border-zinc-100 dark:border-zinc-800">
                                        <span className="inline-block px-2 py-1 rounded-[4px] text-[10px] font-bold uppercase tracking-widest bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 mb-3 w-fit">
                                            {blog.tag}
                                        </span>
                                        <h4 className="text-[14px] font-bold leading-tight mb-2 text-zinc-900 dark:text-zinc-100 line-clamp-2">
                                            {blog.title}
                                        </h4>
                                        <p className="text-[11px] text-zinc-500 leading-snug line-clamp-4 opacity-70">
                                            {blog.description}
                                        </p>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}

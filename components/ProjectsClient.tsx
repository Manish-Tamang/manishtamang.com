"use client"

import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Search, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { format } from "date-fns"
import { urlFor } from "@/sanity/lib/image"
import { sounds } from "@/lib/sounds"

interface Project {
    title: string
    slug: string
    excerpt: string
    thumbnail: any
    date: string
    projectUrl?: string
    githubUrl?: string
    techStack?: string[]
}

interface ProjectsClientProps {
    initialProjects: Project[]
}

export default function ProjectsClient({ initialProjects }: ProjectsClientProps) {
    const [searchQuery, setSearchQuery] = useState("")
    const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | "a-z" | "z-a">("newest")

    const filteredAndSortedProjects = React.useMemo(() => {
        let filtered = initialProjects.filter(project =>
            project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.techStack?.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
        )

        let sorted = [...filtered]

        if (sortOrder === "newest") {
            sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        } else if (sortOrder === "oldest") {
            sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        } else if (sortOrder === "a-z") {
            sorted.sort((a, b) => a.title.localeCompare(b.title))
        } else if (sortOrder === "z-a") {
            sorted.sort((a, b) => b.title.localeCompare(a.title))
        }

        return sorted
    }, [initialProjects, searchQuery, sortOrder])

    return (
        <div className="space-y-12">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative w-full sm:max-w-xs">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/30" />
                    <input
                        placeholder="Search projects..."
                        className="w-full pl-11 pr-4 h-11 rounded-xl bg-foreground/5 border border-transparent focus:border-foreground/10 focus:bg-foreground/[0.08] transition-all outline-none text-[15px] placeholder:text-foreground/30"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value)
                            sounds.tick()
                        }}
                        onClick={() => sounds.click()}
                    />
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <Select
                        value={sortOrder}
                        onValueChange={(value: any) => {
                            setSortOrder(value)
                            sounds.click()
                        }}
                    >
                        <SelectTrigger
                            className="w-full sm:w-[160px] h-11 rounded-xl bg-foreground/5 border-transparent focus:ring-0 focus:ring-offset-0 transition-all hover:bg-foreground/[0.08]"
                            onClick={() => sounds.click()}
                        >
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-zinc-200 dark:border-zinc-800">
                            <SelectItem value="newest" className="rounded-lg">Newest first</SelectItem>
                            <SelectItem value="oldest" className="rounded-lg">Oldest first</SelectItem>
                            <SelectItem value="a-z" className="rounded-lg">A-Z</SelectItem>
                            <SelectItem value="z-a" className="rounded-lg">Z-A</SelectItem>
                        </SelectContent>
                    </Select>
                    <span className="text-xs font-medium text-foreground/40 whitespace-nowrap uppercase tracking-wider">
                        {filteredAndSortedProjects.length} items
                    </span>
                </div>
            </div>

            {/* Projects Grid */}
            {filteredAndSortedProjects.length === 0 ? (
                <div className="text-center py-24 bg-foreground/5 rounded-2xl border border-dashed border-foreground/10">
                    <p className="text-foreground/40 text-sm">No projects found matching your search.</p>
                    <button
                        onClick={() => setSearchQuery("")}
                        className="mt-4 text-sm font-medium text-foreground hover:underline underline-offset-4"
                    >
                        Clear search
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredAndSortedProjects.map((project) => (
                        <div key={project.slug} className="group relative bg-foreground/5 border border-transparent hover:border-foreground/5 hover:bg-foreground/[0.07] rounded-2xl overflow-hidden transition-all duration-300">
                            <Link href={`/projects/${project.slug}`} className="block">
                                {/* Image Container */}
                                <div className="relative aspect-[16/10] w-full overflow-hidden">
                                    {project.thumbnail ? (
                                        <Image
                                            src={urlFor(project.thumbnail).url()}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-foreground/5 flex items-center justify-center">
                                            <span className="text-foreground/20 font-bold text-xs uppercase tracking-widest">No Image</span>
                                        </div>
                                    )}
                                    {/* Subtle Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>

                                {/* Content */}
                                <div className="p-6 space-y-3">
                                    <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.1em] text-foreground/40 font-bold">
                                        <span className="flex items-center gap-1.5">
                                            {format(new Date(project.date), "MMM yyyy")}
                                        </span>
                                    </div>

                                    <div className="space-y-1.5">
                                        <h3 className="text-[17px] font-semibold text-foreground leading-tight">
                                            {project.title}
                                        </h3>
                                        <p className="text-sm text-foreground/60 line-clamp-2 leading-relaxed font-normal">
                                            {project.excerpt}
                                        </p>
                                    </div>

                                    {project.techStack && (
                                        <div className="flex flex-wrap gap-1.5 pt-2">
                                            {project.techStack.slice(0, 3).map((tech, i) => (
                                                <span key={i} className="text-[10px] px-2 py-0.5 bg-foreground/5 text-foreground/50 rounded-full font-medium border border-foreground/5">
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.techStack.length > 3 && (
                                                <span className="text-[10px] text-foreground/30 font-medium ml-0.5">+{project.techStack.length - 3}</span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

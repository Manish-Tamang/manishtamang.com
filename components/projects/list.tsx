"use client"

import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Search } from "lucide-react"
import { sounds } from "@/lib/sounds"
import ProjectCard from "./card"

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
                        <ProjectCard
                            key={project.slug}
                            title={project.title}
                            slug={project.slug}
                            excerpt={project.excerpt}
                            thumbnail={project.thumbnail}
                            date={project.date}
                            projectUrl={project.projectUrl}
                            githubUrl={project.githubUrl}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

"use client"

import React from 'react'
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Calendar, Clock, ArrowLeft } from "lucide-react"
import { urlFor } from "@/sanity/lib/image"
import { MDXComponents } from "@/components/mdx/MDXComponents"
import { format } from "date-fns"
import { sounds } from "@/lib/sounds"
import { GitHub } from "@/components/icons/Github"

interface ProjectDetailsProps {
    project: any
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
    const readingTime = Math.ceil((project.content?.split(/\s+/).length || 0) / 200)

    return (
        <div className="flex flex-col items-center min-h-screen">
            <div className="w-full max-w-[720px] px-4 md:px-6 py-12 md:py-20 lg:py-24">

                {/* Back Button */}
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground mb-8 transition-colors group"
                    onClick={() => sounds.click()}
                >
                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    Back to projects
                </Link>

                {/* Header */}
                <header className="space-y-6 mb-12">
                    <div className="space-y-3">
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-[1.2]">
                            {project.title}
                        </h1>
                        <p className="text-base md:text-[17px] text-foreground/70 leading-relaxed font-normal">
                            {project.excerpt}
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-foreground/40 font-medium pb-6 border-b border-zinc-200 dark:border-zinc-800">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {format(new Date(project.date), "MMMM d, yyyy")}
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {readingTime} min read
                        </div>
                        {project.projectUrl && (
                            <a
                                href={project.projectUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-blue-500 hover:underline"
                                onClick={() => sounds.click()}
                            >
                                <ExternalLink className="w-4 h-4" />
                                Live Demo
                            </a>
                        )}
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-foreground/60 hover:text-foreground transition-colors"
                                onClick={() => sounds.click()}
                            >
                                <GitHub className="w-4 h-4" />
                                Code
                            </a>
                        )}
                    </div>
                </header>

                {/* Hero Image */}
                {project.thumbnail && (
                    <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-12 border border-foreground/5 bg-foreground/5">
                        <Image
                            src={urlFor(project.thumbnail).url()}
                            alt={project.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}

                {/* Content */}
                <article className="prose dark:prose-invert max-w-none prose-zinc lg:prose-lg font-geist">
                    <MDXComponents content={project.content || ""} />
                </article>

                <div className="mt-20 pt-10 border-t border-zinc-100 dark:border-zinc-900" />
            </div>
        </div>
    )
}

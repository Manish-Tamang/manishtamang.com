import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { FEATURE_PROJECTS_QUERY } from "@/sanity/lib/queries"
import { sanityFetch } from "@/sanity/lib/live"
import { Skeleton } from "@/components/ui/skeleton"

function truncateWords(text: string, maxWords: number) {
    const words = text.trim().split(/\s+/)
    if (words.length <= maxWords) return text
    return `${words.slice(0, maxWords).join(" ")}...`
}

function getProjectHref(link?: string) {
    if (!link) return "#"
    return link.startsWith("http") ? link : `https://${link}`
}

function getProjectDomain(link?: string) {
    return link?.replace(/^https?:\/\//, "") || "No link"
}

export async function FeaturedProjects() {
    const { data: projects } = await sanityFetch({ query: FEATURE_PROJECTS_QUERY })

    if (!projects || projects.length === 0) return null

    return (
        <section className="mx-auto mt-12 w-full max-w-[610px] px-4 md:px-0">
            <h2 className="mb-6 text-left text-2xl font-semibold">Featured Projects</h2>
            <div className="flex flex-col gap-10 md:gap-8">
                {projects.map((project: any, index: number) => (
                    <Link
                        key={index}
                        href={getProjectHref(project.link)}
                        target={project.link ? "_blank" : undefined}
                        rel={project.link ? "noopener noreferrer" : undefined}
                        className="group flex flex-col gap-4 transition-opacity hover:opacity-80 md:flex-row md:items-center md:gap-5"
                    >
                        <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-md bg-zinc-100 dark:bg-zinc-900 md:h-[110px] md:w-[180px] md:aspect-auto">
                            {project.image ? (
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center bg-zinc-200 dark:bg-zinc-800">
                                    {project.link ? (
                                        <Image
                                            src={`https://www.google.com/s2/favicons?domain=${project.link?.replace(/^https?:\/\//, "").split("/")[0]}&sz=128`}
                                            alt={`${project.title} icon`}
                                            width={48}
                                            height={48}
                                            className="object-contain"
                                        />
                                    ) : (
                                        <span className="text-2xl font-bold text-zinc-400 dark:text-zinc-600">
                                            {project.icon || project.title.substring(0, 2)}
                                        </span>
                                    )}
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 dark:to-black/20" />
                        </div>

                        <div className="flex min-w-0 flex-1 flex-col gap-2">
                            <div className="space-y-1">
                                <h3 className="text-base font-semibold leading-snug text-zinc-900 dark:text-zinc-100">
                                    {project.title}
                                </h3>
                                {project.tagline && (
                                    <p className="m-0 text-sm font-medium leading-snug text-zinc-700 dark:text-zinc-300">
                                        {project.tagline}
                                    </p>
                                )}
                            </div>

                            {project.excerpt && (
                                <p className="m-0 line-clamp-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 md:max-w-[480px]">
                                    {truncateWords(project.excerpt, 18)}
                                </p>
                            )}

                            <div className="flex items-center gap-2 text-zinc-600 transition-colors group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-zinc-100">
                                <div className="flex h-4 w-4 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-zinc-100 dark:bg-zinc-800">
                                    {project.link ? (
                                        <Image
                                            src={`https://www.google.com/s2/favicons?domain=${project.link?.replace(/^https?:\/\//, "").split("/")[0]}&sz=32`}
                                            alt={`${project.title} icon`}
                                            width={16}
                                            height={16}
                                            className="object-contain"
                                        />
                                    ) : (
                                        <span className="text-[8px] font-bold uppercase text-zinc-900 dark:text-zinc-100">
                                            {project.icon || project.title.substring(0, 2)}
                                        </span>
                                    )}
                                </div>
                                <span className="truncate text-xs font-medium">
                                    {getProjectDomain(project.link)}
                                </span>
                                {project.link && (
                                    <ArrowUpRight className="h-3 w-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                                )}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}

export function FeaturedProjectsSkeleton() {
    return (
        <section className="mx-auto mt-12 w-full max-w-[610px] px-4 md:px-0">
            <Skeleton className="mb-6 h-8 w-48" />
            <div className="flex flex-col gap-10 md:gap-8">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex flex-col gap-4 md:flex-row md:items-center md:gap-5">
                        <Skeleton className="aspect-video w-full shrink-0 rounded-md md:h-[110px] md:w-[180px] md:aspect-auto" />
                        <div className="flex w-full flex-col gap-2">
                            <div className="space-y-1">
                                <Skeleton className="h-5 w-40" />
                                <Skeleton className="h-4 w-56" />
                            </div>
                            <Skeleton className="h-4 w-full md:w-[450px]" />
                            <Skeleton className="h-4 w-full md:w-[400px]" />
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-4 rounded-sm" />
                                <Skeleton className="h-3 w-24" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

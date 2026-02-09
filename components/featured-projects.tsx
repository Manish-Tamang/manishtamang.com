import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { FEATURE_PROJECTS_QUERY } from "@/sanity/lib/queries"
import { sanityFetch } from "@/sanity/lib/live"
import { Skeleton } from "@/components/ui/skeleton"

export async function FeaturedProjects() {
    const { data: projects } = await sanityFetch({ query: FEATURE_PROJECTS_QUERY })

    if (!projects || projects.length === 0) return null

    return (
        <section className="w-full max-w-[610px] mx-auto mt-12 px-6">
            <h2 className="text-2xl font-semibold mb-6 text-zinc-950 dark:text-zinc-50 text-left">Featured Projects</h2>
            <div className="space-y-12 md:space-y-6">
                {projects.map((project: any, index: number) => (
                    <Link
                        key={index}
                        href={project.link ? (project.link.startsWith('http') ? project.link : `https://${project.link}`) : '#'}
                        target={project.link ? "_blank" : undefined}
                        className="group flex flex-col md:flex-row gap-4 md:gap-6 items-start hover:opacity-80 transition-opacity"
                    >
                        <div className="relative w-full md:w-[180px] aspect-video md:h-[110px] rounded-md overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shrink-0">
                            {project.image ? (
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-zinc-200 dark:bg-zinc-800">
                                    <span className="text-zinc-400 dark:text-zinc-600 font-bold text-2xl">{project.icon}</span>
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 dark:to-black/20" />
                        </div>

                        <div className="flex flex-col py-1 w-full">
                            <div className="flex flex-wrap items-center gap-2 mb-2 md:mb-1">
                                <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 leading-none">
                                    {project.title}
                                </h3>
                                {(project.tagline || project.excerpt) && (
                                    <>
                                        <span className="hidden md:inline text-zinc-400 dark:text-zinc-600 text-base font-light leading-none">|</span>
                                        <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200 leading-none">
                                            {project.tagline || project.excerpt}
                                        </span>
                                    </>
                                )}
                            </div>

                            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3 md:mb-2 leading-relaxed md:max-w-[480px]">
                                {(() => {
                                    const description = project.excerpt || project.tagline || "";
                                    const words = description.split(' ');
                                    if (words.length > 14) {
                                        return words.slice(0, 14).join(' ') + '...';
                                    }
                                    return description;
                                })()}
                            </p>

                            <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                                <div className="w-4 h-4 rounded-sm bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center overflow-hidden">
                                    <span className="text-[8px] font-bold uppercase text-zinc-900 dark:text-zinc-100">{project.icon || project.title.substring(0, 2)}</span>
                                </div>
                                <span className="text-xs font-medium truncate max-w-[200px]">{project.link?.replace(/^https?:\/\//, '') || 'No link'}</span>
                                {project.link && <ArrowUpRight className="w-3 h-3 opacity-0 md:opacity-0 group-hover:opacity-100 transition-opacity" />}
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
        <section className="w-full max-w-[610px] mx-auto mt-12 px-6">
            <Skeleton className="h-8 w-48 mb-6" />
            <div className="space-y-12 md:space-y-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
                        <Skeleton className="w-full md:w-[180px] aspect-video md:h-[110px] rounded-md shrink-0" />
                        <div className="flex flex-col py-1 w-full space-y-3">
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-5 w-32"/>
                                <Skeleton className="h-4 w-40" />
                            </div>
                            <Skeleton className="h-4 w-full md:w-[450px]" />
                            <Skeleton className="h-4 w-full md:w-[400px]" />
                            <div className="flex items-center gap-2 pt-1">
                                <Skeleton className="w-4 h-4 rounded-sm" />
                                <Skeleton className="h-3 w-24" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

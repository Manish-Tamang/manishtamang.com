import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

const projects = [
    {
        title: "YetiBooth",
        tagline: "SaaS for Photobooth Management",
        description: "A comprehensive platform for photobooth owners to manage bookings, clients, and digital assets efficiently.",
        link: "yetibooth.com",
        image: "/projects/Screenshot 2025-11-12 231439.png",
        icon: "Y"
    },
    {
        title: "Risk Design",
        tagline: "Crisis Management & Consulting",
        description: "Specialized consulting services providing strategic solutions for disaster recovery and organizational resilience.",
        link: "riskdesign.jp",
        image: "/projects/Screenshot 2025-11-15 230208.png",
        icon: "RD"
    },
    {
        title: "Craving Explorer",
        tagline: "One-Click Media Downloader",
        description: "A powerful tool designed for seamless video and audio preservation with a single click interface.",
        link: "crav-ing.com",
        image: "/projects/Screenshot 2025-12-05 222102.png",
        icon: "CE"
    },
    {
        title: "WAVERS Inc.",
        tagline: "Official Portfolio",
        description: "Corporate showcase for the music production powerhouse led by Hiroaki Nishiyama and team.",
        link: "wavers.jp",
        image: "/projects/Screenshot 2025-12-29 202411.png",
        icon: "W"
    }
]

export function FeaturedProjects() {
    return (
        <section className="w-full max-w-[610px] mx-auto mt-12 px-6">
            <h2 className="text-2xl font-semibold mb-6 text-zinc-950 dark:text-zinc-50 text-left md:text-left">Featured Projects</h2>
            <div className="space-y-12 md:space-y-6">
                {projects.map((project, index) => (
                    <Link
                        key={index}
                        href={`https://${project.link}`}
                        target="_blank"
                        className="group flex flex-col md:flex-row gap-4 md:gap-6 items-start hover:opacity-80 transition-opacity"
                    >
                        <div className="relative w-full md:w-[180px] aspect-video md:h-[110px] rounded-md overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shrink-0">
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 dark:to-black/20" />
                        </div>

                        <div className="flex flex-col py-1 w-full">
                            <div className="flex flex-wrap items-center gap-2 mb-2 md:mb-1">
                                <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-100 leading-none">
                                    {project.title}
                                </h3>
                                <span className="hidden md:inline text-zinc-400 dark:text-zinc-600 text-base font-light leading-none">|</span>
                                <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200 leading-none">
                                    {project.tagline}
                                </span>
                            </div>

                            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-3 md:mb-2 leading-relaxed line-clamp-2 md:max-w-[480px]">
                                {project.description}
                            </p>

                            <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                                <div className="w-4 h-4 rounded-sm bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center overflow-hidden">
                                    <span className="text-[8px] font-bold uppercase text-zinc-900 dark:text-zinc-100">{project.icon}</span>
                                </div>
                                <span className="text-xs font-medium">{project.link}</span>
                                <ArrowUpRight className="w-3 h-3 opacity-0 md:opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}

import { PROJECTS_QUERY } from "@/sanity/lib/queries"
import { sanityFetch } from "@/sanity/lib/live"
import ProjectsClient from "@/components/ProjectsClient"

export const metadata = {
    title: "Projects | Manish Tamang",
    description: "A collection of my work, ranging from web applications to creative experiments.",
}

export default async function ProjectsPage() {
    const { data: projects } = await sanityFetch({ query: PROJECTS_QUERY })

    return (
        <div className="flex flex-col items-center min-h-screen">
            <div className="w-full max-w-[670px] px-4 sm:px-6 py-6 sm:py-12 space-y-12 sm:space-y-16">
                {/* Header */}
                <header className="space-y-4">
                    <h1 className="text-3xl sm:text-4xl font-medium tracking-tight">Projects</h1>
                    <p className="text-foreground leading-normal text-sm md:text-base">
                        Here are some of the projects I&apos;ve worked on. Each project represents a unique challenge and learning experience.
                    </p>
                </header>

                {/* Projects Listing */}
                <ProjectsClient initialProjects={projects || []} />
            </div>
        </div>
    )
}

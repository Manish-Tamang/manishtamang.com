import { notFound } from "next/navigation"
import { PROJECT_BY_SLUG_QUERY, PROJECTS_QUERY } from "@/sanity/lib/queries"
import { sanityFetch } from "@/sanity/lib/live"
import { urlFor } from "@/sanity/lib/image"
import { client } from "@/sanity/lib/client"
import ProjectDetails from "@/components/ProjectDetails"

import { Metadata } from 'next'

interface ProjectPageProps {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const { slug } = await params
    const { data: project } = await sanityFetch({
        query: PROJECT_BY_SLUG_QUERY,
        params: { slug }
    })

    if (!project) return { title: 'Project Not Found' }

    return {
        title: `${project.title} | Manish Tamang`,
        description: project.excerpt,
        openGraph: {
            title: project.title,
            description: project.excerpt,
            images: project.thumbnail ? [urlFor(project.thumbnail).url()] : [],
        },
    }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params

    const { data: project } = await sanityFetch({
        query: PROJECT_BY_SLUG_QUERY,
        params: { slug }
    })

    if (!project) {
        notFound()
    }

    return <ProjectDetails project={project} />
}

export async function generateStaticParams() {
    const posts = await client.fetch(PROJECTS_QUERY)
    return posts.map((post: any) => ({
        slug: post.slug || "",
    }))
}


"use client"

import { useEffect } from "react"

export function BlogViewTracker({ slug }: { slug: string }) {
    useEffect(() => {
        const registerView = async () => {
            try {
                await fetch(`/api/blog-views/${slug}`, {
                    method: "POST",
                })
            } catch (error) {
                console.error("Failed to register view:", error)
            }
        }

        registerView()
    }, [slug])

    return null
}

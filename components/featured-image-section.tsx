import Image from "next/image"
import { FEATURED_IMAGE_QUERY } from "@/sanity/lib/queries"
import { sanityFetch } from "@/sanity/lib/live"
import { Skeleton } from "@/components/ui/skeleton"
import { FlowerButton } from "@/components/flower-button"

export async function FeaturedImageSection() {
    const { data: featuredImage } = await sanityFetch({ query: FEATURED_IMAGE_QUERY })

    if (!featuredImage?.url) return null

    return (
        <div className="p-6 mt-4 max-w-[720px] w-full flex flex-col items-center gap-8">
            <div className="w-full">
                <Image
                    src={featuredImage.url}
                    alt={featuredImage.alt || "Featured Image"}
                    width={1920}
                    height={1080}
                    className="w-full h-auto rounded-md shadow-sm border border-zinc-200 dark:border-zinc-800"
                    priority
                />
                {featuredImage.caption && (
                    <p className="mt-2 text-xs text-zinc-500 text-center font-medium italic">
                        {featuredImage.caption}
                    </p>
                )}
            </div>

            <div className="w-full flex justify-end">
                <FlowerButton text="View photos" href="/photos" />
            </div>
        </div>
    )
}

export function FeaturedImageSkeleton() {
    return (
        <div className="p-6 mt-4 max-w-[720px] w-full">
            <Skeleton className="w-full aspect-video rounded-md" />
            <div className="mt-2 flex justify-center">
                <Skeleton className="h-3 w-32" />
            </div>
        </div>
    )
}

import { GALLERY_QUERY } from "@/sanity/lib/queries"
import { sanityFetch } from "@/sanity/lib/live"
import { PhotosGrid } from "@/components/PhotosGrid"

export default async function PhotosPage() {
    const { data: images } = await sanityFetch({ query: GALLERY_QUERY })

    return (
        <div className="flex flex-col items-center min-h-screen">
            <div className="w-full max-w-[670px] px-4 sm:px-6 py-6 sm:py-6 space-y-8 sm:space-y-6">
                <header className="space-y-2">
                    <h1 className="text-3xl sm:text-4xl font-medium tracking-tight">Photos</h1>
                    <p className="text-foreground leading-normal text-sm md:text-base">
                        A collection of random images from my gallery.
                    </p>
                </header>
                <PhotosGrid images={images || []} />
            </div>
        </div>
    )
}

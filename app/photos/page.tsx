import { GALLERY_QUERY } from "@/sanity/lib/queries"
import { sanityFetch } from "@/sanity/lib/live"
import { PhotosGrid } from "@/components/PhotosGrid"

export default async function PhotosPage() {
    const { data: images } = await sanityFetch({ query: GALLERY_QUERY })

    return (
        <div className="flex flex-col items-center min-h-screen">
            <div className="w-full max-w-[670px] px-4 sm:px-6 py-6 sm:py-12 space-y-8 sm:space-y-12">
                {/* Header */}
                <header className="space-y-4">
                    <h1 className="text-3xl sm:text-4xl font-medium tracking-tight">Photos</h1>
                    <p className="text-foreground leading-normal text-sm md:text-base">
                        A collection of moments captured through my lens. Click on any image to view it in full size.
                    </p>
                </header>

                {/* Gallery Grid */}
                <PhotosGrid images={images || []} />
            </div>
        </div>
    )
}

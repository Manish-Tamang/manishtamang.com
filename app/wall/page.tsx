import { WALL_QUERY } from "@/sanity/lib/queries"
import { sanityFetch } from "@/sanity/lib/live"
import Image from "next/image"

export const dynamic = "force-dynamic"

export default async function WallPage() {
    const { data: wallItems } = await sanityFetch({ query: WALL_QUERY })

    return (
        <div className="flex flex-col items-center min-h-screen">
            <div className="w-full max-w-[610px] px-4 sm:px-6 py-6 sm:py-12 space-y-8">
                <header className="space-y-2">
                    <h1 className="text-3xl sm:text-4xl font-medium tracking-tight">Wall</h1>
                    <p className="text-foreground/80 leading-normal text-sm md:text-base">
                        Posters, album covers, and stickers I love.
                    </p>
                </header>

                <div className="grid grid-cols-10 gap-0.5">
                    {wallItems?.map((item: any) => (
                        <div
                            key={item._id}
                            className="relative aspect-square border-zinc-300 dark:border-zinc-600 overflow-hidden bg-zinc-100 dark:bg-zinc-900 group"
                        >
                            <Image
                                src={item.imageURL}
                                alt="Wall item"
                                fill
                                draggable={false}
                                className="object-cover user-select-none duration-300"
                                sizes="(max-width: 1024px) 25vw, 225px"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

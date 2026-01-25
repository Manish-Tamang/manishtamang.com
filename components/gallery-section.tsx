"use client"

import Image from "next/image"

export function GallerySection() {
    const merchImages = [
        "/images/IMG_20250714_130748.jpg",
        "/images/IMG_20250714_130748.jpg",
        "/images/IMG_20250714_130748.jpg",
    ]

    return (
        <section className="w-[610px]  mt-4 mb-12">
            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 bg-white rounded-md border border-zinc-200 p-8 flex items-center justify-between">
                    <div className="flex gap-2">
                        {merchImages.map((src, i) => (
                            <div key={i} className="w-[100px] h-[140px] relative rounded-sm overflow-hidden border border-zinc-200 shadow-sm transition-transform">
                                <Image
                                    src={src}
                                    alt={`Merch photoshoot ${i + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-span-1 bg-[#FFB5A7] rounded-md p-8 flex flex-col justify-between relative overflow-hidden group">
                </div>
            </div>
        </section>
    )
}

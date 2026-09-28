"use client"

import { useState } from "react"
import { BlurImage } from "@/components/shared"
import { ImageModal, type GalleryImage } from "@/components/shared/image-modal"
import { cn } from "@/lib/utils"

interface PhotosGridProps {
  images: GalleryImage[]
}

const formatClass: Record<string, string> = {
  "1x1": "col-span-1 row-span-1 min-h-[8.5rem]",
  "2x1": "col-span-2 row-span-1 min-h-[8.5rem]",
  "1x2": "col-span-1 row-span-2 min-h-[17.5rem]",
  "2x2": "col-span-2 row-span-2 min-h-[17.5rem]",
  "3x1": "col-span-2 sm:col-span-3 row-span-1 min-h-[8.5rem]",
  "4x1": "col-span-2 sm:col-span-3 md:col-span-4 row-span-1 min-h-[8.5rem]",
}

export function PhotosGrid({ images }: PhotosGridProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleImageClick = (index: number) => {
    setSelectedIndex(index)
    setIsModalOpen(true)
  }

  if (images.length === 0) {
    return (
      <div className="py-12 text-center text-foreground/60">
        No images found in gallery.
      </div>
    )
  }

  return (
    <>
      <div className="grid auto-rows-[minmax(8.5rem,auto)] grid-cols-2 grid-flow-dense gap-1 sm:grid-cols-3 md:grid-cols-4">
        {images.map((image, index) => {
          const layout = formatClass[image.format || "1x1"] ?? formatClass["1x1"]
          const eager = index < 4

          return (
            <button
              key={image._id}
              type="button"
              className={cn(
                "relative h-full w-full overflow-hidden bg-zinc-200 transition-opacity hover:opacity-90 dark:bg-zinc-800",
                layout
              )}
              onClick={() => handleImageClick(index)}
              aria-label={image.alt || image.caption || "Open photo"}
            >
              <BlurImage
                src={image.imageURL}
                alt={image.alt || image.caption || "Gallery image"}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 168px"
                className="object-cover"
                lazy={!eager}
                priority={eager}
                quality={70}
                blurDataURL={image.lqip ?? undefined}
              />
            </button>
          )
        })}
      </div>

      <ImageModal
        images={images}
        index={selectedIndex}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onIndexChange={setSelectedIndex}
      />
    </>
  )
}

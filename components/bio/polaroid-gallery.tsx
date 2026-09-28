"use client"

import { useMemo, useState } from "react"
import { BlurImage } from "@/components/shared"
import { ImageModal, type GalleryImage } from "@/components/shared/image-modal"
import type { BioPolaroidItem } from "@/data/bio-polaroids"

type PolaroidCardProps = {
  src: string
  alt: string
  caption: string
  rotate: number
  lazy?: boolean
  priority?: boolean
}

export function PolaroidCard({
  src,
  alt,
  caption,
  rotate,
  lazy = true,
  priority = false,
}: PolaroidCardProps) {
  return (
    <div style={{ transform: `rotate(${rotate}deg)` }} className="mx-auto w-full max-w-36 sm:max-w-40">
      <article className="w-full bg-white px-2.5 pt-2.5 pb-3.5 text-zinc-900 shadow-[0_6px_20px_rgba(0,0,0,0.12),0_2px_6px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:rotate-1 hover:shadow-[0_14px_36px_rgba(0,0,0,0.16),0_4px_10px_rgba(0,0,0,0.1)] dark:bg-zinc-100 dark:shadow-[0_8px_24px_rgba(0,0,0,0.35),0_2px_8px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.45),0_4px_12px_rgba(0,0,0,0.25)]">
        <div className="relative aspect-square w-full overflow-hidden bg-zinc-100">
          <BlurImage
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 640px) 38vw, 160px"
            className="object-cover object-center"
            draggable={false}
            quality={70}
            lazy={lazy}
            priority={priority}
            style={{ userSelect: "none" }}
          />
        </div>
        <p className="pt-2 text-center text-[11px] font-myfont leading-tight text-zinc-700 sm:text-xs">
          {caption}
        </p>
      </article>
    </div>
  )
}

type PolaroidGalleryProps = {
  data: BioPolaroidItem[]
}

function toGalleryImages(data: BioPolaroidItem[]): GalleryImage[] {
  return data.map((item, order) => ({
    _id: item.id,
    imageURL: item.src,
    alt: item.alt,
    caption: item.caption,
    width: item.width ?? null,
    height: item.height ?? null,
    order,
  }))
}

export function PolaroidGallery({ data }: PolaroidGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const galleryImages = useMemo(() => toGalleryImages(data), [data])

  return (
    <>
      <section className="mx-auto w-full max-w-xl pt-8 sm:max-w-2xl" aria-label="Polaroid memories">
        <div className="grid w-full grid-cols-2 items-start justify-items-center gap-3 sm:grid-cols-4 sm:gap-4">
          {data.map((item, index) => {
            const eager = index < 2

            return (
              <button
                key={item.id}
                type="button"
                className="flex w-full cursor-zoom-in justify-center text-left"
                onClick={() => {
                  setSelectedIndex(index)
                  setIsModalOpen(true)
                }}
                aria-label={`Open ${item.caption}`}
              >
                <PolaroidCard
                  src={item.src}
                  alt={item.alt}
                  caption={item.caption}
                  rotate={item.rotate}
                  lazy={!eager}
                  priority={eager}
                />
              </button>
            )
          })}
        </div>
      </section>

      <ImageModal
        images={galleryImages}
        index={selectedIndex}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onIndexChange={setSelectedIndex}
      />
    </>
  )
}

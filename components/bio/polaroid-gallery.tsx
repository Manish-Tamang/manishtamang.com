"use client"

import * as Dialog from "@radix-ui/react-dialog"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { useMemo, useState } from "react"

import type { BioPolaroidItem } from "@/data/bio-polaroids"
import { cn } from "@/lib/utils"

type PolaroidCardProps = {
  src: string
  alt: string
  caption: string
  rotate: number
}

export function PolaroidCard({ src, alt, caption, rotate }: PolaroidCardProps) {
  return (
    <div style={{ transform: `rotate(${rotate}deg)` }} className="mx-auto w-full max-w-36 sm:max-w-40">
      <article className="w-full bg-white px-2.5 pt-2.5 pb-3.5 text-zinc-900 shadow-[0_6px_20px_rgba(0,0,0,0.12),0_2px_6px_rgba(0,0,0,0.08)] transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.02] hover:rotate-1 hover:shadow-[0_14px_36px_rgba(0,0,0,0.16),0_4px_10px_rgba(0,0,0,0.1)] dark:bg-zinc-100 dark:shadow-[0_8px_24px_rgba(0,0,0,0.35),0_2px_8px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_16px_40px_rgba(0,0,0,0.45),0_4px_12px_rgba(0,0,0,0.25)]">
        <div className="relative aspect-square w-full overflow-hidden bg-zinc-100">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 640px) 38vw, 160px"
            className="size-full object-cover object-center"
            draggable={false}
            style={{ userSelect: "none" }}
          />
        </div>
        <p className="pt-2 text-center text-[11px] sm:text-xs font-myfont leading-tight text-zinc-700">
          {caption}
        </p>
      </article>
    </div>
  )
}

type PolaroidGalleryProps = {
  data: BioPolaroidItem[]
}

export function PolaroidGallery({ data }: PolaroidGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const isModalOpen = selectedIndex !== null

  const selectedItem = useMemo(() => {
    if (selectedIndex === null) return null
    return data[selectedIndex] ?? null
  }, [data, selectedIndex])

  const openModalAt = (index: number) => {
    setSelectedIndex(index)
  }

  const closeModal = () => {
    setSelectedIndex(null)
  }

  const goToPrevious = () => {
    if (selectedIndex === null || data.length === 0) return
    const previousIndex = (selectedIndex - 1 + data.length) % data.length
    setSelectedIndex(previousIndex)
  }

  const goToNext = () => {
    if (selectedIndex === null || data.length === 0) return
    const nextIndex = (selectedIndex + 1) % data.length
    setSelectedIndex(nextIndex)
  }

  return (
    <>
      <section className="w-full max-w-xl sm:max-w-2xl mx-auto pt-8" aria-label="Polaroid memories">
        <div className="grid w-full grid-cols-2 items-start justify-items-center gap-3 sm:grid-cols-4 sm:gap-4">
          {data.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className="flex w-full cursor-zoom-in justify-center text-left"
              onClick={() => openModalAt(index)}
              aria-label={`Open ${item.caption}`}
            >
              <PolaroidCard
                src={item.src}
                alt={item.alt}
                caption={item.caption}
                rotate={item.rotate}
              />
            </button>
          ))}
        </div>
      </section>

      <Dialog.Root open={isModalOpen} onOpenChange={(open) => !open && closeModal()}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-999 bg-black/70 backdrop-blur-md data-[state=open]:animate-in data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out" />
          <Dialog.Content
            className={cn(
              "fixed left-1/2 top-1/2 z-1000 w-[95vw] sm:w-[90vw] max-w-4xl max-h-[90vh] sm:max-h-[85vh]",
              "-translate-x-1/2 -translate-y-1/2 focus:outline-none",
              "data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95",
              "data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95"
            )}
          >
            <Dialog.Title className="sr-only">Polaroid Image</Dialog.Title>

            {selectedItem && (
              <div className="relative w-full h-full flex flex-col">
                <button
                  onClick={closeModal}
                  className="absolute top-2 right-2 sm:top-4 sm:right-4 z-20 rounded-full bg-black/50 backdrop-blur-sm p-1.5 sm:p-2 text-white hover:bg-black/70 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <button
                  onClick={goToPrevious}
                  className="absolute left-2 sm:left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 backdrop-blur-sm p-1.5 sm:p-2 text-white hover:bg-black/70 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>

                <button
                  onClick={goToNext}
                  className="absolute right-2 sm:right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/50 backdrop-blur-sm p-1.5 sm:p-2 text-white hover:bg-black/70 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>

                <div className="relative flex-1 flex items-center justify-center overflow-hidden bg-transparent px-10 sm:px-14">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={selectedItem.src}
                      alt={selectedItem.alt || selectedItem.caption}
                      width={1200}
                      height={900}
                      className="max-w-[85vw] sm:max-w-200 max-h-[70vh] sm:max-h-[75vh] w-auto h-auto object-contain"
                      quality={90}
                      priority
                    />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/90 via-black/70 to-transparent p-4 sm:p-6 pt-10 sm:pt-12">
                  <p className="text-sm sm:text-base text-white font-medium">
                    {selectedItem.caption}
                  </p>
                </div>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  )
}

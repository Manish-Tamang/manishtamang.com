"use client"

import * as Dialog from "@radix-ui/react-dialog"
import Image from "next/image"
import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { isSanityImageSrc, sanityImageLoader } from "@/lib/sanity-image-loader"

export interface GalleryImage {
  _id: string
  imageURL: string
  lqip?: string | null
  width?: number | null
  height?: number | null
  alt?: string
  caption?: string
  uploadedAt?: string
  format?: string
  order: number
}

interface ImageModalProps {
  image?: GalleryImage | null
  images?: GalleryImage[]
  index?: number
  open: boolean
  onOpenChange: (open: boolean) => void
  onIndexChange?: (index: number) => void
}

function formatTimestamp(timestamp?: string): string {
  if (!timestamp) return ""

  try {
    const date = new Date(timestamp)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  } catch {
    return ""
  }
}

function PhotoFrame({ image }: { image: GalleryImage }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [frame, setFrame] = useState({ width: 0, height: 0 })
  const naturalWidth = image.width && image.width > 0 ? image.width : 3
  const naturalHeight = image.height && image.height > 0 ? image.height : 4

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    const update = () => {
      const maxWidth = node.clientWidth
      const maxHeight = node.clientHeight
      if (!maxWidth || !maxHeight) return

      const scale = Math.min(maxWidth / naturalWidth, maxHeight / naturalHeight)
      setFrame({
        width: Math.max(1, naturalWidth * scale),
        height: Math.max(1, naturalHeight * scale),
      })
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(node)
    return () => observer.disconnect()
  }, [naturalWidth, naturalHeight, image._id])

  return (
    <div ref={containerRef} className="flex h-full min-h-0 w-full items-center justify-center">
      <div
        className="relative overflow-hidden"
        style={
          frame.width
            ? { width: frame.width, height: frame.height }
            : {
                aspectRatio: `${naturalWidth} / ${naturalHeight}`,
                maxHeight: "100%",
                maxWidth: "100%",
                height: "100%",
              }
        }
      >
        <Image
          src={image.imageURL}
          alt={image.alt || image.caption || "Gallery image"}
          fill
          sizes="(max-width: 1200px) 92vw, 1200px"
          quality={85}
          priority
          loader={isSanityImageSrc(image.imageURL) ? sanityImageLoader : undefined}
          placeholder={image.lqip ? "blur" : "empty"}
          blurDataURL={image.lqip ?? undefined}
          className="object-cover"
        />
      </div>
    </div>
  )
}

export function ImageModal({
  image = null,
  images,
  index = 0,
  open,
  onOpenChange,
  onIndexChange,
}: ImageModalProps) {
  const gallery = images?.length ? images : image ? [image] : []
  const currentIndex = gallery.length ? Math.min(Math.max(index, 0), gallery.length - 1) : 0
  const current = gallery[currentIndex]
  const hasNav = gallery.length > 1
  const touchStartX = useRef<number | null>(null)

  const goTo = useCallback(
    (nextIndex: number) => {
      if (!gallery.length) return
      const wrapped = (nextIndex + gallery.length) % gallery.length
      onIndexChange?.(wrapped)
    },
    [gallery.length, onIndexChange]
  )

  const goPrev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo])
  const goNext = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo])

  useEffect(() => {
    if (!open || !hasNav) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        goPrev()
      }
      if (event.key === "ArrowRight") {
        event.preventDefault()
        goNext()
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [open, hasNav, goPrev, goNext])

  const caption = current?.caption || current?.alt || "Photo"
  const dateLabel = formatTimestamp(current?.uploadedAt)

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[999] bg-black/90 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <Dialog.Content
          className={cn(
            "fixed inset-0 left-0 top-0 z-[1000] flex h-dvh w-screen max-w-none translate-x-0 translate-y-0 flex-col overflow-hidden bg-black/95 p-0 shadow-none",
            "focus:outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0"
          )}
          onTouchStart={(event) => {
            touchStartX.current = event.changedTouches[0]?.clientX ?? null
          }}
          onTouchEnd={(event) => {
            if (touchStartX.current == null || !hasNav) return
            const delta = (event.changedTouches[0]?.clientX ?? 0) - touchStartX.current
            touchStartX.current = null
            if (Math.abs(delta) < 56) return
            if (delta < 0) goNext()
            else goPrev()
          }}
        >
          <Dialog.Title className="sr-only">{caption}</Dialog.Title>
          <Dialog.Description className="sr-only">
            {hasNav
              ? `Photo ${currentIndex + 1} of ${gallery.length}. Use arrow keys to navigate.`
              : "Expanded photo view."}
          </Dialog.Description>

          <div className="flex shrink-0 items-center justify-between gap-4 px-4 py-3 text-white sm:px-6">
            <p className="text-sm tabular-nums text-white/70">
              {current ? `${currentIndex + 1} / ${gallery.length}` : ""}
            </p>
            <Dialog.Close
              className="rounded-full p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-12 sm:px-16">
            {hasNav ? (
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-2 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 sm:left-4"
                aria-label="Previous photo"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            ) : null}

            {current ? <PhotoFrame image={current} /> : null}

            {hasNav ? (
              <button
                type="button"
                onClick={goNext}
                className="absolute right-2 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 sm:right-4"
                aria-label="Next photo"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            ) : null}
          </div>

          <div className="flex min-h-16 shrink-0 flex-col items-center justify-center gap-1 px-6 py-4 text-center">
            {current?.caption ? (
              <p className="max-w-2xl text-sm font-medium text-white">{current.caption}</p>
            ) : null}
            {dateLabel ? (
              <p className="text-xs text-white/55">{dateLabel}</p>
            ) : null}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

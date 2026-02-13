"use client"

import * as Dialog from "@radix-ui/react-dialog"
import Image from "next/image"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface GalleryImage {
    _id: string
    imageURL: string
    alt?: string
    caption?: string
    uploadedAt?: string
    format?: string
    order: number
}

interface ImageModalProps {
    image: GalleryImage | null
    open: boolean
    onOpenChange: (open: boolean) => void
}

function formatTimestamp(timestamp?: string): string {
    if (!timestamp) return "Unknown date"

    try {
        const date = new Date(timestamp)
        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(date)
    } catch (error) {
        return "Invalid date"
    }
}

export function ImageModal({ image, open, onOpenChange }: ImageModalProps) {
    if (!image) return null

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                {/* Dark blurred backdrop */}
                <Dialog.Overlay className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-md data-[state=open]:animate-in data-[state=open]:fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out" />

                {/* Modal content */}
                <Dialog.Content
                    className={cn(
                        "fixed left-1/2 top-1/2 z-[1000] w-[95vw] sm:w-[90vw] max-w-4xl max-h-[90vh] sm:max-h-[85vh]",
                        "-translate-x-1/2 -translate-y-1/2",
                        "focus:outline-none",
                        "data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95",
                        "data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95"
                    )}
                >
                    {/* Visually hidden title for accessibility */}
                    <Dialog.Title className="sr-only">
                        Gallery Image
                    </Dialog.Title>

                    <div className="relative w-full h-full flex flex-col">
                        {/* Close button */}
                        <button
                            onClick={() => onOpenChange(false)}
                            className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 rounded-full bg-black/50 backdrop-blur-sm p-1.5 sm:p-2 text-white hover:bg-black/70 transition-colors"
                            aria-label="Close"
                        >
                            <X className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>

                        {/* Image container */}
                        <div className="relative flex-1 flex items-center justify-center overflow-hidden bg-transparent px-2 sm:px-4" style={{ isolation: "isolate" }}>
                            <div className="relative w-full h-full flex items-center justify-center">
                                <Image
                                    src={image.imageURL}
                                    alt={image.alt || image.caption || "Gallery image"}
                                    width={1200}
                                    height={800}
                                    className="max-w-full max-w-[85vw] sm:max-w-[800px] max-h-[70vh] sm:max-h-[75vh] w-auto h-auto object-contain"
                                    quality={90}
                                    priority
                                />
                            </div>
                        </div>

                        {/* Details overlay at bottom - only show if there's caption or date */}
                        {(image.caption || image.uploadedAt) && (
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 sm:p-6 pt-10 sm:pt-12">
                                <div className="flex flex-col gap-1">
                                    {image.caption && (
                                        <p className="text-sm sm:text-base text-white font-medium">
                                            {image.caption}
                                        </p>
                                    )}
                                    {image.uploadedAt && (
                                        <p className="text-xs sm:text-sm text-white/60">
                                            Uploaded {formatTimestamp(image.uploadedAt)}
                                        </p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

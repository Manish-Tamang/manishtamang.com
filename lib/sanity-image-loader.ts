import type { ImageLoaderProps } from "next/image"

export function sanityImageLoader({ src, width, quality }: ImageLoaderProps) {
  try {
    const url = new URL(src)

    if (url.hostname !== "cdn.sanity.io") {
      return src
    }

    url.searchParams.set("auto", "format")
    url.searchParams.set("fit", "max")
    url.searchParams.set("w", String(width))
    url.searchParams.set("q", String(quality ?? 75))

    return url.toString()
  } catch {
    return src
  }
}

export function isSanityImageSrc(src: unknown): src is string {
  return typeof src === "string" && src.includes("cdn.sanity.io")
}

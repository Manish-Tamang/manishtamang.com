/*
 * Blurred previews shown while photos load: a 16px WebP of the photo inside an
 * SVG blur, so it reads as a soft preview rather than a pixel mosaic. Made at
 * build time with sharp and inlined as a CSS background (well under 1 KB).
 */
import { join } from "node:path"
import type { ImageMetadata } from "astro"
import sharp from "sharp"

// Maps an imported image back to its file, without relying on Astro internals
const files = import.meta.glob<{ default: ImageMetadata }>("/assets/**/*.{jpg,jpeg,png,webp}", { eager: true })

const cache = new Map<string, Promise<string>>()

const build = async (path: string) => {
  const { data, info } = await sharp(path)
    .rotate()
    .resize(16, 16, { fit: "inside" })
    .webp({ quality: 40 })
    .toBuffer({ resolveWithObject: true })

  // The alpha step keeps the blur from fading to transparent at the edges
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${info.width} ${info.height}" preserveAspectRatio="none">` +
    `<filter id="b" color-interpolation-filters="sRGB"><feGaussianBlur stdDeviation="1"/>` +
    `<feComponentTransfer><feFuncA type="discrete" tableValues="1 1"/></feComponentTransfer></filter>` +
    `<image width="100%" height="100%" preserveAspectRatio="none" filter="url(#b)" href="data:image/webp;base64,${data.toString("base64")}"/>` +
    `</svg>`

  return `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}")`
}

/** A CSS background-image value for the image, or null if its file can't be found. */
export const blurPlaceholder = (image: ImageMetadata) => {
  const key = Object.keys(files).find((file) => files[file].default === image || files[file].default.src === image.src)
  if (!key) return Promise.resolve(null)

  if (!cache.has(key)) cache.set(key, build(join(process.cwd(), key)))
  return cache.get(key)!
}

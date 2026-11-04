/*
 * The "Mini Gole" photo is the largest thing on a phone's first screen (its LCP).
 * There it's a wide 200px-tall banner, so phones get their own 2:1 crop, far fewer
 * pixels than the 4:3 original, cropped to keep the face in frame. The About grid
 * renders it in a <picture>, and the home page preloads it from <head> so the
 * request starts before the browser reaches the grid.
 */
import { getImage } from "astro:assets"
import miniGole from "@/assets/images/mini-gole.jpg"

export { miniGole }

/** Phones (below md): the card spans the column at 200px tall. */
export const mobileMedia = "(max-width: 767px)"
export const mobileSizes = "100vw"
/** CSS object-position for the desktop photo (and its blurred preview) */
export const position = "center 30%"

export const mobileArt = await getImage({
  src: miniGole,
  width: 720,
  height: 360,
  widths: [400, 560, 720],
  fit: "cover",
  // sharp takes keywords, not CSS percentages; "attention" crops toward the face
  position: "attention",
  format: "webp",
  quality: 55,
})

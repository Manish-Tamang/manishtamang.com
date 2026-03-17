export type BioPolaroidItem = {
  id: string
  src: string
  alt: string
  caption: string
  rotate: number
}

export type BioPolaroidParams = {
  id: string
  src: string
  alt: string
  caption: string
  rotate: number
}

export function createBioPolaroid(params: BioPolaroidParams): BioPolaroidItem {
  return {
    id: params.id,
    src: params.src,
    alt: params.alt,
    caption: params.caption,
    rotate: params.rotate,
  }
}

export const bioPolaroids: BioPolaroidItem[] = [
  createBioPolaroid({
    id: "polaroid-1",
    src: "/bio/polaroid-1.jpg",
    alt: "Polaroid moment one",
    caption: "Next.js Conf 2024",
    rotate: -4,
  }),
  createBioPolaroid({
    id: "polaroid-2",
    src: "/bio/polaroid-2.jpg",
    alt: "Polaroid moment two",
    caption: "Vercel team dinner",
    rotate: 2,
  }),
  createBioPolaroid({
    id: "polaroid-3",
    src: "/bio/polaroid-3.jpg",
    alt: "Polaroid moment three",
    caption: "Japan community meetup",
    rotate: -3,
  }),
  createBioPolaroid({
    id: "polaroid-4",
    src: "/bio/polaroid-4.jpg",
    alt: "Polaroid moment four",
    caption: "Stanford hackathon",
    rotate: 3,
  }),
]

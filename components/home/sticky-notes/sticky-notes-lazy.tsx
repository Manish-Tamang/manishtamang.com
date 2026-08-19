"use client"

import dynamic from "next/dynamic"

const StickyNotesProvider = dynamic(() => import("@/components/home/sticky-notes"), {
  ssr: false,
})

export default function StickyNotesLazy({
  stickyNotes,
}: {
  stickyNotes: {
    id: string
    text?: string
    color: string
    initialX: number
    initialY: number
    initialRotation?: number
    width?: number
    height?: number
    mobileWidth?: number
    mobileHeight?: number
    mobileX?: number
    mobileY?: number
    delay?: number
    backgroundImage?: string
  }[]
}) {
  return <StickyNotesProvider stickyNotes={stickyNotes} />
}

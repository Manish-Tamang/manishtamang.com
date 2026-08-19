"use client"

import { useEffect, useState } from "react"
import StickyNote, { StickyNoteColor } from "./sticky-note"

export interface StickyNoteConfig {
    id: string
    text?: string
    content?: React.ReactNode
    color: StickyNoteColor
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
}

interface StickyNotesCanvasProps {
    notes: StickyNoteConfig[]
    zIndex?: number
}

export default function StickyNotesCanvas({ notes, zIndex = 9998 }: StickyNotesCanvasProps) {
    const [containerHeight, setContainerHeight] = useState<number>(0)

    useEffect(() => {
        const updateHeight = () => {
            setContainerHeight(document.documentElement.scrollHeight)
        }

        updateHeight()
        window.addEventListener("resize", updateHeight)
        return () => window.removeEventListener("resize", updateHeight)
    }, [])

    if (!notes || notes.length === 0) {
        return null
    }

    return (
        <div
            className="absolute left-0 top-0 pointer-events-none"
            style={{
                width: "100%",
                height: containerHeight > 0 ? `${containerHeight}px` : "100vh",
                zIndex,
                minHeight: "100vh",
            }}
        >
            {notes.map((note, index) => (
                <StickyNote
                    key={note.id}
                    id={note.id}
                    text={note.text}
                    content={note.content}
                    color={note.color}
                    initialX={note.initialX}
                    initialY={note.initialY}
                    initialRotation={note.initialRotation}
                    width={note.width}
                    height={note.height}
                    mobileWidth={note.mobileWidth}
                    mobileHeight={note.mobileHeight}
                    mobileX={note.mobileX}
                    mobileY={note.mobileY}
                    delay={note.delay ?? index * 0.1}
                    backgroundImage={note.backgroundImage}
                    showDebug={false}
                />
            ))}
        </div>
    )
}

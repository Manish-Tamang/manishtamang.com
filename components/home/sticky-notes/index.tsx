"use client"

import React from "react"
import StickyNotesCanvas, { StickyNoteConfig } from "./sticky-notes-canvas"

interface StickyNoteData {
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
}

interface StickyNotesProviderProps {
    stickyNotes?: StickyNoteData[]
}

export default function StickyNotesProvider({ stickyNotes = [] }: StickyNotesProviderProps) {
    const notes: StickyNoteConfig[] = stickyNotes
        .filter((note) => note?.id)
        .map((note) => {
            const text = note.text || ""
            const lines = text.split("\n")

            return {
                id: note.id,
                content: (
                    <div className="flex items-center justify-center h-full text-center">
                        <p className="text-xs md:text-sm font-medium text-zinc-900 dark:text-zinc-900 leading-tight">
                            {lines.map((line, i) => (
                                <span key={i}>
                                    {line}
                                    {i < lines.length - 1 && <br />}
                                </span>
                            ))}
                        </p>
                    </div>
                ),
                color: note.color as StickyNoteConfig["color"],
                initialX: note.initialX,
                initialY: note.initialY,
                initialRotation: note.initialRotation,
                width: note.width,
                height: note.height,
                mobileWidth: note.mobileWidth,
                mobileHeight: note.mobileHeight,
                mobileX: note.mobileX,
                mobileY: note.mobileY,
                delay: note.delay,
                backgroundImage: note.backgroundImage,
            }
        })

    return <StickyNotesCanvas notes={notes} zIndex={9998} />
}

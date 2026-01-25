"use client"

import React from 'react'
import StickyNotesCanvas, { StickyNoteConfig } from './sticky-notes-canvas'

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
}

interface StickyNotesProviderProps {
    stickyNotes?: StickyNoteData[]
}

export default function StickyNotesProvider({ stickyNotes = [] }: StickyNotesProviderProps) {
    const hasNotes = stickyNotes && stickyNotes.length > 0
    const defaultNotes: StickyNoteData[] = !hasNotes ? [
        {
            id: 'hero-1',
            text: '👋',
            color: 'yellow',
            initialX: 100,
            initialY: 150,
            initialRotation: -2,
            width: 120,
            height: 120,
            mobileWidth: 80,
            mobileHeight: 80,
            mobileX: 20,
            mobileY: 100,
            delay: 0.2,
        },
        {
            id: 'hero-2',
            text: 'Scroll down\nfor more!',
            color: 'green',
            initialX: 250,
            initialY: 120,
            initialRotation: 12,
            width: 120,
            height: 120,
            mobileWidth: 80,
            mobileHeight: 80,
            mobileX: 110,
            mobileY: 100,
            delay: 0.4,
        },
    ] : stickyNotes

    // Convert data to StickyNoteConfig with JSX content
    const notes: StickyNoteConfig[] = defaultNotes
        .filter(note => note && note.id) // Filter out any invalid notes
        .map((note) => {
            const text = note.text || ''
            const isEmoji = /^[\p{Emoji}\s]+$/u.test(text.trim())
            const hasLocation = text.includes('📍') || text.includes('Nepal')

            let content: React.ReactNode
            if (hasLocation) {
                const parts = text.split('\n')
                content = (
                    <div className="flex flex-col items-center gap-1">
                        {parts.map((part, i) => (
                            <span key={i} className={i === 0 ? "text-xs md:text-base" : "text-sm md:text-xl font-semibold text-foreground leading-tight"}>
                                {part}
                            </span>
                        ))}
                    </div>
                )
            } else if (isEmoji) {
                content = (
                    <div className="flex items-center justify-center h-full">
                        <span className="text-2xl md:text-4xl">{text}</span>
                    </div>
                )
            } else {
                content = (
                    <div className="flex items-center justify-center h-full text-center">
                        <p className="text-xs md:text-sm font-medium text-foreground leading-tight" style={{ fontFamily: 'var(--font-paragraph), sans-serif' }}>
                            {text.split('\n').map((line, i) => (
                                <span key={i}>
                                    {line}
                                    {i < text.split('\n').length - 1 && <br />}
                                </span>
                            ))}
                        </p>
                    </div>
                )
            }

            return {
                id: note.id,
                content,
                color: note.color as any,
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
            } as StickyNoteConfig
        })

    return <StickyNotesCanvas notes={notes} zIndex={9998} />
}


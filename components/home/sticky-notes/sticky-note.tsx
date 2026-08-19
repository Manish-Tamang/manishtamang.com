"use client"

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'motion/react'
import { Gaegu } from 'next/font/google'

const gaegu = Gaegu({ weight: ["400"], subsets: ["latin"] })

export type StickyNoteColor = 'yellow' | 'green' | 'pink' | 'blue' | 'purple' | 'orange'

export interface StickyNoteProps {
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
    onPositionChange?: (id: string, x: number, y: number) => void
    showDebug?: boolean
}

const colorClasses: Record<StickyNoteColor, string> = {
    yellow: 'bg-[#FBFF94]',
    green: 'bg-[#B8FFC6]',
    pink: 'bg-[#FFCDD5]',
    blue: 'bg-[#94E6FF]',
    purple: 'bg-[#CDA3FF]',
    orange: 'bg-[#FFE5A3]',
}

export default function StickyNote({
    id,
    text,
    content,
    color,
    initialX,
    initialY,
    initialRotation = 0,
    width = 120,
    height = 120,
    mobileWidth,
    mobileHeight,
    mobileX,
    mobileY,
    delay = 0,
    backgroundImage,
    onPositionChange,
    showDebug = false,
}: StickyNoteProps) {
    const [isMobile, setIsMobile] = useState(false)
    const [position, setPosition] = useState({ x: initialX, y: initialY, rotation: initialRotation })
    const [dragging, setDragging] = useState(false)
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
    const [hovered, setHovered] = useState(false)
    const [hasInitialized, setHasInitialized] = useState(false)

    // Robust mode detection and position initialization
    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 767px)')

        const handleModeChange = (e: MediaQueryListEvent | MediaQueryList) => {
            const isNowMobile = e.matches
            setIsMobile(isNowMobile)

            const mode = isNowMobile ? 'mobile' : 'desktop'
            const storageKey = `sticky-note-${id}-${mode}`
            const saved = localStorage.getItem(storageKey)

            if (saved) {
                try {
                    const parsed = JSON.parse(saved)
                    setPosition(parsed)
                } catch (err) {
                    console.error("Error loading position:", err)
                }
            } else {
                // Initial fallback to props
                if (isNowMobile) {
                    setPosition({
                        x: mobileX ?? initialX,
                        y: mobileY ?? initialY,
                        rotation: initialRotation
                    })
                } else {
                    setPosition({
                        x: initialX,
                        y: initialY,
                        rotation: initialRotation
                    })
                }
            }
            setHasInitialized(true)
        }

        // Initial check
        handleModeChange(mediaQuery)

        // Listen for changes
        mediaQuery.addEventListener('change', handleModeChange)
        return () => mediaQuery.removeEventListener('change', handleModeChange)
    }, [id, initialX, initialY, initialRotation, mobileX, mobileY])

    // Save position ONLY when dragging stops, and ONLY to the current mode's slot
    useEffect(() => {
        // We check hasInitialized to ensure we don't save the default state
        // and we check !dragging to only save on 'drop'
        if (hasInitialized && !dragging) {
            const mode = isMobile ? 'mobile' : 'desktop'
            const storageKey = `sticky-note-${id}-${mode}`

            // Critical check: only save if the position we have actually matches
            // what should be in this mode (prevents desktop -> mobile save bleed)
            localStorage.setItem(storageKey, JSON.stringify(position))
            onPositionChange?.(id, position.x, position.y)
        }
    }, [position, dragging, id, isMobile, hasInitialized])

    const handleStart = useCallback((clientX: number, clientY: number) => {
        const scrollX = window.scrollX || window.pageXOffset
        const scrollY = window.scrollY || window.pageYOffset
        const pageX = clientX + scrollX
        const pageY = clientY + scrollY

        setDragging(true)
        setDragOffset({
            x: pageX - position.x,
            y: pageY - position.y,
        })
    }, [position])

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault()
        handleStart(e.clientX, e.clientY)
    }, [handleStart])

    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        e.preventDefault()
        const touch = e.touches[0]
        if (touch) {
            handleStart(touch.clientX, touch.clientY)
        }
    }, [handleStart])

    const handleMove = useCallback((clientX: number, clientY: number) => {
        if (!dragging) return

        const scrollX = window.scrollX || window.pageXOffset
        const scrollY = window.scrollY || window.pageYOffset
        const pageX = clientX + scrollX
        const pageY = clientY + scrollY

        setPosition((prev) => ({
            ...prev,
            x: pageX - dragOffset.x,
            y: pageY - dragOffset.y,
        }))
    }, [dragging, dragOffset])

    const handleMouseMove = useCallback((e: MouseEvent) => {
        handleMove(e.clientX, e.clientY)
    }, [handleMove])

    const handleTouchMove = useCallback((e: TouchEvent) => {
        if (!dragging) return
        e.preventDefault()
        const touch = e.touches[0]
        if (touch) {
            handleMove(touch.clientX, touch.clientY)
        }
    }, [dragging, handleMove])

    const handleMouseUp = useCallback(() => {
        setDragging(false)
    }, [])

    useEffect(() => {
        if (dragging) {
            window.addEventListener('mousemove', handleMouseMove)
            window.addEventListener('mouseup', handleMouseUp)
            window.addEventListener('touchmove', handleTouchMove, { passive: false })
            window.addEventListener('touchend', handleMouseUp)
            return () => {
                window.removeEventListener('mousemove', handleMouseMove)
                window.removeEventListener('mouseup', handleMouseUp)
                window.removeEventListener('touchmove', handleTouchMove)
                window.removeEventListener('touchend', handleMouseUp)
            }
        }
    }, [dragging, handleMouseMove, handleMouseUp, handleTouchMove])

    const hoverRotation = hovered && !dragging ? position.rotation + (color === 'green' ? 8 : -5) : position.rotation

    const displayContent = content || (
        <p className="text-sm md:text-lg font-medium text-zinc-900 dark:text-zinc-900 leading-tight text-center">
            {text}
        </p>
    )

    const noteWidth = isMobile && mobileWidth !== undefined ? mobileWidth : width
    const noteHeight = isMobile && mobileHeight !== undefined ? mobileHeight : height

    return (
        <>
            <motion.div
                className={`absolute pointer-events-auto cursor-move touch-none ${backgroundImage ? "bg-transparent" : colorClasses[color]} ${gaegu.className}`}
                style={{
                    left: `${position.x}px`,
                    top: `${position.y}px`,
                    width: `${noteWidth}px`,
                    height: `${noteHeight}px`,
                    transform: `rotate(${hoverRotation}deg)`,
                    borderRadius: '0px',
                    padding: isMobile ? '8px' : '12px',
                    ...(backgroundImage
                        ? {
                            backgroundImage: `url(${backgroundImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                        }
                        : {}),
                }}
                initial={{
                    opacity: 0,
                    scale: 0.5,
                    rotate: position.rotation - 20,
                    y: 50
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: position.rotation,
                    y: 0
                }}
                transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 15,
                    delay,
                }}
                whileHover={{
                    scale: 1.05,
                    rotate: hoverRotation,
                    transition: { duration: 0.2 }
                }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <div className="flex items-center justify-center h-full text-foreground leading-normal text-center">
                    {displayContent}
                </div>
            </motion.div>

            {/* Debug overlay */}
            {showDebug && (
                <div
                    className="absolute pointer-events-none z-[10000] bg-black/80 text-white text-[10px] font-mono px-2 py-1 rounded shadow-lg whitespace-nowrap"
                    style={{
                        left: `${position.x}px`,
                        top: `${position.y + noteHeight + 5}px`,
                    }}
                >
                    <div className="font-bold mb-0.5 text-blue-400">ID: {id}</div>
                    <div className="text-yellow-400 mb-0.5">Mode: {isMobile ? 'MOBILE' : 'DESKTOP'}</div>
                    <div>{isMobile ? 'mobileX' : 'initialX'}: {Math.round(position.x)}</div>
                    <div>{isMobile ? 'mobileY' : 'initialY'}: {Math.round(position.y)}</div>
                    <div>Rot: {Math.round(position.rotation)}°</div>
                </div>
            )}
        </>
    )
}


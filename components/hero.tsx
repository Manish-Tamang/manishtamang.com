"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export function Hero() {
  const [frame, setFrame] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const idleFrames = ["/character/12.png", "/character/13.png"]
  const hoverFrames = ["/character/16.png", "/character/17.png", "/character/18.png"]
  const currentFrames = isHovered ? hoverFrames : idleFrames

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % currentFrames.length)
    }, 400)
    return () => clearInterval(interval)
  }, [currentFrames.length])

  useEffect(() => {
    setFrame(0)
  }, [isHovered])

  return (
    <main className="-mt-4 space-y-8 px-4 md:px-0">
      <div className="grid grid-cols-[1fr_auto] md:flex md:flex-row gap-x-4 gap-y-6 md:gap-2 max-w-[610px] mx-auto items-center">
        <div className="md:basis-[80%] text-left md:text-left">
          <h1 className="text-3xl md:text-4xl">
            <span className="relative inline-block group overflow-hidden">
              <span className="block transform transition-transform duration-500 group-hover:translate-y-full">
                Manish Tamang
              </span>
              <span className="absolute inset-0 block transform translate-y-full transition-transform duration-500 group-hover:translate-y-0">
                @golecodes
              </span>
            </span>
          </h1>
          <p className="text-muted-foreground -mt-1 md:-mt-2 mb-4 text-sm md:text-base">Developer & Student</p>
          <p className="text-foreground leading-normal text-sm md:text-base hidden md:block">
            I craft minimal and functional digital experiences. Focused on clean design, thoughtful typography, and
            building with modern web technologies.
          </p>
        </div>
        <div className="md:basis-[30%] flex items-center justify-end md:justify-center">
          <div
            className="group relative isolate rounded-square perspective-[1000px] w-24 h-24 md:w-40 md:h-40 transform-gpu transition-transform duration-500 ease-out"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              className="absolute inset-0 rounded-md transition-all duration-500 ease-out group-hover:grayscale dark:hidden"
              style={{
                backgroundImage: 'url("/bg.svg")',
                backgroundRepeat: 'repeat',
                backgroundPosition: 'left top',
                backgroundSize: '32px',
              }}
            />
            <div className={`relative w-full h-full transition-all duration-300 ${isHovered && frame === 2 ? "-translate-y-[3px]" : "translate-y-0"}`}>
              <Image
                src={currentFrames[frame]}
                alt="Profile character"
                fill
                priority
                draggable={false}
                className="object-contain pointer-events-none select-none drop-shadow-2xl transition-transform duration-500 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:scale-[1.03] group-hover:rotate-1"
                sizes="(max-width: 768px) 96px, 160px"
              />
            </div>
          </div>
        </div>
        <p className="text-foreground leading-normal text-sm col-span-2 md:hidden">
          I craft minimal and functional digital experiences. Focused on clean design, thoughtful typography, and
          building with modern web technologies.
        </p>
      </div>
    </main>
  )
}

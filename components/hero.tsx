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
    <main className="-mt-4 space-y-8">

      <div className="flex gap-2 w-[610px] items-center">
        <div className="basis-[80%] rounded-square">
          <h1 className="text-4xl"><span className="relative inline-block group overflow-hidden" ><span className="block transform transition-transform duration-500 group-hover:translate-y-full" >Manish Tamang</span><span
            className="absolute inset-0 block transform translate-y-full transition-transform duration-500 group-hover:translate-y-0"
          >
            @golecodes
          </span></span></h1>
          <p className="text-muted-foreground -mt-2 mb-4">Developer & Student</p>
          <p className="text-foreground leading-normal">
            I craft minimal and functional digital experiences. Focused on clean design, thoughtful typography, and
            building with modern web technologies.
          </p>
        </div>
        <div className="basis-[30%] rounded-square flex items-center justify-center">
          <div
            className="group relative isolate rounded-square perspective-[1000px] w-40 h-40 transform-gpu transition-transform duration-500 ease-out"
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
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

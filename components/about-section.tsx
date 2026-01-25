"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, PenTool } from "lucide-react"
import { CurrentlyPlaying } from "./currently-playing"

export function AboutSection() {
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
        <section className="w-[610px] mx-auto mt-6">
            <h2 className="text-2xl font-semibold mb-2">About</h2>
            <p className="text-foreground leading-normal mb-6">
                I craft minimal and functional digital experiences. Focused on clean design, thoughtful typography, and
                building with modern web technologies.
            </p>
            <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1 bg-[#A0C4FF] rounded-[9px] p-6 relative min-h-[160px] flex flex-col justify-between">
                    <div className="w-12 h-1 bg-white/20 rounded-full mb-4" />
                    <div className="self-end">
                        <span className="bg-[#FFD166] text-xs font-medium px-3 py-1 rounded-full text-zinc-800">
                            About me
                        </span>
                    </div>
                </div>
                <div className="col-span-1 bg-[#F9F7F2] rounded-[9px] p-4 flex flex-col justify-between border border-border/50">
                    <div>
                        <h3 className="text-sm leading-tight text-zinc-800">
                            Full Stack Developer &amp; Student
                        </h3>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Current role</p>
                        <div className="w-6 h-6 bg-[#E0E7FF] rounded-full flex items-center justify-center">
                            <Image src="/images/profile.png" alt="Logo" className="rounded-full" width={24} height={24} />
                        </div>
                    </div>
                </div>
                <div className="col-span-1 user-select-none row-span-2 relative rounded-[9px] overflow-hidden group">
                    <Image
                        src="/images/mini-gole.jpg"
                        alt="mini-gole"
                        fill
                        className="object-cover user-select-none"
                    />
                    <div className="absolute inset-0" />
                    <div className="absolute bottom-3 left-3 right-3">
                        <p className="text-white text-[10px] leading-tight">
                            Mini Gole
                        </p>
                    </div>
                </div>
                <div
                    className="col-span-1 bg-[#9AC372] rounded-[9px] p-4 flex flex-col justify-between text-zinc-900 relative overflow-hidden group"
                >
                    <div className="flex justify-between items-start">
                        <h1 className="font-myfont text-xl text-white">Welcome to my corner on the internet :)</h1>
                    </div>
                    <Link href="#" className="text-[10px] flex items-center gap-1 hover:underline font-medium">
                        My journey <ArrowUpRight className="w-2 h-2" />
                    </Link>
                </div>
                <div className="col-span-1 bg-[#FFD86E] rounded-[9px] p-4 flex flex-col justify-between border border-yellow-500/20">
                    <div className="flex justify-between items-start">
                        <h3 className="text-sm text-zinc-900 leading-tight pr-8">
                            Building scalable &amp; performant web applications
                        </h3>
                        <PenTool className="w-4 h-4 text-zinc-800" />
                    </div>
                    <p className="text-[11px] text-zinc-800/80 mt-2 line-clamp-2">
                        Focusing on the React ecosystem, TypeScript, and modern backend solutions to create seamless user journeys.
                    </p>
                    <Link href="#" className="text-[10px] flex items-center gap-1 hover:underline mt-4 font-bold text-zinc-900">
                        Read my logs <ArrowUpRight className="w-2 h-2" />
                    </Link>
                </div>
                <div className="col-span-2 bg-[#4F4132] rounded-[9px] p-5 flex flex-col justify-between text-white">
                    <div>
                        <h3 className="text-sm text-white font-semibold mb-2">Constantly Learning</h3>
                        <p className="text-[11px] leading-relaxed opacity-80">
                            When I'm not coding, I'm diving into documentation, exploring new UI patterns, or contributing to open-source projects.
                        </p>
                    </div>
                    <Link href="#" className="text-[10px] flex items-center gap-1 hover:underline mt-4 opacity-100">
                        View technical stack <ArrowUpRight className="w-2 h-2" />
                    </Link>
                </div>
                <CurrentlyPlaying />
            </div>
        </section>
    )
}

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, PenTool } from "lucide-react"
import { CurrentlyPlaying } from "./currently-playing"

export function AboutSection({ recentFavorite }: { recentFavorite?: any }) {
    return (
        <section className="max-w-[610px] w-full mx-auto mt-6 px-4 md:px-0">
            <h2 className="text-2xl font-semibold mb-2">About</h2>
            <p className="text-foreground leading-normal mb-6 text-sm md:text-base">
                I craft thoughtful digital experiences that feel clear, fast, and genuinely useful in everyday use.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="col-span-1 bg-[#A0C4FF] rounded-[12px] p-6 relative min-h-[160px] flex flex-col justify-between">
                    <div className="w-12 h-1 bg-white/20 rounded-full mb-4" />
                    <div className="self-end">
                        <span className="bg-[#FFD166] text-xs font-medium px-3 py-1 rounded-full text-zinc-800">
                            About me
                        </span>
                    </div>
                </div>
                <div className="col-span-1 bg-[#F7CEFF] rounded-[12px] p-4 flex flex-col justify-between border border-border/50">
                    <div>
                        <h3 className="text-sm leading-tight text-zinc-800">
                            Full Stack Developer &amp; Student
                        </h3>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <p className="text-[10px] text-zinc-800 uppercase tracking-wider">Current role</p>
                        <div className="w-6 h-6 bg-[#E0E7FF] rounded-full flex items-center justify-center">
                            <Image src="/images/profile.png" alt="Logo" className="rounded-full" width={24} height={24} loading="lazy" />
                        </div>
                    </div>
                </div>
                <div className="col-span-2 md:col-span-1 user-select-none row-span-1 md:row-span-2 relative rounded-[9px] overflow-hidden group min-h-[200px] md:min-h-0">
                    <Image
                        src="/images/mini-gole.jpg"
                        alt="mini-gole"
                        fill
                        className="object-cover user-select-none"
                        loading="lazy"
                        sizes="(max-width: 768px) 50vw, 200px"
                    />
                    <div className="absolute inset-0" />
                    <div className="absolute bottom-3 left-3 right-3">
                        <p className="text-white text-[10px] leading-tight">
                            Mini Gole
                        </p>
                    </div>
                </div>
                <div
                    className="col-span-1 bg-[#9AC372] rounded-[12px] p-4 flex flex-col justify-between text-zinc-900 relative overflow-hidden group"
                >
                    <div className="flex justify-between items-start">
                        <h1 className="font-myfont text-xl text-white">Welcome to my corner on the internet :)</h1>
                    </div>
                    <Link href="/about" className="text-[10px] mt-2 text-white  flex items-center gap-1 hover:underline font-medium">
                        My journey <ArrowUpRight className="w-2 h-2" />
                    </Link>
                </div>
                <CurrentlyPlaying recentFavorite={recentFavorite} />
                <div className="col-span-2 md:col-span-1 bg-[#FFD86E] rounded-[12px] p-4 flex flex-col justify-between border border-yellow-500/20">
                    <div className="flex justify-between items-start">
                        <h3 className="text-sm text-zinc-900 leading-tight pr-8">
                            Building scalable &amp; performant web applications
                        </h3>
                        <PenTool className="w-4 h-4 text-zinc-800" />
                    </div>
                    <p className="text-[11px] text-zinc-800/80 mt-2 line-clamp-2">
                        I work across React, TypeScript, and modern backend stacks to ship reliable and delightful user experiences.
                    </p>
                    <Link href="#" className="text-[10px] flex items-center gap-1 hover:underline mt-4 font-bold text-zinc-900">
                        Read my logs <ArrowUpRight className="w-2 h-2" />
                    </Link>
                </div>
                <div className="col-span-2 md:col-span-2 bg-[#4F4132] rounded-[12px] p-5 flex flex-col justify-between text-white">
                    <div>
                        <h3 className="text-sm text-white font-semibold mb-2">Constantly Learning</h3>
                        <p className="text-[11px] leading-relaxed opacity-80">
                            Outside of client work, I'm studying emerging web patterns, experimenting with agentic workflows, and sharpening my craft.
                        </p>
                    </div>
                    <Link href="#" className="text-[10px] flex items-center gap-1 hover:underline mt-4 opacity-100">
                        View technical stack <ArrowUpRight className="w-2 h-2" />
                    </Link>
                </div>
            </div>
        </section>
    )
}

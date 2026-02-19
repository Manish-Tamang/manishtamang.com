import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { YouTube } from "./icons/YouTube"


export function FeaturedSection() {
    return (
        <section className="w-full">
            <h2 className="text-2xl font-normal tracking-tight mb-4">Featured</h2>

            <Link
                href="https://youtu.be/8DFWCY8xLdk?si=5nUYCY2R65x8O8fl&t=294"
                target="_blank"
                className="group block space-y-4"
            >
                <div className="relative aspect-video rounded-xl overflow-hidden border border-border/40 bg-muted/20">
                    <Image
                        src="/8DFWCY8xLdk_maxresdefault.jpg"
                        alt="Featured on NTV Itahari interview on AI"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Minimal play indicator */}
                    <div className="absolute top-3 right-3 p-1.5 rounded-full">
                        <YouTube className="w-5 h-auto" />
                    </div>

                </div>

                <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                        <h3 className="text-[17px] font-medium text-foreground/90 group-hover:text-foreground transition-colors">
                            Featured on NTV Itahari interview
                        </h3>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-secondary/50 border border-border/40">
                                <Image
                                    src="/ntv.png"
                                    alt="NTV Logo"
                                    width={14}
                                    height={14}
                                    className="object-contain"
                                />
                                <span className="text-[10px] font-bold tracking-wider uppercase text-foreground/60">
                                    NTV Itahari
                                </span>
                            </div>
                            <span className="text-xs text-foreground/40 font-normal">
                                Interview
                            </span>
                            <span className="w-1 h-1 rounded-full bg-foreground/10" />
                            <span className="text-xs text-foreground/40 font-normal">
                                17 Feb 2026
                            </span>

                        </div>

                    </div>
                    <div className="flex-shrink-0 mt-1.5">
                        <ArrowUpRight className="w-4 h-4 text-foreground/20 group-hover:text-foreground/60 transition-colors" />
                    </div>
                </div>

            </Link>
        </section>
    );
}

"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface TimelineEntry {
    year: string;
    title: string;
    description: string;
    images?: string[];
}

interface TimelineProps {
    avatarUrl: string;
    entries: TimelineEntry[];
}

export function Timeline({ avatarUrl, entries }: TimelineProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 70%", "end 30%"],
    });

    // Smooth out the scroll progress
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Avatar movement logic - moves from top to bottom
    const yTranslate = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

    return (
        <div className="w-full">
            <h2 className="text-2xl font-normal tracking-tight mb-12">My Journey</h2>

            <div ref={containerRef} className="relative grid grid-cols-[32px_1fr] md:grid-cols-[48px_1fr] gap-8 md:gap-16">
                {/* The Vertical Timeline Bar */}
                <div className="relative flex justify-center h-full min-h-[400px]">
                    {/* Track (The underlying line) */}
                    <div className="absolute bottom-0 left-1/2 top-0 w-[1px] -translate-x-1/2 bg-border/30" />

                    {/* Progress Fill (The colored line as you scroll) */}
                    <div className="absolute bottom-0 left-1/2 top-0 w-[1px] -translate-x-1/2">
                        <motion.div
                            className="absolute inset-x-0 top-0 origin-top bg-gradient-to-b from-indigo-500 via-purple-500 to-transparent"
                            style={{ scaleY: smoothProgress, height: "100%" }}
                        />
                    </div>

                    {/* Moving Avatar Container */}
                    <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0 h-full">
                        <motion.div
                            className="absolute z-10 -translate-x-1/2"
                            style={{
                                top: yTranslate,
                                translateY: "-50%", // Keep avatar centered on the current progress point
                            }}
                        >
                            <div className="relative h-8 w-8 md:h-10 md:w-10 overflow-hidden rounded-full border-2 md:border-[3px] border-background bg-background shadow-[0_0_15px_rgba(0,0,0,0.1)] transition-transform hover:scale-110">
                                <Image
                                    src={avatarUrl}
                                    alt="Profile"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 32px, 40px"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Timeline Content */}
                <div className="space-y-16 md:space-y-24 pb-20">
                    {entries.map((entry, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: 10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.7, delay: index * 0.1, ease: [0.21, 0.45, 0.32, 0.9] }}
                            className="relative"
                        >
                            {/* Year Badge */}
                            <div className="inline-flex items-center px-2 py-0.5 rounded-full bg-secondary/50 text-secondary-foreground text-[10px] font-semibold tracking-wider uppercase mb-4">
                                {entry.year}
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-base md:text-lg font-medium tracking-tight text-foreground/90 leading-snug">
                                    {entry.title}
                                </h3>
                                <p className="text-sm md:text-[15px] leading-relaxed text-foreground/60 max-w-[500px] font-normal">
                                    {entry.description}
                                </p>

                                {entry.images && entry.images.length > 0 && (
                                    <div className={cn(
                                        "mt-6 grid gap-3",
                                        entry.images.length === 1 ? "grid-cols-1" : "grid-cols-2"
                                    )}>
                                        {entry.images.map((img, i) => (
                                            <div
                                                key={i}
                                                className={cn(
                                                    "relative aspect-[16/10] overflow-hidden rounded-lg border border-border/40 bg-muted/20 group/img transition-all duration-500 hover:border-border/80",
                                                    entry.images?.length === 1 ? "max-w-[400px]" : ""
                                                )}
                                            >
                                                <Image
                                                    src={img}
                                                    alt={`${entry.title} image ${i + 1}`}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover/img:scale-[1.03]"
                                                    sizes="(max-width: 768px) 100vw, 400px"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}

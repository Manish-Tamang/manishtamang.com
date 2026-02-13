"use client"

import React from "react"
import Link from "next/link"
import { motion } from "motion/react"
import { Hammer, ArrowLeft, Construction } from "lucide-react"
import { sounds } from "@/lib/sounds"

export default function DashboardPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full max-w-md text-center space-y-8"
            >
                {/* Visual Icon Area */}
                <div className="relative inline-flex items-center justify-center">
                    <motion.div
                        animate={{
                            rotate: [0, 10, 0, -10, 0],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="p-6 rounded-3xl bg-foreground/5 border border-foreground/10 relative z-10"
                    >
                        <Construction className="w-12 h-12 text-foreground/40" />
                    </motion.div>

                    {/* Decorative Elements */}
                    <div className="absolute -top-4 -right-4 w-12 h-12 bg-yellow-500/10 rounded-full blur-xl animate-pulse" />
                    <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-700" />
                </div>

                {/* Content */}
                <div className="space-y-4">
                    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                        Under Construction
                    </h1>
                    <p className="text-[15px] sm:text-[17px] leading-relaxed text-foreground/60 max-w-[320px] mx-auto">
                        This page is currently being built with passion. I'm working hard to bring you something amazing soon.
                    </p>
                </div>

                {/* Progress Indicator (Fake/Static for aesthetic) */}
                <div className="space-y-2 max-w-[280px] mx-auto">
                    <div className="h-1.5 w-full bg-foreground/5 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "65%" }}
                            transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
                            className="h-full bg-foreground/20 rounded-full"
                        />
                    </div>
                    <div className="flex justify-between text-[11px] uppercase tracking-widest text-foreground/30 font-bold">
                        <span>Development</span>
                        <span>65%</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="pt-4">
                    <Link
                        href="/"
                        onClick={() => sounds.click()}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background text-sm font-medium hover:scale-[1.03] active:scale-[0.98] transition-all shadow-lg shadow-foreground/10 group"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Back to Home
                    </Link>
                </div>

                <p className="text-[13px] text-foreground/30 font-medium pt-4">
                    Thank you for your patience!
                </p>
            </motion.div>
        </div>
    )
}

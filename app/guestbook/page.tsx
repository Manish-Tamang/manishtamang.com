"use client"

import { ArrowLeft, ListFilter, Sparkles, Heart } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { sounds } from "@/lib/sounds"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useGuestbook } from "@/hooks/use-guestbook"
import { useState, useMemo } from "react"
import { GuestbookItem } from "@/components/guestbook/guestbook-item"
import { GuestbookForm } from "@/components/guestbook/guestbook-form"
import { GuestbookSkeleton } from "@/components/guestbook/guestbook-skeleton"
import { cn } from "@/lib/utils"

export default function GuestbookPage() {
    const { entries, isLoading, refresh } = useGuestbook()
    const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest")

    const sortedEntries = useMemo(() => {
        return [...entries].sort((a, b) => {
            const dateA = new Date(a.timestamp).getTime()
            const dateB = new Date(b.timestamp).getTime()
            return sortOrder === "newest" ? dateB - dateA : dateA - dateB
        })
    }, [entries, sortOrder])

    return (
        <div className="flex flex-col items-center min-h-screen font-inter">
            <div className="w-full max-w-[610px] px-6 py-8 space-y-8">
                {/* Header */}
                <header className="space-y-4">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-4">

                            <h1 className="text-4xl font-normal text-foreground tracking-tight">Guestbook</h1>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-foreground/60 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 rounded-full">
                                    <ListFilter className="w-5 h-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="rounded-xl border-zinc-200 dark:border-zinc-800">
                                <DropdownMenuItem
                                    onClick={() => {
                                        setSortOrder("newest")
                                        sounds.click()
                                    }}
                                    className={cn("rounded-lg cursor-pointer", sortOrder === "newest" && "bg-zinc-100 dark:bg-zinc-800")}
                                >
                                    Newest first
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => {
                                        setSortOrder("oldest")
                                        sounds.click()
                                    }}
                                    className={cn("rounded-lg cursor-pointer", sortOrder === "oldest" && "bg-zinc-100 dark:bg-zinc-800")}
                                >
                                    Oldest first
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <p className="text-[16px] leading-relaxed text-zinc-500 dark:text-zinc-400 font-normal">
                        Leave a comment below. It could be anything – appreciation, information, wisdom, anything good or bad about me or even humor.
                    </p>
                </header>

                <GuestbookForm onSuccess={refresh} />

                {/* Activity Feed */}
                <div className="space-y-4">
                    {isLoading ? (
                        <div className="py-10">
                            <GuestbookSkeleton />
                        </div>
                    ) : entries.length === 0 ? (
                        <div className="py-10 text-center text-zinc-500 bg-white/50 dark:bg-black/20 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
                            <p className="text-sm">No messages yet. Be the first to sign!</p>
                            <p className="text-[11px] mt-1 opacity-60">Make sure your Supabase ENV keys are set.</p>
                        </div>
                    ) : (
                        sortedEntries.map((entry) => (
                            <GuestbookItem
                                key={entry.id}
                                entry={entry}
                                onDelete={refresh}
                                onRefresh={refresh}
                            />
                        ))
                    )}
                    <div className="pt-6 border-t border-dashed border-zinc-200 dark:border-zinc-800">
                        <div className="bg-zinc-100/30 dark:bg-zinc-900/30 border border-zinc-200/50 dark:border-zinc-800/50 rounded-2xl p-4 flex gap-4 items-center group cursor-pointer hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50 transition-colors">
                            <div className="flex-1 space-y-1">
                                <h3 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                                    <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                                    Community Guidelines
                                </h3>
                                <p className="text-[13px] text-zinc-500 line-clamp-2">Be kind, be respectful, and keep it creative. Your words help build this space.</p>
                            </div>
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 flex items-center justify-center overflow-hidden flex-shrink-0">
                                <Heart className="w-5 h-5 text-blue-500/50" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

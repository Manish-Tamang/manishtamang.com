"use client"

import { ArrowLeft, ListFilter } from "lucide-react"
import { BsStars } from "react-icons/bs";
import { TiHeartFullOutline } from "react-icons/ti";
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
import { useState, useMemo, useEffect } from "react"
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

    useEffect(() => {
        const handleHashChange = () => {
            if (typeof window !== 'undefined' && window.location.hash) {
                const hash = decodeURIComponent(window.location.hash.slice(1)).toLowerCase();

                // Try by ID first
                let element = document.getElementById(hash);

                // If not found by ID, try finding an entry with this name (slugified)
                if (!element) {
                    const entry = entries.find(e =>
                        e.name.toLowerCase().replace(/\s+/g, '-') === hash ||
                        e.name.toLowerCase() === hash
                    );
                    if (entry) {
                        element = document.getElementById(entry.id);
                    }
                }

                if (element) {
                    setTimeout(() => {
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 500);
                }
            }
        };

        if (!isLoading && entries.length > 0) {
            handleHashChange();
            window.addEventListener('hashchange', handleHashChange);
            return () => window.removeEventListener('hashchange', handleHashChange);
        }
    }, [isLoading, entries])

    return (
        <div className="flex flex-col items-center min-h-screen font-inter">
            <div className="w-full max-w-[610px] px-4 sm:px-6 py-6 sm:py-8 space-y-6 sm:space-y-8">
                <header className="space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3 sm:gap-4">

                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-normal text-foreground tracking-tight">Guestbook</h1>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-foreground/60 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 rounded-full h-8 w-8 sm:h-10 sm:w-10">
                                    <ListFilter className="w-4 h-4 sm:w-5 sm:h-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="rounded-xl border-zinc-200 dark:border-zinc-800">
                                <DropdownMenuItem
                                    onClick={() => {
                                        setSortOrder("newest")
                                        sounds.click()
                                    }}
                                    className={cn("rounded-lg cursor-pointer text-sm", sortOrder === "newest" && "bg-zinc-100 dark:bg-zinc-800")}
                                >
                                    Newest first
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onClick={() => {
                                        setSortOrder("oldest")
                                        sounds.click()
                                    }}
                                    className={cn("rounded-lg cursor-pointer text-sm", sortOrder === "oldest" && "bg-zinc-100 dark:bg-zinc-800")}
                                >
                                    Oldest first
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                   <p className="text-foreground leading-normal text-sm md:text-base">
                        Leave a comment below. It could be anything – appreciation, information, wisdom, anything good or bad about me or even humor.
                    </p>
                </header>
                <GuestbookForm onSuccess={refresh} />
                <div className="space-y-3 sm:space-y-4">
                    {isLoading ? (
                        <div className="py-8 sm:py-10">
                            <GuestbookSkeleton />
                        </div>
                    ) : entries.length === 0 ? (
                        <div className="py-8 sm:py-10 text-center text-zinc-500 bg-white/50 dark:bg-black/20 rounded-xl sm:rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800">
                            <p className="text-xs sm:text-sm">No messages yet. Be the first to sign!</p>
                            <p className="text-[10px] sm:text-[11px] mt-1 opacity-60">Make sure your Supabase ENV keys are set.</p>
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
                    <div className="pt-4 sm:pt-6 mt-3 border-t border-dashed border-zinc-200 dark:border-zinc-800">
                        <div className="bg-zinc-100/30 dark:bg-zinc-900/30 border border-zinc-200/50 dark:border-zinc-800/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex gap-3 sm:gap-4 items-center group cursor-pointer hover:bg-zinc-100/50 dark:hover:bg-zinc-900/50 transition-colors">
                            <div className="flex-1 space-y-0.5 sm:space-y-1">
                                <h3 className="text-[13px] sm:text-[14px] md:text-[15px] font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5 sm:gap-2">
                                    <BsStars className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-500" />
                                    Community Guidelines
                                </h3>
                                <p className="text-[11px] sm:text-[12px] md:text-[13px] text-zinc-500 line-clamp-2">Be kind, be respectful, and keep it creative. Your words help build this space.</p>
                            </div>
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 flex items-center justify-center overflow-hidden flex-shrink-0">
                                <TiHeartFullOutline className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500/50" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

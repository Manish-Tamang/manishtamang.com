"use client"

import { ListFilter } from "lucide-react"
import { BsStars } from "react-icons/bs"
import { TiHeartFullOutline } from "react-icons/ti"
import { Button } from "@/components/ui/button"
import { sounds } from "@/lib/sounds"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useGuestbook } from "@/hooks/use-guestbook"
import { useState, useMemo, useEffect } from "react"
import {
  GuestbookItem,
  GuestbookForm,
  GuestbookSkeleton,
} from "@/components/guestbook"
import { cn } from "@/lib/utils"
import type { GuestbookEntry } from "@/lib/guestbook"

export function GuestbookView({
  initialEntries,
}: {
  initialEntries: GuestbookEntry[]
}) {
  const { entries, isLoading, refresh } = useGuestbook(initialEntries)
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
      if (typeof window !== "undefined" && window.location.hash) {
        const hash = decodeURIComponent(window.location.hash.slice(1)).toLowerCase()
        let element = document.getElementById(hash)

        if (!element) {
          const entry = entries.find(
            (item) =>
              item.name.toLowerCase().replace(/\s+/g, "-") === hash ||
              item.name.toLowerCase() === hash,
          )
          if (entry) {
            element = document.getElementById(entry.id)
          }
        }

        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: "smooth", block: "center" })
          }, 500)
        }
      }
    }

    if (!isLoading && entries.length > 0) {
      handleHashChange()
      window.addEventListener("hashchange", handleHashChange)
      return () => window.removeEventListener("hashchange", handleHashChange)
    }
  }, [isLoading, entries])

  return (
    <div className="flex min-h-screen flex-col items-center font-inter">
      <div className="w-full max-w-[610px] space-y-6 px-4 py-6 sm:space-y-8 sm:px-6 sm:py-8">
        <header className="space-y-3 sm:space-y-4">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-3 sm:gap-4">
              <h1 className="text-2xl font-normal tracking-tight text-foreground sm:text-3xl md:text-4xl">
                Guestbook
              </h1>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full text-foreground/60 hover:bg-zinc-200/50 sm:h-10 sm:w-10 dark:hover:bg-zinc-800/50"
                >
                  <ListFilter className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="rounded-xl border-zinc-200 dark:border-zinc-800"
              >
                <DropdownMenuItem
                  onClick={() => {
                    setSortOrder("newest")
                    sounds.click()
                  }}
                  className={cn(
                    "cursor-pointer rounded-lg text-sm",
                    sortOrder === "newest" && "bg-zinc-100 dark:bg-zinc-800",
                  )}
                >
                  Newest first
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setSortOrder("oldest")
                    sounds.click()
                  }}
                  className={cn(
                    "cursor-pointer rounded-lg text-sm",
                    sortOrder === "oldest" && "bg-zinc-100 dark:bg-zinc-800",
                  )}
                >
                  Oldest first
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <p className="text-sm leading-normal text-foreground md:text-base">
            Leave a comment below. It could be anything – appreciation,
            information, wisdom, anything good or bad about me or even humor.
          </p>
        </header>
        <GuestbookForm onSuccess={refresh} />
        <div className="space-y-3 sm:space-y-4">
          {isLoading ? (
            <div className="py-8 sm:py-10">
              <GuestbookSkeleton />
            </div>
          ) : entries.length === 0 ? (
            <div className="rounded-[8px] border border-dashed border-zinc-200 bg-white/50 py-8 text-center text-zinc-500 sm:py-10 dark:border-zinc-800 dark:bg-black/20">
              <p className="text-xs sm:text-sm">
                No messages yet. Be the first to sign!
              </p>
              <p className="mt-1 text-[10px] opacity-60 sm:text-[11px]">
                Make sure your Supabase ENV keys are set.
              </p>
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
          <div className="mt-3 border-t border-dashed border-zinc-200 pt-4 sm:pt-6 dark:border-zinc-800">
            <div className="group flex cursor-pointer items-center gap-3 rounded-[8px] border border-zinc-200/50 bg-zinc-100/30 p-3 transition-colors hover:bg-zinc-100/50 sm:gap-4 sm:p-4 dark:border-zinc-800/50 dark:bg-zinc-900/30 dark:hover:bg-zinc-900/50">
              <div className="flex-1 space-y-0.5 sm:space-y-1">
                <h3 className="flex items-center gap-1.5 text-[13px] font-semibold text-zinc-900 sm:gap-2 sm:text-[14px] md:text-[15px] dark:text-zinc-100">
                  <BsStars className="h-3 w-3 text-blue-500 sm:h-3.5 sm:w-3.5" />
                  Community Guidelines
                </h3>
                <p className="line-clamp-2 text-[11px] text-zinc-500 sm:text-[12px] md:text-[13px]">
                  Be kind, be respectful, and keep it creative. Your words help
                  build this space.
                </p>
              </div>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-[8px] bg-linear-to-br from-blue-100 to-purple-100 sm:h-12 sm:w-12 dark:from-blue-900/40 dark:to-purple-900/40">
                <TiHeartFullOutline className="h-4 w-4 text-blue-500/50 sm:h-5 sm:w-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

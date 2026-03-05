"use client"

export function GuestbookSkeleton() {
    return (
        <div className="space-y-4 animate-pulse">
            {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 shrink-0" />
                    <div className="flex-1 space-y-2 py-1">
                        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/4" />
                        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full" />
                        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4" />
                    </div>
                </div>
            ))}
        </div>
    )
}

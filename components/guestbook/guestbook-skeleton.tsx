"use client"

export function GuestbookSkeleton() {
  return (
    <div className="space-y-3 animate-pulse sm:space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="rounded-[8px] border border-foreground/5 bg-foreground/5 p-5"
        >
          <div className="flex gap-3">
            <div className="h-10 w-10 shrink-0 rounded-[4px] bg-zinc-200 dark:bg-zinc-800" />
            <div className="flex-1 space-y-3 py-0.5">
              <div className="h-3.5 w-1/3 rounded-[8px] bg-zinc-200 dark:bg-zinc-800" />
              <div className="h-11 w-full rounded-[8px] bg-zinc-200/80 dark:bg-zinc-800/80" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

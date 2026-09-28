"use client"

import { useState, useCallback, useEffect } from "react"
import { toast } from "sonner"
import { GuestbookEntry } from "@/lib/guestbook"

export function useGuestbook(initialEntries?: GuestbookEntry[]) {
    const [entries, setEntries] = useState<GuestbookEntry[]>(initialEntries ?? [])
    const [isLoading, setIsLoading] = useState(initialEntries === undefined)

    const fetchEntries = useCallback(async (silent = false) => {
        if (!silent) setIsLoading(true)
        try {
            const res = await fetch("/api/guestbook")
            if (!res.ok) throw new Error("Failed to fetch entries")
            const data = await res.json()
            setEntries(data.entries || [])
        } catch (error) {
            console.error("Error fetching entries:", error)
            const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
            if (supabaseUrl) {
                toast.error("Failed to load messages")
            }
        } finally {
            setIsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchEntries(initialEntries !== undefined)
    }, [fetchEntries, initialEntries])

    return {
        entries,
        isLoading,
        refresh: () => fetchEntries(),
    }
}

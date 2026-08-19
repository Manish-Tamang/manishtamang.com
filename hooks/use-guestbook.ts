"use client"

import { useState, useCallback, useEffect } from "react"
import { toast } from "sonner"
import { GuestbookEntry } from "@/components/guestbook"

export function useGuestbook() {
    const [entries, setEntries] = useState<GuestbookEntry[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchEntries = useCallback(async () => {
        setIsLoading(true)
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
        fetchEntries()
    }, [fetchEntries])

    return {
        entries,
        isLoading,
        refresh: fetchEntries
    }
}

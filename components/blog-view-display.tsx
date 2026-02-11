"use client"

import { useEffect, useState } from "react"
import { db } from "@/firebase/config"
import { doc, getDoc } from "firebase/firestore"

const fetchViewsFromFirebase = async (slug: string): Promise<number> => {
    try {
        const docRef = doc(db, "views", slug);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            return docSnap.data().count || 0;
        } else {
            return 0;
        }
    } catch (error) {
        console.error("Error fetching views from Firebase:", error);
        return 0;
    }
};

export function BlogViewDisplay({ slug }: { slug: string }) {
    const [views, setViews] = useState<number | null>(null)

    useEffect(() => {
        const fetchViews = async () => {
            const viewCount = await fetchViewsFromFirebase(slug)
            setViews(viewCount)
        }

        fetchViews()
    }, [slug])

    if (views === null) return null

    return (
        <span className="flex items-center gap-1 text-[10px] font-bold text-zinc-400 dark:text-zinc-600 tracking-tighter">
            <span>•</span>
            <span>{views.toLocaleString()} views</span>
        </span>
    )
}

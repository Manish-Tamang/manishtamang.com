"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { BucketList } from "@/components/manifest"

interface BucketListItem {
    id: number
    title: string
    description?: string
    completed: boolean
    images?: string[]
}

const WishListItems = [
    { id: 101, title: "Learn Rust", description: "Dive into systems programming." },
    { id: 102, title: "Contribute to Open Source", description: "Help build great software." },
    { id: 103, title: "Attend a Tech Conference", description: "Connect with industry peers." },
]

const ManifestPage = () => {
    const [bucketList, setBucketList] = useState<BucketListItem[]>([
        { id: 1, title: "Buy a Gaming PC", completed: false },
        { id: 2, title: "Buy a Insta360 GO 3", images: ["/images/bucketlist/insta-360-go-3.jpg"], completed: false },
        { id: 3, title: "Buy a DJI Osmo Pocket 3", images: ["/images/bucketlist/dji.png"], completed: false },
        { id: 4, title: "Earn NPR 100k", completed: true },
        { id: 5, title: "Buy a MacBook Air M4", images: ["/images/bucketlist/macbook.jpg"], completed: false },
        { id: 6, title: "Buy a Sony A6700", images: ["/images/bucketlist/A6700.jpg"], completed: false },
        { id: 7, title: "Buy a Jetson Orin Nano Super Developer Kit", images: ["/images/bucketlist/jetson-nano.jpg"], completed: false },
    ])

    return (
        <div className="flex flex-col items-center min-h-screen">
            <div className="w-full max-w-[610px] px-4 sm:px-6 py-6 sm:py-12 space-y-12 sm:space-y-16">
                <header className="space-y-4">
                    <h1 className="text-3xl sm:text-4xl font-medium tracking-tight">Manifest List</h1>
                    <p className="text-foreground leading-normal text-sm md:text-base">
                        If you&apos;re interested in sponsoring any of the items listed below, please feel free to reach out through the{" "}
                        <Link href="/contact" className="text-foreground font-medium underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground/60 transition-all">
                            contact page
                        </Link>
                        . Your support is greatly appreciated and will be acknowledged with a special gratitude page dedicated to my sponsors.
                    </p>
                </header>
                <section className="space-y-6">
                    <h2 className="text-3xl font-bold tracking-tight">Bucket List</h2>
                    <BucketList bucketList={bucketList} setBucketList={setBucketList} />
                </section>
                <section className="space-y-6">
                    <h2 className="text-3xl font-bold tracking-tight">My Learning Goals</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {WishListItems.map((item) => (
                            <div
                                key={item.id}
                                className="p-4 sm:p-5 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                            >
                                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
                <footer className="pt-8 border-t border-zinc-200 dark:border-zinc-800 space-y-4">
                    <p className="text-sm text-foreground/50">
                        The Bucket List section is inspired by{" "}
                        <Link
                            href="https://theodorusclarence.com/bucket-list"
                            className="underline underline-offset-4"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Theodorus Clarence
                        </Link>
                        .
                    </p>
                    <p className="text-sm text-foreground/50">
                        Last Updated: <span className="font-medium text-foreground/70">November 8, 2025</span>
                    </p>
                </footer>
            </div>
        </div>
    )
}

export default ManifestPage

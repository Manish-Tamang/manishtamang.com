"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { YouTube } from "./icons/YouTube";
import { sounds } from "@/lib/sounds";

type FeaturedCard = {
    id: string;
    href: string;
    image: string;
    title: string;
    source: string;
    date: string;
};

const featuredItems: FeaturedCard[] = [
    {
        id: "feat-1",
        href: "https://youtu.be/8DFWCY8xLdk?si=5nUYCY2R65x8O8fl&t=294",
        image: "/8DFWCY8xLdk_maxresdefault.jpg",
        title: "Featured on NTV Itahari interview",
        source: "youtube.com",
        date: "Feb 17, 2026",
    },
    {
        id: "feat-2",
        href: "https://masri.blog/Blog/Collection-of-150-awesome-portfolios",
        image: "/images/pexels-shkrabaanthony-7163361.jpg",
        title: "150 Awesome Portfolios",
        source: "masri.blog",
        date: "March 2, 2025",
    },
];

export function FeaturedSection() {
    return (
        <section className="w-full">
            <h2 className="text-2xl font-normal tracking-tight text-neutral-900 dark:text-neutral-100">
                Featured
            </h2>
            <p className="text-foreground mb-4 mt-1 leading-normal text-sm md:text-base">
                Here are some of my recent media features, including an interview and a spotlight on my portfolio.
            </p>

            <div className="grid grid-cols-2 gap-4">
                {featuredItems.map((item) => (
                    <Link
                        key={item.id}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseDown={() => sounds.click()}
                        className="group rounded-[8px] border border-neutral-200 bg-white p-3 transition-all hover:border-neutral-300 hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700"
                    >
                        <div className="relative mb-3 aspect-video overflow-hidden rounded-[6px] border border-neutral-200 dark:border-neutral-800">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover grayscale transition duration-300 group-hover:scale-[1.02] group-hover:grayscale-0"
                            />
                            
                        </div>
                        <p className="line-clamp-2 text-sm font-medium leading-snug text-neutral-900 group-hover:underline decoration-dotted dark:text-neutral-100">
                            {item.title}
                        </p>

                        <div className="mt-2 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
                            <span className="truncate">{item.source}</span>
                            <span>{item.date}</span>
                        </div>

                    </Link>
                ))}
            </div>
        </section>
    );
}
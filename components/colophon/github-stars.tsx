"use client"

import { useEffect, useState } from "react"
import { SiGithub } from "react-icons/si"
import { GitFork, Star } from "lucide-react"

const REPO = "Manish-Tamang/manishtamang.com"

export function GithubStars() {
    const [stats, setStats] = useState<{ stars: number; forks: number } | null>(null)

    useEffect(() => {
        fetch(`https://api.github.com/repos/${REPO}`)
            .then((res) => (res.ok ? res.json() : null))
            .then((repo) => {
                if (repo) setStats({ stars: repo.stargazers_count, forks: repo.forks_count })
            })
            .catch(() => {})
    }, [])

    return (
        <div className="flex justify-center">
            <a
                href={`https://github.com/${REPO}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-stretch overflow-hidden rounded-full border border-zinc-200 bg-white text-sm font-medium shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
            >
                <span className="flex items-center gap-2 px-4 py-2 text-zinc-900 dark:text-zinc-100">
                    <SiGithub className="h-4 w-4" />
                    Star on GitHub
                </span>
                <span className="flex items-center gap-3 border-l border-zinc-200 bg-zinc-50 px-4 py-2 tabular-nums text-zinc-600 dark:border-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-300">
                    <span className="flex items-center gap-1.5">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400 transition-transform group-hover:rotate-[72deg]" />
                        {stats ? stats.stars.toLocaleString() : "–"}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <GitFork className="h-3.5 w-3.5" />
                        {stats ? stats.forks.toLocaleString() : "–"}
                    </span>
                </span>
            </a>
        </div>
    )
}

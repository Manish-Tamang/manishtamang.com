"use client"

import Link from "next/link"
import {
    SiNextdotjs,
    SiTailwindcss,
    SiVercel,
    SiReact,
    SiTypescript,
    SiSanity,
    SiSupabase,
    SiPostgresql,
    SiNodedotjs,
} from "react-icons/si"
import { Motion } from "@/components/icons/Motion"
import { useState, useEffect } from "react"
import { LineBreaker } from "@/components/line-breaker"
import { sounds } from "@/lib/sounds"

const ColophonPage = () => {
    const [daysSinceLaunch, setDaysSinceLaunch] = useState(0)

    useEffect(() => {
        const launchDate = new Date('2023-04-12')
        const today = new Date()
        const days = Math.floor((today.getTime() - launchDate.getTime()) / (1000 * 60 * 60 * 24))
        setDaysSinceLaunch(days)
    }, [])

    return (
        <div className="flex flex-col items-center min-h-screen">
            <div className="w-full max-w-[610px] px-4 sm:px-6 py-6 sm:py-12 space-y-12 sm:space-y-16">
                {/* Header */}
                <header className="space-y-4">
                    <h1 className="text-3xl sm:text-4xl font-medium tracking-tight">Colophon</h1>
                    <p className="text-foreground leading-normal text-sm md:text-base">
                        A detailed look at how this website was built, the technologies used, and the people who inspired it.
                    </p>
                </header>
                <section className="space-y-6">
                    <h2 className="text-3xl font-inter font-bold tracking-tight">About This Website</h2>
                    <div className="space-y-4 text-[15px] sm:text-[17px] leading-relaxed text-foreground/80">
                        <p className="text-foreground leading-normal text-sm md:text-base" >
                            This website is my personal portfolio - my place on the internet. It's a
                            digital canvas where I showcase my skills, projects, and everything
                            I'm passionate about.
                        </p>
                        <p className="text-foreground leading-normal text-sm md:text-base" >
                            This is the third version of my portfolio. My journey began in 2023
                            when I deployed my first portfolio, which I had copied from a{" "}
                            <Link
                                href="https://www.youtube.com/watch?v=ldwlOzRvYOU"
                                className="text-foreground font-medium underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground/60 transition-all"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                YouTube
                            </Link>{" "}
                            tutorial. Later, after passing my SEE examination, I built the second
                            version - this time inspired by and heavily influenced by{" "}
                            <Link
                                href="https://leerob.com/"
                                className="text-foreground font-medium underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground/60 transition-all"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Leerob
                            </Link>
                            's portfolio. Now, with everything I've learned along the way, I've
                            crafted this version from the ground up, blending all my experiences
                            into a site that truly represents me.
                        </p>
                        <p className="text-foreground leading-normal text-sm md:text-base" >
                            Built with Sanity, TypeScript, Next.js, and PostgreSQL,
                            this website prioritizes performance, user experience, and
                            maintainability.
                        </p>
                    </div>

                    {/* Live Since Counter */}
                    <div className="flex flex-col items-center py-8 px-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                        <h3 className="text-lg font-medium mb-4 text-foreground/70">Live Since</h3>
                        <div className="flex items-baseline gap-3">
                            <span className="text-4xl sm:text-5xl font-bold text-foreground">
                                {daysSinceLaunch.toLocaleString()}
                            </span>
                            <span className="text-xl text-foreground/60">days</span>
                        </div>
                        <p className="text-sm text-foreground/50 mt-2">
                            Since April 12, 2023
                        </p>
                    </div>
                </section>

                {/* Tech Stack */}
                <section className="space-y-6">
                    <h2 className="text-3xl font-bold tracking-tight">Tech Stack</h2>
                    <p className="text-[15px] sm:text-[17px] leading-relaxed text-foreground/80">
                        This website is proudly crafted with the following technologies:
                    </p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 border-l border-t border-zinc-200 dark:border-zinc-800">
                        <IconItem
                            url="https://nextjs.org/"
                            icon={<SiNextdotjs size={32} className="text-foreground" />}
                        />
                        <IconItem
                            url="https://tailwindcss.com/"
                            icon={<SiTailwindcss size={32} className="text-[#38B2AC]" />}
                        />
                        <IconItem
                            url="https://vercel.com/"
                            icon={<SiVercel size={32} className="text-foreground" />}
                        />
                        <IconItem
                            url="https://supabase.com/"
                            icon={<SiSupabase size={32} className="text-[#39ca94]" />}
                        />
                        <IconItem
                            url="https://www.postgresql.org/"
                            icon={<SiPostgresql size={32} className="text-[#336791]" />}
                        />
                        <IconItem
                            url="https://motion.dev/"
                            icon={<Motion className="text-foreground h-8 w-8" />}
                        />
                        <IconItem
                            url="https://www.sanity.io/"
                            icon={<SiSanity size={32} className="text-[#F05340]" />}
                        />
                        <IconItem
                            url="https://www.typescriptlang.org/"
                            icon={<SiTypescript size={32} className="text-[#3178C6]" />}
                        />
                        <IconItem
                            url="https://react.dev/"
                            icon={<SiReact size={32} className="text-[#61DAFB]" />}
                        />
                        <IconItem
                            url="https://nodejs.org/en"
                            icon={<SiNodedotjs size={32} className="text-[#68A063]" />}
                        />
                    </div>
                    <p className="text-[15px] sm:text-[17px] leading-relaxed text-foreground/80 mt-6">
                        I purchased my domain{" "}
                        <span className="font-medium text-foreground">manishtamang.com</span> for this site
                        from{" "}
                        <Link
                            href="https://www.bisup.com/"
                            className="text-foreground font-medium underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground/60 transition-all"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Bisup
                        </Link>
                        , and the site is deployed on{" "}
                        <Link
                            href="https://vercel.com/"
                            className="text-foreground font-medium underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground/60 transition-all"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Vercel
                        </Link>
                        . The code for this site is open-source and available on{" "}
                        <Link
                            href="https://github.com/Manish-Tamang/portfolio-2026"
                            className="text-foreground font-medium underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground/60 transition-all"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GitHub
                        </Link>
                        .
                    </p>
                </section>

                {/* Typography */}
                <section className="space-y-6">
                    <h2 className="text-3xl font-bold tracking-tight">Typography</h2>
                    <p className="text-foreground leading-normal text-sm md:text-base">
                        A carefully selected set of typefaces contributes to the website's visual identity:
                    </p>
                    <ul className="list-disc list-inside text-foreground leading-normal text-sm md:text-base space-y-2">
                        <li>
                            <span className="font-medium text-foreground">Inter:</span> Used for the majority of the body content for readability.
                        </li>
                        <li>
                            <span className="font-medium text-foreground">Geist:</span> Used for the content of Blogs and Projects.
                        </li>
                        <li>
                            <span className="font-medium text-foreground">Geist Mono:</span> Chosen for code snippets, ensuring clarity and legibility.
                        </li>
                        <li>
                            <span className="font-medium text-foreground">Custom Font:</span> Applied to special headings and personal touches.
                        </li>
                    </ul>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <TypographyItem label="Inter Regular" font="var(--font-inter)" />
                        <TypographyItem label="Geist Regular" font="var(--font-geist-sans)" />
                        <TypographyItem label="JetBrains Mono" font="var(--font-jetbrain)" />
                        <TypographyItem label="Custom Font" font="var(--font-myfont)" />
                    </div>
                </section>

                {/* Design & Colors */}
                <section className="space-y-6">
                    <h2 className="text-3xl font-bold tracking-tight">Design & Colors</h2>
                    <p className="text-[15px] sm:text-[17px] leading-relaxed text-foreground/80">
                        The website's design follows a minimalist approach with a focus on readability and user experience.
                        The color palette adapts seamlessly between light and dark modes, ensuring optimal contrast and accessibility.
                    </p>
                    <div className="p-6 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                        <p className="text-sm text-foreground/60">
                            The design emphasizes clean typography, generous whitespace, and subtle animations to create
                            a pleasant browsing experience that puts content first.
                        </p>
                    </div>
                </section>

                {/* External APIs & Libraries */}
                <section className="space-y-6">
                    <h2 className="text-3xl font-bold tracking-tight">External APIs & Libraries</h2>
                    <p className="text-[15px] sm:text-[17px] leading-relaxed text-foreground/80">
                        This website leverages several external APIs and libraries to enhance functionality and user experience:
                    </p>
                    <ul className="list-disc list-inside text-[15px] sm:text-[17px] leading-relaxed text-foreground/80 space-y-2">
                        <li>
                            <Link
                                href="https://www.spotify.com/us/developer/"
                                className="text-foreground font-medium underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground/60 transition-all"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Spotify API
                            </Link>
                            : To showcase listening activity.
                        </li>
                        <li>
                            <Link
                                href="https://wakatime.com/api"
                                className="text-foreground font-medium underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground/60 transition-all"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                WakaTime API
                            </Link>
                            : To display coding statistics.
                        </li>
                        <li>
                            <Link
                                href="https://supabase.com/"
                                className="text-foreground font-medium underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground/60 transition-all"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Supabase
                            </Link>
                            : For database and authentication services.
                        </li>
                    </ul>
                </section>

                {/* Additional Libraries */}
                <section className="space-y-6">
                    <h2 className="text-3xl font-bold tracking-tight">Additional Libraries & Functionality</h2>
                    <p className="text-[15px] sm:text-[17px] leading-relaxed text-foreground/80">
                        Beyond the core tech stack, the website utilizes the following libraries to enhance specific features:
                    </p>
                    <ul className="list-disc list-inside text-[15px] sm:text-[17px] leading-relaxed text-foreground/80 space-y-2">
                        <li>
                            <Link
                                href="https://ui.shadcn.com/"
                                className="text-foreground font-medium underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground/60 transition-all"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Shadcn UI
                            </Link>
                            : For beautifully-designed, accessible components.
                        </li>
                        <li>
                            <Link
                                href="https://better-auth.com/"
                                className="text-foreground font-medium underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground/60 transition-all"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Better Auth
                            </Link>
                            : For secure and streamlined user authentication.
                        </li>
                        <li>
                            Icons: Sourced from{" "}
                            <Link
                                href="https://react-icons.github.io/react-icons/"
                                className="text-foreground font-medium underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground/60 transition-all"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                react-icons
                            </Link>{" "}
                            and{" "}
                            <Link
                                href="https://lucide.dev/"
                                className="text-foreground font-medium underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground/60 transition-all"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Lucide
                            </Link>
                            , providing a diverse and consistent icon set.
                        </li>
                        <li>
                            <Link
                                href="https://sonner.emilkowal.ski/"
                                className="text-foreground font-medium underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground/60 transition-all"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Sonner
                            </Link>
                            : For displaying user-friendly toast notifications.
                        </li>
                        <li>
                            <Link
                                href="https://www.framer.com/motion/"
                                className="text-foreground font-medium underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground/60 transition-all"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Framer Motion
                            </Link>
                            : For smooth animations and transitions.
                        </li>
                    </ul>
                </section>

                {/* Acknowledgements */}
                <section className="space-y-6">
                    <h2 className="text-3xl font-bold tracking-tight">Acknowledgements</h2>
                    <p className="text-[15px] sm:text-[17px] leading-relaxed text-foreground/80">
                        I would like to express my sincere gratitude to the following individuals and their work,
                        which have significantly inspired the design and development of this portfolio:
                    </p>
                    <ul className="list-disc list-inside text-[15px] sm:text-[17px] leading-relaxed text-foreground/80 space-y-2">
                        <li>
                            <Link
                                href="https://leerob.com/"
                                className="text-foreground font-medium underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground/60 transition-all"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Lee Robinson
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="https://theodorusclarence.com/"
                                className="text-foreground font-medium underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground/60 transition-all"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Theodorus Clarence
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="https://jahir.dev/colophon"
                                className="text-foreground font-medium underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground/60 transition-all"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Jahir Fiquitiva
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="https://marcbouchenoire.com/"
                                className="text-foreground font-medium underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground/60 transition-all"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Marc Bouchenoire
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="https://victoreke.com/"
                                className="text-foreground font-medium underline underline-offset-4 decoration-foreground/30 hover:decoration-foreground/60 transition-all"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Victor Eke
                            </Link>
                        </li>
                    </ul>
                    <p className="text-[15px] sm:text-[17px] leading-relaxed text-foreground/80 mt-4">
                        And to many more talented developers and designers whose work has unknowingly shaped my perspective and approach. Thank you all.
                    </p>
                </section>

                <LineBreaker />
                <footer className="pt-8 space-y-4">
                    <p className="text-sm text-foreground/50">
                        This page is inspired by{" "}
                        <Link
                            href="https://jahir.dev/colophon"
                            className="underline underline-offset-4"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Jahir Fiquitiva
                        </Link>
                        .
                    </p>
                    <p className="text-sm text-foreground/50">
                        Last Updated: <span className="font-medium text-foreground/70">February 13, 2026</span>
                    </p>
                </footer>
            </div>
        </div>
    )
}

interface IconItemProps {
    url: string
    icon: React.ReactNode
}

const IconItem: React.FC<IconItemProps> = ({ url, icon }) => (
    <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center h-20 sm:h-24 border-r border-b border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors"
        onMouseEnter={() => sounds.tick()}
        onClick={() => sounds.click()}
    >
        {icon}
    </Link>
)

const TypographyItem: React.FC<{ label: string; font?: string }> = ({ label, font }) => (
    <div
        className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 text-2xl sm:text-3xl text-center bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors cursor-default"
        style={{ fontFamily: font || "inherit" }}
        onMouseEnter={() => sounds.tick()}
        onClick={() => sounds.click()}
    >
        {label}
    </div>
)

export default ColophonPage

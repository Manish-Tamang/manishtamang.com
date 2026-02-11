"use client"
import Image from "next/image"
import Link from "next/link"
import { HiOutlineInformationCircle, HiOutlineDesktopComputer, HiOutlineBookOpen, HiOutlineBriefcase, HiOutlinePhotograph } from "react-icons/hi"
import { FaRegStar, FaRegEnvelope, FaInstagram, FaGithub, FaLinkedin, FaRegClock } from "react-icons/fa"
import { SiSimpleanalytics, SiDailydotdev } from "react-icons/si"
import { FeedbackFish } from "@feedback-fish/react"
import { LineBreaker } from "./line-breaker"
import { useState, useEffect } from "react"

export function Footer() {
    const currentYear = new Date().getFullYear()
    const [time, setTime] = useState<string>("")

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const options: Intl.DateTimeFormatOptions = {
                timeZone: "Asia/Kathmandu",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            };
            setTime(now.toLocaleTimeString("en-US", options));
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="w-full mt-auto">
            <div className="max-w-[720px] mx-auto px-6 py-12">
                <div className="flex flex-col gap-8">
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4 font-jetbrains-mono">
                        <nav aria-label="Footer navigation - About">
                            <ul className="space-y-3">
                                <li>
                                    <Link
                                        href="/about"
                                        className="text-gray-600 dark:text-gray-400 hover:text-[#38A662] dark:hover:text-[#38A662] flex items-center transition-colors duration-200"
                                    >
                                        <HiOutlineInformationCircle className="mr-2 h-5 w-5" aria-hidden="true" />
                                        About
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/dashboard"
                                        className="text-gray-600 dark:text-gray-400 hover:text-[#38A662] dark:hover:text-[#38A662] flex items-center transition-colors duration-200"
                                    >
                                        <HiOutlineDesktopComputer className="mr-2 h-5 w-5" aria-hidden="true" />
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/colophon"
                                        className="text-gray-600 dark:text-gray-400 hover:text-[#38A662] dark:hover:text-[#38A662] flex items-center transition-colors duration-200"
                                    >
                                        <HiOutlineBookOpen className="mr-2 h-5 w-5" aria-hidden="true" />
                                        Colophon
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/manifest"
                                        className="text-gray-600 dark:text-gray-400 hover:text-[#38A662] dark:hover:text-[#38A662] flex items-center transition-colors duration-200"
                                    >
                                        <FaRegStar className="mr-2 h-5 w-5" aria-hidden="true" />
                                        Manifest
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                        <nav aria-label="Footer navigation - Community">
                            <ul className="space-y-3">
                                <li>
                                    <Link
                                        href="/guestbook"
                                        className="text-gray-600 dark:text-gray-400 hover:text-[#38A662] dark:hover:text-[#38A662] flex items-center transition-colors duration-200"
                                    >
                                        <HiOutlineBookOpen className="mr-2 h-5 w-5" aria-hidden="true" />
                                        Guestbook
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/contact"
                                        className="text-gray-600 dark:text-gray-400 hover:text-[#38A662] dark:hover:text-[#38A662] flex items-center transition-colors duration-200"
                                    >
                                        <FaRegEnvelope className="mr-2 h-5 w-5" aria-hidden="true" />
                                        Contact
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/blog"
                                        className="text-gray-600 dark:text-gray-400 hover:text-[#38A662] dark:hover:text-[#38A662] flex items-center transition-colors duration-200"
                                    >
                                        <HiOutlineBookOpen className="mr-2 h-5 w-5" aria-hidden="true" />
                                        Blogs
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/uses"
                                        className="text-gray-600 dark:text-gray-400 hover:text-[#38A662] dark:hover:text-[#38A662] flex items-center transition-colors duration-200"
                                    >
                                        <HiOutlineDesktopComputer className="mr-2 h-5 w-5" aria-hidden="true" />
                                        Uses
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                        <nav aria-label="Footer navigation - Content">
                            <ul className="space-y-3">
                                <li>
                                    <Link
                                        href="/projects"
                                        className="text-gray-600 dark:text-gray-400 hover:text-[#38A662] dark:hover:text-[#38A662] flex items-center transition-colors duration-200"
                                    >
                                        <HiOutlineBriefcase className="mr-2 h-5 w-5" aria-hidden="true" />
                                        Projects
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/photos"
                                        className="text-gray-600 dark:text-gray-400 hover:text-[#38A662] dark:hover:text-[#38A662] flex items-center transition-colors duration-200"
                                    >
                                        <HiOutlinePhotograph className="mr-2 h-5 w-5" aria-hidden="true" />
                                        Photos
                                    </Link>
                                </li>
                                <li>
                                    <FeedbackFish projectId={process.env.NEXT_PUBLIC_FEEDBACK_FISH_ID || 'e60dbe6f6bf435'}>
                                        <button
                                            className="text-gray-600 dark:text-gray-400 hover:text-[#38A662] dark:hover:text-[#38A662] flex items-center transition-colors duration-200 w-full text-left"
                                        >
                                            <HiOutlineInformationCircle className="mr-2 h-5 w-5" aria-hidden="true" />
                                            Feedback
                                        </button>
                                    </FeedbackFish>
                                </li>
                                <li>
                                    <Link
                                        href="https://manish-analytics.vercel.app/share/jFK5VpX2c6h2JgRg/manishtamang.com"
                                        className="text-gray-600 dark:text-gray-400 hover:text-[#38A662] dark:hover:text-[#38A662] flex items-center transition-colors duration-200"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <SiSimpleanalytics className="mr-2 h-4 w-4" aria-hidden="true" />
                                        Analytics
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                        <nav aria-label="Social media links">
                            <ul className="space-y-3">
                                <li>
                                    <a
                                        href="https://www.instagram.com/golecodes/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-600 dark:text-gray-400 hover:text-[#38A662] dark:hover:text-[#38A662] flex items-center transition-colors duration-200"
                                    >
                                        <FaInstagram className="mr-2 h-5 w-5" aria-hidden="true" />
                                        Instagram
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://app.daily.dev/manishtamang"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-600 dark:text-gray-400 hover:text-[#38A662] dark:hover:text-[#38A662] flex items-center transition-colors duration-200"
                                    >
                                        <SiDailydotdev className="mr-2 h-5 w-5" aria-hidden="true" />
                                        Daily.dev
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://github.com/Manish-Tamang"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-600 dark:text-gray-400 hover:text-[#38A662] dark:hover:text-[#38A662] flex items-center transition-colors duration-200"
                                    >
                                        <FaGithub className="mr-2 h-5 w-5" aria-hidden="true" />
                                        GitHub
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://www.linkedin.com/in/manish-tamang/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-gray-600 dark:text-gray-400 hover:text-[#38A662] dark:hover:text-[#38A662] flex items-center transition-colors duration-200"
                                    >
                                        <FaLinkedin className="mr-2 h-5 w-5" aria-hidden="true" />
                                        LinkedIn
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <LineBreaker />
                    <div className="flex flex-row justify-between items-center text-[10px] font-normal" style={{ letterSpacing: '-0.02em', lineHeight: '1.35em' }}>
                        <p className="text-gray-600 text-sm dark:text-gray-400 text-start">Manish Tamang © {currentYear}</p>
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm">
                            <FaRegClock className="w-4 h-4" />
                            <span>{time} NPT</span>
                        </div>
                    </div>
                    <Image
                        src="/images/flowers.png"
                        alt="Footer decoration"
                        width={1200}
                        height={400}
                        draggable={false}
                        priority
                        className="w-full h-auto object-cover -mb-12 select-none pointer-events-none rounded-t-xl"
                    />
                </div>
            </div>
        </footer>
    )
}

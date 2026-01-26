"use client"

import { MdSunny } from "react-icons/md";
import { useEffect, useState } from "react"
import { TbMoonFilled } from "react-icons/tb";
import { AnimatePresence, motion } from "motion/react";
import { sounds } from "@/lib/sounds";

export function ThemeToggle() {
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    const initialTheme = savedTheme || (prefersDark ? "dark" : "light")
    setResolvedTheme(initialTheme)
    document.documentElement.classList.toggle("dark", initialTheme === "dark")
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    sounds.click();
    const newTheme = resolvedTheme === "light" ? "dark" : "light"
    setResolvedTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  if (!mounted) return null

  return (
    <button
      onClick={toggleTheme}
      className="hover:bg-[#E9E9E9] cursor-pointer dark:text-[#B4B4B4] text-[#656565] hover:text-foreground dark:hover:bg-[#292929] rounded-xl p-2 transition-colors"
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          key={resolvedTheme}
          initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
        >
          {resolvedTheme === "light" ? <MdSunny className="h-4 w-4" /> : <TbMoonFilled className="h-4 w-4" />}
        </motion.div>
      </AnimatePresence>
    </button>
  )
}

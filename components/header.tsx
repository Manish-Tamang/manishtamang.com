"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { sounds } from "@/lib/sounds";

export function Header() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(path)
  }

  return (
    <header className="w-full max-w-[720px] mx-auto mb-8 pt-8">
      <nav className="flex items-center justify-between px-2">
        <div className="flex gap-2 items-center">
          <Link
            href="/"
            className={cn(
              "text-[16px] font-normal transition-all px-3 py-1.5 rounded-full",
              isActive("/") && !pathname.includes("/about") && !pathname.includes("/blog")
                ? "text-foreground bg-foreground/5 backdrop-blur-sm"
                : "text-foreground/60 hover:text-foreground",
            )}
            onClick={sounds.click}
            style={{ letterSpacing: '-0.02em', lineHeight: '1.35em' }}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={cn(
              "text-[16px] font-normal transition-all px-3 py-1.5 rounded-full",
              isActive("/about")
                ? "text-foreground bg-foreground/5 backdrop-blur-sm"
                : "text-foreground/60 hover:text-foreground",
            )}
            onClick={sounds.click}
            style={{ letterSpacing: '-0.02em', lineHeight: '1.35em' }}
          >
            About
          </Link>
          <Link
            href="/blog"
            className={cn(
              "text-[16px] font-normal transition-all px-3 py-1.5 rounded-full",
              isActive("/blog")
                ? "text-foreground bg-foreground/5 backdrop-blur-sm"
                : "text-foreground/60 hover:text-foreground",
            )}
            onClick={sounds.click}
            style={{ letterSpacing: '-0.02em', lineHeight: '1.35em' }}
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className={cn(
              "text-[16px] font-normal transition-all px-3 py-1.5 rounded-full",
              isActive("/contact")
                ? "text-foreground bg-foreground/5 backdrop-blur-sm"
                : "text-foreground/60 hover:text-foreground",
            )}
            onClick={sounds.click}
            style={{ letterSpacing: '-0.02em', lineHeight: '1.35em' }}
          >
            Contact
          </Link>
        </div>
        <ThemeToggle />
      </nav>
    </header>
  )
}

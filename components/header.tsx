"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { sounds } from "@/lib/sounds";
import { useState } from "react"
import { X } from "lucide-react"
import { BsFillInfoCircleFill } from "react-icons/bs";
import { MdLocalPhone } from "react-icons/md";
import { FaRss } from "react-icons/fa";
import { HiMiniHome } from "react-icons/hi2";

export function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(path)
  }

  const navLinks = [
    {
      href: "/",
      label: "Home",
      active: isActive("/") && !pathname.includes("/about") && !pathname.includes("/blog"),
      icon: <HiMiniHome className="w-4 h-4" />
    },
    {
      href: "/about",
      label: "About",
      active: isActive("/about"),
      icon: <BsFillInfoCircleFill className="w-4 h-4" />
    },
    {
      href: "/blog",
      label: "Blog",
      active: isActive("/blog"),
      icon: <FaRss className="w-4 h-4" />
    },
    {
      href: "/contact",
      label: "Contact",
      active: isActive("/contact"),
      icon: <MdLocalPhone className="w-4 h-4" />
    }
  ]

  const MenuIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0 4.99599C0 4.77599 0.105357 4.56501 0.292893 4.40945C0.48043 4.2539 0.734784 4.1665 1 4.1665H19C19.2652 4.1665 19.5196 4.2539 19.7071 4.40945C19.8946 4.56501 20 4.77599 20 4.99599C20 5.21598 19.8946 5.42696 19.7071 5.58252C19.5196 5.73808 19.2652 5.82547 19 5.82547H1C0.734784 5.82547 0.48043 5.73808 0.292893 5.58252C0.105357 5.42696 0 5.21598 0 4.99599ZM5 9.99942C5 9.77943 5.10536 9.56845 5.29289 9.41289C5.48043 9.25733 5.73478 9.16994 6 9.16994H19C19.2652 9.16994 19.5196 9.25733 19.7071 9.41289C19.8946 9.56845 20 9.77943 20 9.99942C20 10.2194 19.8946 10.4304 19.7071 10.586C19.5196 10.7415 19.2652 10.8289 19 10.8289H6C5.73478 10.8289 5.48043 10.7415 5.29289 10.586C5.10536 10.4304 5 10.2194 5 9.99942ZM11.8333 14.1742C11.5681 14.1742 11.3138 14.2616 11.1262 14.4172C10.9387 14.5727 10.8333 14.7837 10.8333 15.0037C10.8333 15.2237 10.9387 15.4347 11.1262 15.5902C11.3138 15.7458 11.5681 15.8332 11.8333 15.8332H19C19.2652 15.8332 19.5196 15.7458 19.7071 15.5902C19.8946 15.4347 20 15.2237 20 15.0037C20 14.7837 19.8946 14.5727 19.7071 14.4172C19.5196 14.2616 19.2652 14.1742 19 14.1742H11.8333Z"
        fill="currentColor"
      />
    </svg>
  )

  return (
    <header className="w-full max-w-[720px] mx-auto mb-8 pt-8 px-4 md:px-2">
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="md:hidden">
            <button
              onClick={() => {
                setIsOpen(!isOpen)
                sounds.click()
              }}
              className="p-2 -ml-2 text-foreground/60 hover:text-foreground transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <MenuIcon />}
            </button>
          </div>

          <div className="hidden md:flex gap-2 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-[16px] font-normal transition-all px-3 py-1.5 rounded-full",
                  link.active
                    ? "text-foreground bg-foreground/5 backdrop-blur-sm"
                    : "text-foreground/60 hover:text-foreground",
                )}
                onClick={sounds.click}
                style={{ letterSpacing: "-0.02em", lineHeight: "1.35em" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <ThemeToggle />
      </nav>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-1 bg-background/80 backdrop-blur-md rounded-2xl p-2 border border-border shadow-lg animate-in fade-in slide-in-from-top-4 duration-200 overflow-hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-[16px] font-normal transition-all px-4 py-3 rounded-xl flex items-center gap-3",
                link.active
                  ? "text-foreground bg-foreground/5"
                  : "text-foreground/60 hover:text-foreground hover:bg-foreground/5",
              )}
              onClick={() => {
                setIsOpen(false)
                sounds.click()
              }}
            >
              <div className="flex items-center gap-3">
                <span className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-lg transition-colors",
                  link.active ? "bg-foreground/10 text-foreground" : "bg-foreground/5 text-foreground/40"
                )}>
                  {link.icon}
                </span>
                {link.label}
              </div>
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}

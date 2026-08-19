"use client"

import { useEffect, useRef } from "react"

function getUtterancesTheme() {
  return document.documentElement.classList.contains("dark")
    ? "github-dark"
    : "github-light"
}

export default function Comments() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.innerHTML = ""

    const script = document.createElement("script")
    script.src = "https://utteranc.es/client.js"
    script.setAttribute("repo", "Manish-tamang/comments")
    script.setAttribute("issue-term", "title")
    script.setAttribute("theme", getUtterancesTheme())
    script.setAttribute("crossorigin", "anonymous")
    script.async = true

    container.appendChild(script)

    return () => {
      container.innerHTML = ""
    }
  }, [])

  return (
    <div className="w-full mt-8">
      <div ref={containerRef} />
    </div>
  )
}

"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { FiExternalLink, FiGithub, FiMaximize2 } from "react-icons/fi"
import { urlFor } from "@/sanity/lib/image"
import styles from "./project-card.module.css"

interface ProjectCardProps {
  title: string
  slug: string
  excerpt: string
  thumbnail: any
  date: string
  projectUrl?: string
  githubUrl?: string
}

function normalizeUrl(input?: string) {
  if (!input) return null

  try {
    return new URL(input).toString()
  } catch {
    try {
      return new URL(`https://${input}`).toString()
    } catch {
      return null
    }
  }
}

export default function ProjectCard({
  title,
  slug,
  excerpt,
  thumbnail,
  date,
  projectUrl,
  githubUrl,
}: ProjectCardProps) {
  const monthLabel = format(new Date(date), "MMMM yyyy")
  const initialLetter = title.trim().charAt(0).toUpperCase() || "P"

  const normalizedProjectUrl = useMemo(() => normalizeUrl(projectUrl), [projectUrl])
  const normalizedGithubUrl = useMemo(() => normalizeUrl(githubUrl), [githubUrl])

  const faviconUrl = useMemo(() => {
    if (!normalizedProjectUrl) return null

    try {
      const hostname = new URL(normalizedProjectUrl).hostname
      return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`
    } catch {
      return null
    }
  }, [normalizedProjectUrl])

  const [showFavicon, setShowFavicon] = useState(Boolean(faviconUrl))

  useEffect(() => {
    setShowFavicon(Boolean(faviconUrl))
  }, [faviconUrl])

  return (
    <article className={styles.main}>
      <div className={styles.card}>
        <div className={styles.fl}>
          <Link href={`/projects/${slug}`} className={styles.fullscreen} aria-label={`Open ${title}`}>
            <FiMaximize2 className={styles.fullscreenIcon} />
          </Link>
        </div>

        <div className={styles.card_content}>
          <Link href={`/projects/${slug}`} className={styles.coverLink} aria-label={`Open ${title}`}>
            {thumbnail && (
              <div className={styles.coverWrap}>
                <Image
                  src={urlFor(thumbnail).url()}
                  alt={title}
                  fill
                  className={styles.cover}
                  sizes="(max-width: 768px) 100vw, 240px"
                />
                <div className={styles.overlay} />
              </div>
            )}
          </Link>
        </div>
      </div>

      <div className={styles.data}>
        <div className={styles.img}>
          {showFavicon && faviconUrl ? (
            <img
              src={faviconUrl}
              alt={`${title} favicon`}
              className={styles.favicon}
              onError={() => setShowFavicon(false)}
            />
          ) : (
            <span className={styles.fallbackLetter}>{initialLetter}</span>
          )}
        </div>

        <div className={styles.text}>
          <Link href={`/projects/${slug}`} className={styles.titleLink}>
            <div className={styles.text_m}>{title}</div>
          </Link>
          <div className={styles.text_s}>{monthLabel}</div>
        </div>
      </div>

      <p className={styles.desc}>{excerpt}</p>

      {(normalizedProjectUrl || normalizedGithubUrl) && (
        <div className={styles.btns}>
          {normalizedProjectUrl && (
            <a
              href={normalizedProjectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkBtn}
              aria-label={`${title} live demo`}
            >
              <FiExternalLink className={styles.linkIcon} />
              <span className={styles.linkText}>Live</span>
            </a>
          )}

          {normalizedGithubUrl && (
            <a
              href={normalizedGithubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkBtn}
              aria-label={`${title} repository`}
            >
              <FiGithub className={styles.linkIcon} />
              <span className={styles.linkText}>Repo</span>
            </a>
          )}
        </div>
      )}
    </article>
  )
}

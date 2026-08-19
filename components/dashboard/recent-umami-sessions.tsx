import { getBrowserIcon, getDeviceIcon, getOsIcon } from "./session-icons"
import type { IconType } from "react-icons"

interface UmamiSession {
  id?: string
  url?: string
  hostname?: string
  browser?: string
  os?: string
  device?: string
  country?: string
  city?: string
  createdAt?: number
  visitedAt?: number
}

interface RecentUmamiSessionsProps {
  sessions: UmamiSession[]
}

function formatDateTime(timestamp?: number): string {
  if (!timestamp) {
    return "Unknown time"
  }

  const date = new Date(timestamp)
  if (Number.isNaN(date.getTime())) {
    return "Unknown time"
  }

  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

function getSessionTitle(session: UmamiSession): string {
  const path = session.url || "/"

  if (!path || path === "/") {
    return "Homepage visit"
  }

  return `Visited ${path}`
}

function getCountryCode(country?: string): string | null {
  if (!country) {
    return null
  }

  const normalized = country.trim()
  if (!/^[a-z]{2}$/i.test(normalized)) {
    return null
  }

  return normalized.toLowerCase()
}

function MetaItem({
  icon: Icon,
  label,
}: {
  icon: IconType
  label: string
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <Icon className="h-3.5 w-3.5 shrink-0" />
      <span>{label}</span>
    </span>
  )
}

export function RecentUmamiSessions({ sessions }: RecentUmamiSessionsProps) {
  const visibleSessions = sessions.slice(0, 3)

  if (!visibleSessions.length) {
    return (
      <div className="rounded-xl bg-zinc-50/70 p-4 text-sm text-zinc-600 dark:bg-zinc-900/60 dark:text-zinc-400">
        No recent sessions available.
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {visibleSessions.map((session, index) => {
        const location = [session.city, session.country].filter(Boolean).join(", ")
        const visitedAt = session.visitedAt ?? session.createdAt
        const countryCode = getCountryCode(session.country)
        const BrowserIcon = getBrowserIcon(session.browser)
        const OsIcon = getOsIcon(session.os)
        const DeviceIcon = getDeviceIcon(session.device)

        return (
          <article
            key={`${session.id ?? session.url ?? "session"}-${visitedAt}-${index}`}
            className="group flex items-start gap-4 rounded-2xl bg-zinc-50/70 px-4 py-3 transition-all hover:bg-zinc-100/80 dark:bg-zinc-900/60 dark:hover:bg-zinc-800/60"
          >
            <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-200/80 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              <DeviceIcon className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1 space-y-1">
              <p className="truncate text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
                {getSessionTitle(session)}
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-zinc-600 dark:text-zinc-400">
                {session.browser ? (
                  <MetaItem icon={BrowserIcon} label={session.browser} />
                ) : null}
                {session.os ? <MetaItem icon={OsIcon} label={session.os} /> : null}
                {session.device ? (
                  <MetaItem icon={DeviceIcon} label={session.device} />
                ) : null}
                {!session.browser && !session.os && !session.device ? (
                  <span>Unknown device</span>
                ) : null}
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-1 text-[12px] text-zinc-500 dark:text-zinc-400">
                <span className="rounded-md bg-zinc-200/70 px-2 py-0.5 dark:bg-zinc-800/80">
                  {session.hostname || "Unknown host"}
                </span>
                {countryCode ? (
                  <img
                    src={`https://flagcdn.com/h240/${countryCode}.png`}
                    alt={`${session.country} flag`}
                    className="h-3.5 w-6 rounded object-contain"
                    loading="lazy"
                  />
                ) : null}
                {location ? <span>{location}</span> : null}
                <span>•</span>
                <span>{formatDateTime(visitedAt)}</span>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}

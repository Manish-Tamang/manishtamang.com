interface UmamiSession {
  id?: string;
  url?: string;
  hostname?: string;
  browser?: string;
  os?: string;
  device?: string;
  country?: string;
  city?: string;
  createdAt?: number;
  visitedAt?: number;
}

interface RecentUmamiSessionsProps {
  sessions: UmamiSession[];
}

function formatDateTime(timestamp?: number): string {
  if (!timestamp) {
    return "Unknown time";
  }

  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) {
    return "Unknown time";
  }

  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getSessionTitle(session: UmamiSession): string {
  const path = session.url || "/";

  if (!path || path === "/") {
    return "Homepage visit";
  }

  return `Visited ${path}`;
}

function getSessionMeta(session: UmamiSession): string {
  const parts = [session.browser, session.os, session.device]
    .filter(Boolean)
    .slice(0, 3);

  return parts.length ? parts.join(" • ") : "Unknown device";
}

function getCountryCode(country?: string): string | null {
  if (!country) {
    return null;
  }

  const normalized = country.trim();
  if (!/^[a-z]{2}$/i.test(normalized)) {
    return null;
  }

  return normalized.toLowerCase();
}

export function RecentUmamiSessions({ sessions }: RecentUmamiSessionsProps) {
  if (!sessions.length) {
    return (
      <div className="rounded-xl bg-zinc-50/70 p-4 text-sm text-zinc-600 dark:bg-zinc-900/60 dark:text-zinc-400">
        No recent sessions available.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sessions.map((session, index) => {
        const location = [session.city, session.country].filter(Boolean).join(", ");
        const visitedAt = session.visitedAt ?? session.createdAt;
        const countryCode = getCountryCode(session.country);

        return (
          <article
            key={session.id ?? `${session.url}-${visitedAt}-${index}`}
            className="group flex items-start gap-4 rounded-2xl bg-zinc-50/70 px-4 py-3 transition-all hover:bg-zinc-100/80 dark:bg-zinc-900/60 dark:hover:bg-zinc-800/60"
          >
            <div className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
            <div className="min-w-0 flex-1 space-y-1">
              <p className="truncate text-[15px] font-semibold text-zinc-900 dark:text-zinc-100">
                {getSessionTitle(session)}
              </p>
              <p className="text-[13px] text-zinc-600 dark:text-zinc-400">
                {getSessionMeta(session)}
              </p>
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
        );
      })}
    </div>
  );
}

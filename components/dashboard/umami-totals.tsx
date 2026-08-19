
import { BsFillPeopleFill } from "react-icons/bs";
import { MdRemoveRedEye } from "react-icons/md";
import type { UmamiTotals } from "@/lib/umami"
import { FaRepeat } from "react-icons/fa6";

function formatCount(value: number) {
  return new Intl.NumberFormat("en-US").format(value)
}

const stats = [
  {
    key: "visitors" as const,
    label: "Visitors",
    hint: "Unique people",
    icon: BsFillPeopleFill,
  },
  {
    key: "visits" as const,
    label: "Visits",
    hint: "Sessions started",
    icon: FaRepeat,
  },
  {
    key: "views" as const,
    label: "Views",
    hint: "Pages opened",
    icon: MdRemoveRedEye,
  },
]

export function UmamiTotals({ totals }: { totals: UmamiTotals | null }) {
  if (!totals) {
    return (
      <div className="rounded-xl bg-zinc-50/70 p-4 text-sm text-zinc-600 dark:bg-zinc-900/60 dark:text-zinc-400">
        Analytics totals are unavailable right now.
      </div>
    )
  }

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {stats.map(({ key, label, hint, icon: Icon }) => (
        <article
          key={key}
          className="rounded-2xl bg-zinc-50/70 px-4 py-4 dark:bg-zinc-900/60"
        >
          <div className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            <Icon className="h-3.5 w-3.5" />
            <span>{label}</span>
          </div>
          <p className="mt-2 font-jetbrains-mono text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {formatCount(totals[key])}
          </p>
          <p className="mt-1 text-[12px] text-zinc-500 dark:text-zinc-400">{hint}</p>
        </article>
      ))}
    </div>
  )
}

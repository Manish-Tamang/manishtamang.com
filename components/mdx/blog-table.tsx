import type { ReactNode } from "react"

export function BlogTable({ children }: { children: ReactNode }) {
  return (
    <div className="my-8 w-full overflow-hidden rounded-[4px] border border-zinc-200 dark:border-zinc-700">
      <table className="w-full table-fixed border-collapse">
        {children}
      </table>
    </div>
  )
}

export function BlogTableHead({ children }: { children: ReactNode }) {
  return (
    <thead className="bg-[#D8D2BF] border-b-1 border-zinc-900/20 dark:border-zinc-900/40">
      {children}
    </thead>
  )
}

export function BlogTableBody({ children }: { children: ReactNode }) {
  return (
    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
      {children}
    </tbody>
  )
}

export function BlogTableRow({ children }: { children: ReactNode }) {
  return (
    <tr className="transition-colors even:bg-zinc-50 hover:bg-zinc-100 dark:even:bg-zinc-800/40 dark:hover:bg-zinc-800">
      {children}
    </tr>
  )
}

export function BlogTableHeaderCell({ children }: { children: ReactNode }) {
  return (
    <th className="border-r border-zinc-900/10 px-3 py-3 text-left align-top text-xs font-semibold uppercase tracking-wide text-zinc-900 break-words last:border-r-0 md:px-4 md:py-4 md:text-sm">
      {children}
    </th>
  )
}

export function BlogTableCell({ children }: { children: ReactNode }) {
  return (
    <td className="border-r border-zinc-200 px-3 py-3 align-top text-xs text-zinc-700 break-words last:border-r-0 dark:border-zinc-700 dark:text-zinc-300 md:px-4 md:py-4 md:text-sm">
      {children}
    </td>
  )
}
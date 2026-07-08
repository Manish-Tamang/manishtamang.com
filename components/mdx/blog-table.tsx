import type { ReactNode } from "react"

export function BlogTable({ children }: { children: ReactNode }) {
  return (
    <div className="my-6 w-full rounded-[8px]">
      <table className="w-full table-fixed divide-y divide-gray-200 dark:divide-gray-700 rounded-[8px]">
        {children}
      </table>
    </div>
  )
}

export function BlogTableHead({ children }: { children: ReactNode }) {
  return <thead className="bg-[#9ac372] rounded-[8px] dark:bg-[#9ac372]">{children}</thead>
}

export function BlogTableBody({ children }: { children: ReactNode }) {
  return (
    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
      {children}
    </tbody>
  )
}

export function BlogTableRow({ children }: { children: ReactNode }) {
  return <tr>{children}</tr>
}

export function BlogTableHeaderCell({ children }: { children: ReactNode }) {
  return (
    <th className="px-3 py-3 md:px-4 md:py-4 text-left text-xs md:text-sm font-medium text-zinc-900 dark:text-zinc-100 uppercase tracking-wide break-words align-top">
      {children}
    </th>
  )
}

export function BlogTableCell({ children }: { children: ReactNode }) {
  return (
    <td className="px-3 py-3 md:px-4 md:py-4 text-xs md:text-sm text-zinc-700 dark:text-zinc-300 break-words align-top">
      {children}
    </td>
  )
}

/*
 * Gregorian → Bikram Sambat (BS), Nepal's official calendar. BS months run 29 to 32
 * days and change from year to year, so there's no formula: this is a table.
 *
 * Month lengths for BS 2080–2090 (April 2023 to April 2034), taken from the npm
 * packages nepali-date-converter and bikram-sambat, which agree on every month of
 * every year from 2000 to 2090. Checked against known dates: 2080/01/01 = 14 Apr 2023,
 * 2081/01/01 = 13 Apr 2024, 2082/01/01 = 14 Apr 2025, 2083/01/01 = 14 Apr 2026,
 * 2083/07/19 = 5 Nov 2026. To extend it, add years from either package.
 */

const FIRST_YEAR = 2080
// 2080/01/01 BS
const FIRST_DAY_UTC = Date.UTC(2023, 3, 14)

const MONTH_LENGTHS: number[][] = [
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30], // 2080
  [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31], // 2081
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2082
  [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // 2083
  [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30], // 2084
  [31, 32, 31, 32, 30, 31, 30, 30, 29, 30, 30, 30], // 2085
  [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30], // 2086
  [31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30], // 2087
  [30, 31, 32, 32, 30, 31, 30, 30, 29, 30, 30, 30], // 2088
  [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30], // 2089
  [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30], // 2090
]

export const BS_MONTHS = [
  "Baisakh",
  "Jestha",
  "Asar",
  "Shrawan",
  "Bhadra",
  "Ashwin",
  "Kartik",
  "Mangsir",
  "Poush",
  "Magh",
  "Falgun",
  "Chaitra",
] as const

export type BsDate = { year: number; month: number; day: number; monthName: (typeof BS_MONTHS)[number] }

/**
 * The BS date for a Gregorian calendar day (month 1–12). Pass the day as it is in
 * Nepal, not the visitor's time zone. Null outside the table's range.
 */
export function toBikramSambat(year: number, month: number, day: number): BsDate | null {
  let days = Math.round((Date.UTC(year, month - 1, day) - FIRST_DAY_UTC) / 86_400_000)
  if (days < 0) return null

  for (const [offset, months] of MONTH_LENGTHS.entries()) {
    for (const [index, length] of months.entries()) {
      if (days < length) return { year: FIRST_YEAR + offset, month: index + 1, day: days + 1, monthName: BS_MONTHS[index] }
      days -= length
    }
  }
  return null
}

const pad = (value: number) => String(value).padStart(2, "0")

/** "2083/07/19" */
export const formatBs = ({ year, month, day }: BsDate) => `${year}/${pad(month)}/${pad(day)}`

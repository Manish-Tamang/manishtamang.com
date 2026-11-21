/* Formatting shared by the /scrobbles charts. Dates read in Kathmandu time. */

const TZ = "Asia/Kathmandu"

export const fmtDate = (ms: number, options: Intl.DateTimeFormatOptions) =>
  new Date(ms).toLocaleDateString("en-GB", { timeZone: TZ, ...options })

export const plural = (n: number, word: string) => `${n.toLocaleString("en-US")} ${n === 1 ? word : `${word}s`}`

/** Whole-percent change, or null when there's nothing to compare with. */
export const change = (value: number, previous: number) => (previous ? Math.round(((value - previous) / previous) * 100) : null)

export const hourLabel = (hour: number) => `${hour % 12 || 12}:00${hour < 12 ? "am" : "pm"}`

/** Bar with rounded data end and a square foot on the baseline. */
export const barPath = (x: number, y: number, w: number, h: number, r = 4) => {
  if (h <= 0) return ""
  const rr = Math.min(r, w / 2, h)
  return `M${x},${y + h}V${y + rr}Q${x},${y} ${x + rr},${y}H${x + w - rr}Q${x + w},${y} ${x + w},${y + rr}V${y + h}Z`
}

/** Three round gridline values from zero to just above `max`. */
export const ticks = (max: number) => {
  const raw = Math.max(max, 1) / 3
  const magnitude = 10 ** Math.floor(Math.log10(raw))
  const step = [1, 2, 2.5, 5, 10].map((m) => m * magnitude).find((s) => s >= raw) ?? raw
  return [0, step, step * 2, step * 3]
}

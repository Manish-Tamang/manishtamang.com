/** Date and time as I'd read it, regardless of where the server runs. */
export const formatKathmandu = (value: number | string, options: Intl.DateTimeFormatOptions) =>
  new Date(value).toLocaleString("en-US", { timeZone: "Asia/Kathmandu", ...options })

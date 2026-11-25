/*
 * A site's favicon as a data URI, fetched once at build time so visitors don't
 * load anything from Google. Returns null if the lookup fails; callers leave the icon out.
 */
export const faviconDataUri = async (url: string, size = 64): Promise<string | null> => {
  try {
    const { hostname } = new URL(url)
    const response = await fetch(`https://www.google.com/s2/favicons?domain=${hostname}&sz=${size}`)
    if (!response.ok) return null
    const type = response.headers.get("content-type") ?? "image/png"
    const bytes = Buffer.from(await response.arrayBuffer())
    return `data:${type};base64,${bytes.toString("base64")}`
  } catch {
    return null
  }
}

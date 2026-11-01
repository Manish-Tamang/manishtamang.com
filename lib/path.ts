/** build.format "file" gives "/about.html" and "/index.html"; normalise to "/about" and "/". */
export function normalizePath(pathname: string) {
  return pathname.replace(/\.html$/, "").replace(/\/index$/, "/").replace(/(.)\/$/, "$1") || "/"
}

/** Whether a nav link points at the current page or one of its children. */
export function isActivePath(current: string, href: string) {
  return href === "/" ? current === "/" : current === href || current.startsWith(`${href}/`)
}

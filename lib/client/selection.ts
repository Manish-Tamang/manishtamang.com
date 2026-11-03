/*
 * Text selection drawn as rounded marker strokes.
 * The native highlight is made transparent (.rounded-selection in global.css)
 * and the selected lines are painted on a fixed canvas above the page in the
 * --selection colour. Multiply (screen in dark mode) keeps the text readable.
 */
const root = document.documentElement
const canvas = document.createElement("canvas")
const context = canvas.getContext("2d")

// Native selection still shows in form fields, so skip their text here
const FIELDS = "input, textarea, [contenteditable]"

type Line = { left: number; top: number; right: number; bottom: number }

/* Rects for the selected part of each text node. Range.getClientRects() would
   also return the full boxes of selected elements, painting whole paragraphs. */
const textRects = (selection: Selection) => {
  const rects: DOMRect[] = []

  for (let i = 0; i < selection.rangeCount; i++) {
    const range = selection.getRangeAt(i)
    const ancestor = range.commonAncestorContainer
    const nodes: Node[] = []

    if (ancestor.nodeType === Node.TEXT_NODE) {
      nodes.push(ancestor)
    } else {
      const walker = document.createTreeWalker(ancestor, NodeFilter.SHOW_TEXT)
      while (walker.nextNode()) {
        if (range.intersectsNode(walker.currentNode)) nodes.push(walker.currentNode)
      }
    }

    for (const node of nodes) {
      if (node.parentElement?.closest(FIELDS)) continue

      const part = document.createRange()
      part.selectNodeContents(node)
      if (node === range.startContainer) part.setStart(node, range.startOffset)
      if (node === range.endContainer) part.setEnd(node, range.endOffset)

      for (const rect of part.getClientRects()) {
        if (rect.width >= 1 && rect.height >= 1) rects.push(rect)
      }
    }
  }

  return rects
}

/* Joins rects that sit on the same line and touch (a link or <strong> mid-sentence),
   so each line is one stroke instead of several with notched corners between them. */
const toLines = (rects: DOMRect[]) => {
  const lines: Line[] = []
  rects.sort((a, b) => a.top - b.top || a.left - b.left)

  for (const rect of rects) {
    const line = lines.findLast((line) => {
      const overlap = Math.min(line.bottom, rect.bottom) - Math.max(line.top, rect.top)
      return overlap > Math.min(line.bottom - line.top, rect.height) / 2 && rect.left <= line.right + 2
    })

    if (line) {
      line.top = Math.min(line.top, rect.top)
      line.bottom = Math.max(line.bottom, rect.bottom)
      line.right = Math.max(line.right, rect.right)
    } else {
      lines.push({ left: rect.left, top: rect.top, right: rect.right, bottom: rect.bottom })
    }
  }

  return lines
}

if (context) {
  canvas.setAttribute("aria-hidden", "true")
  Object.assign(canvas.style, { position: "fixed", inset: "0", width: "100%", height: "100%", pointerEvents: "none", zIndex: "60" })
  document.body.append(canvas)
  root.classList.add("rounded-selection")

  let color = ""
  let width = 0
  let height = 0
  let frame = 0

  const draw = () => {
    frame = 0
    context.clearRect(0, 0, width, height)

    const selection = getSelection()
    if (!selection || selection.isCollapsed) return

    context.beginPath()
    for (const { left, top, right, bottom } of toLines(textRects(selection))) {
      if (bottom < 0 || top > height) continue
      // Grow each stroke a little past the glyphs, like a marker pen; 4px is the site's corner radius
      const pad = (bottom - top) * 0.12
      const strokeHeight = bottom - top + pad * 2
      context.roundRect(left - 1, top - pad, right - left + 2, strokeHeight, Math.min(4, strokeHeight / 2))
    }
    // One fill for every stroke, so overlaps don't darken
    context.fillStyle = color
    context.fill()
  }

  const schedule = () => {
    frame ||= requestAnimationFrame(draw)
  }

  const resize = () => {
    const ratio = Math.min(devicePixelRatio || 1, 2)
    width = innerWidth
    height = innerHeight
    canvas.width = Math.round(width * ratio)
    canvas.height = Math.round(height * ratio)
    context.setTransform(ratio, 0, 0, ratio, 0, 0)
    schedule()
  }

  const readTheme = () => {
    color = getComputedStyle(root).getPropertyValue("--selection").trim()
    canvas.style.mixBlendMode = root.classList.contains("dark") ? "screen" : "multiply"
    schedule()
  }

  document.addEventListener("selectionchange", schedule)
  // Capture, so scrolling inside code blocks and other overflow areas also redraws
  addEventListener("scroll", schedule, { capture: true, passive: true })
  addEventListener("resize", resize)
  new MutationObserver(readTheme).observe(root, { attributes: true, attributeFilter: ["class"] })

  readTheme()
  resize()
}

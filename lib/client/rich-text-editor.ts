/*
 * Formatting for guestbook message inputs ([data-rich-text]): toolbar buttons
 * ([data-format]) and shortcuts wrap the selection in Markdown markers, or unwrap
 * it when it's already wrapped, and [data-rich-preview] shows the result. Listeners
 * are on the document, so reply inputs added by a list refresh work too.
 */
import { hasRichText, richTextHtml } from "@/lib/guestbook/rich-text"

type Format = "bold" | "italic" | "strike" | "code" | "link"

const MARKERS: Record<Exclude<Format, "link">, string> = { bold: "**", italic: "_", strike: "~~", code: "`" }

// ⌘/Ctrl + key; strikethrough is ⌘/Ctrl + Shift + X, as in Google Docs and Notion
const SHORTCUTS: Record<string, Format> = { b: "bold", i: "italic", e: "code", k: "link" }

const isFormat = (value: unknown): value is Format => value === "link" || (typeof value === "string" && value in MARKERS)

function applyFormat(input: HTMLInputElement, format: Format) {
  let start = input.selectionStart ?? input.value.length
  let end = input.selectionEnd ?? start

  // Markers only work when they touch the text ("_word_", not "_word _"), and a
  // double-click on Windows selects the word plus its trailing space, so leave
  // spaces at either end of the selection outside the markers
  const raw = input.value.slice(start, end)
  if (raw.trim()) {
    start += raw.length - raw.trimStart().length
    end -= raw.length - raw.trimEnd().length
  }
  const selected = input.value.slice(start, end)

  if (format === "link") {
    const label = selected || "link text"
    input.setRangeText(`[${label}](https://)`, start, end)
    // With text selected the URL is what's left to type; otherwise the label
    const from = selected ? start + label.length + 3 : start + 1
    input.setSelectionRange(from, from + (selected ? "https://".length : label.length))
  } else {
    const marker = MARKERS[format]
    const wrapped =
      input.value.slice(start - marker.length, start) === marker && input.value.slice(end, end + marker.length) === marker
    if (wrapped) {
      input.setRangeText(selected, start - marker.length, end + marker.length)
      input.setSelectionRange(start - marker.length, end - marker.length)
    } else {
      input.setRangeText(`${marker}${selected}${marker}`, start, end)
      input.setSelectionRange(start + marker.length, end + marker.length)
    }
  }

  input.focus()
  input.dispatchEvent(new Event("input", { bubbles: true }))
}

document.addEventListener("keydown", (event) => {
  const input = event.target
  if (!(input instanceof HTMLInputElement) || !input.matches("[data-rich-text]")) return
  if (!(event.metaKey || event.ctrlKey) || event.altKey) return

  const key = event.key.toLowerCase()
  const format = event.shiftKey ? (key === "x" ? "strike" : undefined) : SHORTCUTS[key]
  if (!format) return
  event.preventDefault()
  applyFormat(input, format)
})

// The input keeps its selection: the button never takes focus on press
document.addEventListener("mousedown", (event) => {
  if ((event.target as Element).closest?.("[data-format]")) event.preventDefault()
})

document.addEventListener("click", (event) => {
  const button = (event.target as Element).closest?.<HTMLElement>("[data-format]")
  const input = button?.closest("form")?.querySelector<HTMLInputElement>("[data-rich-text]")
  if (button && input && isFormat(button.dataset.format)) applyFormat(input, button.dataset.format)
})

// Tooltips are written with Ctrl; Macs use ⌘
if (/Mac|iPhone|iPad/.test(navigator.platform)) {
  for (const button of document.querySelectorAll<HTMLElement>("[data-format][title]")) {
    button.title = button.title.replace("Ctrl+", "⌘").replace("Shift+", "⇧")
  }
}

for (const preview of document.querySelectorAll<HTMLElement>("[data-rich-preview]")) {
  const input = preview.closest("form")?.querySelector<HTMLInputElement>("[data-rich-text]")
  const body = preview.querySelector<HTMLElement>("[data-rich-preview-body]")
  if (!input || !body) continue

  // Only once there's formatting to see; plain text already reads as it will post
  input.addEventListener("input", () => {
    const show = hasRichText(input.value)
    preview.hidden = !show
    // Safe: richTextHtml escapes everything except its own tags
    if (show) body.innerHTML = richTextHtml(input.value)
  })
}

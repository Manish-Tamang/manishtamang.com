/*
 * The guestbook's message box ([data-rich-editor]): a contenteditable where bold,
 * italic, strikethrough, code and links show as you type. The toolbar
 * ([data-format]) and ⌘/Ctrl shortcuts format the selection, and every edit writes
 * the Markdown the server stores (lib/guestbook/rich-text.ts) into the form's
 * hidden message field.
 */

type Format = "bold" | "italic" | "strike" | "code" | "link"

const COMMANDS = { bold: "bold", italic: "italic", strike: "strikeThrough" } as const

// ⌘/Ctrl + key; strikethrough is ⌘/Ctrl + Shift + X, as in Google Docs and Notion
const SHORTCUTS: Record<string, Format> = { b: "bold", i: "italic", e: "code", k: "link" }

const SAFE_HREF = /^(https?:\/\/|mailto:)\S+$/i

// Markers only work when they touch the text, so spaces at either end stay outside
const wrap = (marker: string, text: string) => {
  const [, before, inner, after] = text.match(/^(\s*)([\s\S]*?)(\s*)$/)!
  return inner ? `${before}${marker}${inner}${marker}${after}` : text
}

function toMarkdown(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) return (node.textContent ?? "").replace(/ /g, " ")
  if (!(node instanceof HTMLElement)) return ""
  if (node.tagName === "BR") return "\n"
  if (node.tagName === "CODE") return wrap("`", (node.textContent ?? "").replace(/[`\n]/g, ""))

  let text = [...node.childNodes].map(toMarkdown).join("")
  const { tagName: tag, style } = node

  if (tag === "A") {
    const href = node.getAttribute("href") ?? ""
    return SAFE_HREF.test(href) && text.trim() ? `[${text.replace(/[[\]\n]/g, "")}](${href.replace(/\)/g, "%29")})` : text
  }
  if (tag === "B" || tag === "STRONG" || style.fontWeight === "bold" || Number(style.fontWeight) >= 600) text = wrap("**", text)
  if (tag === "I" || tag === "EM" || style.fontStyle === "italic") text = wrap("_", text)
  if (tag === "S" || tag === "STRIKE" || tag === "DEL" || style.textDecoration.includes("line-through")) text = wrap("~~", text)
  // Some browsers put each new line in its own block
  if (tag === "DIV" || tag === "P") text = `\n${text}`
  return text
}

const markdownOf = (editor: HTMLElement) => [...editor.childNodes].map(toMarkdown).join("").replace(/^\n/, "")

const insideEditor = (editor: HTMLElement) => {
  const selection = getSelection()
  return selection?.rangeCount && editor.contains(selection.getRangeAt(0).commonAncestorContainer) ? selection : null
}

const closest = (editor: HTMLElement, tag: string) => {
  const node = insideEditor(editor)?.anchorNode
  const element = node instanceof Element ? node : node?.parentElement
  const found = element?.closest(tag)
  return found && editor.contains(found) ? (found as HTMLElement) : null
}

const unwrap = (element: HTMLElement) => element.replaceWith(...element.childNodes)

function toggleCode(editor: HTMLElement) {
  const code = closest(editor, "code")
  if (code) return unwrap(code)

  const selection = insideEditor(editor)
  if (!selection) return
  const range = selection.getRangeAt(0)
  const element = document.createElement("code")
  element.textContent = range.toString() || "code"
  range.deleteContents()
  range.insertNode(element)
  selection.selectAllChildren(element)
}

function toggleLink(editor: HTMLElement) {
  const link = closest(editor, "a")
  if (link) return unwrap(link)

  const selection = insideEditor(editor)
  if (!selection) return
  const range = selection.getRangeAt(0)
  const href = prompt("Link to", "https://")?.trim()
  if (!href || !SAFE_HREF.test(href)) return

  // The prompt took focus; put the selection back before changing it
  editor.focus()
  selection.removeAllRanges()
  selection.addRange(range)
  if (range.collapsed) {
    const anchor = document.createElement("a")
    anchor.href = anchor.textContent = href
    range.insertNode(anchor)
    selection.collapse(anchor, anchor.childNodes.length)
  } else {
    document.execCommand("createLink", false, href)
  }
}

function applyFormat(editor: HTMLElement, format: Format) {
  editor.focus()
  if (format === "code") toggleCode(editor)
  else if (format === "link") toggleLink(editor)
  else document.execCommand(COMMANDS[format])
  sync(editor)
}

const fieldOf = (editor: HTMLElement) => editor.closest("form")?.querySelector<HTMLInputElement>('input[name="message"]')

function sync(editor: HTMLElement) {
  const markdown = markdownOf(editor)
  // An emptied editor keeps a stray <br>; clearing it brings the placeholder back
  if (!markdown.trim()) editor.replaceChildren()
  const field = fieldOf(editor)
  if (field) field.value = markdown.trim()
  updateToolbar(editor)
}

function updateToolbar(editor: HTMLElement) {
  const form = editor.closest("form")
  if (!form) return
  for (const button of form.querySelectorAll<HTMLElement>("[data-format]")) {
    const format = button.dataset.format as Format
    const active =
      format === "code"
        ? Boolean(closest(editor, "code"))
        : format === "link"
          ? Boolean(closest(editor, "a"))
          : Boolean(insideEditor(editor)) && document.queryCommandState(COMMANDS[format])
    button.setAttribute("aria-pressed", String(active))
  }
}

for (const editor of document.querySelectorAll<HTMLElement>("[data-rich-editor]")) {
  // Tags (<b>, <i>, <strike>) rather than inline styles
  document.execCommand("styleWithCSS", false, "false")

  editor.addEventListener("input", () => sync(editor))

  editor.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault()
      // ⌘/Ctrl + Enter posts; Enter alone starts a new line
      if (event.metaKey || event.ctrlKey) editor.closest("form")?.requestSubmit()
      else document.execCommand("insertLineBreak")
      return
    }
    if (!(event.metaKey || event.ctrlKey) || event.altKey) return
    const key = event.key.toLowerCase()
    const format = event.shiftKey ? (key === "x" ? "strike" : undefined) : SHORTCUTS[key]
    if (!format) return
    event.preventDefault()
    applyFormat(editor, format)
  })

  // Pasted text arrives plain; formatting comes only from the toolbar
  editor.addEventListener("paste", (event) => {
    event.preventDefault()
    document.execCommand("insertText", false, event.clipboardData?.getData("text/plain") ?? "")
  })
  editor.addEventListener("drop", (event) => event.preventDefault())

  const form = editor.closest("form")
  form?.addEventListener("click", (event) => {
    const button = (event.target as Element).closest<HTMLElement>("[data-format]")
    if (button && form.contains(button)) applyFormat(editor, button.dataset.format as Format)
  })
  // Posting clears the hidden field; the editor follows
  form?.addEventListener("guestbook:reset", () => {
    editor.replaceChildren()
    sync(editor)
  })
}

document.addEventListener("selectionchange", () => {
  for (const editor of document.querySelectorAll<HTMLElement>("[data-rich-editor]")) {
    if (insideEditor(editor)) updateToolbar(editor)
  }
})

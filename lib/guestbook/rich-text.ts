/*
 * The guestbook's rich text: a small Markdown subset, **bold**, *italic* (or
 * _italic_), ~~strikethrough~~, `code` and [links](https://…), plus bare URLs.
 * Everything is HTML-escaped first and only these patterns become tags, so a
 * message can't inject markup. Used on the server and by the form's preview.
 */

export type MessageFormat = "plain" | "markdown"

export const MAX_MESSAGE = 2000

/** Tailwind classes for rendered messages, shared by the list and the form's preview. */
export const richTextClass =
  "[&_a]:text-link [&_a]:underline [&_a]:decoration-current/35 [&_a]:underline-offset-[0.2em] [&_a:hover]:decoration-current [&_code]:rounded-sm [&_code]:bg-muted [&_code]:px-1 [&_code]:font-mono [&_code]:text-[0.875em] [&_strong]:font-subsection [&_strong]:text-heading"

const ESCAPES: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }
const escape = (text: string) => text.replace(/[&<>"']/g, (char) => ESCAPES[char])

// A bare URL stops before trailing punctuation, so "see https://x.com." links x.com
const BARE_URL = String.raw`https?:\/\/[^\s<]*[^\s<.,!?;:)'"]`
const LINKS = new RegExp(String.raw`\[([^\]\n]+)\]\((https?:\/\/[^\s)]+|mailto:[^\s)]+)\)|(${BARE_URL})`, "g")

const anchor = (href: string, label: string) =>
  `<a href="${escape(href)}" target="_blank" rel="nofollow ugc noopener noreferrer">${label}</a>`

// On already-escaped text: * _ ~ are never escaped, so the markers survive
const emphasis = (html: string) =>
  html
    .replace(/\*\*(?=\S)([^*]*?\S)\*\*/g, "<strong>$1</strong>")
    .replace(/~~(?=\S)([^~]*?\S)~~/g, "<del>$1</del>")
    .replace(/(^|[^*\w])\*(?=\S)([^*\n]*?\S)\*(?![*\w])/g, "$1<em>$2</em>")
    .replace(/(^|[^_\w])_(?=\S)([^_\n]*?\S)_(?![_\w])/g, "$1<em>$2</em>")

// Links are swapped for \0n\0 placeholders while the rest is formatted, so
// **[a link](…)** can be bold and a URL's own _ or * is never read as a marker
function inline(text: string) {
  const links: string[] = []
  const marked = text.replace(/\0/g, "").replace(LINKS, (_, label?: string, href?: string, bare?: string) => {
    links.push(label ? anchor(href!, emphasis(escape(label))) : anchor(bare!, escape(bare!)))
    return `\0${links.length - 1}\0`
  })
  return emphasis(escape(marked)).replace(/\0(\d+)\0/g, (_, index) => links[Number(index)])
}

/** Safe HTML for a markdown message. Newlines are kept by the container's white-space. */
export const richTextHtml = (source: string) =>
  // Code spans first, so nothing inside them is formatted or linked
  source
    .split(/(`[^`\n]+`)/g)
    .map((part, index) => (index % 2 ? `<code>${escape(part.slice(1, -1))}</code>` : inline(part)))
    .join("")

/** Safe HTML for a message in either format. Plain messages only get their URLs linked. */
export const messageHtml = (source: string, format: MessageFormat) =>
  format === "markdown"
    ? richTextHtml(source)
    : source
        .split(new RegExp(`(${BARE_URL})`, "g"))
        .map((part, index) => (index % 2 ? anchor(part, escape(part)) : escape(part)))
        .join("")

/** The text without markers, for page descriptions and JSON-LD. */
export const messageText = (source: string, format: MessageFormat) =>
  format === "markdown"
    ? source
        .replace(/\[([^\]\n]+)\]\(([^)\s]+)\)/g, "$1")
        .replace(/(\*\*|~~|`)/g, "")
        .replace(/(^|[^\w])[*_](?=\S)([^*_\n]*?\S)[*_](?!\w)/g, "$1$2")
    : source

/** Whether the text uses any of the formatting, to decide when to show a preview. */
export const hasRichText = (source: string) => /\*\*|~~|`|\[[^\]]+\]\(|(^|[^\w])[*_]\S/.test(source)

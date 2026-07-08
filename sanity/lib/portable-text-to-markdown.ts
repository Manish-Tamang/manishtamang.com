type PortableTextSpan = {
  _type?: string
  text?: string
  marks?: string[]
}

type PortableTextBlock = {
  _type?: string
  style?: string
  listItem?: string
  level?: number
  children?: PortableTextSpan[]
  rows?: { cells?: string[] }[]
}

function spanToMarkdown(span: PortableTextSpan, markDefs: Record<string, { _type?: string; href?: string }> = {}): string {
  const text = span.text ?? ""
  if (!text) return ""

  let result = text
  const marks = span.marks ?? []

  for (const mark of marks) {
    const def = markDefs[mark]
    if (def?._type === "link" && def.href) {
      result = `[${result}](${def.href})`
      continue
    }

    switch (mark) {
      case "strong":
        result = `**${result}**`
        break
      case "em":
        result = `*${result}*`
        break
      case "code":
        result = `\`${result}\``
        break
      default:
        break
    }
  }

  return result
}

function blockToMarkdown(block: PortableTextBlock): string {
  if (block._type === "table") {
    const rows = block.rows ?? []
    if (rows.length === 0) return ""

    return rows
      .map((row, index) => {
        const cells = row.cells ?? []
        const line = `| ${cells.join(" | ")} |`
        if (index === 0) {
          return `${line}\n| ${cells.map(() => "---").join(" | ")} |`
        }
        return line
      })
      .join("\n")
  }

  if (block._type !== "block") return ""

  const markDefs = (block as PortableTextBlock & { markDefs?: Record<string, { _type?: string; href?: string }> }).markDefs ?? {}
  const text = (block.children ?? []).map((child) => spanToMarkdown(child, markDefs)).join("")

  if (!text.trim()) return ""

  switch (block.style) {
    case "h1":
      return `# ${text}`
    case "h2":
      return `## ${text}`
    case "h3":
      return `### ${text}`
    case "h4":
      return `#### ${text}`
    case "blockquote":
      return `> ${text}`
    default:
      if (block.listItem === "bullet") return `- ${text}`
      if (block.listItem === "number") return `1. ${text}`
      return text
  }
}

export function portableTextToMarkdown(value: unknown): string {
  if (typeof value === "string") return value
  if (!Array.isArray(value)) return ""

  return value
    .map((block) => blockToMarkdown(block as PortableTextBlock))
    .filter(Boolean)
    .join("\n\n")
}

export function normalizePostContent(value: unknown): string {
  return portableTextToMarkdown(value)
}

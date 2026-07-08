import { createClient } from "next-sanity"

function portableTextToMarkdown(value) {
  if (typeof value === "string") return value
  if (!Array.isArray(value)) return ""

  return value
    .map((block) => {
      if (block?._type === "table") {
        const rows = block.rows ?? []
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

      if (block?._type !== "block") return ""

      const text = (block.children ?? []).map((child) => child.text ?? "").join("")
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
    })
    .filter(Boolean)
    .join("\n\n")
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN

if (!projectId || !dataset || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, or SANITY_API_WRITE_TOKEN")
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-01-25",
  token,
  useCdn: false,
})

const posts = await client.fetch(`*[_type == "post"]{ _id, title, content }`)

let updated = 0

for (const post of posts) {
  if (typeof post.content === "string") continue

  const markdown = portableTextToMarkdown(post.content)
  await client.patch(post._id).set({ content: markdown }).commit()
  updated += 1
  console.log(`Updated: ${post.title || post._id}`)
}

console.log(`Done. Updated ${updated} post(s).`)

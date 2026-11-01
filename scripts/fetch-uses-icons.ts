// Downloads a 64px favicon for every /uses tool into assets/uses/icons/.
// Run after adding tools:  node scripts/fetch-uses-icons.ts
// Existing icons are kept; delete a file to fetch it again.
import { existsSync } from "node:fs"
import { writeFile } from "node:fs/promises"
import { sections, slugify } from "../data/uses.ts"

const OUT_DIR = new URL("../assets/uses/icons/", import.meta.url)

for (const tool of sections.flatMap((section) => section.tools)) {
  const domain = tool.iconDomain ?? (tool.url ? new URL(tool.url).host : null)
  if (!domain) continue

  const file = new URL(`${slugify(tool.name)}.png`, OUT_DIR)
  if (existsSync(file)) continue

  const response = await fetch(`https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=64`)
  if (!response.ok) {
    console.warn(`✗ ${tool.name} (${response.status})`)
    continue
  }
  await writeFile(file, Buffer.from(await response.arrayBuffer()))
  console.log(`✓ ${tool.name}`)
}

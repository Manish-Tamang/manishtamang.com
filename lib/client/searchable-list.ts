/* Search and sort for components/shared/SearchableList. Items stay grouped by year in both directions. */
const list = document.querySelector<HTMLElement>("[data-list]")
const search = document.querySelector<HTMLInputElement>("[data-list-search]")
const sortButton = document.querySelector<HTMLElement>("[data-list-sort]")
const empty = document.querySelector<HTMLElement>("[data-list-empty]")

if (list && search && sortButton && empty) {
  const sections = [...list.querySelectorAll<HTMLElement>("[data-year]")]
  const label = sortButton.querySelector<HTMLElement>("[data-list-sort-label]")!
  let newest = true

  const direction = (a: number, b: number) => (newest ? b - a : a - b)

  const filter = () => {
    const query = search.value.toLowerCase().trim()
    let matches = 0

    for (const section of sections) {
      const items = [...section.querySelectorAll<HTMLElement>("[data-item]")]
      const visible = items.filter((item) => item.dataset.search!.includes(query))
      for (const item of items) item.hidden = !visible.includes(item)
      section.hidden = visible.length === 0
      matches += visible.length
    }

    empty.hidden = matches > 0
  }

  const sort = () => {
    for (const section of sections) {
      const rows = section.querySelector("ul")!
      const items = [...rows.querySelectorAll<HTMLElement>("[data-item]")]
      rows.replaceChildren(...items.sort((a, b) => direction(Number(a.dataset.date), Number(b.dataset.date))))
    }
    list.replaceChildren(...[...sections].sort((a, b) => direction(Number(a.dataset.year), Number(b.dataset.year))))
    label.textContent = newest ? "Newest" : "Oldest"
  }

  search.addEventListener("input", filter)
  sortButton.addEventListener("click", () => {
    newest = !newest
    sort()
  })
}

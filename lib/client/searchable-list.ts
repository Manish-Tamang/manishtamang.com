/* Search and sort for components/shared/SearchableList. Date sorts keep the year groups; view sorts list every row flat. */
const list = document.querySelector<HTMLElement>("[data-list]")
const flat = document.querySelector<HTMLElement>("[data-list-flat]")
const search = document.querySelector<HTMLInputElement>("[data-list-search]")
const sortSelect = document.querySelector<HTMLSelectElement>("[data-list-sort]")
const empty = document.querySelector<HTMLElement>("[data-list-empty]")

if (list && flat && search && sortSelect && empty) {
  const sections = [...list.querySelectorAll<HTMLElement>("[data-year]")]
  const items = sections.flatMap((section) => [...section.querySelectorAll<HTMLElement>("[data-item]")])
  const home = new Map(items.map((item) => [item, item.parentElement!]))
  const num = (item: HTMLElement, key: "date" | "views") => Number(item.dataset[key] ?? 0)

  const filter = () => {
    const query = search.value.toLowerCase().trim()
    let matches = 0

    for (const item of items) {
      item.hidden = !item.dataset.search!.includes(query)
      if (!item.hidden) matches++
    }
    for (const section of sections) {
      section.hidden = !section.querySelector("[data-item]:not([hidden])")
    }

    empty.hidden = matches > 0
  }

  const sort = () => {
    const mode = sortSelect.value
    const byViews = mode.endsWith("views")

    if (byViews) {
      const sign = mode === "most-views" ? -1 : 1
      flat.replaceChildren(
        ...[...items].sort((a, b) => sign * (num(a, "views") - num(b, "views")) || num(b, "date") - num(a, "date")),
      )
    } else {
      const sign = mode === "newest" ? -1 : 1
      for (const section of sections) {
        const rows = section.querySelector("ul")!
        rows.replaceChildren(
          ...items.filter((item) => home.get(item) === rows).sort((a, b) => sign * (num(a, "date") - num(b, "date"))),
        )
      }
      list.replaceChildren(...[...sections].sort((a, b) => sign * (Number(a.dataset.year) - Number(b.dataset.year))))
    }

    list.hidden = byViews
    flat.hidden = !byViews
    filter()
  }

  search.addEventListener("input", filter)
  sortSelect.addEventListener("change", sort)
  // Browsers restore the select on back/forward, so apply whatever it shows
  if (sortSelect.value !== "newest") sort()
}

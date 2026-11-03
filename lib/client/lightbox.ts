/*
 * Drives the image viewer in components/photos/Lightbox.astro, with the same
 * controls as abhisekmishra.com: click the image (or swipe, or scroll
 * sideways) for the next one, arrow keys to step, a thumbnail to jump,
 * Escape or the dark area to close.
 *
 * Two kinds of image open it, each paging through its own set:
 * - [data-photo] tiles, which carry the full-size image in data-* attributes
 *   (/photos grid, about-page polaroids)
 * - images in posts (.prose) or marked [data-zoom], shown from their own srcset
 */
type Slide = {
  src: string
  srcset: string
  width: number
  height: number
  alt: string
  caption: string
  date: string
  thumb: string
}

const ZOOMABLE = ".prose img, img[data-zoom]"

const dialog = document.querySelector<HTMLDialogElement>("[data-lightbox]")

const zoomables = () =>
  [...document.querySelectorAll<HTMLImageElement>(ZOOMABLE)].filter((image) => !image.closest("a, button, [data-lightbox]"))

const fromTile = (tile: HTMLElement): Slide => {
  const { dataset } = tile
  return {
    src: dataset.src ?? "",
    srcset: dataset.srcset ?? "",
    width: Number(dataset.width) || 0,
    height: Number(dataset.height) || 0,
    alt: dataset.alt ?? "",
    caption: dataset.caption ?? "",
    date: dataset.date ?? "",
    thumb: tile.querySelector("img")?.currentSrc || dataset.src || "",
  }
}

const fromImage = (image: HTMLImageElement): Slide => ({
  src: image.src,
  srcset: image.srcset,
  width: image.naturalWidth || image.width,
  height: image.naturalHeight || image.height,
  alt: image.alt,
  // data-caption is for images that show their description only in the viewer
  caption: image.dataset.caption ?? image.closest("figure")?.querySelector("figcaption")?.textContent?.trim() ?? "",
  date: "",
  thumb: image.currentSrc || image.src,
})

if (dialog) {
  const img = dialog.querySelector<HTMLImageElement>("[data-lb-image]")!
  const stage = dialog.querySelector<HTMLElement>("[data-lb-stage]")!
  const caption = dialog.querySelector<HTMLElement>("[data-lb-caption]")!
  const date = dialog.querySelector<HTMLElement>("[data-lb-date]")!
  const rail = dialog.querySelector<HTMLElement>("[data-lb-rail]")!

  let slides: Slide[] = []
  let thumbs: HTMLButtonElement[] = []
  let index = 0
  let opener: HTMLElement | null = null

  img.style.backgroundSize = "cover"
  img.addEventListener("load", () => (img.style.backgroundImage = ""))

  const preload = (i: number) => {
    const slide = slides[(i + slides.length) % slides.length]
    const image = new Image()
    image.sizes = img.sizes
    image.srcset = slide.srcset
    image.src = slide.src
  }

  const show = (i: number) => {
    index = (i + slides.length) % slides.length
    const slide = slides[index]

    // Clear first, so the previous image doesn't linger while the next one loads.
    // Its box is sized from width/height straight away and shows the small version
    // already on the page until the full one arrives, so it never flashes empty.
    img.removeAttribute("src")
    img.style.backgroundImage = slide.thumb ? `url(${JSON.stringify(slide.thumb)})` : ""
    img.srcset = slide.srcset
    if (slide.width && slide.height) {
      img.width = slide.width
      img.height = slide.height
    } else {
      img.removeAttribute("width")
      img.removeAttribute("height")
    }
    img.src = slide.src
    img.alt = slide.alt

    caption.textContent = slide.caption
    caption.hidden = !slide.caption
    date.textContent = slide.date
    date.hidden = !slide.date

    thumbs.forEach((thumb, n) => {
      thumb.setAttribute("aria-current", String(n === index))
      if (n === index) thumb.scrollIntoView({ block: "nearest", inline: "nearest" })
    })

    if (slides.length > 1) {
      preload(index + 1)
      preload(index - 1)
    }
  }

  const buildRail = () => {
    thumbs = []
    rail.replaceChildren()
    if (slides.length < 2) return

    slides.forEach((slide, n) => {
      const thumb = document.createElement("button")
      thumb.type = "button"
      thumb.className = "lightbox__thumb"
      thumb.setAttribute("aria-label", `Show image ${n + 1} of ${slides.length}`)
      const image = document.createElement("img")
      image.src = slide.thumb
      image.alt = ""
      image.decoding = "async"
      image.draggable = false
      thumb.append(image)
      thumb.addEventListener("click", () => show(n))
      rail.append(thumb)
      thumbs.push(thumb)
    })
  }

  const open = (set: Slide[], start: number, from: HTMLElement) => {
    slides = set
    opener = from
    buildRail()
    dialog.toggleAttribute("data-single", slides.length < 2)
    img.toggleAttribute("data-pageable", slides.length > 1)
    show(start)
    document.documentElement.style.overflow = "hidden"
    dialog.showModal()
  }

  const openFrom = (target: Element) => {
    const tile = target.closest<HTMLElement>("[data-photo]")
    if (tile) {
      const tiles = [...document.querySelectorAll<HTMLElement>("[data-photo]")]
      open(tiles.map(fromTile), tiles.indexOf(tile), tile)
      return true
    }

    const images = zoomables()
    const image = images.find((candidate) => candidate === target)
    if (image) {
      open(images.map(fromImage), images.indexOf(image), image)
      return true
    }
    return false
  }

  document.addEventListener("click", (event) => openFrom(event.target as Element))

  // Post images aren't buttons; make them reachable and openable from the keyboard
  for (const image of zoomables()) {
    image.tabIndex = 0
    image.setAttribute("role", "button")
    image.setAttribute("aria-label", image.alt ? `Open image: ${image.alt}` : "Open image")
    image.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return
      event.preventDefault()
      openFrom(image)
    })
  }

  dialog.addEventListener("close", () => {
    document.documentElement.style.overflow = ""
    opener?.focus({ preventScroll: true })
    opener = null
  })

  dialog.querySelector("[data-lb-close]")!.addEventListener("click", () => dialog.close())

  // Clicking anywhere but the image, its caption or the rail closes the viewer
  dialog.querySelector("[data-lb-surface]")!.addEventListener("click", (event) => {
    if (!(event.target as Element).closest("img, p, button")) dialog.close()
  })

  dialog.addEventListener("keydown", (event) => {
    if (slides.length < 2) return
    if (event.key === "ArrowRight") show(index + 1)
    if (event.key === "ArrowLeft") show(index - 1)
  })

  // A swipe also fires a click on the image; ignore that one
  let swipedAt = 0
  img.addEventListener("click", () => {
    if (slides.length > 1 && Date.now() - swipedAt > 400) show(index + 1)
  })

  let touchX = 0
  let touchY = 0
  let tracking = false

  stage.addEventListener(
    "touchstart",
    (event) => {
      tracking = event.touches.length === 1 && slides.length > 1
      if (tracking) {
        touchX = event.touches[0].clientX
        touchY = event.touches[0].clientY
      }
    },
    { passive: true },
  )

  stage.addEventListener(
    "touchend",
    (event) => {
      if (!tracking) return
      tracking = false
      const dx = event.changedTouches[0].clientX - touchX
      const dy = event.changedTouches[0].clientY - touchY
      // Mostly sideways and far enough to be deliberate
      if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy) * 1.5) return
      swipedAt = Date.now()
      show(index + (dx < 0 ? 1 : -1))
    },
    { passive: true },
  )

  stage.addEventListener("touchcancel", () => (tracking = false), { passive: true })

  // Trackpad: one sideways swipe steps one image, however many wheel events it sends
  let wheelX = 0
  let wheelLocked = false
  let wheelTimer: ReturnType<typeof setTimeout> | undefined

  stage.addEventListener(
    "wheel",
    (event) => {
      if (slides.length < 2 || Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return
      event.preventDefault()
      clearTimeout(wheelTimer)
      wheelTimer = setTimeout(() => {
        wheelX = 0
        wheelLocked = false
      }, 220)
      if (wheelLocked) return
      wheelX += event.deltaX
      if (Math.abs(wheelX) < 60) return
      wheelLocked = true
      show(index + (wheelX > 0 ? 1 : -1))
      wheelX = 0
    },
    { passive: false },
  )
}

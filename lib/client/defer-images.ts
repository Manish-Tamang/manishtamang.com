/*
 * Images marked data-defer-src start loading only when they come within 400px of
 * the screen. Native loading="lazy" starts a screen or two early, which on a short
 * page means the footer's badges load with everything else.
 */
const load = (image: HTMLImageElement) => {
  const { deferSrc, deferSrcset } = image.dataset
  if (deferSrcset) image.srcset = deferSrcset
  if (deferSrc) image.src = deferSrc
  image.removeAttribute("data-defer-src")
}

const images = document.querySelectorAll<HTMLImageElement>("img[data-defer-src]")

if (!("IntersectionObserver" in window)) images.forEach(load)
else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        observer.unobserve(entry.target)
        load(entry.target as HTMLImageElement)
      }
    },
    { rootMargin: "400px 0px" },
  )
  images.forEach((image) => observer.observe(image))
}

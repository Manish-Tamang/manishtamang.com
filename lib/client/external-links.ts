/*
 * Opens every link to another site in a new tab, including ones in blog posts
 * and guestbook messages, without having to mark each one up.
 */
document.addEventListener("click", (event) => {
  const link = (event.target as Element).closest?.<HTMLAnchorElement>("a[href]")
  if (!link || !link.protocol.startsWith("http") || link.origin === location.origin) return

  link.target = "_blank"
  link.relList.add("noopener", "noreferrer")
})

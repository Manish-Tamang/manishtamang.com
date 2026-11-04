/*
 * Reactions under a blog post (components/blog/Reactions.astro): loads the live
 * counts and the visitor's pick, then sets, switches or clears it. The click shows
 * straight away and is undone if the server refuses it (limits or an outage).
 */
type Counts = Record<string, number>
type State = { counts: Counts; mine: string | null }

const root = document.querySelector<HTMLElement>("[data-reactions]")

if (root) {
  const endpoint = `/api/blog-reactions/${root.dataset.reactions}`
  const buttons = [...root.querySelectorAll<HTMLButtonElement>("[data-reaction]")]
  const status = root.querySelector<HTMLElement>("[data-reaction-status]")!

  let state: State = {
    counts: Object.fromEntries(
      buttons.map((button) => [button.dataset.reaction!, Number(button.querySelector("[data-count]")!.textContent!.replace(/\D/g, ""))]),
    ),
    mine: null,
  }
  let busy = false
  let statusTimer: ReturnType<typeof setTimeout> | undefined

  const render = () => {
    for (const button of buttons) {
      const reaction = button.dataset.reaction!
      button.setAttribute("aria-pressed", String(reaction === state.mine))
      button.querySelector("[data-count]")!.textContent = (state.counts[reaction] ?? 0).toLocaleString("en-GB")
    }
  }

  const say = (message: string) => {
    clearTimeout(statusTimer)
    status.textContent = message
    statusTimer = setTimeout(() => (status.textContent = ""), 4000)
  }

  fetch(endpoint)
    .then((response) => (response.ok ? response.json() : null))
    .then((data: State | null) => {
      if (!data || busy) return
      state = data
      render()
    })
    .catch(() => {})

  for (const button of buttons) {
    button.addEventListener("click", async () => {
      if (busy) return
      const reaction = button.dataset.reaction!
      const next = state.mine === reaction ? null : reaction
      const previous = state

      // Optimistic: move one count from the old pick to the new one
      const counts = { ...state.counts }
      if (state.mine) counts[state.mine] = Math.max(0, counts[state.mine] - 1)
      if (next) counts[next] += 1
      state = { counts, mine: next }
      render()

      busy = true
      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ reaction: next }),
        })
        const data = await response.json().catch(() => null)
        if (!response.ok || !data?.counts) {
          throw new Error(response.status === 429 ? "Easy there, try again in a minute" : "Couldn't save that, try again later")
        }
        state = data
      } catch (error) {
        state = previous
        // A network failure is a TypeError with the browser's own wording; keep ours
        say(error instanceof Error && !(error instanceof TypeError) ? error.message : "Couldn't save that, try again later")
      } finally {
        busy = false
        render()
      }
    })
  }
}

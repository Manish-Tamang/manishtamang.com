/* GitHub contributions for the last year, via a public API that needs no token. */
export type Contribution = { date: string; count: number; level: number }

export async function getContributions(): Promise<Contribution[]> {
  const response = await fetch("https://github-contributions-api.jogruber.de/v4/Manish-Tamang?y=last")
  if (!response.ok) throw new Error(`Contributions API ${response.status}`)
  return (await response.json()).contributions ?? []
}

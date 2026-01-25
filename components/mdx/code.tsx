import { Pre, RawCode, highlight } from "codehike/code"
import { callout } from "./callout"

export async function Code({ codeblock }: { codeblock: RawCode }) {
  const highlighted = await highlight(codeblock, "github-dark")
  return (
    <Pre
      code={highlighted}
      handlers={[callout]}
      className="border border-zinc-800"
    />
  )
}

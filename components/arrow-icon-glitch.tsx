import { ArrowUpRight } from "lucide-react"

export function ArrowIconGlitch() {
  return (
    <div className="group relative overflow-hidden font-medium">
      <span className="invisible">
        <ArrowUpRight size={10} />
      </span>
      <span className="absolute left-0 top-0 text-neutral-500 dark:text-neutral-400 transition-transform duration-300 ease-in-out hover:duration-300 group-hover:-translate-y-full group-hover:translate-x-full">
        <ArrowUpRight size={10} />
      </span>
      <span className="absolute left-0 top-0 -translate-x-full translate-y-full text-primary transition-transform duration-300 ease-in-out hover:duration-300 group-hover:translate-x-0 group-hover:translate-y-0">
        <ArrowUpRight size={10} />
      </span>
    </div>
  )
}

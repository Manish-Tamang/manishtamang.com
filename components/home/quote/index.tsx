import { FaQuoteLeft } from "react-icons/fa"

export function Quote() {
  return (
    <section className="mx-auto mt-4 mb-6 flex w-full max-w-[610px] items-center justify-center px-6 md:px-0">
      <blockquote className="relative w-fit pl-8 text-left font-myfont leading-[0.95] text-[#636363] dark:text-zinc-400">
        <FaQuoteLeft className="absolute left-0 top-1 size-5" />
        <p className="select-none text-xl sm:text-2xl md:text-3xl">
          I don&apos;t mind stealin&apos; bread <br />
          From the mouths of decadents <br /> But I can&apos;t feed on the
          powerless <br />
          When my cup&apos;s already overfilled, yeah
        </p>
      </blockquote>
    </section>
  )
}

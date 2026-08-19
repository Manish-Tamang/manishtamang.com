"use client"

import Image from "next/image"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { sounds } from "@/lib/sounds"

const trustedLogos = [
  { name: "Anzed", src: "/images/logo/anzed.png" },
  { name: "Bee Finance", src: "/images/logo/beefinance.png" },
  { name: "CorpGems", src: "/images/logo/corpgems.png" },
  { name: "Trek Adviser", src: "/images/logo/trekadviser.png" },
  { name: "Travaction Nepal", src: "/images/logo/travactionnepal.png" },
  { name: "Godawari Hacks", src: "/images/logo/godawarihacks.png" },
  { name: "Himlayan Beauty and Spa, Finland", src: "/images/logo/himalayan-spa.png" },
  { name: "Tech Connects 2027", src: "/images/logo/Tech-connects.png" },
]

export function TrustedBySection() {
  return (
    <section className="max-w-[610px] w-full mx-auto mt-6 px-4 md:px-0">
      <h2 className="text-2xl font-semibold mb-2">Trusted by</h2>
      <div className="text-foreground leading-normal mb-6 text-sm md:text-base">
        <p>
          I&apos;ve worked with clients across travel, finance, and product teams for{" "}
          <span className="font-semibold text-foreground">3+ years</span>, shipping sites and
          tools that hold up in real use. I focus on clear UI, steady delivery, and partnerships
          built on trust - not just a one-off handoff.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 sm:gap-x-10 sm:gap-y-8">
        {trustedLogos.map((logo) => (
          <Tooltip
            key={logo.name}
            onOpenChange={(open) => {
              if (open) sounds.tick()
            }}
          >
            <TooltipTrigger asChild>
              <div className="flex h-10 w-24 sm:h-11 sm:w-28  items-center justify-center grayscale opacity-70 transition-all duration-300 hover:grayscale-0 hover:opacity-100 dark:opacity-60 dark:hover:opacity-100">
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={140}
                  height={48}
                  className="h-full w-auto max-w-full object-contain object-center"
                  draggable={false}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{logo.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </section>
  )
}

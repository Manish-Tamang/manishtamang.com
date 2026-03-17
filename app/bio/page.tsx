import { MiniGoleCard } from "@/components/bio/mini-gole-card"
import { PolaroidGallery } from "@/components/bio/polaroid-gallery"
import { LineBreaker } from "@/components/line-breaker"
import type { BioPolaroidItem } from "@/data/bio-polaroids"

const bioPolaroidData: BioPolaroidItem[] = [
  {
    id: "bio-polaroid-1",
    src: "/images/mini-gole.jpg",
    alt: "Polaroid moment one",
    caption: "Mini Gole, 2012",
    rotate: -4,
  },
  {
    id: "bio-polaroid-2",
    src: "/bio/IMG-20260201-WA0042.jpg",
    alt: "GoGlamping, Dharan, 2026",
    caption: "GoGlamping, Dharan, 2026",
    rotate: 2,
  },
  {
    id: "bio-polaroid-3",
    src: "/bio/IMG-20250701-WA0003.jpg",
    alt: "Kathmandu, 2025",
    caption: "Kathmandu, 2025",
    rotate: -3,
  },
  {
    id: "bio-polaroid-4",
    src: "/bio/IMG-20260227-WA0037.jpg",
    alt: "Last Day of College, 2026",
    caption: "Last Day of College, 2026",
    rotate: 3,
  },
]

const extraPolaroidData: BioPolaroidItem[] = [
  {
    id: "extra-polaroid-1",
    src: "/bio/polaroid-5.jpg",
    alt: "Extra memory one",
    caption: "Late night coding",
    rotate: -2,
  },
  {
    id: "extra-polaroid-2",
    src: "/bio/polaroid-6.jpg",
    alt: "Extra memory two",
    caption: "Coffee + ideas",
    rotate: 3,
  },
  {
    id: "extra-polaroid-3",
    src: "/bio/polaroid-7.jpg",
    alt: "Extra memory three",
    caption: "Community meetup",
    rotate: -1,
  },
  {
    id: "extra-polaroid-4",
    src: "/bio/polaroid-8.jpg",
    alt: "Extra memory four",
    caption: "Build day",
    rotate: 2,
  },
]

export default function BioPage() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <div className="w-full max-w-152.5 px-6 py-12">
        <section className="grid grid-cols-1 items-start gap-8 pb-8 md:grid-cols-[minmax(0,7fr)_minmax(0,3fr)]">
          <div className="space-y-4">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">Journal</p>
            <h1 className="text-4xl font-medium tracking-tight">Bio</h1>
            <p className="max-w-[56ch] text-sm leading-normal text-foreground/70 md:text-sm">
              Since childhood, I have been driven by curiosity and a deep passion for learning. I have always been eager to explore new ideas and understand how things work, often looking at them from different perspectives.<br />
              <br />
              I am naturally drawn to minimalism and clarity, preferring simplicity over anything cluttered or messy. From the very beginning, I have carried a positive mindset toward growth, always seeking to learn, improve, and see the bigger picture.
            </p>
          </div>
          <div className="flex justify-start md:mt-26 md:justify-end">
            <MiniGoleCard />
          </div>
        </section>
        <LineBreaker />
        <PolaroidGallery data={bioPolaroidData} />

        <section id="journal" className="pt-8">
          <p className="text-sm text-foreground/55">Your journal entries can go here.</p>
        </section>

      </div>
    </div>
  )
}
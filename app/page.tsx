import { Hero } from "@/components/hero"
import { FeaturedBlogs } from "@/components/featured-blogs"
import StickyNotesProvider from "@/components/sticky-notes"
import Image from "next/image"

import { AboutSection } from "@/components/about-section"
import { FeaturedProjects } from "@/components/featured-projects"
import { LineBreaker } from "@/components/line-breaker"
import { ManWhoCantBeMoved } from "@/components/man-who-cant-be-moved"

export default function HomePage() {
  const stickyNotes = [
    {
      id: "note-1",
      text: "Manish Gole Tamang",
      color: "yellow" as const,
      initialX: 378,
      initialY: 472,
      initialRotation: -9,
      width: 110,
      height: 110,
      mobileWidth: 70,
      mobileHeight: 70,
      mobileX: 10,
      mobileY: 1050,
      delay: 0.3,
    },
    {
      id: "note-2",
      text: "The Man Who Can't Be Moved",
      color: "green" as const,
      initialX: 874,
      initialY: 2285,
      initialRotation: 8,
      width: 110,
      height: 110,
      mobileWidth: 70,
      mobileHeight: 70,
      mobileX: 130,
      mobileY: 1060,
      delay: 0.4,
    },
    {
      id: "note-3",
      text: "✨ Creative",
      color: "pink" as const,
      initialX: 497,
      initialY: 1339,
      initialRotation: -8,
      width: 110,
      height: 110,
      mobileWidth: 70,
      mobileHeight: 70,
      mobileX: 250,
      mobileY: 1045,
      delay: 0.5,
    },
    {
      id: "note-4",
      text: "🎯 User First",
      color: "blue" as const,
      initialX: 626,
      initialY: 1287,
      initialRotation: -5,
      width: 110,
      height: 110,
      mobileWidth: 70,
      mobileHeight: 70,
      mobileX: 370,
      mobileY: 1055,
      delay: 0.6,
    },
  ]

  return (
    <div className="min-h-screen flex flex-col items-center">
      <StickyNotesProvider stickyNotes={stickyNotes} />
      <div className="px-6 py-8">
        <Hero />
      </div>
      <LineBreaker />
      <AboutSection />
      <LineBreaker />
      <FeaturedProjects />
      <LineBreaker />
      <FeaturedBlogs />
      <LineBreaker />
      <ManWhoCantBeMoved />
      <LineBreaker />
      <div className="p-6 mt-4 w-[720px]">
        <Image
          src="/tour/pokhara.jpg"
          alt="Pokhara tour"
          width={1920}
          height={1080}
          className="w-full h-auto rounded-md"
          priority
        />
      </div>
      {/* <BentoGrid /> */}
    </div>
  )
}

import { Hero } from "@/components/hero"
import { FeaturedBlogs } from "@/components/featured-blogs"
import StickyNotesProvider from "@/components/sticky-notes"
import Image from "next/image"

import { AboutSection } from "@/components/about-section"
import { FeaturedProjects } from "@/components/featured-projects"
import { LineBreaker } from "@/components/line-breaker"
import { ManWhoCantBeMoved } from "@/components/man-who-cant-be-moved"
import { sanityFetch } from "@/sanity/lib/live"
import { FEATURED_POSTS_QUERY } from "@/sanity/lib/queries"

export default async function HomePage() {
  const { data: posts } = await sanityFetch({ query: FEATURED_POSTS_QUERY })

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
      mobileWidth: 110,
      mobileHeight: 110,
      mobileX: 32,
      mobileY: 701,
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
      mobileX: 293,
      mobileY: 3844,
      delay: 0.4,
    },
    // {
    //   id: "note-3",
    //   text: "✨ Creative",
    //   color: "pink" as const,
    //   initialX: 497,
    //   initialY: 1339,
    //   initialRotation: -8,
    //   width: 110,
    //   height: 110,
    //   mobileWidth: 70,
    //   mobileHeight: 70,
    //   mobileX: 250,
    //   mobileY: 1045,
    //   delay: 0.5,
    // },
    // {
    //   id: "note-4",
    //   text: "🎯 User First",
    //   color: "blue" as const,
    //   initialX: 626,
    //   initialY: 1287,
    //   initialRotation: -5,
    //   width: 110,
    //   height: 110,
    //   mobileWidth: 70,
    //   mobileHeight: 70,
    //   mobileX: 370,
    //   mobileY: 1055,
    //   delay: 0.6,
    // },
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
      <FeaturedBlogs posts={posts} />
      <LineBreaker />
      <ManWhoCantBeMoved />
      <LineBreaker />
      <div className="p-6 mt-4 max-w-[720px] w-full">
        <Image
          src="/skeleton.png"
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

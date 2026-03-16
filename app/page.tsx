import { Hero } from "@/components/hero"
import { FeaturedBlogs } from "@/components/featured-blogs"
import StickyNotesProvider from "@/components/sticky-notes"
import { AboutSection } from "@/components/about-section"
import { FeaturedProjects, FeaturedProjectsSkeleton } from "@/components/featured-projects"
import { LineBreaker } from "@/components/line-breaker"
import { ManWhoCantBeMoved } from "@/components/man-who-cant-be-moved"
import { FeaturedImageSection, FeaturedImageSkeleton } from "@/components/featured-image-section"
import { sanityFetch } from "@/sanity/lib/live"
import { FEATURED_POSTS_QUERY, RECENT_FAVORITE_QUERY } from "@/sanity/lib/queries"
import { Suspense } from "react"

// Enable incremental static regeneration for fast page loads
export const revalidate = 3600 // Home content cache: 1 hour

export default async function HomePage() {
  // Fetch main content with long cache
  const { data: posts } = await sanityFetch({ query: FEATURED_POSTS_QUERY })
  
  const { data: recentFavorite } = await sanityFetch({ query: RECENT_FAVORITE_QUERY })

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
      <AboutSection recentFavorite={recentFavorite} />
      <LineBreaker />
      <Suspense fallback={<FeaturedProjectsSkeleton />}>
        <FeaturedProjects />
      </Suspense>
      <LineBreaker />
      <FeaturedBlogs posts={posts} />
      <LineBreaker />
      {/* Lazy load below-fold decorative and image components */}
      <Suspense fallback={null}>
        <ManWhoCantBeMoved />
      </Suspense>
      <LineBreaker />
      <Suspense fallback={<FeaturedImageSkeleton />}>
        <FeaturedImageSection />
      </Suspense>
      {/* <BentoGrid /> */}
    </div>
  )
}

import {
  Hero,
  FeaturedBlogs,
  AboutSection,
  TrustedBySection,
  FeaturedProjects,
  FeaturedProjectsSkeleton,
  LineBreaker,
  Quote,
  FeaturedImageSection,
  FeaturedImageSkeleton,
  StickyNotesLazy,
} from "@/components/home"
import { sanityFetch } from "@/sanity/lib/live"
import { FEATURED_POSTS_QUERY, RECENT_FAVORITE_QUERY } from "@/sanity/lib/queries"
import { Suspense } from "react"

export const revalidate = 3600

const stickyNotes = [
  {
    id: "note-1",
    text: "Manish Gole Tamang",
    color: "yellow" as const,
    backgroundImage: "/svg/sticky-green.svg",
    initialX: 378,
    initialY: 472,
    initialRotation: -9,
    width: 110,
    height: 110,
    mobileWidth: 110,
    mobileHeight: 110,
    mobileX: 40,
    mobileY: 515,
    delay: 0.3,
  },
  {
    id: "note-2",
    color: "green" as const,
    backgroundImage: "/images/hunger-strike-cd.png",
    initialX: 1007,
    initialY: 2591,
    initialRotation: 8,
    width: 110,
    height: 110,
    mobileWidth: 70,
    mobileHeight: 70,
    mobileX: 331,
    mobileY: 3996,
    delay: 0.4,
  },
]

export default async function HomePage() {
  const [{ data: posts }, { data: recentFavorite }] = await Promise.all([
    sanityFetch({ query: FEATURED_POSTS_QUERY }),
    sanityFetch({ query: RECENT_FAVORITE_QUERY }),
  ])

  return (
    <div className="min-h-screen flex flex-col items-center">
      <StickyNotesLazy stickyNotes={stickyNotes} />
      <div className="px-6 py-8">
        <Hero />
      </div>
      <LineBreaker />
      <AboutSection recentFavorite={recentFavorite} />
      <LineBreaker />
      <TrustedBySection />
      <LineBreaker />
      <Suspense fallback={<FeaturedProjectsSkeleton />}>
        <FeaturedProjects />
      </Suspense>
      <LineBreaker />
      <FeaturedBlogs posts={posts} />
      <LineBreaker />
      <Quote />
      <LineBreaker />
      <Suspense fallback={<FeaturedImageSkeleton />}>
        <FeaturedImageSection />
      </Suspense>
    </div>
  )
}

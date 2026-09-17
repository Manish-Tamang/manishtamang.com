import { AboutContent, FeaturedSection, Education, PrayerFlags, RandomFacts } from "@/components/about"
import { PolaroidGallery } from "@/components/bio"
import { LineBreaker } from "@/components/shared/line-breaker"
import {
  heading,
  intro,
  bio,
  socialLinks,
  favoriteGame,
  aboutPolaroids,
} from "@/data/about"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-[610px] px-6 py-12 space-y-12">
        <section className="space-y-6">
          <h1 className="text-4xl font-medium tracking-tight">{heading}</h1>
          <div className="space-y-6 text-[17px] leading-relaxed text-foreground/80 font-normal">
            <p className="text-foreground text-2xl font-myfont">{intro}</p>
            <AboutContent bio={bio} socialLinks={socialLinks} />
          </div>
        </section>

        <section id="things-i-love" className="space-y-4">
          <div className="space-y-1">
            <p className="text-sm text-foreground/70">{favoriteGame.label}</p>
            <div className="grayscale-50">
              <Image
                src={favoriteGame.lightSrc}
                alt={favoriteGame.alt}
                width={favoriteGame.width}
                height={favoriteGame.height}
                draggable={false}
                className="h-auto w-36 -ml-1 user-select-none dark:hidden"
              />
              <Image
                src={favoriteGame.darkSrc}
                alt={favoriteGame.alt}
                width={favoriteGame.width}
                height={favoriteGame.height}
                draggable={false}
                className="hidden h-auto w-36 -ml-1 user-select-none dark:block"
              />
            </div>
          </div>
        </section>

        <div className="relative">
          <LineBreaker />
          <div className="relative">
            <div className="relative z-0 -mt-2">
              <PolaroidGallery data={aboutPolaroids} />
            </div>
            {/* <PrayerFlags /> */}
          </div>
        </div>
        <LineBreaker />
        <section id="education">
          <Education />
        </section>
        <LineBreaker />
        <section id="featured">
          <FeaturedSection />
        </section>
        <LineBreaker />
        <section id="random-facts">
          <RandomFacts />
        </section>
        <LineBreaker />
      </div>
    </div>
  )
}

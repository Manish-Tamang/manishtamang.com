import type { BioPolaroidItem } from "@/data/bio-polaroids"

export const heading = "About"

export const intro =
  "Hi, I'm Manish Tamang from Kathmandu, where I craft, break, and rebuild the internet, one line at a time."

export const bio =
  "Driven by a love for web development, I'm a 18-year-old full stack aspirant from <span className=\"font-myfont text-xl font-bold\">Kathmandu, Nepal</span>. My coding journey began early, and since then, I've dedicated myself to crafting engaging web experiences using technologies like React, Next.js, and Tailwind CSS.<br /><br />I'm constantly seeking new challenges and learning opportunities to refine my skills."

export const socialLinks = [
  { platform: "github", url: "https://github.com/Manish-Tamang" },
  { platform: "twitter", url: "https://x.com/Manishtamangxyz" },
  { platform: "linkedin", url: "https://www.linkedin.com/in/manish-tamang" },
  { platform: "gmail", url: "mailto:hello@manishtamang.com" },
  { platform: "dailydev", url: "https://app.daily.dev/manishtamang" },
  { platform: "instagram", url: "https://instagram.com/golecodes" },
  { platform: "tiktok", url: "https://www.tiktok.com/@golecodes" },
]

export const favoriteGame = {
  label: "Favorite game",
  alt: "Far Cry 3 logo",
  lightSrc: "/far-cry-3-logo-black.png",
  darkSrc: "/far-cry-3-logo-white.png",
  width: 140,
  height: 50,
}

export const aboutPolaroids: BioPolaroidItem[] = [
  {
    id: "bio-polaroid-1",
    src: "/images/mini-gole.jpg",
    alt: "Polaroid moment one",
    caption: "Mini Gole",
    rotate: -4,
  },
  {
    id: "bio-polaroid-2",
    src: "/bio/IMG-20260201-WA0042.jpg",
    alt: "GoGlamping, Dharan, 2026",
    caption: "GoGlamping, Dharan",
    rotate: 2,
  },
  {
    id: "bio-polaroid-3",
    src: "/bio/d815986e-5752-47ec-807b-2a138683c6a4.png",
    alt: "Bhojpur, 2011",
    caption: "Bhojpur",
    rotate: -3,
  },
  {
    id: "bio-polaroid-4",
    src: "/bio/mini-gole.png",
    alt: "Me in Grade 3, 2017",
    caption: "Me in Grade III",
    rotate: 3,
  },
]

export const randomFacts = [
  {
    id: "raspberry-pi-4",
    text: "Back in late 2023, I uploaded a video about Raspberry Pi 4 builds.",
    youtubeId: "6ljvu9RBBXo",
    youtubeTitle: "Raspberry Pi 4 builds",
  },
]

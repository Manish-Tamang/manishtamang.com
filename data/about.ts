/*
 * /about and /bio content. Images are file names under assets/about/ and
 * assets/bio/ (assets/images/ for the shared "mini-gole.jpg").
 */

export const intro =
  "Hi, I'm Manish Tamang from Kathmandu, where I craft, break, and rebuild the internet, one line at a time."

export const socials = [
  { name: "GitHub", url: "https://github.com/Manish-Tamang", icon: "github" },
  { name: "X", url: "https://x.com/Manishtamangxyz", icon: "x" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/manish-tamang", icon: "linkedin" },
  { name: "daily.dev", url: "https://app.daily.dev/manishtamang", icon: "dailydotdev" },
  { name: "Instagram", url: "https://instagram.com/golecodes", icon: "instagram" },
  { name: "TikTok", url: "https://www.tiktok.com/@golecodes", icon: "tiktok" },
  { name: "Email", url: "mailto:hi@manishtamang.com", icon: "gmail" },
]

export const work = [
  {
    company: "Digital Pathshala",
    role: "MERN Stack Intern",
    location: "Itahari",
    dates: "Sep 2025 - Jan 2026",
    logo: "dp.png",
    url: "/digitalpathshala",
    highlights: [
      "Worked on real client projects like UpaayaX and HamroTask",
      "Named Best Intern of the Month",
      "Evenings 5:30–10:30 PM, alongside +2 studies",
    ],
  },
]

export const education = [
  {
    institution: "Sushma Godawari College",
    degree: "+2 Science (Computer Science)",
    dates: "July 2024 – April 2026",
    logo: "sushma.jpg",
  },
  {
    institution: "Prashanti Academy",
    degree: "Secondary Education",
    dates: "June 2020 – March 2024",
    logo: "prashanti.jpg",
  },
  {
    institution: "Y-pointing Sec. Boarding School",
    degree: "Primary Education",
    dates: "June 2012 – March 2020",
    logo: "ypointing.jpg",
  },
]

export const featured = [
  {
    title: "Featured on NTV Itahari interview",
    url: "https://youtu.be/8DFWCY8xLdk?si=5nUYCY2R65x8O8fl&t=294",
    source: "youtube.com",
    date: "Feb 17, 2026",
    image: "8DFWCY8xLdk_maxresdefault.jpg",
  },
  {
    title: "150 Awesome Portfolios",
    url: "https://masri.blog/Blog/Collection-of-150-awesome-portfolios",
    source: "masri.blog",
    date: "March 2, 2025",
    image: "pexels-shkrabaanthony-7163361.jpg",
  },
  {
    title: "Portfolio of the Day",
    url: "https://pafolios.com/manish-gole-tamang",
    source: "pafolios.com",
    date: "April 25, 2026",
    image: "pafolios.png",
  },
]

export const randomFacts = [
  {
    text: "Back in late 2023, I uploaded a video about Raspberry Pi 4 builds.",
    youtubeId: "6ljvu9RBBXo",
    youtubeTitle: "Raspberry Pi 4 builds",
  },
]

export type Polaroid = { file: string; caption: string; alt: string; rotate: number }

export const aboutPolaroids: Polaroid[] = [
  { file: "mini-gole.jpg", caption: "Mini Gole", alt: "Manish as a kid", rotate: -4 },
  { file: "IMG-20260201-WA0042.jpg", caption: "GoGlamping, Dharan", alt: "GoGlamping, Dharan, 2026", rotate: 2 },
  { file: "d815986e-5752-47ec-807b-2a138683c6a4.png", caption: "Bhojpur", alt: "Bhojpur, 2011", rotate: -3 },
  { file: "mini-gole.png", caption: "Me in Grade III", alt: "Manish in Grade 3, 2017", rotate: 3 },
]

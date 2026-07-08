import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono, Karla } from "next/font/google"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Script from "next/script";
import CarbonAds from "@/components/CarbonAds";
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: "400",
  display: "swap",
})

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-karla",
  weight: "400",
  display: "swap",
})

const perfectlyNineties = localFont({
  src: "../public/fonts/perfectly-nineties-regular.woff2",
  variable: "--font-perfectly-nineties",
  weight: "400",
  display: "swap",
})

const myFont = localFont({
  src: "../public/fonts/MyFont-Regularr.woff2",
  variable: "--font-myfont",
  weight: "400",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: "Manish Tamang - A young developer",
  description:
    "Hi, I'm Manish Gole Tamang, an 18-year-old from Itahari, Nepal, with a fervent passion for web development.",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: "/icon-light-32x32.png",
  },
  openGraph: {
    title: "Manish Tamang - A young developer",
    description:
      "Hi, I'm Manish Gole Tamang, an 18-year-old from Itahari, Nepal, with a fervent passion for web development.",
    images: "https://manishtamang.com/profile.png",
    type: "website",
  },
};

import { Toaster } from "sonner"
import { SanityLive } from "@/sanity/lib/live"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${karla.variable} ${perfectlyNineties.variable} ${myFont.variable} ${jetbrainsMono.variable}`}>
      <head>
        <meta name="description" content={metadata.description ?? ""} />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
        <Script
          src="https://manish-analytics.vercel.app/script.js"
          data-website-id="d5fd3d82-d867-4e3d-badb-837ad2ff7f7d"
          strategy="afterInteractive"
        />
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="87f8f3a2-7fad-4aed-b92d-5beeee4c4491"
          strategy="afterInteractive"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3993510219762880"
          crossOrigin="anonymous"
          defer
        ></script>
      </head>
      <body
        className={`font-inter antialiased bg-[#F7F7F7] dark:bg-[#191919]`}
      >
        <div className="min-h-screen flex flex-col">
          <div className="flex-1 flex justify-center">
            <div className="w-full  relative"> <Header />
              <CarbonAds className="fixed bottom-4 left-16 w-1/4 hidden md:block" /> {children}
              <SpeedInsights />
            </div>
          </div>
          <Footer />
        </div>
        <Analytics />
        <SanityLive />
        <Toaster
          position="bottom-right"
          toastOptions={{
            className: "font-inter",
            style: {
              fontFamily: "var(--font-inter)",
            },
          }}
        />
      </body>
    </html>
  )
}

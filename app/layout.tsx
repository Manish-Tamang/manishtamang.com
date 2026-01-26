import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
  title: "Manish Tamang (@golecodes) - Developer & Student",
  description: "Minimal portfolio website showcasing my work and thoughts",
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
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

import { Toaster } from "sonner"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${perfectlyNineties.variable} ${myFont.variable} ${jetbrainsMono.variable}`}>
      <body
        className={`font-inter antialiased bg-[#F7F7F7] dark:bg-[#191919]`}
      >
        <div className="min-h-screen flex flex-col">
          <div className="flex-1 flex justify-center">
            <div className="w-full  relative"> <Header /> {children}</div>
          </div>
          <Footer />
        </div>
        <Analytics />
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

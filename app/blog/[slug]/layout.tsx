import type React from "react"
import { Rubik, Roboto } from "next/font/google"

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  display: "swap",
})

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
  display: "swap",
})

export default function BlogSlugLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className={`${rubik.variable} ${roboto.variable} blog-slug-page`}>
      {children}
    </div>
  )
}

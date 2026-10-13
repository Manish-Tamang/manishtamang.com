"use client"

import dynamic from "next/dynamic"

const CarbonAds = dynamic(() => import("./index"), { ssr: false })

export default function CarbonAdsLazy({ className }: { className?: string }) {
  return <CarbonAds className={className} />
}

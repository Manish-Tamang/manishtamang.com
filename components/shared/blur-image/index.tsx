"use client"

import Image, { ImageProps } from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface BlurImageProps extends Omit<ImageProps, "onLoad"> {
  lazy?: boolean
}

export function BlurImage({ className, lazy = false, ...props }: BlurImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <Image
      {...props}
      className={cn(
        "transition-all duration-300",
        isLoading ? "blur-sm scale-105" : "blur-0 scale-100",
        className
      )}
      onLoad={() => setIsLoading(false)}
      loading={lazy ? "lazy" : "eager"}
    />
  )
}

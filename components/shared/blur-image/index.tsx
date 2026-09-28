"use client"

import Image, { ImageProps } from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { isSanityImageSrc, sanityImageLoader } from "@/lib/sanity-image-loader"

interface BlurImageProps extends Omit<ImageProps, "onLoad"> {
  lazy?: boolean
}

export function BlurImage({
  className,
  lazy = false,
  blurDataURL,
  quality = 75,
  loader,
  ...props
}: BlurImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const useSanityLoader = !loader && isSanityImageSrc(props.src)

  return (
    <Image
      {...props}
      loader={loader ?? (useSanityLoader ? sanityImageLoader : undefined)}
      quality={quality}
      placeholder={blurDataURL ? "blur" : "empty"}
      blurDataURL={blurDataURL}
      className={cn(
        "bg-zinc-200 dark:bg-zinc-800",
        "transition-opacity duration-500 ease-out",
        isLoaded || blurDataURL ? "opacity-100" : "opacity-0",
        className
      )}
      onLoad={() => setIsLoaded(true)}
      loading={lazy ? "lazy" : "eager"}
      decoding="async"
    />
  )
}

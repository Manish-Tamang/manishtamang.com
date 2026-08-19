"use client"

import Image from "next/image"
import styles from "./card-stack.module.css"

const dpImages = [
  "/images/dp/IMG_20251016_132841.jpg",
  "/images/dp/IMG_20251010_163935.jpg",
  "/images/dp/IMG_20250930_115837.jpg",
  "/images/dp/IMG_20250930_111529.jpg",
  "/images/dp/1760696198327.jpg",
  "/images/dp/IMG_20251010_163935.jpg",
  "/images/dp/IMG_20250930_115837.jpg",
]

export function DigitalPathshalaCardStack() {
  return (
    <div className={styles.container} aria-label="Digital Pathshala memory cards">
      {dpImages.map((src, index) => (
        <div key={`${src}-${index}`} className={styles.card}>
          <Image
            src={src}
            alt={`Digital Pathshala memory ${index + 1}`}
            fill
            className={styles.image}
            sizes="132px"
          />
        </div>
      ))}
    </div>
  )
}

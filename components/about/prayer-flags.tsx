"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function PrayerFlags() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 -mt-2 top-0 z-20"
      style={{ perspective: 800 }}
    >
      <motion.div
        className="relative w-full"
        animate={{ rotateX: [0, -2, 1, -1, 0.5, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "center top",
        }}
      >
        <motion.div
          className="w-full"
          animate={{ scaleY: [1, 0.98, 1.01, 0.99, 1] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/images/prayers-flag.png"
            alt="Prayer flags"
            className="h-auto w-full select-none object-cover object-top blur-[0.4px] brightness-115"
            width={893}
            height={91}
            loading="lazy"
            draggable={false}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export const Firfirey = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative flex flex-col items-center w-fit cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                className="relative z-10"
                animate={
                    isHovered
                        ? {
                            rotate: [0, 360],
                            filter: ["blur(0px)", "blur(1.5px)", "blur(0px)"],
                        }
                        : {
                            rotate: 0,
                            filter: "blur(0px)",
                        }
                }
                transition={
                    isHovered
                        ? {
                            rotate: {
                                duration: 0.8,
                                repeat: Infinity,
                                ease: "linear",
                            },
                            filter: {
                                duration: 0.2,
                                repeat: Infinity,
                                ease: "linear",
                            },
                        }
                        : {
                            rotate: { duration: 0.5 },
                            filter: { duration: 0.3 },
                        }
                }
            >
                <Image
                    src="/firfirey/firfirey-wings.png"
                    alt="Firfirey Wings"
                    width={80}
                    height={80}
                    className="object-contain select-none"
                    draggable={false}
                    priority
                />
            </motion.div>

            <div className="-mt-14 relative z-0">
                <Image
                    src="/firfirey/firfirey-stick.png"
                    alt="Firfirey Stick"
                    width={30}
                    height={20}
                    className="object-contain select-none"
                    draggable={false}
                    priority
                />
            </div>
        </div>
    );
};

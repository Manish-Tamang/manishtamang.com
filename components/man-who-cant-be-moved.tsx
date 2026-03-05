"use client"

import Image from "next/image"

export function ManWhoCantBeMoved() {
    return (
        <section className="max-w-[610px] w-full mx-auto mt-4 mb-6 grid grid-cols-2 items-center gap-4 md:gap-8 px-6 md:px-0">
            <p className="font-myfont text-[#636363] dark:text-zinc-400 rotate-[350deg] text-3xl sm:text-4xl md:text-5xl leading-tight select-none">
                If you see this girl,<br />
                can you tell her <br />
                where I am? :)
            </p>
            <div className="relative w-full rotate-[5deg] h-[150px] sm:h-[200px] md:h-[260px]">
                <Image
                    src="/images/this-girl.png"
                    alt="Girl"
                    fill
                    className="object-contain user-select-none"
                    draggable={false}
                    loading="lazy"
                    sizes="(max-width: 640px) 150px, (max-width: 768px) 200px, 260px"
                />
            </div>
        </section>
    )
}

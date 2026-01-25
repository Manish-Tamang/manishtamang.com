"use client"

import Image from "next/image"

export function ManWhoCantBeMoved() {
    return (
        <section className="w-[610px] mt-4 mb-6 grid grid-cols-2 items-center gap-6">
            <p className="font-myfont text-[#636363] rotate-350 text-5xl">
                If you see this girl,<br />
                can you tell her <br />
                where I am? :)
            </p>
            <div className="relative w-full rotate-5 h-[260px]">
                <Image
                    src="/images/this-girl.png"
                    alt="Girl"
                    fill
                    className="object-contain user-select-none"
                    draggable={false}
                    priority
                />
            </div>
            {/* <p className="text-[#636363] text-[10px]" >The man who can't be moved - The Script</p> */}
        </section>
    )
}

import Image from "next/image"

export function MiniGoleCard() {
  return (
    <div className="flex flex-col items-center top-40 self-start">
      <div className="relative rounded-[8px] w-32 h-full">
        <div className="relative group duration-500 cursor-pointer overflow-hidden text-gray-50 h-48 w-40 rounded-[8px] hover:duration-700">
          <div className="w-40 h-48 text-gray-800">
            <div className="flex flex-row justify-between opacity-90">
              <Image
                src="/bio/mini-gole.png"
                alt="Manish Tamang"
                width={180}
                height={180}
                className="w-full h-full"
                draggable={false}
                style={{ userSelect: "none" }}
              />
            </div>
          </div>
          <div className="absolute bg-gray-50 dark:bg-neutral-900 -bottom-22 w-40 p-2 flex flex-col gap-1 group-hover:bottom-0 group-hover:duration-600 duration-500">
            <span className="text-[#38A662] font-myfont text-lg">
              Manish Gole
            </span>
            <p className="text-foreground/70 text-xs">
              My friends also call me Gole.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
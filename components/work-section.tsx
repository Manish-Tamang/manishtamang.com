import Image from "next/image"
import { FaArrowRight } from "react-icons/fa";

type WorkItem = {
  logoSrc: string
  company: string
  role: string
  period: string
}

const items: WorkItem[] = [
  {
    logoSrc: "/work/digital-pathsala.png",
    company: "Digital Pathshala",
    role: "MERN Intern",
    period: "Sep. 2025 - Dec. 2025",
  },
  {
    logoSrc: "/work/swikar-codes.png",
    company: "Swikar Codes",
    role: "Full Stack Developer",
    period: "Aug. 2024 - Feb. 2025",
  },
  {
    logoSrc: "/work/freelance.jpg",
    company: "Freelancing",
    role: "Full Stack Developer",
    period: "Aug. 2024 - Present",
  },
]

export function WorkSection() {
  return (
    <section aria-label="Work" className="mt-8 bg-[#EEE6FF] rounded-md p-4">
      <h2 className="text-xl font-semibold mb-2">Work</h2>
      <p className="text-sm text-muted-foreground mb-4">My professional experience and journey building web applications</p>
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <div key={item.company} className="flex items-center gap-4 ">
            {/* <div className="shrink-0 border border-[#808080] rounded-md">
              <Image
                src={item.logoSrc}
                alt={`${item.company} logo`}
                width={40}
                height={40}
                className="rounded-md"
              />
            </div> */}
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1">
                    <p className="text-sm font-medium" style={{ color: "#5B5B71" }}>
                      {item.company}
                    </p>
                    <FaArrowRight className="inline-block text-xs -rotate-45 transition-transform group-hover:translate-y-[-2px] group-hover:translate-x-1" style={{ color: "#808080" }} />
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "#808080" }}>
                    {item.role}
                  </p>
                </div>
                <div className="rounded-full px-3 py-1 bg-[#5200FF]">
                  <p className="text-xs" style={{ color: "#EEE6FF" }}>
                    {item.period}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

"use client"

import Cursor from "@/components/icons/Cursor"
import ClaudeAI from "@/components/icons/Claude"
import { TypeScript } from "@/components/icons/Typescript"
import { Nextjs } from "@/components/icons/Nextjs"
import { Figma } from "@/components/icons/Figma"
import { sounds } from "@/lib/sounds"

const tools = [
    { name: "Cursor", Icon: Cursor },
    { name: "Claude", Icon: ClaudeAI },
    { name: "TypeScript", Icon: TypeScript },
    { name: "Next.js", Icon: Nextjs },
    { name: "Figma", Icon: Figma },
]

export function ToolsDock() {
    return (
        <div className="mt-4 flex items-end justify-between gap-3">
            <p className="text-[10px] uppercase tracking-wider text-white/70">
                My primary tools
            </p>
            <div className="tools-dock">
                {tools.map(({ name, Icon }) => (
                    <div
                        key={name}
                        className="tools-dock-item"
                        onMouseEnter={() => sounds.tick()}
                    >
                        <span className="tools-dock-label">{name}</span>
                        <Icon className="size-4 text-white" />
                    </div>
                ))}
            </div>
        </div>
    )
}

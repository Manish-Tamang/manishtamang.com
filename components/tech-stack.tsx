import { Bun } from "./icons/Bun"
import { Firebase } from "./icons/Firebase"
import { Git } from "./icons/Git"
import { GitHub } from "./icons/Github"
import { JavaScript } from "./icons/Javascript"
import { MySQL } from "./icons/Mysql"
import { Netlify } from "./icons/Netlify"
import { Nextjs } from "./icons/Nextjs"
import { Nodejs } from "./icons/Nodejs"
import { PostgreSQL } from "./icons/Postgres"
import { Postman } from "./icons/Postman"
import { Prisma } from "./icons/Prisma"
import { React } from "./icons/Reactjs"
import { Resend } from "./icons/Resend"
import { Sanity } from "./icons/Sanity"
import { Supabase } from "./icons/Supabase"
import { TailwindCSS } from "./icons/Tailwind"
import { TypeScript } from "./icons/Typescript"

const techStack = [
    { name: "Bun", icon: Bun },
    { name: "Firebase", icon: Firebase },
    { name: "Git", icon: Git },
    { name: "GitHub", icon: GitHub },
    { name: "JavaScript", icon: JavaScript },
    { name: "MySQL", icon: MySQL },
    { name: "Netlify", icon: Netlify },
    { name: "Next.js", icon: Nextjs },
    { name: "Node.js", icon: Nodejs },
    { name: "PostgreSQL", icon: PostgreSQL },
    { name: "Postman", icon: Postman },
    { name: "Prisma", icon: Prisma },
    { name: "React", icon: React },
    { name: "Resend", icon: Resend },
    { name: "Sanity", icon: Sanity },
    { name: "Supabase", icon: Supabase },
    { name: "Tailwind", icon: TailwindCSS },
    { name: "TypeScript", icon: TypeScript },
]

export function TechStack() {
    return (
        <section className="mt-12">
            <h2 className="text-2xl font-semibold mb-2">Tech Stack</h2>
            <p className="text-sm text-muted-foreground mb-6">
                Tech stack that I'm familiar with, or I have used in past projects
            </p>
            <div className="grid grid-cols-6 border-t-2 border-l-2 border-border border-dotted bg-[#E3FF9C]">
                {techStack.map((tech) => {
                    const Icon = tech.icon
                    return (
                        <div
                            key={tech.name}
                            className="flex flex-col items-center justify-center p-2 border-r-2 border-b-2 border-border border-dotted aspect-square hover:bg-accent/50 transition-colors"
                        >
                            <Icon className="w-6 h-6 mb-1" />
                            <span className="text-[10px] font-medium text-center leading-tight">{tech.name}</span>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

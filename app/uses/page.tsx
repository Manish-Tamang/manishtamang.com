import Cursor from "@/components/icons/Cursor";
import { Bun } from "@/components/icons/Bun";
import { CSS } from "@/components/icons/Css";
import { Edge } from "@/components/icons/Edge";
import { Figma } from "@/components/icons/Figma";
import { Git } from "@/components/icons/Git";
import { GitHub } from "@/components/icons/Github";
import { GitLab } from "@/components/icons/Gitlab";
import { GoogleAntigravity } from "@/components/icons/Antigravity";
import { Helium } from "@/components/icons/Helium";
import { Nextjs } from "@/components/icons/Nextjs";
import { NPM } from "@/components/icons/Npm";
import { PayloadCMS } from "@/components/icons/Payload";
import { Pnpm } from "@/components/icons/Pnpm";
import { Postman } from "@/components/icons/Postman";
import { Prettier } from "@/components/icons/Prettier";
import { React as ReactIcon } from "@/components/icons/Reactjs";
import { Resend } from "@/components/icons/Resend";
import { Sanity } from "@/components/icons/Sanity";
import { Spotify } from "@/components/icons/Spotify";
import { TailwindCSS } from "@/components/icons/Tailwind";
import { Ubuntu } from "@/components/icons/Ubuntu";
import { Netlify } from "@/components/icons/Netlify";
import { Vercel } from "@/components/icons/Vercel";
import { VisualStudioCode } from "@/components/icons/Vsc";
import { Windows } from "@/components/icons/Windows";
import { Zsh } from "@/components/icons/Zsh";
import { LineBreaker } from "@/components/shared/line-breaker";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import Link from "next/link";

const UsesPage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <main className="w-full max-w-[680px] px-4 py-6 sm:px-6 sm:py-12">
        <header className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-medium tracking-tight">
            Uses
          </h1>
          <p className="text-sm leading-relaxed text-foreground md:text-base">
            A small collection of the hardware, software, and tools I use to
            build things, write code, and spend too much time on the internet.
          </p>
        </header>

        <div className="mt-10 space-y-10 text-sm leading-relaxed text-foreground/80 md:text-base">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Hardware</h2>
            <p>
              My main machine is an{" "}
              <strong className="inline-flex items-center gap-1.5 align-middle">
                <Windows aria-hidden="true" className="h-4 w-4 shrink-0" />
                <Link
                  href="https://mudita.com.np/acer-aspire-14-ai-u7-256v-price-nepal.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-dotted text-[#00ADEF]  underline-offset-4"
                >
                  Acer Aspire 14 AI (2025)
                </Link>
              </strong>{" "}
              with an Intel Core Ultra 5 226V, 16 GB of RAM, and a 1 TB SSD.
            </p>
            <p>
              The rest of my setup is simple and practical.
            </p>
            <p>
              I use{" "}
              <Tooltip>
                <TooltipTrigger asChild>
                  <strong className="inline-flex cursor-help items-center gap-1.5 align-middle">
                    <Image
                      src="https://windhawk.net/logo-white.51673358e9c759f0.svg"
                      alt=""
                      width={16}
                      height={16}
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 rounded bg-[#252525] p-0.5"
                    />
                    <Link
                      href="https://windhawk.net/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground underline decoration-dotted underline-offset-4"
                    >
                      Windhawk
                    </Link>
                  </strong>
                </TooltipTrigger>
                <TooltipContent>
                  Windhawk is a Windows customization tool I use to configure the taskbar.
                </TooltipContent>
              </Tooltip>{" "}
              for Windows taskbar configuration.
            </p>
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
              <div className="space-y-2">
                <Image
                  src="/images/uses/keyboard.png"
                  alt="Zifriend ZA63 Pro keyboard"
                  width={180}
                  height={180}
                  className="aspect-square w-full object-contain"
                />
                <div>
                  <p className="font-medium text-foreground">Keyboard</p>
                  <p className="text-sm">Zifriend ZA63 Pro</p>
                  <p className="text-xs text-foreground/60">Mechanical / Wireless</p>
                </div>
              </div>
              <div className="space-y-2">
                <Image
                  src="/images/uses/mouse.png"
                  alt="Ajazz AJ179 Apex mouse"
                  width={180}
                  height={180}
                  className="aspect-square w-full object-contain"
                />
                <div>
                  <p className="font-medium text-foreground">Mouse</p>
                  <p className="text-sm">Ajazz AJ179 Apex</p>
                  <p className="text-xs text-foreground/60">Ajazz / Wireless</p>
                </div>
              </div>
              <div className="space-y-2">
                <Image
                  src="/images/uses/mic.png"
                  alt="Fantech Leviosa MCX01 microphone"
                  width={180}
                  height={180}
                  className="aspect-square w-full object-contain"
                />
                <div>
                  <p className="font-medium text-foreground">Microphone</p>
                  <p className="text-sm">Fantech Leviosa MCX01</p>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Development</h2>
            <p>
              <strong className="inline-flex items-center gap-1.5 align-middle">
                <Cursor aria-hidden="true" className="h-4 w-4 shrink-0" />
                <Link
                  href="https://cursor.sh/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-dotted text-neutral-500  underline-offset-4"
                >
                  Cursor
                </Link>
              </strong>{" "}
              is my main code editor. I use it primarily for agentic coding and larger development tasks where I want an AI agent working alongside me.
            </p>
            <p>
              I still keep{" "}
              <strong className="inline-flex items-center gap-1.5 align-middle">
                <VisualStudioCode aria-hidden="true" className="h-4 w-4 shrink-0" />
                <Link
                  href="https://code.visualstudio.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-dotted text-blue-500  underline-offset-4"
                >
                  Visual Studio Code
                </Link>
              </strong>{" "}
              around for non-AI coding, smaller edits, or when I simply want to code without an agent involved.
            </p>
            <p>
              <strong className="inline-flex items-center gap-1.5 align-middle">
                <GoogleAntigravity aria-hidden="true" className="h-4 w-4 shrink-0" />
                <Link
                  href="https://antigravity.google/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-cyan-400 dark:to-green-500 decoration-dotted underline underline-offset-4"
                >
                  Antigravity
                </Link>
              </strong>{" "}
              is mostly my playground. I use it when I want to experiment, try something different, or just have fun with a new coding environment.
            </p>
            <p>
              Across my editors, I generally use{" "}
              <strong className="inline-flex items-center gap-1.5 align-middle">
                <Image
                  src="https://github.gallerycdn.vsassets.io/extensions/github/github-vscode-theme/6.3.5/1727933603062/Microsoft.VisualStudio.Services.Icons.Default"
                  alt=""
                  width={16}
                  height={16}
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0"
                />
                <Link
                  href="https://marketplace.visualstudio.com/items?itemName=GitHub.github-vscode-theme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline decoration-dotted underline-offset-4"
                >
                  GitHub Dark
                </Link>
              </strong>{" "}
              theme and <strong><Link href="https://www.jetbrains.com/lp/mono/" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-dotted underline-offset-4">JetBrains Mono</Link></strong> as my programming font.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Terminal</h2>
            <p>
              My development environment lives primarily inside{" "}
              <strong className="inline-flex items-center gap-1.5 align-middle">
                <Ubuntu aria-hidden="true" className="h-4 w-4 shrink-0" />
                <Link
                  href="https://learn.microsoft.com/en-us/windows/wsl/install"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-dotted text-orange-500  underline-offset-4"
                >
                  WSL2 (Windows Subsystem for Linux) Ubuntu
                </Link>
              </strong>{" "}
              rather than directly in Windows.
            </p>
            <p>
              I use{" "}
              <Tooltip>
                <TooltipTrigger asChild>
                  <strong className="inline-flex cursor-help items-center gap-1.5 align-middle">
                    <Zsh aria-hidden="true" className="!h-8 !w-8 -mx-0.5 -mr-2 shrink-0 dark:invert" />
                    Zsh
                  </strong>
                </TooltipTrigger>
                <TooltipContent>
                  Zsh is a shell and command-line interpreter with programmable
                  completion, advanced globbing, and customizable prompts.
                </TooltipContent>
              </Tooltip>{" "}
              as my shell, with <strong><Link href="https://ohmyz.sh/" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-dotted underline-offset-4">Oh My Zsh</Link></strong> handling the shell configuration and theming.
            </p>
            <p>
              For installing command-line packages, I use{" "}
              <Tooltip>
                <TooltipTrigger asChild>
                  <strong className="inline-flex cursor-help items-center align-middle">
                    <Link
                      href="https://brew.sh/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground underline decoration-dotted underline-offset-4"
                    >
                      Homebrew
                    </Link>
                  </strong>
                </TooltipTrigger>
                <TooltipContent>
                  Homebrew is a package manager for installing command-line
                  tools and applications on macOS and Linux.
                </TooltipContent>
              </Tooltip>{" "}
              where it makes sense.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Web Development</h2>
            <p>
              Most of what I build is for the web.
            </p>
            <p>
              <strong className="inline-flex items-center gap-1.5 align-middle">
                <Nextjs aria-hidden="true" className="h-4 w-4 shrink-0 dark:invert" />
                Next.js
              </strong>{" "}
              is my primary framework, with{" "}
              <strong className="inline-flex items-center gap-1.5 align-middle">
                <ReactIcon aria-hidden="true" className="h-4 w-4 shrink-0" />
                React
              </strong>{" "}
              underneath it. For styling, I reach for{" "}
              <strong className="inline-flex items-center gap-1.5 align-middle">
                <TailwindCSS aria-hidden="true" className="h-4 w-4 shrink-0" />
                Tailwind CSS
              </strong>{" "}
              most of the time, although I still use regular{" "}
              <strong className="inline-flex items-center gap-1.5 align-middle">
                <CSS aria-hidden="true" className="h-4 w-4 shrink-0" />
                CSS
              </strong>{" "}
              when it makes more sense for a particular project.
            </p>
            <p>
              For content management, <strong className="inline-flex items-center gap-1.5 align-middle">
                <Sanity aria-hidden="true" className="h-4 w-4 shrink-0 invert dark:invert-0" />
                Sanity
              </strong>{" "}
              is my go-to CMS for projects where I want a dedicated, flexible content platform. I also use{" "}
              <strong className="inline-flex items-center gap-1.5 align-middle">
                <PayloadCMS aria-hidden="true" className="h-4 w-4 shrink-0 invert dark:invert-0" />
                Payload
              </strong>{" "}
              when I want the CMS to live closer to the application and have more control over the backend.
            </p>
            <p>
              My package manager has traditionally been{" "}
              <strong className="inline-flex items-center gap-1.5 align-middle">
                <Pnpm aria-hidden="true" className="h-4 w-4 shrink-0" />
                pnpm
              </strong>{" "}
              and{" "}
              <strong className="inline-flex items-center gap-1.5 align-middle">
                <NPM aria-hidden="true" className="h-4 w-4 shrink-0" />
                npm
              </strong>{", "}
              but I'm increasingly using{" "}
              <strong className="inline-flex items-center gap-1.5 align-middle">
                <Bun aria-hidden="true" className="h-4 w-4 shrink-0" />
                Bun
              </strong>{" "}
              for both the JavaScript runtime and package management.
            </p>
            <p>
              For version control and collaboration, it's mostly{" "}
              <strong className="inline-flex items-center gap-1.5 align-middle">
                <Git aria-hidden="true" className="h-4 w-4 shrink-0" />
                Git
              </strong>{" "}
              and{" "}
              <strong className="inline-flex items-center gap-1.5 align-middle">
                <GitHub aria-hidden="true" className="h-4 w-4 shrink-0" />
                GitHub
              </strong>{", with "}
              <strong className="inline-flex items-center gap-1.5 align-middle">
                <GitLab aria-hidden="true" className="h-4 w-4 shrink-0" />
                GitLab
              </strong>{" "}
              occasionally appearing in the workflow.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Hosting</h2>
            <p>
              <strong className="inline-flex items-center gap-1.5 align-middle">
                <Vercel aria-hidden="true" className="h-4 w-4 shrink-0 invert dark:invert-0" />
                Vercel
              </strong>{" "}
              is where I host most of my personal projects. It's usually the path of least resistance for the kind of Next.js projects I build.
            </p>
            <p>
              I also use{" "}
              <strong className="inline-flex items-center gap-1.5 align-middle">
                <Netlify aria-hidden="true" className="h-4 w-4 shrink-0" />
                Netlify
              </strong>{" "}
              from time to time. It was actually the first hosting platform I used, so I still occasionally come back to it for fun projects.
            </p>
            <p>
              For client projects, I often use a <strong>VPS</strong> when I need more control over the server and deployment environment.
            </p>
            <p>
              <strong>Hostinger</strong> comes up when a client's existing setup requires it, while <strong>SiteGround</strong> is what I use for WordPress hosting when that's the requirement.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Design</h2>
            <p>
              I use{" "}
              <strong className="inline-flex items-center gap-1.5 align-middle">
                <Figma aria-hidden="true" className="h-4 w-4 shrink-0" />
                Figma
              </strong>{" "}
              for UI/UX brainstorming, wireframes, and designing interfaces before turning them into code.
            </p>
            <p>
              I generally prefer interfaces that are simple, functional, and restrained rather than adding visual elements just because they can be added.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">APIs & Development Tools</h2>
            <p>
              <strong className="inline-flex items-center gap-1.5 align-middle">
                <Postman aria-hidden="true" className="h-4 w-4 shrink-0" />
                Postman
              </strong>{" "}
              is my usual tool for testing APIs and inspecting requests while developing backends.
            </p>
            <p>
              <strong className="inline-flex items-center gap-1.5 align-middle">
                <Prettier aria-hidden="true" className="h-4 w-4 shrink-0" />
                Prettier
              </strong>{" "}
              handles code formatting so I don't have to think about formatting every time I write or modify code.
            </p>
            <p>
              <strong className="inline-flex items-center gap-1.5 align-middle">
                <Resend aria-hidden="true" className="h-4 w-4 shrink-0 text-foreground" />
                Resend
              </strong>{" "}
              handles transactional email when a project needs it.
            </p>
            <p>
              For databases and backend services, I use whatever fits the project rather than forcing the same service everywhere.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Writing & Productivity</h2>
            <p>
              <strong>Notion</strong> is where I do most of my writing, planning, notes, and documentation.
            </p>
            <p>
              It's less of a strict productivity system and more of a place where I dump ideas, organize projects, and keep things I don't want to forget.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Browsing</h2>
            <p>
              <Tooltip>
                <TooltipTrigger asChild>
                  <strong className="inline-flex cursor-help items-center gap-1.5 align-middle">
                    <Helium aria-hidden="true" className="h-4 w-4 shrink-0" />
                    <Link href="https://helium.computer/" target="_blank" rel="noopener noreferrer" className="underline decoration-dotted text-[#3450D1]  underline-offset-4">
                      Helium
                    </Link>
                  </strong>
                </TooltipTrigger>
                <TooltipContent>
                  Helium is a Chromium-based browser built for a focused, privacy-conscious browsing experience.
                </TooltipContent>
              </Tooltip>{" "}
              is my primary browser.
            </p>
            <p>
              I keep{" "}
              <strong className="inline-flex items-center gap-1.5 align-middle">
                <Edge aria-hidden="true" className="h-4 w-4 shrink-0" />
                Microsoft Edge
              </strong>{" "}
              as a secondary browser.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Passwords & Accounts</h2>
            <p>
              I use <strong>1Password</strong> for storing and managing passwords, with <strong>Google Password Manager</strong> also handling some of my credentials.
            </p>
            <p>
              I try to keep credentials out of code and configuration files whenever possible.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Music</h2>
            <p>
              <strong className="inline-flex items-center gap-1.5 align-middle">
                <Spotify aria-hidden="true" className="h-4 w-4 shrink-0" />
                Spotify
              </strong>{" "}
              is what I use for music while working and coding.
            </p>
          </section>

          <LineBreaker />
          <footer className="pt-4 space-y-4">
            <p className="text-sm text-foreground/50">
              Last Updated: <span className="font-medium text-foreground/70">October 2, 2026</span>
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default UsesPage;

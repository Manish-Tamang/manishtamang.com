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
import { PowerToys } from "@/components/icons/PowerToy";
import { Prettier } from "@/components/icons/Prettier";
import { React as ReactIcon } from "@/components/icons/Reactjs";
import { Resend } from "@/components/icons/Resend";
import { Sanity } from "@/components/icons/Sanity";
import { Spotify } from "@/components/icons/Spotify";
import { TailwindCSS } from "@/components/icons/Tailwind";
import { Ubuntu } from "@/components/icons/Ubuntu";
import { Netlify } from "@/components/icons/Netlify";
import { Paper } from "@/components/icons/Paper";
import { Vercel } from "@/components/icons/Vercel";
import { VisualStudioCode } from "@/components/icons/Vsc";
import { Windows } from "@/components/icons/Windows";
import { Zsh } from "@/components/icons/Zsh";
import { Icon1Password } from "@/components/icons/1password";
import { BlurImage } from "@/components/shared";
import { LineBreaker } from "@/components/shared/line-breaker";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import Link from "next/link";

const terminalBlurDataURL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 10'%3E%3Crect width='100%25' height='100%25' fill='%23272b33'/%3E%3C/svg%3E";

const UsesPage = () => {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <main className="w-full max-w-[680px] px-4 py-6 sm:px-6 sm:py-12">
        <header className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-medium tracking-tight">
            Uses
          </h1>
          <p className="text-sm text-foreground/70 sm:text-base">
            A list of tools, software, and hardware I use for development, design,
            and productivity.
          </p>
        </header>

        <div className="mt-10 space-y-10 text-sm leading-relaxed text-foreground/80 md:text-base [&_section>p]:ml-5 [&_section>p]:list-item [&_section]:!space-y-2">
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
              with Intel Core Ultra 5 226V, 16 GB RAM, and 1 TB SSD.
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
            <p>
              I also use{" "}
              <Tooltip>
                <TooltipTrigger asChild>
                  <strong className="inline-flex cursor-help items-center gap-1.5 align-middle">
                    <PowerToys aria-hidden="true" className="h-4 w-4 shrink-0" />
                    <Link
                      href="https://learn.microsoft.com/en-us/windows/powertoys/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground underline decoration-dotted underline-offset-4"
                    >
                      Microsoft PowerToys
                    </Link>
                  </strong>
                </TooltipTrigger>
                <TooltipContent>
                  PowerToys is a collection of Windows utilities for customizing and improving the desktop workflow.
                </TooltipContent>
              </Tooltip>{" "}
              for additional Windows utilities and customization.
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
              is my main editor for agentic coding.
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
              for smaller edits and non-AI coding.
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
              for experimenting with new coding environments.
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
              theme and <strong><Link href="https://www.jetbrains.com/lp/mono/" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-dotted underline-offset-4">JetBrains Mono</Link></strong> font.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Terminal</h2>
            <p>
              Environment: {" "}
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
              .
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
              with <strong><Link href="https://ohmyz.sh/" target="_blank" rel="noopener noreferrer" className="text-foreground underline decoration-dotted underline-offset-4">Oh My Zsh</Link></strong>.
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
              .
            </p>
            <p>
              Prompt: {" "}
              <Tooltip>
                <TooltipTrigger asChild>
                  <strong className="inline-flex cursor-help items-center align-middle">
                    <Link
                      href="https://github.com/sindresorhus/pure"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground underline decoration-dotted underline-offset-4"
                    >
                      Pure
                    </Link>
                  </strong>
                </TooltipTrigger>
                <TooltipContent>
                  Pure is a minimal and fast ZSH prompt.
                </TooltipContent>
              </Tooltip>
            </p>
            <BlurImage
              src="/images/terminal.png"
              alt="Ubuntu terminal running in Windows Terminal"
              width={1917}
              height={1198}
              sizes="(max-width: 680px) 100vw, 680px"
              quality={70}
              lazy
              blurDataURL={terminalBlurDataURL}
              className="h-auto w-full rounded-md object-cover"
            />
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Web Development</h2>
            <p>
              <strong className="inline-flex items-center gap-1.5 align-middle">
                <Nextjs aria-hidden="true" className="h-4 w-4 shrink-0 dark:invert" />
                Next.js
              </strong>{" "}
              Framework: {" "}
              <strong className="inline-flex items-center gap-1.5 align-middle">
                <ReactIcon aria-hidden="true" className="h-4 w-4 shrink-0" />
                React
              </strong>{" "}
              and {" "}
              <strong className="inline-flex items-center gap-1.5 align-middle">
                <TailwindCSS aria-hidden="true" className="h-4 w-4 shrink-0" />
                Tailwind CSS
              </strong>{" "}
              and {" "}
              <strong className="inline-flex items-center gap-1.5 align-middle">
                <CSS aria-hidden="true" className="h-4 w-4 shrink-0" />
                CSS
              </strong>{" "}
              .
            </p>
            <p>
              For content management, <strong className="inline-flex items-center gap-1.5 align-middle">
                <Sanity aria-hidden="true" className="h-4 w-4 shrink-0 invert dark:invert-0" />
                Sanity
              </strong>{" "}
              and {" "}
              <strong className="inline-flex items-center gap-1.5 align-middle">
                <PayloadCMS aria-hidden="true" className="h-4 w-4 shrink-0 invert dark:invert-0" />
                Payload
              </strong>{" "}
              .
            </p>
            <p>
              Package managers: {" "}
              <strong className="inline-flex items-center gap-1.5 align-middle">
                <Pnpm aria-hidden="true" className="h-4 w-4 shrink-0" />
                pnpm
              </strong>{" "}
              and{" "}
              <strong className="inline-flex items-center gap-1.5 align-middle">
                <NPM aria-hidden="true" className="h-4 w-4 shrink-0" />
                npm
              </strong>{", "}
              and {" "}
              <strong className="inline-flex items-center gap-1.5 align-middle">
                <Bun aria-hidden="true" className="h-4 w-4 shrink-0" />
                Bun
              </strong>{" "}
              .
            </p>
            <p>
              Version control: {" "}
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
              .
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Hosting</h2>
            <p>
              <strong className="inline-flex items-center gap-1.5 align-middle">
                <Vercel aria-hidden="true" className="h-4 w-4 shrink-0 invert dark:invert-0" />
                Vercel
              </strong>{" "}
              for personal projects.
            </p>
            <p>
              I also use{" "}
              <strong className="inline-flex items-center gap-1.5 align-middle">
                <Netlify aria-hidden="true" className="h-4 w-4 shrink-0" />
                Netlify
              </strong>{" "}
              occasionally for fun projects.
            </p>
            <p>
              Client hosting: <strong>VPS</strong>.
            </p>
            <p>
              WordPress hosting: <strong>Hostinger</strong> and <strong>SiteGround</strong>.
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
              for UI/UX and wireframes.
            </p>
            <p>
              <strong className="inline-flex items-center gap-1.5 align-middle">
                <Paper aria-hidden="true" className="h-4 w-4 shrink-0" />
                Paper
              </strong>
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">APIs & Development Tools</h2>
            <p>
              <strong className="inline-flex items-center gap-1.5 align-middle">
                <Postman aria-hidden="true" className="h-4 w-4 shrink-0" />
                Postman
              </strong>{" "}
              for API testing.
            </p>
            <p>
              <strong className="inline-flex items-center gap-1.5 align-middle">
                <Prettier aria-hidden="true" className="h-4 w-4 shrink-0" />
                Prettier
              </strong>{" "}
              for code formatting.
            </p>
            <p>
              <strong className="inline-flex items-center gap-1.5 align-middle">
                <Resend aria-hidden="true" className="h-4 w-4 shrink-0 text-foreground" />
                Resend
              </strong>{" "}
              for transactional email.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Writing & Productivity</h2>
            <p>
              <strong>Notion</strong> for writing, planning, notes, and documentation.
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
              as my primary browser.
            </p>
            <p>
              I keep{" "}
              <strong className="inline-flex items-center gap-1.5 align-middle">
                <Edge aria-hidden="true" className="h-4 w-4 shrink-0" />
                Microsoft Edge
              </strong>{" "}
              as my secondary browser.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Passwords & Accounts</h2>
            <p>
              <strong className="inline-flex items-center gap-1.5 align-middle">
                <Icon1Password aria-hidden="true" className="h-4 w-4 shrink-0" />
                1Password
              </strong>
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
            <aside className="border-l-2 border-foreground/15 pl-4 text-sm leading-relaxed text-foreground/70 md:text-base">
              Curious what other people use? Explore{" "}
              <Link
                href="https://uses.tech/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline decoration-dotted underline-offset-4"
              >
                uses.tech
              </Link>{" "}
              to see the tools and setups shared by people around the web.
            </aside>
            <p className="text-sm text-foreground/50">
              Last Updated: <span className="font-medium text-foreground/70">October 6, 2026</span>
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default UsesPage;

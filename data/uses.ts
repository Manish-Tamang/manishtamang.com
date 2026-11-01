/*
 * /uses content. Each tool's icon is a favicon stored at
 * assets/uses/icons/<slug>.png — run `node scripts/fetch-uses-icons.ts`
 * after adding a tool (it fetches from `iconDomain`, or the url's host).
 */

export type Tag = "Primary" | "Secondary" | "Formerly" | "Made by me";

export interface Tool {
  name: string;
  note: string;
  url?: string;
  tag?: Tag;
  /** Domain to take the favicon from, when it differs from the url's host. */
  iconDomain?: string;
}

export interface Section {
  id: string;
  title: string;
  tools: Tool[];
}

export const laptop = {
  name: "Acer Aspire 14 AI (2025)",
  url: "https://mudita.com.np/acer-aspire-14-ai-u7-256v-price-nepal.html",
  specs: ["Intel Core Ultra 5 226V", "16 GB RAM", "1 TB SSD", "Windows 11"],
};

export const gear = [
  {
    name: "Keyboard",
    model: "Zifriend ZA63 Pro",
    detail: "Mechanical · Wireless",
    image: "keyboard",
  },
  {
    name: "Mouse",
    model: "Ajazz AJ179 Apex",
    detail: "Wireless",
    image: "mouse",
  },
  {
    name: "Microphone",
    model: "Fantech Leviosa MCX01",
    detail: "USB",
    image: "mic",
  },
] as const;

export const sections: Section[] = [
  {
    id: "desktop",
    title: "Desktop",
    tools: [
      {
        name: "Windhawk",
        note: "Taskbar configuration",
        url: "https://windhawk.net/",
      },
      {
        name: "Seelen UI",
        note: "Taskbar, tiling and widgets",
        url: "https://seelen.io/",
      },
      {
        name: "TranslucentTB",
        note: "Transparent taskbar",
        url: "https://translucenttb.net/",
      },
      {
        name: "PowerToys",
        note: "Extra Windows utilities",
        url: "https://learn.microsoft.com/en-us/windows/powertoys/",
      },
      {
        name: "Nusa",
        note: "Notch for music, timers and to-dos",
        url: "https://rama2555.github.io/nusa/",
      },
    ],
  },
  {
    id: "editors",
    title: "Editors",
    tools: [
      { name: "Cursor", note: "Agentic coding", url: "https://cursor.com/" },
      {
        name: "Claude Code",
        note: "Agentic coding in the terminal",
        url: "https://claude.com/product/claude-code",
      },
      {
        name: "VS Code",
        note: "Main code editor",
        url: "https://code.visualstudio.com/",
        tag: "Primary",
      },
      {
        name: "Antigravity",
        note: "Trying new coding environments",
        url: "https://antigravity.google/",
      },
      {
        name: "GitHub Dark",
        note: "Editor theme",
        url: "https://marketplace.visualstudio.com/items?itemName=GitHub.github-vscode-theme",
      },
      {
        name: "JetBrains Mono",
        note: "Editor font",
        url: "https://www.jetbrains.com/lp/mono/",
      },
    ],
  },
  {
    id: "terminal",
    title: "Terminal",
    tools: [
      {
        name: "WSL2 Ubuntu",
        note: "Linux environment on Windows",
        url: "https://learn.microsoft.com/en-us/windows/wsl/install",
        iconDomain: "ubuntu.com",
      },
      {
        name: "Oh My Zsh",
        note: "Zsh shell and plugins",
        url: "https://ohmyz.sh/",
      },
      {
        name: "Pure",
        note: "Minimal prompt",
        url: "https://github.com/sindresorhus/pure",
      },
      {
        name: "Homebrew",
        note: "Command-line packages",
        url: "https://brew.sh/",
      },
      {
        name: "zoxide",
        note: "Smarter cd",
        url: "https://github.com/ajeetdsouza/zoxide",
      },
      {
        name: "fzf",
        note: "Fuzzy finder for files, history and paths",
        url: "https://github.com/junegunn/fzf",
      },
    ],
  },
  {
    id: "web",
    title: "Web development",
    tools: [
      { name: "Next.js", note: "Framework", url: "https://nextjs.org/" },
      { name: "React", note: "UI library", url: "https://react.dev/" },
      {
        name: "Tailwind CSS",
        note: "Styling",
        url: "https://tailwindcss.com/",
      },
      {
        name: "Sanity",
        note: "Content management",
        url: "https://www.sanity.io/",
      },
      {
        name: "Payload",
        note: "Content management",
        url: "https://payloadcms.com/",
      },
      {
        name: "pnpm",
        note: "Package manager",
        url: "https://pnpm.io/",
        tag: "Primary",
      },
      { name: "npm", note: "Package manager", url: "https://www.npmjs.com/" },
      {
        name: "Bun",
        note: "Runtime and package manager",
        url: "https://bun.sh/",
      },
      { name: "Git", note: "Version control", url: "https://git-scm.com/" },
      {
        name: "GitHub",
        note: "Code hosting",
        url: "https://github.com/Manish-Tamang",
      },
      { name: "GitLab", note: "Code hosting", url: "https://gitlab.com/" },
    ],
  },
  {
    id: "hosting",
    title: "Hosting",
    tools: [
      {
        name: "Vercel",
        note: "Personal projects",
        url: "https://vercel.com/",
        tag: "Primary",
      },
      {
        name: "Netlify",
        note: "Fun projects, occasionally",
        url: "https://www.netlify.com/",
      },
      { name: "VPS", note: "Client hosting" },
      {
        name: "Hostinger",
        note: "WordPress hosting",
        url: "https://www.hostinger.com/",
      },
      {
        name: "SiteGround",
        note: "WordPress hosting",
        url: "https://www.siteground.com/",
      },
    ],
  },
  {
    id: "design-tools",
    title: "Design & tools",
    tools: [
      {
        name: "Figma",
        note: "UI/UX and wireframes",
        url: "https://www.figma.com/",
      },
      { name: "Paper", note: "Design", url: "https://paper.design/" },
      { name: "Postman", note: "API testing", url: "https://www.postman.com/" },
      {
        name: "Prettier",
        note: "Code formatting",
        url: "https://prettier.io/",
      },
      {
        name: "Resend",
        note: "Transactional email",
        url: "https://resend.com/",
      },
    ],
  },
  {
    id: "everyday",
    title: "Everyday",
    tools: [
      {
        name: "Helium",
        note: "Browser",
        url: "https://helium.computer/",
        tag: "Primary",
      },
      {
        name: "Minimal YouTube",
        note: "Strips YouTube down to just the videos",
        url: "https://github.com/Manish-Tamang/minimal-youtube",
        iconDomain: "youtube.com",
        tag: "Made by me",
      },
      {
        name: "Microsoft Edge",
        note: "Browser",
        url: "https://www.microsoft.com/edge",
        iconDomain: "microsoft.com/edge",
        tag: "Secondary",
      },
      {
        name: "Notion",
        note: "Writing, planning, notes and docs",
        url: "https://www.notion.so/",
      },
      {
        name: "1Password",
        note: "Passwords and accounts",
        url: "https://1password.com/",
      },
      {
        name: "Spotify",
        note: "Music while working",
        url: "https://open.spotify.com/",
      },
      {
        name: "LocalSend",
        note: "Cross-platform file sending and receiving",
        url: "https://localsend.org",
      },
    ],
  },
];

export const slugify = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

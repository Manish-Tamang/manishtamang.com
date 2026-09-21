import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiVercel,
  SiPrettier,
  SiGit,
  SiGithub,
  SiNpm,
  SiPnpm,
  SiBun,
  SiNotion,
  SiPostman,
  SiYarn,
  SiSpotify,
  SiGoogledrive,
  SiOpenvpn,
  SiGooglechrome,
  SiTelegram,
  SiTrello,
  SiDiscord,
  SiNetlify,
  SiVlcmediaplayer,
  SiClickup,
} from "react-icons/si";
import { BiLogoVisualStudio } from "react-icons/bi";
import { VscCopilot } from "react-icons/vsc";
import { FaWindows, FaEdge } from "react-icons/fa";
import { FiFigma } from "react-icons/fi";
import Cursor from "@/components/icons/Cursor";
import ClaudeAI from "@/components/icons/Claude";
import OpenAI from "@/components/icons/Chatgpt";
import v0 from "@/components/icons/v0";
import Gemini from "@/components/icons/Gemini";
import Canva from "@/components/icons/Canva";
import { GoogleAntigravity } from "@/components/icons/Antigravity";
import AfterEffects from "@/components/icons/AfterEffects";
import Photoshop from "@/components/icons/Photoshop";

export const gearItems = [
  {
    name: "Laptop",
    description: "Acer Aspire 14 AI 2025",
    image: "/images/uses/acer-aspire-14.png",
    tags: ["Acer", "Laptop", "Windows"],
  },
  {
    name: "Keyboard",
    description: "Zifriend ZA63 Pro",
    image: "/images/uses/keyboard.png",
    tags: ["Mechanical", "Wireless"],
  },
  {
    name: "Mouse",
    description: "Ajazz AJ179 Apex",
    image: "/images/uses/mouse.png",
    tags: ["Ajazz", "Wireless"],
  },
  {
    name: "Microphone",
    description: "Fantech Leviosa MCX01",
    image: "/images/uses/mic.png",
    tags: ["Fantech", "Mic"],
  },
  {
    name: "Charger",
    description: "UGREEN RG 30W USB C",
    image: "/images/uses/charger.png",
    tags: ["Ugreen", "30w"],
  },
  {
    name: "Phone",
    description: "Vivo T2x 5g",
    image: "/images/uses/vivo.png",
    tags: ["Phone", "Android"],
  },
  {
    name: "Airbuds",
    description: "Realme Buds Air 2 Neo",
    image: "/images/uses/airbuds.png",
    tags: ["Realme", "Airbuds"],
  },
];

export const systemItems = [
  {
    name: "Google Chrome",
    description: "Alternative Browser",
    icon: SiGooglechrome,
    link: "https://www.google.com/chrome/",
  },
  {
    name: "Visual Studio Code",
    description: "Code Editor",
    icon: BiLogoVisualStudio,
    link: "https://code.visualstudio.com/",
  },
  {
    name: "Cursor",
    description: "AI-powered Code Editor",
    icon: Cursor,
    link: "https://cursor.sh/",
  },
  {
    name: "Google Antigravity",
    description: "AI-powered Code Editor",
    icon: GoogleAntigravity,
    link: "https://antigravity.google/",
  },
  {
    name: "Windows 11",
    description: "Operating System",
    icon: FaWindows,
    link: "https://www.microsoft.com/en-us/windows/windows-11",
  },
  {
    name: "Microsoft Edge",
    description: "Primary Browser",
    icon: FaEdge,
    link: "https://www.microsoft.com/en-us/edge",
  },
];

export const codingItems = [
  {
    name: "React.js",
    description: "Primary Front-end library",
    icon: SiReact,
    link: "https://reactjs.org/",
  },
  {
    name: "Next.js",
    description: "Primary Web Development Framework",
    icon: SiNextdotjs,
    link: "https://nextjs.org/",
  },
  {
    name: "TailwindCSS",
    description: "For styling the front-end",
    icon: SiTailwindcss,
    link: "https://tailwindcss.com/",
  },
  {
    name: "Vercel",
    description: "Hosting for Projects",
    icon: SiVercel,
    link: "http://vercel.com/",
  },
  {
    name: "Netlify",
    description: "Free Hosting for Projects",
    icon: SiNetlify,
    link: "https://netlify.com/",
  },
  {
    name: "Prettier",
    description: "For Code Formatting",
    icon: SiPrettier,
    link: "https://prettier.io/",
  },
  {
    name: "Git",
    description: "Version Control",
    icon: SiGit,
    link: "https://git-scm.com/downloads",
  },
  {
    name: "Github Desktop",
    description: "To Manage the Github Project and Changes",
    icon: SiGithub,
    link: "https://desktop.github.com/",
  },
  {
    name: "yarn",
    description: "Primary Package Manager",
    icon: SiYarn,
    link: "https://classic.yarnpkg.com/lang/en/docs/install/",
  },
  {
    name: "npm",
    description: "Alternative Package Manager",
    icon: SiNpm,
    link: "https://www.npmjs.com/get-npm",
  },
  {
    name: "pnpm",
    description: "Fast, disk space efficient package manager",
    icon: SiPnpm,
    link: "https://pnpm.io/",
  },
  {
    name: "bun",
    description: "JavaScript runtime",
    icon: SiBun,
    link: "https://bun.sh/",
  },
  {
    name: "Notion",
    description: "For Note-taking and Organization",
    icon: SiNotion,
    link: "https://www.notion.so/",
  },
  {
    name: "Postman",
    description: "For Testing APIs",
    icon: SiPostman,
    link: "https://www.postman.com/downloads/",
  },
  {
    name: "GitHub Copilot",
    description: "AI-powered code completion tool",
    icon: VscCopilot,
    link: "https://copilot.github.com/",
  },
  {
    name: "Claude AI",
    description: "AI chatbot",
    icon: ClaudeAI,
    link: "https://claude.ai/",
  },
  {
    name: "OpenAI ChatGPT",
    description: "AI chatbot for coding",
    icon: OpenAI,
    link: "https://chatgpt.com/",
  },
  {
    name: "v0",
    description: "AI Tool for Front-end Development",
    icon: v0,
    link: "https://v0.dev/",
  },
  {
    name: "Google AI Studio",
    description: "AI Chatbot from Google",
    icon: Gemini,
    link: "https://aistudio.google.com/",
  },
];

export const softwareItems = [
  {
    name: "Spotify",
    description: "To Listen to Music",
    icon: SiSpotify,
    link: "https://www.spotify.com/us/download/windows/",
  },
  {
    name: "Photoshop",
    description: "Raster Graphics Editor",
    icon: Photoshop,
    link: "https://www.adobe.com/in/products/photoshop.html",
  },
  {
    name: "Figma",
    description: "UI/UX Design Tool",
    icon: FiFigma,
    link: "https://www.figma.com/",
  },
  {
    name: "After Effects",
    description: "Motion Graphics and Visual Effects",
    icon: AfterEffects,
    link: "https://www.adobe.com/products/aftereffects.html",
  },
  {
    name: "Canva",
    description: "Graphic Design Tool",
    icon: Canva,
    link: "https://www.canva.com/download",
  },
  {
    name: "Google Drive",
    description: "Store Important Files",
    icon: SiGoogledrive,
    link: "https://drive.google.com",
  },
  {
    name: "OpenVPN",
    description: "For Secure Private Connection",
    icon: SiOpenvpn,
    link: "https://openvpn.net/community-downloads/",
  },
  {
    name: "Telegram",
    description: "For Communication",
    icon: SiTelegram,
    link: "https://telegram.org/",
  },
  {
    name: "Trello",
    description: "Project Management Tool",
    icon: SiTrello,
    link: "https://trello.com/",
  },
  {
    name: "ClickUp",
    description: "Project Management Tool",
    icon: SiClickup,
    link: "https://clickup.com/",
  },
  {
    name: "Discord",
    description: "For Team Communication and Community",
    icon: SiDiscord,
    link: "https://discord.com/",
  },
  {
    name: "VLC Media Player",
    description: "For Playing Media Files",
    icon: SiVlcmediaplayer,
    link: "https://www.videolan.org/vlc/",
  },
];

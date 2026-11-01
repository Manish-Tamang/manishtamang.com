/* /bookmarks: tools, resources and places on the web I keep coming back to. */

type Bookmark = { title: string; url: string; description: string };

export const bookmarks: { category: string; items: Bookmark[] }[] = [
  {
    category: "Design",
    items: [
      {
        title: "SVGL",
        url: "https://svgl.app",
        description: "SVG logos for brands, browsers, AI and more.",
      },
      {
        title: "Uiverse",
        url: "https://uiverse.io",
        description: "Free community-made UI elements in CSS or Tailwind.",
      },
      {
        title: "Uncoverlab",
        url: "https://uncoverlab.co",
        description:
          "Ready-made components, app flows, wireframes and palettes.",
      },
      {
        title: "Gradienty",
        url: "https://gradienty.codes",
        description: "Create and export CSS gradients.",
      },
      {
        title: "Best Free Fonts",
        url: "https://bestfreefonts.com",
        description: "A curated selection of free typefaces.",
      },
    ],
  },
  {
    category: "Visuals",
    items: [
      {
        title: "Excalidraw",
        url: "https://excalidraw.com",
        description: "Collaborative whiteboard with a hand-drawn feel.",
      },
      {
        title: "Screenzy",
        url: "https://screenzy.io",
        description: "Create and share good-looking screenshots of web apps.",
      },
      {
        title: "Screenshot Beautifier",
        url: "https://vinish.dev/screenshot-beautifier",
        description:
          "Add browser frames, gradients and shadows to screenshots.",
      },
    ],
  },
  {
    category: "Development",
    items: [
      {
        title: "QuickRef",
        url: "https://quickref.me",
        description: "Instant cheatsheets for languages, tools and frameworks.",
      },
      {
        title: "Readme.so",
        url: "https://readme.so",
        description: "Build professional README files quickly.",
      },
      {
        title: "WakaTime",
        url: "https://wakatime.com",
        description: "Tracks coding time across projects and languages.",
      },
      {
        title: "Surge",
        url: "https://surge.sh",
        description: "Deploy static front-end projects from the command line.",
      },
      {
        title: "Giscus",
        url: "https://giscus.app",
        description: "A comment system powered by GitHub Discussions.",
      },
      {
        title: "Crotus",
        url: "https://crotus.io",
        description: "Collect reviews and embed them on your own site.",
      },
    ],
  },
  {
    category: "AI",
    items: [
      {
        title: "RepoMix",
        url: "https://repomix.com",
        description:
          "Packs a GitHub repository into a single file for AI tools.",
      },
      {
        title: "Uithub",
        url: "https://uithub.com",
        description:
          "Change one letter of a GitHub URL to get repo context for an LLM.",
      },
    ],
  },
  {
    category: "Discover",
    items: [
      {
        title: "daily.dev",
        url: "https://app.daily.dev",
        description: "A personalised news feed for developers.",
      },
      {
        title: "Toolfolio",
        url: "https://toolfolio.io",
        description:
          "A curated collection of tools for developers and designers.",
      },
    ],
  },
];

/*
 * /llms.txt (https://llmstxt.org): a plain-text map of the site for language
 * models. Built from the same data as the pages (sidebar groups, slash page
 * descriptions, /about facts, posts and projects), so it stays current without
 * editing this file.
 */
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { navGroups, site } from "@/lib/site";
import { staticPages } from "@/lib/routes";
import { formatDate, getPosts, isoDate } from "@/lib/blog";
import { changelog, otherSlashPages, slashPages } from "@/data/slash-pages";
import { education, work } from "@/data/about";

// Pages without a slash page description of their own
const extraDescriptions: Record<string, string> = {
  "/": "Home: a short intro, featured projects, the latest posts and a photo.",
  "/projects": "Web apps, client sites, experiments and creative builds.",
  "/blog": "Articles and notes on web development, design and life.",
  "/photos": "A photo gallery from my camera roll.",
  "/digitalpathshala": "My MERN stack internship at Digital Pathshala, Itahari.",
};

const descriptions: Record<string, string> = {
  ...Object.fromEntries([...slashPages, ...otherSlashPages].map(({ href, description }) => [href, description])),
  ...extraDescriptions,
};

// The groups are an `as const` union of tuples; widen them once for flatMap/map (as MobileNav does)
type NavLink = { href: string; label: string };
const groups = navGroups.map(({ label, links }) => ({ label, links: links as readonly NavLink[] }));

const url = (path: string) => `${site.url}${path === "/" ? "" : path}`;
const link = (label: string, path: string) =>
  `- [${label}](${url(path)})${descriptions[path] ? `: ${descriptions[path]}` : ""}`;

export const GET: APIRoute = async () => {
  const posts = await getPosts();
  const projects = (await getCollection("projects")).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  // Pages in the sidebar, by group; anything else in the URL list goes under "More"
  const inNav = new Set(groups.flatMap(({ links }) => links.map(({ href }) => href)));
  const more = staticPages.filter(({ path }) => !inNav.has(path));
  const label = (path: string) =>
    path === "/digitalpathshala" ? "Digital Pathshala" : path.slice(1).replace(/^\w/, (c) => c.toUpperCase());

  // Most recent first in data/about.ts
  const latest = education[0];

  return new Response(
    [
      `# ${site.name}`,
      "",
      `> ${site.description}`,
      "",
      `This is my personal website (${site.handle} online): a blog, projects, photos and IndieWeb-style slash pages. Last updated ${formatDate(new Date(changelog[0].date))}.`,
      "",
      `- Education: ${latest.degree} at ${latest.institution} (${latest.dates})`,
      ...work.map(({ role, company, location, dates }) => `- Work: ${role} at ${company}, ${location} (${dates})`),
      `- GitHub: ${site.social.github}`,
      "- Email: hi@manishtamang.com",
      "",
      ...groups.flatMap(({ label: group, links }) => [
        `## ${group ?? "Main pages"}`,
        "",
        ...links.map(({ href, label: text }) => link(text, href)),
        "",
      ]),
      ...(more.length ? ["## More pages", "", ...more.map(({ path }) => link(label(path), path)), ""] : []),
      "## Projects",
      "",
      ...projects.map(
        ({ id, data }) =>
          `- [${data.title}](${site.url}/projects/${id}): ${data.description}${data.tech.length ? ` (${data.tech.join(", ")})` : ""}`,
      ),
      "",
      "## Blog posts",
      "",
      ...posts.map(
        ({ id, data }) => `- [${data.title}](${site.url}/blog/${id}) (${isoDate(data.date)}): ${data.description}`,
      ),
      "",
      "## Optional",
      "",
      `- [RSS feed](${site.url}/feed.xml): new blog posts`,
      `- [Sitemap](${site.url}/sitemap.xml): every page on the site`,
      "",
    ].join("\n"),
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
};

import type { APIRoute } from "astro";
import { site } from "@/lib/site";
import { staticPages } from "@/lib/routes";
import { getPosts } from "@/lib/blog";

export const GET: APIRoute = async () => {
  const posts = await getPosts();

  return new Response(
    [
      `# ${site.name}`,
      "",
      `> ${site.description}`,
      "",
      "## Pages",
      "",
      ...staticPages.map(
        ({ path }) => `- ${site.url}${path === "/" ? "" : path}`,
      ),
      "",
      "## Blog posts",
      "",
      ...posts.map(
        ({ id, data }) =>
          `- [${data.title}](${site.url}/blog/${id}): ${data.description}`,
      ),
      "",
    ].join("\n"),
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
};

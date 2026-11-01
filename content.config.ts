import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import { z } from "astro/zod"

// Blog posts live in content/blog/<slug>/index.mdx, next to their images
const blog = defineCollection({
  loader: glob({
    pattern: "*/index.mdx",
    base: "./content/blog",
    generateId: ({ entry }) => entry.split("/")[0],
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      /** Shorter text for search results; on-page text keeps using `description`. */
      metaDescription: z.string().optional(),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      /** Written with AI help; shows an AI tag so readers know up front. */
      ai: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
})

// Projects live in content/projects/<slug>/index.md, next to their images
const projects = defineCollection({
  loader: glob({
    pattern: "*/index.md",
    base: "./content/projects",
    generateId: ({ entry }) => entry.split("/")[0],
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      tagline: z.string().optional(),
      description: z.string(),
      metaDescription: z.string().optional(),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      projectUrl: z.string().optional(),
      githubUrl: z.string().optional(),
      tech: z.array(z.string()).default([]),
      cover: image(),
      coverAlt: z.string().optional(),
    }),
})

export const collections = { blog, projects }

/*
 * Blog post reactions in Supabase (public.blog_reactions and blog_reaction_votes,
 * see migration/blog-reactions.sql). data/blog/reactions.json is the Firestore
 * snapshot they started from; pages render it at build time and swap in the live
 * counts from /api/blog-reactions.
 */
import snapshot from "@/data/blog/reactions.json"
import { supabase } from "@/lib/services/supabase"

export const reactions = ["thumbs_up", "heart", "trophy", "bookmark"] as const
export type Reaction = (typeof reactions)[number]
export type ReactionCounts = Record<Reaction, number>

export const isReaction = (value: unknown): value is Reaction => reactions.includes(value as Reaction)

const empty = (): ReactionCounts => ({ thumbs_up: 0, heart: 0, trophy: 0, bookmark: 0 })

const counts = (row?: Partial<Record<Reaction, number | string>> | null): ReactionCounts =>
  Object.fromEntries(reactions.map((reaction) => [reaction, Number(row?.[reaction] ?? 0)])) as ReactionCounts

/** Build-time counts, from the Firestore snapshot. */
export const snapshotCounts = (slug: string) =>
  counts((snapshot as Record<string, Partial<ReactionCounts>>)[slug] ?? empty())

export const total = (values: ReactionCounts) => reactions.reduce((sum, reaction) => sum + values[reaction], 0)

/** Live counts for a post, and the visitor's own pick if they have one. */
export async function getReactions(slug: string, visitor?: string) {
  const [rows, votes]: [ReactionCounts[], { reaction: Reaction }[]] = await Promise.all([
    supabase(`blog_reactions?slug=eq.${encodeURIComponent(slug)}&select=${reactions.join(",")}`),
    visitor
      ? supabase(
          `blog_reaction_votes?slug=eq.${encodeURIComponent(slug)}&visitor=eq.${encodeURIComponent(visitor)}&select=reaction`,
        )
      : Promise.resolve([]),
  ])
  // A post nobody has reacted to since the move still has its imported counts in the snapshot
  return { counts: rows[0] ? counts(rows[0]) : snapshotCounts(slug), mine: votes[0]?.reaction ?? null }
}

/** Live totals for every post that has a row, by slug (for /dashboard). */
export async function getAllReactions() {
  const rows: ({ slug: string } & ReactionCounts)[] = await supabase(`blog_reactions?select=slug,${reactions.join(",")}`)
  return Object.fromEntries(rows.map((row) => [row.slug, total(counts(row))]))
}

/**
 * Sets the visitor's reaction (null removes it), enforcing the limits in
 * set_blog_reaction. Throws ReactionLimitError when the visitor or their IP is over them.
 */
export async function setReaction(slug: string, visitor: string, ipHash: string, reaction: Reaction | null) {
  try {
    const row = await supabase("rpc/set_blog_reaction", {
      method: "POST",
      body: JSON.stringify({ post_slug: slug, visitor_id: visitor, visitor_ip_hash: ipHash, new_reaction: reaction }),
    })
    return { counts: counts(row), mine: (row?.mine ?? null) as Reaction | null }
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("Supabase 429")) throw new ReactionLimitError()
    throw error
  }
}

export class ReactionLimitError extends Error {
  constructor() {
    super("Too many reactions")
  }
}

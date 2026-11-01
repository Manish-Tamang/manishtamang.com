/* Live blog view counts in Supabase (public.blog_views, see migration/blog-views.sql). */
import { supabase } from "@/lib/services/supabase"

export async function getViews(slug: string) {
  const rows: { count: number }[] = await supabase(`blog_views?slug=eq.${encodeURIComponent(slug)}&select=count`)
  return Number(rows[0]?.count ?? 0)
}

export async function incrementViews(slug: string) {
  return Number(
    await supabase("rpc/increment_blog_view", { method: "POST", body: JSON.stringify({ post_slug: slug }) }),
  )
}

export async function getAllViews() {
  const rows: { slug: string; count: number }[] = await supabase("blog_views?select=slug,count")
  return Object.fromEntries(rows.map(({ slug, count }) => [slug, Number(count)]))
}

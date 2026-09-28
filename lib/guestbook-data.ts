import { supabaseAdmin } from "@/lib/supabaseAdmin"
import {
  toPublicGuestbookEntry,
  type GuestbookEntry,
  type RawGuestbookEntry,
} from "@/lib/guestbook"

const TABLE = "guestbook_entries"

export async function getPublicGuestbookEntries(
  viewerEmail?: string | null,
): Promise<GuestbookEntry[]> {
  const { data, error } = await supabaseAdmin
    .from(TABLE)
    .select(
      `
                id, 
                name, 
                email, 
                image_url, 
                message, 
                timestamp,
                parent_id,
                likes,
                reactions,
                attachment_url
            `,
    )
    .order("timestamp", { ascending: false })

  if (error) throw error

  const entries = (data || []) as RawGuestbookEntry[]
  const mainEntries = entries.filter((entry) => !entry.parent_id)
  const replies = entries.filter((entry) => entry.parent_id)

  return mainEntries.map((entry) => ({
    ...toPublicGuestbookEntry(entry, viewerEmail),
    replies: replies
      .filter((reply) => reply.parent_id === entry.id)
      .sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
      )
      .map((reply) => toPublicGuestbookEntry(reply, viewerEmail)),
  }))
}

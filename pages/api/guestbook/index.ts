import type { APIRoute } from "astro"
import { SUPABASE_URL } from "astro:env/server"
import { adminEmail, getUser } from "@/lib/auth"
import { getGuestbookEntries, TABLE } from "@/lib/guestbook"
import { sendGuestbookEmails } from "@/lib/guestbook/email"
import { MAX_MESSAGE } from "@/lib/guestbook/rich-text"
import { supabase } from "@/lib/services/supabase"

export const prerender = false

const fail = (error: string, status: number) => Response.json({ error }, { status })

const findEntry = async (id: string, columns: string) => {
  const rows = await supabase(`${TABLE}?id=eq.${encodeURIComponent(id)}&select=${columns}`)
  return rows[0] ?? null
}

export const GET: APIRoute = async ({ request }) => {
  try {
    const user = await getUser(request)
    return Response.json({ entries: await getGuestbookEntries(user?.email) })
  } catch (error) {
    console.error(error)
    return fail("Failed to fetch", 500)
  }
}

export const POST: APIRoute = async ({ request }) => {
  const user = await getUser(request)
  if (!user?.email) return fail("Unauthorized", 401)

  try {
    const { message, parent_id, attachment_url } = await request.json()
    if (!message && !attachment_url) return fail("Missing required fields", 400)
    if (message && (typeof message !== "string" || message.length > MAX_MESSAGE)) {
      return fail(`Messages can be up to ${MAX_MESSAGE} characters`, 400)
    }

    // Only images from our own bucket, since the URL comes from the browser
    if (attachment_url && !String(attachment_url).startsWith(`${SUPABASE_URL}/storage/v1/object/public/primary/guestbook/`)) {
      return fail("Invalid attachment", 400)
    }

    const id = crypto.randomUUID()
    const name = user.name || "Anonymous"

    await supabase(TABLE, {
      method: "POST",
      body: JSON.stringify({
        id,
        name,
        email: user.email,
        image_url: user.image || null,
        message: message || null,
        // Rich text (lib/guestbook/rich-text.ts); older rows default to "plain"
        message_format: "markdown",
        parent_id: parent_id || null,
        timestamp: new Date().toISOString(),
        attachment_url: attachment_url || null,
      }),
    })

    try {
      await sendGuestbookEmails({ id, name, email: user.email, message: message || "", hasImage: Boolean(attachment_url) })
    } catch (error) {
      console.error("Email notification failed:", error)
    }

    return Response.json({ ok: true }, { status: 201 })
  } catch (error) {
    console.error(error)
    return fail("Failed to add", 500)
  }
}

export const PATCH: APIRoute = async ({ request }) => {
  const user = await getUser(request)
  if (!user?.email) return fail("Unauthorized", 401)

  try {
    const { id, type, emoji } = await request.json()
    if (!id || (type !== "like" && type !== "react")) return fail("Missing required fields", 400)

    const entry = await findEntry(id, "likes,reactions")
    if (!entry) return fail("Not found", 404)

    const email: string = user.email
    const lower = email.toLowerCase()
    let update: Record<string, string[]>

    if (type === "like") {
      const likes: string[] = entry.likes || []
      update = {
        likes: likes.some((value) => value.toLowerCase() === lower)
          ? likes.filter((value) => value.toLowerCase() !== lower)
          : [...likes, email],
      }
    } else {
      const reactions: string[] = entry.reactions || []
      const key = emoji ? `${emoji}:${email}` : email
      const mine = (value: string) => value.toLowerCase().endsWith(`:${lower}`) || value.toLowerCase() === lower
      update = {
        reactions: reactions.some((value) => value.toLowerCase() === key.toLowerCase())
          ? reactions.filter((value) => value.toLowerCase() !== key.toLowerCase())
          : [...reactions.filter((value) => !mine(value)), key],
      }
    }

    await supabase(`${TABLE}?id=eq.${encodeURIComponent(id)}`, { method: "PATCH", body: JSON.stringify(update) })
    return Response.json({ ok: true })
  } catch (error) {
    console.error(error)
    return fail("Failed to update", 500)
  }
}

export const DELETE: APIRoute = async ({ request, url }) => {
  const user = await getUser(request)
  if (!user?.email) return fail("Unauthorized", 401)

  try {
    const id = url.searchParams.get("id")
    if (!id) return fail("Missing id", 400)

    const entry = await findEntry(id, "email")
    if (!entry) return fail("Not found", 404)

    const requester = user.email.toLowerCase()
    const isAuthor = requester === (entry.email || "").toLowerCase()
    if (requester !== adminEmail && !isAuthor) return fail("Forbidden", 403)

    await supabase(`${TABLE}?id=eq.${encodeURIComponent(id)}`, { method: "DELETE" })
    return Response.json({ ok: true })
  } catch (error) {
    console.error(error)
    return fail("Failed to delete", 500)
  }
}

import type { APIRoute } from "astro"
import { SUPABASE_SERVICE_ROLE_KEY, SUPABASE_URL } from "astro:env/server"
import { getUser } from "@/lib/session"

export const prerender = false

// Vercel caps request bodies at 4.5 MB
const MAX_IMAGE = 4 * 1024 * 1024

// Checked against the file's first bytes, not the type the browser claims
const TYPES = [
  { type: "image/png", extension: "png", matches: (b: Uint8Array) => b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47 },
  { type: "image/jpeg", extension: "jpg", matches: (b: Uint8Array) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  { type: "image/gif", extension: "gif", matches: (b: Uint8Array) => b[0] === 0x47 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x38 },
  {
    type: "image/webp",
    extension: "webp",
    matches: (b: Uint8Array) =>
      b[0] === 0x52 && b[1] === 0x49 && b[2] === 0x46 && b[3] === 0x46 && b[8] === 0x57 && b[9] === 0x45 && b[10] === 0x42 && b[11] === 0x50,
  },
]

const fail = (error: string, status: number) => Response.json({ error }, { status })

export const POST: APIRoute = async ({ request }) => {
  const user = await getUser(request)
  if (!user?.email) return fail("Unauthorized", 401)
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return fail("Uploads are not configured", 503)

  const length = Number(request.headers.get("content-length") ?? 0)
  if (length > MAX_IMAGE + 64 * 1024) return fail("Images can be up to 4 MB", 413)

  try {
    const file = (await request.formData()).get("image")
    if (!(file instanceof File)) return fail("Missing image", 400)
    if (file.size > MAX_IMAGE) return fail("Images can be up to 4 MB", 413)

    const bytes = new Uint8Array(await file.arrayBuffer())
    const kind = TYPES.find(({ matches }) => matches(bytes))
    if (!kind) return fail("Only PNG, JPEG, GIF and WebP images", 415)

    const path = `guestbook/${user.id}/${crypto.randomUUID()}.${kind.extension}`
    const response = await fetch(`${SUPABASE_URL}/storage/v1/object/primary/${path}`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_SERVICE_ROLE_KEY,
        authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        "content-type": kind.type,
      },
      body: bytes,
    })
    if (!response.ok) throw new Error(`Storage ${response.status}: ${await response.text()}`)

    return Response.json({ url: `${SUPABASE_URL}/storage/v1/object/public/primary/${path}` }, { status: 201 })
  } catch (error) {
    console.error(error)
    return fail("Upload failed", 500)
  }
}

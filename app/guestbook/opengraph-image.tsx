import { ImageResponse } from "next/og"
import { getPublicGuestbookEntries } from "@/lib/guestbook-data"

export const alt = "Guestbook messages for Manish Tamang"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"
export const revalidate = 60

function clip(text: string, max: number) {
  const value = text.replace(/\s+/g, " ").trim()
  if (value.length <= max) return value
  return `${value.slice(0, max - 1).trim()}…`
}

export default async function Image() {
  let notes: { name: string; message: string }[] = []

  try {
    const entries = await getPublicGuestbookEntries()
    notes = entries
      .flatMap((entry) => [entry, ...(entry.replies || [])])
      .filter((entry) => entry.message.trim())
      .map((entry) => ({
        name: entry.name,
        message: entry.message,
      }))
  } catch {
    notes = []
  }

  const visible = notes.slice(0, 6)
  const countLabel = `${notes.length} ${notes.length === 1 ? "message" : "messages"}`

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#111111",
          color: "#f4f4f5",
          padding: "64px 72px",
          fontFamily: "Georgia, Times New Roman, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 36,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                fontSize: 18,
                color: "#a1a1aa",
                letterSpacing: 2,
              }}
            >
              MANISHTAMANG.COM
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 64,
                lineHeight: 1.1,
                marginTop: 8,
              }}
            >
              Guestbook
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#d4d4d8" }}>
            {countLabel}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            flex: 1,
          }}
        >
          {visible.length === 0 ? (
            <div style={{ display: "flex", fontSize: 28, color: "#a1a1aa" }}>
              Be the first to leave a message.
            </div>
          ) : (
            visible.map((note, index) => (
              <div
                key={`${note.name}-${index}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  borderLeft: "3px solid #9AC372",
                  paddingLeft: 16,
                  marginTop: index === 0 ? 0 : 18,
                }}
              >
                <div style={{ display: "flex", fontSize: 22, color: "#fafafa" }}>
                  {clip(note.name, 42)}
                </div>
                <div
                  style={{
                    display: "flex",
                    fontSize: 20,
                    color: "#a1a1aa",
                    marginTop: 4,
                  }}
                >
                  {clip(note.message, 88)}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    ),
    size,
  )
}

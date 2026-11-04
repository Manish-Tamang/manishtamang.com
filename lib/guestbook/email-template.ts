/*
 * HTML for the guestbook emails: a thank-you to whoever signed it and a
 * notification to me. The wording and order are the old Next.js site's
 * emails (greeting, one line, the message, the date, a button, a sign-off);
 * the look is the new site's, kept plain (white, one column): my avatar as the
 * sender line, the message as a card like a guestbook entry, Inter and the
 * site's colours. Tables and inline styles only, so Gmail, Outlook and Apple Mail
 * render it the same; Inter where the client has it, system sans otherwise.
 *
 * `message` must already be safe HTML (richTextHtml escapes everything).
 */

const SITE = "https://manishtamang.com"

// The site's tokens (styles/tokens.css), as plain hex for email clients
const color = {
  purple: "#966bc3",
  buttonTop: "#ad87d8",
  buttonBottom: "#8a5db9",
  buttonRing: "#7a4fa8",
  heading: "#2a2d2d",
  text: "#2a2d2d",
  muted: "#626a6a",
  border: "#d7dada",
  subtle: "#f7f8f8",
}

const font = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"

// A plain 560px column like Vercel's emails, with a gutter on small screens
const WIDTH = 560
const GUTTER = 24

const escape = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")

const p = (html: string, extra = "") =>
  `<p style="margin:0 0 16px;font-family:${font};font-size:14px;line-height:22px;color:${color.text};${extra}">${html}</p>`


const a = (href: string, text: string) =>
  `<a href="${href}" style="color:${color.buttonBottom};text-decoration:underline;text-underline-offset:2px;">${text}</a>`

// A table button with a solid fallback colour: Outlook ignores the gradient
const button = (href: string, label: string) => `
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:20px 0 0;">
  <tr>
    <td style="border-radius:8px;background-color:${color.buttonBottom};background-image:linear-gradient(${color.buttonTop},${color.buttonBottom});border:1px solid ${color.buttonRing};box-shadow:inset 0 1px 0 rgba(255,255,255,0.35);">
      <a href="${href}" style="display:inline-block;padding:10px 20px;font-family:${font};font-size:14px;line-height:20px;font-weight:600;color:#ffffff;text-decoration:none;border-radius:8px;">${label}</a>
    </td>
  </tr>
</table>`

// The message's own tags get inline styles: email clients ignore stylesheets
const styleMessage = (html: string) =>
  html
    .replace(/<a /g, `<a style="color:${color.buttonBottom};text-decoration:underline;text-underline-offset:2px;" `)
    .replace(
      /<code>/g,
      `<code style="padding:1px 4px;border-radius:3px;background-color:#eef0f0;font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-size:13px;">`,
    )

// The message as a card, laid out like a guestbook entry: who wrote it and when,
// then the message. The label above it is the old emails' "Your message".
const card = ({ label, name, avatarUrl, date, html }: { label: string; name: string; avatarUrl?: string | null; date: string; html: string }) => `
<p style="margin:0 0 8px;font-family:${font};font-size:13px;line-height:20px;color:${color.muted};">${label}</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0;border:1px solid ${color.border};border-radius:8px;border-collapse:separate;">
  <tr>
    <td style="padding:16px;">
      <table role="presentation" cellpadding="0" cellspacing="0" border="0">
        <tr>
          ${
            avatarUrl
              ? `<td style="padding:0 10px 0 0;vertical-align:middle;"><img src="${avatarUrl}" width="24" height="24" alt="" style="display:block;width:24px;height:24px;border-radius:50%;border:0;"></td>`
              : ""
          }
          <td style="vertical-align:middle;font-family:${font};font-size:14px;line-height:22px;">
            <span style="font-weight:600;color:${color.heading};">${escape(name)}</span><span style="color:${color.muted};">&nbsp;&nbsp;·&nbsp;&nbsp;${date}</span>
          </td>
        </tr>
      </table>
      <div style="margin:10px 0 0;font-family:${font};font-size:14px;line-height:22px;color:${color.text};white-space:pre-wrap;word-break:break-word;">${styleMessage(html)}</div>
    </td>
  </tr>
</table>`

function layout({ title, preheader, avatarUrl, body }: { title: string; preheader: string; avatarUrl: string; body: string }) {
  const year = new Date().getFullYear()
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${escape(title)}</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">
</head>
<body style="margin:0;padding:0;background-color:#ffffff;">
<!-- Inbox preview text -->
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escape(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff;">
  <tr>
    <td align="center" style="padding:40px ${GUTTER}px;">
      <!-- One plain column: the sender line, the text and the footer share its left edge -->
      <table role="presentation" width="${WIDTH}" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:${WIDTH}px;">
        <!-- Sender line: my avatar, name and site -->
        <tr>
          <td>
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding:0 12px 0 0;vertical-align:middle;">
                  <a href="${SITE}"><img src="${avatarUrl}" width="40" height="40" alt="Manish Tamang" style="display:block;width:40px;height:40px;border-radius:50%;border:1px solid ${color.border};"></a>
                </td>
                <td style="vertical-align:middle;font-family:${font};">
                  <div style="font-size:14px;line-height:20px;font-weight:600;color:${color.heading};">Manish Tamang</div>
                  <div style="font-size:12px;line-height:18px;"><a href="${SITE}" style="color:${color.muted};text-decoration:none;">manishtamang.com</a></div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 0 0;">
            <h1 style="margin:0 0 16px;font-family:${font};font-size:18px;line-height:26px;font-weight:600;letter-spacing:-0.014em;color:${color.heading};">${escape(title)}</h1>
            ${body}
          </td>
        </tr>
        <tr>
          <td style="padding:36px 0 0;">
            <div style="border-top:1px solid ${color.border};padding-top:20px;font-family:${font};font-size:12px;line-height:18px;color:${color.muted};">
              © ${year} <a href="${SITE}" style="color:${color.muted};text-decoration:underline;">Manish Tamang</a>
            </div>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`
}

export type GuestbookEmail = {
  id: string
  name: string
  email: string
  /** Safe HTML of the message (richTextHtml), or "" for an image-only post */
  message: string
  hasImage: boolean
  postedAt: Date
  /** The visitor's Google or GitHub picture, shown on the message card */
  avatarUrl?: string | null
  /** My picture in the sender line; defaults to the one on the site */
  myAvatarUrl?: string
}

// "4 November 2026 at 14:57", in Nepal time
const sentLabel = (date: Date) =>
  date.toLocaleString("en-GB", {
    timeZone: "Asia/Kathmandu",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

const message = (label: string, entry: GuestbookEmail) =>
  card({
    label,
    name: entry.name,
    avatarUrl: entry.avatarUrl,
    date: sentLabel(entry.postedAt),
    html: entry.message || `<span style="color:${color.muted};">(An image, no text)</span>`,
  }) + (entry.message && entry.hasImage ? muted("With an image attached.", "margin:8px 0 0;") : "")

const muted = (html: string, extra = "") => p(html, `font-size:13px;line-height:20px;color:${color.muted};${extra}`)

// The old emails' closing
const signOff = p(`Best regards,<br><strong style="font-weight:600;color:${color.heading};">Manish Tamang</strong>`, "margin:28px 0 0;")

/** The thank-you to whoever signed the guestbook. */
export function thankYouEmail(entry: GuestbookEmail) {
  return layout({
    title: "Thank you for your message",
    preheader: "Thank you for leaving a message in my guestbook.",
    avatarUrl: entry.myAvatarUrl ?? `${SITE}/images/email/avatar.png`,
    body: [
      p(`Hello <strong style="font-weight:600;color:${color.heading};">${escape(entry.name)}</strong>,`),
      p("Thank you for leaving a message in my guestbook. I truly appreciate your feedback and support.", "margin:0 0 20px;"),
      message("Your message", entry),
      button(`${SITE}/guestbook#${entry.id}`, "View your message"),
      signOff,
    ].join("\n"),
  })
}

/** The notification to me about a new message. */
export function notificationEmail(entry: GuestbookEmail) {
  return layout({
    title: "New guestbook entry",
    preheader: `A new message was just posted to your guestbook by ${entry.name}.`,
    avatarUrl: entry.myAvatarUrl ?? `${SITE}/images/email/avatar.png`,
    body: [
      p(`Hello <strong style="font-weight:600;color:${color.heading};">Manish</strong>,`),
      p(
        `A new message was just posted to your guestbook by <strong style="font-weight:600;color:${color.heading};">${escape(entry.name)}</strong> (${a(`mailto:${entry.email}`, escape(entry.email))}).`,
        "margin:0 0 20px;",
      ),
      message("Message content", entry),
      button(`${SITE}/guestbook#${entry.id}`, "View the message"),
      signOff,
    ].join("\n"),
  })
}

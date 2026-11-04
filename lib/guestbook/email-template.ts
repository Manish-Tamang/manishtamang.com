/*
 * HTML for the guestbook emails: a thank-you to whoever signed it and a
 * notification to me. The wording and order are the old Next.js site's
 * emails (greeting, one line, the message, the date, a button, a sign-off);
 * the look is the new site's: the yeti peeking over a purple bar, Inter and
 * the site's colours. Tables and inline styles only, so Gmail, Outlook and Apple Mail
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
  page: "#eef0f0",
}

const font = "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"

// Every block starts on the same 40px left edge as the yeti and the title
const PAD = 40

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

// The label sits inside the box above the message, as on the old site
const quote = (label: string, html: string) => `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0;">
  <tr>
    <td style="padding:14px 16px;background-color:${color.subtle};border-left:3px solid ${color.purple};border-radius:0 6px 6px 0;font-family:${font};font-size:14px;line-height:22px;color:${color.text};word-break:break-word;">
      <p style="margin:0 0 6px;font-family:${font};font-size:13px;line-height:20px;font-weight:600;color:${color.heading};">${label}</p>
      <div style="white-space:pre-wrap;">${styleMessage(html)}</div>
    </td>
  </tr>
</table>`



function layout({ title, preheader, logoUrl, body }: { title: string; preheader: string; logoUrl: string; body: string }) {
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
<body style="margin:0;padding:0;background-color:${color.page};">
<!-- Inbox preview text -->
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escape(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${color.page};">
  <tr>
    <td align="center" style="padding:32px 16px 40px;">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;">
        <!-- The yeti peeks over the bar: its hands sit right on the card's top edge -->
        <tr>
          <td style="padding:0 ${PAD}px;line-height:0;font-size:0;">
            <a href="${SITE}"><img src="${logoUrl}" width="69" height="56" alt="Manish Tamang" style="display:block;border:0;width:69px;height:56px;"></a>
          </td>
        </tr>
        <tr><td style="height:6px;line-height:6px;font-size:0;background-color:${color.purple};border-radius:4px 4px 0 0;">&nbsp;</td></tr>
        <tr>
          <td style="padding:32px ${PAD}px 36px;background-color:#ffffff;border:1px solid ${color.border};border-top:0;border-radius:0 0 4px 4px;">
            <h1 style="margin:0 0 12px;font-family:${font};font-size:26px;line-height:32px;font-weight:600;letter-spacing:-0.02em;color:${color.heading};">${escape(title)}</h1>
            ${body}
          </td>
        </tr>
        <tr>
          <td style="padding:20px ${PAD}px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-family:${font};font-size:12px;line-height:18px;color:${color.muted};">
              <tr>
                <td>© ${year} <a href="${SITE}" style="color:${color.muted};text-decoration:none;">Manish Tamang</a></td>
              </tr>
            </table>
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
  logoUrl?: string
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

const message = (label: string, { message, hasImage }: GuestbookEmail) =>
  quote(label, message || `<span style="color:${color.muted};">(An image, no text)</span>`) +
  (message && hasImage ? p("With an image attached.", `margin:8px 0 0;color:${color.muted};`) : "")

const muted = (html: string, extra = "") => p(html, `font-size:13px;line-height:20px;color:${color.muted};${extra}`)

// The old emails' closing
const signOff = p(`Best regards,<br><strong style="font-weight:600;color:${color.heading};">Manish Tamang</strong>`, "margin:28px 0 0;")

/** The thank-you to whoever signed the guestbook. */
export function thankYouEmail(entry: GuestbookEmail) {
  return layout({
    title: "Thank you for your message",
    preheader: "Thank you for leaving a message in my guestbook.",
    logoUrl: entry.logoUrl ?? `${SITE}/images/email/yeti.png`,
    body: [
      p(`Hello <strong style="font-weight:600;color:${color.heading};">${escape(entry.name)}</strong>,`),
      p("Thank you for leaving a message in my guestbook. I truly appreciate your feedback and support.", "margin:0 0 20px;"),
      message("Your message", entry),
      muted(`Sent on ${sentLabel(entry.postedAt)}`, "margin:12px 0 0;"),
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
    logoUrl: entry.logoUrl ?? `${SITE}/images/email/yeti.png`,
    body: [
      p(`Hello <strong style="font-weight:600;color:${color.heading};">Manish</strong>,`),
      p(
        `A new message was just posted to your guestbook by <strong style="font-weight:600;color:${color.heading};">${escape(entry.name)}</strong> (${a(`mailto:${entry.email}`, escape(entry.email))}).`,
        "margin:0 0 20px;",
      ),
      message("Message content", entry),
      muted(`Sent on ${sentLabel(entry.postedAt)}`, "margin:12px 0 0;"),
      button(`${SITE}/guestbook#${entry.id}`, "View the message"),
      signOff,
    ].join("\n"),
  })
}

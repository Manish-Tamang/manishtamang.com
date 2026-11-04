/*
 * Guestbook emails, sent through Resend's API: a thank-you to whoever signed it
 * and a notification to me. Both come from hi@, which Cloudflare Email Routing
 * forwards to my inbox, so a reply to either reaches me (the notification's
 * replies go to the visitor instead). Templates are in ./email-template.ts.
 */
import { RESEND_API_KEY } from "astro:env/server"
import { adminEmail } from "@/lib/auth"
import { notificationEmail, thankYouEmail } from "./email-template"
import { richTextHtml } from "./rich-text"

const FROM = "Manish Tamang <hi@manishtamang.com>"
const NOTIFY = "hi@manishtamang.com"

type Email = { from: string; to: string; subject: string; html: string; reply_to?: string }

async function send(email: Email) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${RESEND_API_KEY}`, "content-type": "application/json" },
    body: JSON.stringify(email),
  })
  if (!response.ok) throw new Error(`Resend ${response.status}: ${await response.text()}`)
}

export async function sendGuestbookEmails(post: { id: string; name: string; email: string; message: string; hasImage: boolean }) {
  // My own posts (replies) don't need a thank-you or a notification
  if (adminEmail && post.email.toLowerCase() === adminEmail) return

  const entry = {
    ...post,
    // New messages are rich text; richTextHtml escapes everything but its own tags
    message: post.message ? richTextHtml(post.message) : "",
    postedAt: new Date(),
  }

  // Sent independently: a bad visitor address mustn't stop my notification
  const results = await Promise.allSettled([
    send({ from: FROM, to: post.email, subject: "Thank You for Your Guestbook Message!", html: thankYouEmail(entry) }),
    send({
      from: FROM,
      to: NOTIFY,
      reply_to: post.email,
      subject: `🚀 New Guestbook Entry from ${post.name}`,
      html: notificationEmail(entry),
    }),
  ])

  const failed = results.filter((result): result is PromiseRejectedResult => result.status === "rejected")
  if (failed.length) throw new AggregateError(failed.map(({ reason }) => reason), "Guestbook email failed")
}

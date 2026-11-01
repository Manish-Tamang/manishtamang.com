/* Guestbook notification emails, sent through Resend's API. */
import { RESEND_API_KEY } from "astro:env/server"
import { adminEmail } from "@/lib/auth"

const escapeHtml = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")

async function send(email: { from: string; to: string; subject: string; html: string }) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { authorization: `Bearer ${RESEND_API_KEY}`, "content-type": "application/json" },
    body: JSON.stringify(email),
  })
  if (!response.ok) throw new Error(`Resend ${response.status}: ${await response.text()}`)
}

export async function sendGuestbookEmails({ id, name, email, message }: { id: string; name: string; email: string; message: string }) {
  const safeName = escapeHtml(name)
  const safeMessage = escapeHtml(message || "(image)")
  const dateStr = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
  const viewUrl = `https://manishtamang.com/guestbook#${id}`
  const currentYear = new Date().getFullYear()

  const getTemplate = (isRecipientUser: boolean) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${isRecipientUser ? "Thank You for Your Message" : "New Guestbook Entry"}</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f7;font-family:Arial, Helvetica, sans-serif;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f5f7;">
<tr>
<td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:680px;background:#ffffff;">
<tr>
<td>
<img src="https://manishtamang.com/cover-card.jpg" alt="Banner" style="display:block;width:100%;height:auto;">
</td>
</tr>
<tr>
<td style="padding:32px 28px;color:#3F3D56;font-size:16px;line-height:1.6;">
<p style="margin:0 0 16px 0;">
Hello <strong>${isRecipientUser ? safeName : "Manish"}</strong>,
</p>
<p style="margin:0 0 20px 0;">
${
  isRecipientUser
    ? "Thank you for leaving a message in my guestbook. I truly appreciate your feedback and support."
    : `A new message was just posted to your guestbook by <strong>${safeName}</strong>.`
}
</p>
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f8fb;border-radius:6px;margin:20px 0;">
<tr>
<td style="padding:16px;font-size:15px;">
<strong>${isRecipientUser ? "Your message" : "Message content"}</strong><br><br>
${safeMessage}
</td>
</tr>
</table>
<p style="font-size:14px;color:#888;margin:0 0 24px 0;">
Sent on ${dateStr}
</p>
<table cellpadding="0" cellspacing="0">
<tr>
<td style="background:#D65D3C;border-radius:6px;">
<a href="${viewUrl}" style="display:inline-block;padding:12px 22px;color:#ffffff;font-weight:bold;text-decoration:none;font-size:15px;">
View ${isRecipientUser ? "Your" : "the"} Message
</a>
</td>
</tr>
</table>
<p style="margin:28px 0 0 0;">
Best regards,<br>
<strong>Manish Tamang</strong>
</p>
<p style="font-size:13px;color:#888;margin-top:20px;">
This email was automatically sent using an Astro API route and delivered with Resend.
</p>
</td>
</tr>
<tr>
<td style="padding:22px 28px;border-top:1px solid #eee;">
<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td style="font-size:12px;color:#777;">
© ${currentYear} Manish Tamang
</td>
<td align="right">
<table cellpadding="0" cellspacing="0">
<tr>
<td style="background:#000;border-radius:5px;padding:6px 10px;">
<svg width="18" height="18" viewBox="0 0 1800 1800" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1000.46 450C1174.77 450 1278.43 553.669 1278.43 691.282C1278.43 828.896 1174.77 932.563 1000.46 932.563H912.382L1350 1350H1040.82L707.794 1033.48C683.944 1011.47 672.936 985.781 672.935 963.765C672.935 932.572 694.959 905.049 737.161 893.122L908.712 847.244C973.85 829.812 1018.81 779.353 1018.81 713.298C1018.8 632.567 952.745 585.78 871.095 585.78H450V450H1000.46Z" fill="#FDFDFD"/>
</svg>
</td>
<td style="font-size:12px;color:#777;padding-left:8px;">
Resend
</td>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>
</table>
</td>
</tr>
</table>
</body>
</html>
`

  await send({
    from: "Manish Tamang <guestbook@manishtamang.com>",
    to: email,
    subject: "Thank You for Your Guestbook Message!",
    html: getTemplate(true),
  })

  await send({
    from: "Guestbook Notification <system@manishtamang.com>",
    to: adminEmail,
    subject: `🚀 New Guestbook Entry from ${name}`,
    html: getTemplate(false),
  })
}

import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { Resend } from "resend";

const TABLE = "guestbook_entries";

export async function GET() {
    try {
        const { data, error } = await supabase
            .from(TABLE)
            .select(`
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
            `)
            .order("timestamp", { ascending: false });

        if (error) throw error;

        // Nest replies within their parent entries
        const entries = data || [];
        const mainEntries = entries.filter(e => !e.parent_id);
        const replies = entries.filter(e => e.parent_id);

        const nestedEntries = mainEntries.map(entry => ({
            ...entry,
            replies: replies
                .filter(r => r.parent_id === entry.id)
                .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
        }));

        return NextResponse.json({ entries: nestedEntries });
    } catch (error: any) {
        console.error("Fetch error:", error);
        return NextResponse.json({ error: error?.message || "Failed to fetch" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const { id, name, email, imageUrl, message, parent_id, attachment_url } = await req.json();

        if (!id || !name || !message) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const { error } = await supabaseAdmin.from(TABLE).insert({
            id,
            name,
            email: email || null,
            image_url: imageUrl || null,
            message: message || null,
            parent_id: parent_id || null,
            timestamp: new Date().toISOString(),
            attachment_url: attachment_url || null,
        });

        if (error) throw error;

        // --- Email Notification Logic ---
        try {
            const resend = new Resend(process.env.RESEND_API_KEY);
            const dateStr = new Date().toLocaleDateString("en-US", {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            const viewUrl = `https://manishtamang.com/guestbook#${id}`;
            const currentYear = new Date().getFullYear();

            const getTemplate = (isRecipientUser: boolean) => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${isRecipientUser ? 'Thank You for Your Message' : 'New Guestbook Entry'}</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f7;font-family:Arial, Helvetica, sans-serif;">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f5f5f7;">
<tr>
<td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:680px;background:#ffffff;">
<tr>
<td>
<img src="https://manishtamang.com/cover-card.png" alt="Banner" style="display:block;width:100%;height:auto;">
</td>
</tr>
<tr>
<td style="padding:32px 28px;color:#3F3D56;font-size:16px;line-height:1.6;">
<p style="margin:0 0 16px 0;">
Hello <strong>${isRecipientUser ? name : 'Manish'}</strong>,
</p>
<p style="margin:0 0 20px 0;">
${isRecipientUser
                    ? "Thank you for leaving a message in my guestbook. I truly appreciate your feedback and support."
                    : `A new message was just posted to your guestbook by <strong>${name}</strong> (${email || 'No email provided'}).`}
</p>
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f8fb;border-radius:6px;margin:20px 0;">
<tr>
<td style="padding:16px;font-size:15px;">
<strong>${isRecipientUser ? 'Your message' : 'Message content'}</strong><br><br>
${message}
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
View ${isRecipientUser ? 'Your' : 'the'} Message
</a>
</td>
</tr>
</table>
<p style="margin:28px 0 0 0;">
Best regards,<br>
<strong>Manish Tamang</strong>
</p>
<p style="font-size:13px;color:#888;margin-top:20px;">
This email was automatically sent using a Next.js API route and delivered with Resend.
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
`;

            // 1. Thank you email to user (if email available)
            if (email) {
                await resend.emails.send({
                    from: "Manish Tamang <guestbook@manishtamang.com>",
                    to: email,
                    subject: "Thank You for Your Guestbook Message!",
                    html: getTemplate(true)
                });
            }

            // 2. Notification to Admin (Manish)
            await resend.emails.send({
                from: "Guestbook Notification <system@manishtamang.com>",
                to: "maneshtamang833@gmail.com",
                subject: `🚀 New Guestbook Entry from ${name}`,
                html: getTemplate(false)
            });
        } catch (emailErr) {
            console.error("Email notification failed:", emailErr);
        }

        return NextResponse.json({ ok: true }, { status: 201 });
    } catch (error: any) {
        console.error("Insert error:", error);
        return NextResponse.json({ error: error?.message || "Failed to add" }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const { id, type, email } = await req.json();

        if (!id || !type || !email) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const { data: entry, error: fetchError } = await supabaseAdmin
            .from(TABLE)
            .select("likes, reactions")
            .eq("id", id)
            .single();

        if (fetchError) throw fetchError;

        let updateData: any = {};
        if (type === "like") {
            const currentLikes = entry.likes || [];
            if (currentLikes.includes(email)) {
                updateData.likes = currentLikes.filter((e: string) => e !== email);
            } else {
                updateData.likes = [...currentLikes, email];
            }
        } else if (type === "react") {
            const { emoji } = await req.json();
            const currentReactions = entry.reactions || [];
            const reactionKey = emoji ? `${emoji}:${email}` : email;

            // If the user already has any reaction, remove it (Instagram/Slack style - one reaction per user usually, or toggle this specific one)
            // For simplicity, let's allow toggling this specific emoji:email pair
            if (currentReactions.includes(reactionKey)) {
                updateData.reactions = currentReactions.filter((e: string) => e !== reactionKey);
            } else {
                // Remove other reactions from this user first if you want "one reaction per user"
                const filteredReactions = currentReactions.filter((e: string) => !e.endsWith(`:${email}`) && e !== email);
                updateData.reactions = [...filteredReactions, reactionKey];
            }
        }

        const { error: updateError } = await supabaseAdmin
            .from(TABLE)
            .update(updateData)
            .eq("id", id);

        if (updateError) throw updateError;

        return NextResponse.json({ ok: true });
    } catch (error: any) {
        console.error("Update error:", error);
        return NextResponse.json({ error: error?.message || "Failed to update" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

        // Use admin client for deletion
        const { error } = await supabaseAdmin.from(TABLE).delete().eq("id", id);

        if (error) throw error;

        return NextResponse.json({ ok: true });
    } catch (error: any) {
        console.error("Delete error:", error);
        return NextResponse.json({ error: error?.message || "Failed to delete" }, { status: 500 });
    }
}

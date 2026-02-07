import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

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

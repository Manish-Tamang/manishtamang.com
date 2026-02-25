"use client"

import { useState } from "react"
import { Heart, Smile, Trash2, Reply, Send, X, Plus, Flower } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { motion, AnimatePresence } from "framer-motion"
import { formatDistanceToNow } from "date-fns"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { sounds } from "@/lib/sounds"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export interface GuestbookEntry {
    id: string
    name: string
    image_url: string | null
    message: string
    timestamp: string
    email?: string
    parent_id?: string | null
    likes?: string[]
    reactions?: string[]
    replies?: GuestbookEntry[]
    attachment_url?: string | null
}

interface GuestbookItemProps {
    entry: GuestbookEntry
    onDelete?: () => void
    onRefresh?: () => void
}

const parseLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex).map((part, i) => {
        if (part.match(urlRegex)) {
            return (
                <a
                    key={i}
                    href={part}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 underline underline-offset-4 decoration-blue-500/30 transition-colors"
                >
                    {part}
                </a>
            );
        }
        return part;
    });
};

export function GuestbookItem({ entry, onDelete, onRefresh }: GuestbookItemProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [isReplying, setIsReplying] = useState(false)
    const [replyMessage, setReplyMessage] = useState("")
    const [isSubmittingReply, setIsSubmittingReply] = useState(false)
    const [showDeleteAlert, setShowDeleteAlert] = useState(false)
    const [itemToDelete, setItemToDelete] = useState<{ id: string, isReply: boolean } | null>(null)
    const [showHeartPop, setShowHeartPop] = useState(false)

    const COMMON_EMOJIS = ["❤️", "✨", "🔥", "🙌", "💯", "🚀", "😂", "😮"]

    const { data: session } = authClient.useSession()

    const words = entry.message.split(/\s+/)
    const isLong = words.length > 60
    const displayMessage = isExpanded || !isLong ? entry.message : words.slice(0, 60).join(" ") + "..."

    const formatTimestamp = (timestamp: string) => {
        try {
            return formatDistanceToNow(new Date(timestamp), { addSuffix: true })
        } catch (e) {
            return "just now"
        }
    }

    const handleDelete = async () => {
        if (!itemToDelete) return

        try {
            const res = await fetch(`/api/guestbook?id=${itemToDelete.id}`, {
                method: "DELETE"
            })
            if (!res.ok) throw new Error("Failed to delete")

            sounds.delete()
            toast.success(itemToDelete.isReply ? "Reply deleted" : "Message deleted")

            if (itemToDelete.isReply) {
                onRefresh?.()
            } else {
                onDelete?.()
            }
        } catch (error) {
            toast.error("Failed to delete")
        } finally {
            setShowDeleteAlert(false)
            setItemToDelete(null)
        }
    }

    const initiateDelete = (id: string, isReply: boolean = false) => {
        setItemToDelete({ id, isReply })
        setShowDeleteAlert(true)
        sounds.warning()
    }

    const handleAction = async (type: "like" | "react", emoji?: string) => {
        if (!session) {
            toast.error("Please sign in to react")
            return
        }

        if (type === "like" && !entry.likes?.includes(session.user.email)) {
            setShowHeartPop(true)
            setTimeout(() => setShowHeartPop(false), 1000)
            sounds.pop()
        } else if (type === "react") {
            sounds.tick()
        }

        try {
            const res = await fetch("/api/guestbook", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: entry.id,
                    type,
                    email: session.user.email,
                    emoji // We'll pass emoji to the API if needed later
                })
            })
            if (!res.ok) throw new Error("Failed to update")
            onRefresh?.()
        } catch (error) {
            toast.error(`Failed to ${type}`)
        }
    }

    const handleReply = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!replyMessage.trim() || !session) return

        setIsSubmittingReply(true)
        try {
            const res = await fetch("/api/guestbook", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: crypto.randomUUID(),
                    name: session.user.name,
                    imageUrl: session.user.image,
                    message: replyMessage.trim(),
                    email: session.user.email,
                    parent_id: entry.id
                }),
            })

            if (!res.ok) throw new Error("Failed to post reply")

            setReplyMessage("")
            setIsReplying(false)
            sounds.success()
            toast.success("Reply posted!")
            onRefresh?.()
        } catch (error) {
            sounds.error()
            toast.error("Failed to post reply")
        } finally {
            setIsSubmittingReply(false)
        }
    }

    const isAdmin = session?.user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL
    const isAuthor = session?.user?.email === entry.email
    const canDelete = isAdmin || isAuthor
    const canReply = isAdmin

    const hasReplies = entry.replies && entry.replies.length > 0
    const likesCount = entry.likes?.length || 0
    const hasLiked = entry.likes?.includes(session?.user?.email || "")
    const reactionsCount = entry.reactions?.length || 0

    // Parse reactions into map of emoji -> count and list of users for each
    const reactionGroups = (entry.reactions || []).reduce((acc, r) => {
        const [emoji, email] = r.includes(":") ? r.split(":") : ["🙏", r]
        if (!acc[emoji]) acc[emoji] = []
        acc[emoji].push(email)
        return acc
    }, {} as Record<string, string[]>)

    const userReaction = (entry.reactions || []).find(r => r.endsWith(`:${session?.user?.email}`) || r === session?.user?.email)
    const hasReacted = !!userReaction

    const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || ""
    const adminLiked = entry.likes?.includes(ADMIN_EMAIL)
    const adminReaction = (entry.reactions || []).find(r => r.includes(ADMIN_EMAIL) && r.includes(":"))
    const adminReactionEmoji = adminReaction ? adminReaction.split(":")[0] : null

    return (
        <>
            <div className="flex mt-4 sm:mt-6 gap-2 sm:gap-4 group relative">
                <div className="flex flex-col items-center">
                    <Avatar className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-white dark:border-zinc-800 shadow-sm shrink-0">
                        {entry.image_url ? (
                            <AvatarImage src={entry.image_url} />
                        ) : (
                            <AvatarFallback className="bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 text-[11px] sm:text-[13px] font-semibold">
                                {entry.name.charAt(0)}
                            </AvatarFallback>
                        )}
                    </Avatar>
                    {adminLiked && (
                        <div className="absolute bottom-2 -right-1 z-10">
                            <div className="relative">
                                <Avatar className="w-4 h-4 sm:w-5 sm:h-5 border border-white dark:border-zinc-900 shadow-sm">
                                    <AvatarImage src="https://github.com/Manish-Tamang.png" />
                                    <AvatarFallback className="text-[5px] sm:text-[6px]">A</AvatarFallback>
                                </Avatar>
                                <div className="absolute -bottom-1 -right-1 bg-red-500 rounded-full p-0.5 border border-white dark:border-zinc-900">
                                    <Heart className="w-1.5 h-1.5 text-white fill-current" />
                                </div>
                            </div>
                        </div>
                    )}

                    <AnimatePresence>
                        {showHeartPop && (
                            <motion.div
                                initial={{ scale: 0, opacity: 0, y: 0 }}
                                animate={{ scale: 1.5, opacity: 1, y: -40 }}
                                exit={{ scale: 2, opacity: 0, y: -80 }}
                                className="absolute pointer-events-none z-50 left-1/2 -translate-x-1/2"
                                transition={{ duration: 0.6, ease: "easeOut" }}
                            >
                                <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-red-500 fill-current drop-shadow-lg" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {hasReplies && <div className="w-[1px] flex-1 bg-zinc-200 dark:bg-zinc-800 mt-2 mb-2" />}
                </div>
                <div className="flex-1 space-y-1.5 sm:space-y-2 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-0">
                        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                            <p className="text-xs sm:text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                {entry.name}
                            </p>
                            {entry.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && (
                                <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 border-none text-[9px] sm:text-[10px] h-3.5 sm:h-4 px-1 rounded-sm">Admin</Badge>
                            )}
                            <span className="text-zinc-500 font-normal text-xs sm:text-sm hidden sm:inline">signed the guestbook</span>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <span className="text-[10px] sm:text-[11px] text-zinc-400 font-mono">{formatTimestamp(entry.timestamp)}</span>
                            {canDelete && (
                                <button
                                    onClick={() => initiateDelete(entry.id, false)}
                                    className="p-0.5 sm:p-1 text-zinc-400 hover:text-red-500 transition-colors opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                                    aria-label="Delete message"
                                >
                                    <Trash2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                </button>
                            )}
                        </div>

                    </div>
                    <div className="relative">
                        <div className="text-[13px] sm:text-[14px] leading-normal text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap break-words">
                            {parseLinks(displayMessage)}
                            {isLong && (
                                <button
                                    onClick={() => {
                                        setIsExpanded(!isExpanded)
                                        sounds.tick()
                                    }}
                                    className="ml-1 text-blue-500 hover:text-blue-600 font-medium text-[12px] sm:text-[13px] transition-colors"
                                >
                                    {isExpanded ? "See less" : "See more"}
                                </button>
                            )}
                        </div>

                        {entry.attachment_url && (
                            <div className="mt-2 sm:mt-3 relative max-w-full sm:max-w-[400px] aspect-[16/10] overflow-hidden rounded-lg sm:rounded-xl border border-zinc-200 dark:border-zinc-800 bg-black/5 dark:bg-white/5 group/img transition-all duration-500 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-sm">
                                <img
                                    src={entry.attachment_url}
                                    alt="Attachment"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-[1.03]"
                                />
                            </div>
                        )}
                    </div>
                    {(reactionsCount > 0 || adminReactionEmoji) && (
                        <div className="flex justify-end mt-1">
                            {adminReactionEmoji && (
                                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/20 text-[10px] text-blue-600 dark:text-blue-400 font-medium shadow-sm animate-in fade-in zoom-in-95 duration-200">
                                    <span className="text-xs">{adminReactionEmoji}</span>
                                    <span className="text-[9px] uppercase tracking-wider opacity-70">Admin</span>
                                </div>
                            )}

                            {Object.entries(reactionGroups).map(([emoji, users]) => {
                                if (emoji === adminReactionEmoji) return null;
                                return (
                                    <div key={emoji} className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[10px] text-zinc-500 ml-1">
                                        <span>{emoji}</span>
                                        <span>{users.length}</span>
                                    </div>
                                )
                            })}
                        </div>
                    )}

                    {isAdmin && (
                        <div className="flex items-center gap-2 sm:gap-4 pt-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => handleAction("like")}
                                className={cn(
                                    "flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs transition-colors",
                                    hasLiked ? "text-red-500" : "text-zinc-400 hover:text-red-500"
                                )}
                            >
                                <Heart className={cn("w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform active:scale-125", hasLiked && "fill-current")} />
                                <span className="hidden sm:inline">{hasLiked ? "Liked" : "Like"}</span>
                            </button>

                            <Popover>
                                <PopoverTrigger asChild>
                                    <button
                                        className={cn(
                                            "flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs transition-colors",
                                            hasReacted ? "text-blue-500" : "text-zinc-400 hover:text-blue-500"
                                        )}
                                    >
                                        <Smile className={cn("w-3 h-3 sm:w-3.5 sm:h-3.5", hasReacted && "fill-current")} />
                                        <span className="hidden sm:inline">React</span>
                                    </button>
                                </PopoverTrigger>
                                <PopoverContent align="start" side="top" className="w-auto p-1.5 sm:p-2 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-zinc-200 dark:border-zinc-800 rounded-xl sm:rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                                    <div className="grid grid-cols-4 gap-0.5 sm:gap-1">
                                        {COMMON_EMOJIS.map((emoji) => (
                                            <button
                                                key={emoji}
                                                onClick={() => handleAction("react", emoji)}
                                                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg sm:rounded-xl text-lg sm:text-xl transition-all hover:scale-125 active:scale-90"
                                            >
                                                {emoji}
                                            </button>
                                        ))}
                                    </div>
                                </PopoverContent>
                            </Popover>

                            {canReply && !isReplying && (
                                <button
                                    onClick={() => {
                                        setIsReplying(true)
                                        sounds.toggle()
                                    }}
                                    className="flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                                >
                                    <Reply className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                    <span className="hidden sm:inline">Reply</span>
                                </button>
                            )}
                        </div>
                    )}

                    {!isAdmin && canReply && !isReplying && (
                        <div className="pt-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={() => {
                                    setIsReplying(true)
                                    sounds.toggle()
                                }}
                                className="flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                            >
                                <Reply className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                <span className="hidden sm:inline">Reply</span>
                            </button>
                        </div>
                    )}

                    {isReplying && (
                        <form onSubmit={handleReply} className="mt-2 sm:mt-3 flex gap-1.5 sm:gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
                            <div className="flex-1 relative">
                                <Input
                                    autoFocus
                                    value={replyMessage}
                                    onChange={(e) => setReplyMessage(e.target.value)}
                                    placeholder="Write a reply..."
                                    className="bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 rounded-lg sm:rounded-xl pr-8 sm:pr-10 min-h-[34px] sm:min-h-[38px] text-xs sm:text-sm"
                                    disabled={isSubmittingReply}
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsReplying(false)
                                        sounds.pop()
                                    }}
                                    className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                                >
                                    <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                </button>
                            </div>
                            <Button
                                type="submit"
                                size="sm"
                                className="rounded-lg sm:rounded-xl h-[34px] sm:h-[38px] px-3 sm:px-4 text-xs sm:text-sm"
                                disabled={isSubmittingReply || !replyMessage.trim()}
                            >
                                <Send className="w-3 h-3 sm:w-3.5 sm:h-3.5 sm:mr-2" />
                                <span className="hidden sm:inline">Post</span>
                            </Button>
                        </form>
                    )}

                    {hasReplies && (
                        <div className="space-y-1.5 sm:space-y-2 mt-2 pl-2 sm:pl-4 border-l-2 border-zinc-100 dark:border-zinc-800/50">
                            {entry.replies?.map((reply) => (
                                <div key={reply.id} className="flex gap-2 sm:gap-3 group/reply relative">
                                    <Avatar className="w-6 h-6 sm:w-8 sm:h-8 border border-white dark:border-zinc-800 shadow-sm shrink-0">
                                        {reply.image_url ? (
                                            <AvatarImage src={reply.image_url} />
                                        ) : (
                                            <AvatarFallback className="text-[9px] sm:text-[10px]">{reply.name.charAt(0)}</AvatarFallback>
                                        )}
                                    </Avatar>
                                    <div className="flex-1 space-y-0.5 sm:space-y-1 min-w-0">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5 sm:gap-0">
                                            <div className="flex items-center gap-1.5 sm:gap-2">
                                                <p className="text-[11px] sm:text-xs font-medium text-zinc-900 dark:text-zinc-100">
                                                    {reply.name}
                                                </p>
                                                {reply.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && (
                                                    <Badge variant="secondary" className="bg-blue-500/10 text-blue-500 border-none text-[7px] sm:text-[8px] h-3 sm:h-3.5 px-1 rounded-sm">Admin</Badge>
                                                )}

                                            </div>
                                            <div className="flex items-center gap-1 sm:gap-2">
                                                <span className="text-[9px] sm:text-[10px] text-zinc-400 font-mono">{formatTimestamp(reply.timestamp)}</span>
                                                {(isAdmin || session?.user?.email === reply.email) && (
                                                    <button
                                                        onClick={() => initiateDelete(reply.id, true)}
                                                        className="p-0.5 sm:p-1 text-zinc-400 hover:text-red-500 transition-colors opacity-100 sm:opacity-0 sm:group-hover/reply:opacity-100"
                                                        aria-label="Delete reply"
                                                    >
                                                        <Trash2 className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                        <div className="text-[12px] sm:text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400 break-words">
                                            {parseLinks(reply.message)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
                <AlertDialogContent className="rounded-2xl border-zinc-200 dark:border-zinc-800 max-w-[400px]">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete {itemToDelete?.isReply ? "Reply" : "Message"}</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete this {itemToDelete?.isReply ? "reply" : "message"}? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="gap-2 sm:gap-0">
                        <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-red-500 hover:bg-red-600 text-white border-none rounded-xl"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}

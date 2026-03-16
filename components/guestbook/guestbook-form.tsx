"use client"

import { useState } from "react"
import { Send, LogIn, ImagePlus, X, Loader2 } from "lucide-react"
import { GitHub } from "@/components/icons/Github"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client"
import { supabase } from "@/lib/supabase"
import { BiSolidSend } from "react-icons/bi";
import { sounds } from "@/lib/sounds"


interface GuestbookFormProps {
    onSuccess: () => void
}

export function GuestbookForm({ onSuccess }: GuestbookFormProps) {
    const [message, setMessage] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const { data: session, isPending } = authClient.useSession()

    const handleSignIn = async (provider: "google" | "github") => {
        try {
            await authClient.signIn.social({
                provider,
                callbackURL: "/guestbook"
            })
            sounds.click()
        } catch (error) {
            toast.error(`Failed to sign in with ${provider}`)
        }
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error("Image size should be less than 5MB")
                return
            }
            setImageFile(file)
            sounds.tick()
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const removeImage = () => {
        setImageFile(null)
        setImagePreview(null)
        sounds.pop()
    }

    const uploadImage = async (file: File) => {
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `guestbook/${session?.user?.id}/${fileName}`

        const { data, error } = await supabase.storage.from('primary').upload(filePath, file)
        if (error) throw error

        const { data: { publicUrl } } = supabase.storage.from('primary').getPublicUrl(filePath)
        return publicUrl
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if ((!message.trim() && !imageFile) || !session) return

        setIsSubmitting(true)
        try {
            let attachmentUrl = null
            if (imageFile) {
                setIsUploading(true)
                try {
                    attachmentUrl = await uploadImage(imageFile)
                } catch (error) {
                    console.error("Upload error:", error)
                    toast.error("Failed to upload image")
                    setIsSubmitting(false)
                    setIsUploading(false)
                    return
                }
                setIsUploading(false)
            }

            const id = crypto.randomUUID()
            const payload = {
                id,
                name: session.user.name,
                imageUrl: session.user.image,
                message: message.trim(),
                email: session.user.email,
                attachment_url: attachmentUrl
            }

            const res = await fetch("/api/guestbook", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })

            if (!res.ok) throw new Error("Failed to post message")

            setMessage("")
            setImageFile(null)
            setImagePreview(null)
            sounds.success()
            toast.success("Message posted!")
            onSuccess()
        } catch (error) {
            console.error("Error posting message:", error)
            sounds.error()
            toast.error("Failed to post message. Check your database connection.")
        } finally {
            setIsSubmitting(false)
        }
    }

    // If it's pending, we show the same card structure to prevent blinking
    if (isPending && !session) {
        return (
            <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm flex flex-col items-start gap-6 text-start animate-pulse">
                <div className="space-y-2 w-full text-start">
                    <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-full w-3/4" />
                    <div className="h-3 bg-zinc-100 dark:bg-zinc-700 rounded-full w-1/2" />
                </div>
                <div className="grid grid-cols-2 gap-3 w-full">
                    <div className="h-12 bg-zinc-200 dark:bg-zinc-800 rounded-2xl w-full" />
                    <div className="h-12 bg-zinc-200 dark:bg-zinc-800 rounded-2xl w-full" />
                </div>
            </div>
        )
    }

    if (!session) {
        return (
            <div className=" rounded-2xl bg-foreground/5 border border-foreground/5 p-6 flex flex-col items-start gap-6 text-start">
                <div className="space-y-2 text-start">
                    <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Sign the Guestbook</h3>
                   <p className="text-foreground leading-normal text-sm md:text-base">Log in to leave a message and join the building of this space.</p>
                </div>
                <div className="grid grid-cols-2 gap-3 w-full">
                    <Button
                        variant="outline"
                        className="h-12 gap-2 cursor-pointer rounded-2xl border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all font-medium"
                        onClick={() => {
                            sounds.click()
                            handleSignIn("github")
                        }}
                    >
                        <GitHub className="w-4 h-4" />
                        Github
                    </Button>
                    <Button
                        variant="outline"
                        className="h-12 gap-2 cursor-pointer rounded-2xl border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all font-medium"
                        onClick={() => {
                            sounds.click()
                            handleSignIn("google")
                        }}
                    >
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                            <path
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                fill="#4285F4"
                            />
                            <path
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                fill="#34A853"
                            />
                            <path
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                                fill="#FBBC05"
                            />
                            <path
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                fill="#EA4335"
                            />
                        </svg>
                        Google
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className=" rounded-2xl bg-foreground/5 border border-foreground/5 dark:border-zinc-800 p-5 shadow-sm space-y-4 transition-all">
            <div className="flex gap-3">
                <Avatar className="w-10 h-10 border border-zinc-100 dark:border-zinc-800">
                    <AvatarImage src={session.user.image || undefined} />
                    <AvatarFallback className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                        {session.user.name?.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-3">
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
                            Signed in as <span className="text-zinc-900 dark:text-zinc-100">{session.user.name}</span>
                        </p>
                        <button
                            type="button"
                            onClick={() => {
                                sounds.pop()
                                authClient.signOut()
                            }}
                            className="text-[11px] text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                        >
                            Sign out
                        </button>
                    </div>
                    <div className="relative space-y-3">
                        {imagePreview && (
                            <div className="relative inline-block group">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="max-h-48 rounded-xl border border-zinc-200 dark:border-zinc-800 object-cover"
                                />
                                <button
                                    type="button"
                                    onClick={removeImage}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        )}
                        <div className="relative flex items-center gap-2">
                            <Input
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Leave a message or some kudos!"
                                className="bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 pr-20 min-h-[44px] focus-visible:ring-1 focus-visible:ring-zinc-300 dark:focus-visible:ring-zinc-700 font-inter"
                                disabled={isSubmitting}
                            />
                            <div className="absolute right-1 flex items-center gap-1">
                                <label className="cursor-pointer p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageChange}
                                        disabled={isSubmitting}
                                    />
                                    <ImagePlus className="w-4 h-4" />
                                </label>
                                <Button
                                    type="submit"
                                    size="icon"
                                    variant="ghost"
                                    className="rounded-lg text-zinc-400 hover:text-blue-500 disabled:opacity-50"
                                    disabled={isSubmitting || (!message.trim() && !imageFile)}
                                >
                                    {isUploading ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <BiSolidSend className="w-4 h-4" />
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

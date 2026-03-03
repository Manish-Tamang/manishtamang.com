"use client";

import React, { useState, useEffect } from "react";
import { Loader2, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { sounds } from "@/lib/sounds";
import { motion, AnimatePresence } from "motion/react";

interface FormData {
    email: string;
    message: string;
    emotion: string;
    category: string;
}

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormData>({
        email: "",
        message: "",
        emotion: "",
        category: "general",
    });
    const [nepalTime, setNepalTime] = useState<string | null>(null);

    // Load Nepal time
    useEffect(() => {
        const fetchNepalTime = async () => {
            try {
                const response = await fetch(
                    `https://api.timezonedb.com/v2.1/get-time-zone?key=${process.env.NEXT_PUBLIC_TIMEZONEDB_API_KEY}&format=json&by=zone&zone=Asia/Kathmandu`
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = (await response.json()) as {
                    status: string;
                    message?: string;
                    formatted: string;
                };
                if (data.status === "OK") {
                    setNepalTime(data.formatted);
                } else {
                    throw new Error(`TimezoneDB error: ${data.message}`);
                }
            } catch (error: unknown) {
                console.error("Failed to fetch Nepal time:", error);
                setNepalTime(null);
            }
        };

        fetchNepalTime();
        const intervalId = setInterval(fetchNepalTime, 60000);
        return () => clearInterval(intervalId);
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
                    botcheck: "",
                }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setFormData({
                    email: "",
                    message: "",
                    emotion: "",
                    category: "general",
                });
                toast.success("Message sent successfully!");
                sounds.success();
            } else {
                throw new Error(data.message || `Failed to submit form`);
            }
        } catch (error: unknown) {
            toast.error("Failed to send message.");
            sounds.error();
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        sounds.tick();
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEmotionSelect = (emotion: string) => {
        sounds.click();
        setFormData((prev) => ({ ...prev, emotion }));
    };

    const handleCategorySelect = (category: string) => {
        sounds.click();
        setFormData((prev) => ({ ...prev, category }));
    };

    const getAvailabilityMessage = (): string => {
        if (!nepalTime) return "";

        const date = new Date(nepalTime);
        const hours = date.getHours();
        const day = date.getDay();

        if (day === 6) return "It's Saturday! I'm likely chilling 🍹";
        if (hours >= 23 || hours < 7) return "I'm likely sleeping 😴";
        if (hours >= 10 && hours < 17.5) return "I'm likely at college 🎓";
        return "I'm likely working 👨‍💻 or studying";
    };

    return (
        <div className="flex flex-col items-center">
            <div className="w-full max-w-[610px] px-6 py-12 space-y-12">
                <section className="space-y-6">
                    <h1 className="text-4xl font-medium tracking-tight">Contact</h1>
                    <p className="text-[17px] leading-relaxed text-foreground/80 font-normal">
                        It&apos;s currently{" "}
                        {nepalTime ? (
                            <span className="font-medium text-foreground">
                                {new Date(nepalTime).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </span>
                        ) : (
                            <span className="inline-block w-16 h-4 bg-foreground/5 rounded animate-pulse align-middle"></span>
                        )}{" "}
                        in <strong>Nepal</strong> and {getAvailabilityMessage()}. Feel free to
                        send me a message, I will get back to you as soon as possible.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-8 pt-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-foreground/60 ml-1">
                                Your email address <span className="text-foreground/30">(required)</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                onInvalid={() => sounds.warning()}
                                required
                                placeholder="laro@example.com"
                                className="w-full px-4 py-3 rounded-xl bg-foreground/5 border border-transparent focus:border-foreground/10 focus:bg-foreground/[0.08] transition-all outline-none text-[16px]"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium text-foreground/60 ml-1">
                                Your message <span className="text-foreground/30">(required)</span>
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                onInvalid={() => sounds.warning()}
                                required
                                rows={5}
                                placeholder="What's on your mind?"
                                className="w-full px-4 py-3 rounded-xl bg-foreground/5 border border-transparent focus:border-foreground/10 focus:bg-foreground/[0.08] transition-all outline-none text-[16px] resize-none"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-foreground/60 ml-1">Emotion</label>
                                <div className="flex gap-2">
                                    {["happy", "thanks", "gift"].map((e) => (
                                        <button
                                            key={e}
                                            type="button"
                                            onClick={() => handleEmotionSelect(e)}
                                            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all cursor-pointer ${formData.emotion === e
                                                ? "bg-foreground/10 border-foreground/20 scale-95"
                                                : "bg-foreground/5 hover:bg-foreground/[0.08] hover:scale-105 border-transparent active:scale-95"
                                                } border`}
                                        >
                                            <span className="text-xl">
                                                {e === "happy" ? "😍" : e === "thanks" ? "👋" : "🎁"}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-medium text-foreground/60 ml-1">Category</label>
                                <div className="flex gap-2">
                                    {["general", "help"].map((c) => (
                                        <button
                                            key={c}
                                            type="button"
                                            onClick={() => handleCategorySelect(c)}
                                            className={`px-6 h-12 rounded-xl flex items-center justify-center text-sm font-medium transition-all cursor-pointer ${formData.category === c
                                                ? "bg-foreground/10 border-foreground/20 scale-95"
                                                : "bg-foreground/5 hover:bg-foreground/[0.08] hover:scale-[1.02] border-transparent active:scale-95"
                                                } border`}
                                        >
                                            {c}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            onClick={() => !isSubmitting && sounds.click()}
                            className="group relative w-full h-14 bg-foreground text-background rounded-xl font-medium overflow-hidden transition-all cursor-pointer active:scale-[0.98] hover:brightness-110 disabled:opacity-50 disabled:active:scale-100 disabled:cursor-not-allowed"
                        >
                            <AnimatePresence mode="wait">
                                {isSubmitting ? (
                                    <motion.div
                                        key="loading"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="flex items-center justify-center gap-2"
                                    >
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>Sending...</span>
                                    </motion.div>
                                ) : (
                                    <motion.span
                                        key="idle"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                    >
                                        Send Message
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </button>
                    </form>

                    <div className="pt-8 space-y-8">
                        <div className="p-8 rounded-2xl bg-foreground/5 border border-foreground/5 text-center space-y-4">
                            <h2 className="text-2xl font-medium tracking-tight">Schedule a Call</h2>
                            <p className="text-foreground/60 text-[15px] leading-relaxed max-w-[360px] mx-auto">
                                The most efficient way to start the conversation is to book a complimentary 30-minute consultation.
                            </p>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={process.env.NEXT_PUBLIC_CALENDLY_URL || "#"}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full text-sm font-medium hover:scale-[1.02] active:scale-[0.98] transition-all"
                            >
                                Book a 30-Min Consultation
                                <ArrowUpRight className="w-4 h-4" />
                            </a>
                        </div>

                        <div className="flex flex-col items-center gap-2 text-[15px] text-foreground/60">
                            <p>You can also reach me directly at</p>
                            <a
                                href={`mailto:${process.env.NEXT_PUBLIC_ADMIN_EMAIL}`}
                                className="text-foreground font-medium underline underline-offset-4 decoration-foreground/20 hover:decoration-foreground transition-all"
                                onClick={() => sounds.click()}
                            >
                                {process.env.NEXT_PUBLIC_ADMIN_EMAIL}
                            </a>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-neutral-400 mt-8">
                        This page is inspired by{" "}
                        <a href="https://www.totaltypescript.com/contact" className="underline">
                            Total TypeScript
                        </a>{" "}
                        and
                        <a href="https://www.romanabashin.com/contact" className="underline">
                            {" "}
                            Roman Abashin
                        </a>
                    </p>
                </section>
            </div>
        </div>
    );
}

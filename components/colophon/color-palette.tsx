"use client"

import { useState } from "react"
import { sounds } from "@/lib/sounds"

export function ColorPalette() {
    const colors = [
        "#9ac372",
        "#FFD166",
        "#F7CEFF",
        "#FFD86E",
        "#4F4132",
        "#FF6F4C",
        "#84A1F0",
        "#3C905E",
        "#e5e5e5",
    ]

    const [copiedColor, setCopiedColor] = useState<string | null>(null)

    const copyToClipboard = async (color: string) => {
        try {
            await navigator.clipboard.writeText(color)
            setCopiedColor(color)
            sounds.success()
            setTimeout(() => setCopiedColor(null), 2000)
        } catch (err) {
            sounds.error()
        }
    }

    return (
        <>
            <style jsx>{`
                .container-items {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                    transform-style: preserve-3d;
                    transform: perspective(1000px);
                }

                .item-color {
                    position: relative;
                    flex-shrink: 0;
                    width: 32px;
                    height: 40px;
                    border: none;
                    outline: none;
                    transition: 500ms cubic-bezier(0.175, 0.885, 0.32, 1.1);
                    cursor: pointer;
                    background: none;
                }

                .item-color::after {
                    position: absolute;
                    content: "";
                    inset: 0;
                    width: 40px;
                    height: 40px;
                    background-color: var(--color);
                    border-radius: 6px;
                    transform: scale(1.2);
                    pointer-events: none;
                    transition: 500ms cubic-bezier(0.175, 0.885, 0.32, 1.1);
                }

                .item-color::before {
                    position: absolute;
                    content: attr(aria-color);
                    left: 65%;
                    bottom: 52px;
                    font-size: 8px;
                    line-height: 12px;
                    transform: translateX(-50%);
                    padding: 2px 0.5rem;
                    background-color: white;
                    color: #18181b;
                    border: 1px solid #e4e4e7;
                    border-radius: 6px;
                    pointer-events: none;
                    opacity: 0;
                    visibility: hidden;
                    transition: 500ms cubic-bezier(0.175, 0.885, 0.32, 1.1);
                    white-space: nowrap;
                    z-index: 99999;
                }

                :global(.dark) .item-color::before {
                    background-color: #27272a;
                    color: #fafafa;
                    border-color: #3f3f46;
                }

                .item-color:hover {
                    transform: scale(1.5);
                    z-index: 99999;
                }

                .item-color:hover::before {
                    opacity: 1;
                    visibility: visible;
                }

                .item-color:active::after {
                    transform: scale(1.1);
                }

                .item-color.copied::before {
                    content: "✅ Copied!";
                }

                .item-color:hover + * {
                    transform: scale(1.3);
                    z-index: 9999;
                }

                .item-color:hover + * + * {
                    transform: scale(1.15);
                    z-index: 999;
                }

                .item-color:has(+ *:hover) {
                    transform: scale(1.3);
                    z-index: 9999;
                }

                .item-color:has(+ * + *:hover) {
                    transform: scale(1.15);
                    z-index: 999;
                }
            `}</style>
            <div className="container-items">
                {colors.map((color) => (
                    <button
                        key={color}
                        className={`item-color ${copiedColor === color ? "copied" : ""}`}
                        style={{ "--color": color } as React.CSSProperties}
                        aria-color={color}
                        onClick={() => copyToClipboard(color)}
                        onMouseEnter={() => sounds.tick()}
                        aria-label={`Copy color ${color}`}
                    />
                ))}
            </div>
        </>
    )
}

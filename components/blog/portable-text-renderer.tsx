"use client"

import React, { useState, useEffect, useRef } from "react"
import { PortableText, type PortableTextReactComponents } from "@portabletext/react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism"
import { Copy, Check } from "lucide-react"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"
import { ImageModal, type GalleryImage } from "@/components/shared/image-modal"
import { isSanityImageSrc, sanityImageLoader } from "@/lib/sanity-image-loader"
import {
  BlogTable,
  BlogTableBody,
  BlogTableCell,
  BlogTableHead,
  BlogTableHeaderCell,
  BlogTableRow,
} from "@/components/mdx/blog-table"

const slugify = (text: string): string =>
  text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")

function PTCodeBlock({ language, code }: { language: string; code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group my-6 max-w-full">
      <SyntaxHighlighter
        PreTag="div"
        language={language}
        wrapLines
        wrapLongLines
        style={atomDark}
        className="rounded-[4px] overflow-hidden shadow-md font-mono !whitespace-pre-wrap !break-words"
        customStyle={{
          margin: 0,
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          overflowWrap: "anywhere",
        }}
        codeTagProps={{
          style: {
            fontFamily: "var(--font-jetbrains-mono)",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            overflowWrap: "anywhere",
          },
        }}
      >
        {code.replace(/\n$/, "")}
      </SyntaxHighlighter>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 rounded-[4px] bg-neutral-700 text-neutral-300 hover:bg-neutral-600 hover:text-neutral-100 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        aria-label={copied ? "Copied!" : "Copy code"}
      >
        {copied ? <Check size={12} /> : <Copy size={12} />}
      </button>
    </div>
  )
}

interface PortableTextRendererProps {
  content: any[]
}

export function PortableTextRenderer({ content }: PortableTextRendererProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)

  useEffect(() => {
    contentRef.current?.querySelectorAll("h1, h2, h3, h4").forEach((el) => {
      el.id = slugify(el.textContent || "")
    })
  }, [content])

  const handleImageClick = (src: string, alt: string) => {
    setSelectedImage({ _id: `pt-${src}`, imageURL: src, alt, order: 0 })
    setIsImageModalOpen(true)
  }

  const components: Partial<PortableTextReactComponents> = {
    block: {
      h1: ({ children }) => (
        <h1 className="font-rubik text-4xl font-bold mb-5 text-zinc-950 dark:text-zinc-50 border-b pb-4 border-zinc-200 dark:border-zinc-800">
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2 className="font-rubik text-3xl font-bold mb-4 text-zinc-900 dark:text-zinc-100">
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="font-rubik text-2xl font-bold mb-3 text-zinc-900 dark:text-zinc-100">
          {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h4 className="font-rubik text-xl font-bold mb-3 text-zinc-900 dark:text-zinc-100">
          {children}
        </h4>
      ),
      normal: ({ children }) => (
        <p className="font-roboto text-foreground text-base md:text-[17px] leading-[1.75] mb-1">
          {children}
        </p>
      ),
      blockquote: ({ children }) => (
        <blockquote className="font-roboto my-6 pl-4 border-l-2 border-zinc-200 dark:border-zinc-700 text-sm md:text-base -mt-2 mb-6 text-zinc-500 dark:text-zinc-400 leading-[1.75] italic">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="font-roboto list-disc pl-8 text-foreground leading-[1.75] text-base md:text-[17px] space-y-2">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="font-roboto list-decimal pl-8 text-zinc-700 dark:text-zinc-300 leading-[1.75] text-base md:text-[17px] space-y-2">
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => <li className="mb-1.5 pl-0.5">{children}</li>,
      number: ({ children }) => <li className="mb-1.5 pl-0.5">{children}</li>,
    },
    marks: {
      strong: ({ children }) => <strong>{children}</strong>,
      em: ({ children }) => <em>{children}</em>,
      underline: ({ children }) => <span className="underline">{children}</span>,
      "strike-through": ({ children }) => <s>{children}</s>,
      code: ({ children }) => (
        <code
          className="bg-gray-200 dark:bg-gray-700 text-green-500 px-2 py-1 rounded font-mono text-sm break-words whitespace-pre-wrap"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          {children}
        </code>
      ),
      link: ({ value, children }) => {
        const href = value?.href || ""
        const isExternal = href.startsWith("http")
        return (
          <a
            href={href}
            className="text-blue-600 dark:text-blue-400 hover:underline transition-colors"
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
          >
            {children}
          </a>
        )
      },
    },
    types: {
      code: ({ value }: { value: { language?: string; code?: string } }) => (
        <PTCodeBlock language={value.language || "text"} code={value.code || ""} />
      ),
      captionedImage: ({ value }: { value: { image?: any; alt?: string; caption?: string } }) => {
        if (!value.image) return null
        const imageUrl = urlFor(value.image).width(1200).quality(85).auto("format").url()
        const alt = value.alt || ""

        return (
          <figure className="my-6">
            <div
              className="relative group w-full aspect-video cursor-zoom-in rounded-md overflow-hidden bg-zinc-100 dark:bg-zinc-900"
              onClick={() => handleImageClick(imageUrl, alt)}
            >
              <Image
                src={imageUrl}
                alt={alt}
                fill
                sizes="(max-width: 768px) 100vw, 720px"
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-[1.01]"
                loader={isSanityImageSrc(imageUrl) ? sanityImageLoader : undefined}
                quality={85}
              />
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300 pointer-events-none" />
            </div>
            {value.caption ? (
              <figcaption className="mt-2 text-center text-sm text-zinc-500 dark:text-zinc-400">
                {value.caption}
              </figcaption>
            ) : (
              <span className="block text-center text-xs text-gray-400 mt-1 select-none">
                Click to zoom
              </span>
            )}
          </figure>
        )
      },
      table: ({ value }: { value: { rows?: { cells?: string[] }[] } }) => {
        const rows = value.rows || []
        if (rows.length === 0) return null

        return (
          <BlogTable>
            <BlogTableHead>
              <BlogTableRow>
                {(rows[0]?.cells || []).map((cell: string, i: number) => (
                  <BlogTableHeaderCell key={i}>{cell}</BlogTableHeaderCell>
                ))}
              </BlogTableRow>
            </BlogTableHead>
            <BlogTableBody>
              {rows.slice(1).map((row, i: number) => (
                <BlogTableRow key={i}>
                  {(row.cells || []).map((cell: string, j: number) => (
                    <BlogTableCell key={j}>{cell}</BlogTableCell>
                  ))}
                </BlogTableRow>
              ))}
            </BlogTableBody>
          </BlogTable>
        )
      },
    },
    hardBreak: () => <br />,
  }

  return (
    <div className="py-6">
      <ImageModal
        image={selectedImage}
        open={isImageModalOpen}
        onOpenChange={setIsImageModalOpen}
      />
      <div ref={contentRef} className="blog-post-prose">
        <PortableText value={content} components={components} />
      </div>
    </div>
  )
}

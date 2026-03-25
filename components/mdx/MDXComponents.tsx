"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Copy, Check } from 'lucide-react';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Image from 'next/image';
import { ImageModal, type GalleryImage } from "@/components/ImageModal";


const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

interface CodeBlockProps {
  language: string;
  children: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, children }) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6">
      <SyntaxHighlighter
        PreTag="div"
        language={language}
        wrapLines={true}
        style={atomDark}
        className="rounded-[4px] overflow-hidden shadow-md font-mono"
        codeTagProps={{
          style: {
            fontFamily: 'var(--font-jetbrains-mono)',
          },
        }}
      >
        {children.replace(/\n$/, '')}
      </SyntaxHighlighter>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-2 rounded-[4px] bg-neutral-700 text-neutral-300 hover:bg-neutral-600 hover:text-neutral-100 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        aria-label={copied ? "Copied!" : "Copy code"}
      >
        {copied ? <Check size={12} /> : <Copy size={12} />}
      </button>
    </div>
  );
};

interface TocItem {
  id: string;
  text: string;
  level: number;
}



interface MDXComponentsProps {
  content: string;
}

export const MDXComponents: React.FC<MDXComponentsProps> = ({ content }) => {
  const [toc, setToc] = useState<TocItem[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  useEffect(() => {
    const headings: TocItem[] = [];
    const headingElements = contentRef.current?.querySelectorAll("h1, h2, h3, h4");

    headingElements?.forEach((element) => {
      const level = parseInt(element.tagName.substring(1), 10);
      const text = element.textContent || "";
      const id = slugify(text);
      element.id = id;
      headings.push({ id, text, level });
    });

    setToc(headings);
  }, [content]);

  const handleImagePreviewClick = (src: string, alt: string) => {
    setSelectedImage({
      _id: `mdx-${src}`,
      imageURL: src,
      alt,
      order: 0,
    });
    setIsImageModalOpen(true);
  };

  return (
    <div className="py-6">
      <ImageModal image={selectedImage} open={isImageModalOpen} onOpenChange={setIsImageModalOpen} />
      <div ref={contentRef} className="space-y-6">
        <Markdown
          rehypePlugins={[rehypeRaw]}
          components={{
            h1: ({ children }) => {
              const id = children ? slugify(children.toString()) : '';
              return (
                <h1 id={id} className="text-4xl mt-10 mb-4 text-zinc-950 dark:text-zinc-50 border-b pb-4 border-zinc-200 dark:border-zinc-800">
                  {children}
                </h1>
              );
            },
            h2: ({ children }) => {
              const id = children ? slugify(children.toString()) : '';
              return (
                <h2 id={id} className="text-3xl mt-8 mb-4 text-zinc-900 dark:text-zinc-100">
                  {children}
                </h2>
              );
            },
            h3: ({ children }) => {
              const id = children ? slugify(children.toString()) : '';
              return (
                <h3 id={id} className="text-2xl mt-6 mb-3 text-zinc-900 dark:text-zinc-100">
                  {children}
                </h3>
              );
            },
            h4: ({ children }) => {
              const id = children ? slugify(children.toString()) : '';
              return (
                <h4 id={id} className="text-xl font-semibold mt-6 mb-3 text-zinc-900 dark:text-zinc-100">
                  {children}
                </h4>
              );
            },
            p: ({ children }) => (
              <p className="text-foreground leading-normal text-sm md:text-base">
                {children}
              </p>
            ),
            ul: ({ children }) => (
              <ul className="list-disc pl-8 text-foreground leading-normal text-sm md:text-base space-y-2">
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal pl-8 text-zinc-700 dark:text-zinc-300 leading-normal space-y-2">
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li className="mb-2">{children}</li>
            ),
            blockquote: ({ children }) => (
              <blockquote className="my-5 pl-4 font-jetbrains-mono text-sm -mt-6 mb-4 text-zinc-400 dark:text-zinc-300">
                {children}
              </blockquote>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                className="text-blue-600 dark:text-blue-400 hover:underline transition-colors"
                target={href?.startsWith('http') ? '_blank' : undefined}
                rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {children}
              </a>
            ),
            img: ({ src, alt }) => {
              const imageSrc = typeof src === "string" ? src : "";
              const imageAlt = typeof alt === "string" ? alt : "";

              return (
                <>
                  <div className="relative group my-6 w-full aspect-video cursor-zoom-in rounded-md overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                    <Image
                      src={imageSrc}
                      alt={imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 768px"
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-[1.01]"
                      onClick={() => imageSrc && handleImagePreviewClick(imageSrc, imageAlt)}
                      style={{ background: '#fff' }}
                    />

                    {/* hover overlay */}
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-300 pointer-events-none" />
                  </div>

                  <span className="block text-center text-xs text-gray-400 -mt-5 select-none">Click to zoom</span>
                </>
              );
            },
            hr: () => (
              <hr className="my-8 border-gray-200 dark:border-gray-700" />
            ),
            table: ({ children }) => (
              <div className="overflow-x-auto my-6 rounded-lg shadow-md">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 rounded-lg overflow-hidden">
                  {children}
                </table>
              </div>
            ),
            thead: ({ children }) => (
              <thead className="bg-gray-50 dark:bg-gray-800">
                {children}
              </thead>
            ),
            tbody: ({ children }) => (
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {children}
              </tbody>
            ),
            tr: ({ children }) => (
              <tr>{children}</tr>
            ),
            th: ({ children }) => (
              <th className="px-8 py-4 text-left text-sm font-medium text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="px-8 py-4 whitespace-nowrap text-sm text-zinc-700 dark:text-zinc-300">
                {children}
              </td>
            ),
            code({ node, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');

              return match ? (
                <CodeBlock language={match[1]}>
                  {String(children).replace(/\n$/, '')}
                </CodeBlock>
              ) : (
                <code
                  {...props}
                  className="bg-gray-200 dark:bg-gray-700 text-pink-500 px-2 py-1 rounded font-mono text-sm"
                  style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
                >
                  {children}
                </code>
              );
            },
            pre: ({ children }) => (
              <pre className="my-0">{children}</pre>
            ),
          }}
        >
          {content}
        </Markdown>
      </div>
    </div>
  );
};
import Link from "next/link"
import Image from "next/image"
import { MessageCircle, Share2, MoreHorizontal } from "lucide-react"
import { MDXComponents } from "./mdx/MDXComponents"
import Comments from "./Comments"

interface BlogPostProps {
  title: string
  date: string
  content: string
  category?: string[]
  summary?: string
  author?: {
    name: string
    role: string
    avatar: string
    bio: string
  }
  image?: string
}

export function BlogPost({ title, date, content, category = ["TECH", "DESIGN"], summary, author, image }: BlogPostProps) {
  return (
    <main className="w-full max-w-[910px] -mt-16 mx-auto pb-24">
      {/* Top Tags */}
      <div className="flex gap-4 mb-4">
        {category.map((tag) => (
          <span key={tag} className="text-[10px] font-black tracking-widest text-[#5C2BFF]/80 uppercase">
            {tag}
          </span>
        ))}
      </div>

      {/* Main Title */}
      <h1 className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight text-zinc-950 dark:text-zinc-50 mb-8 max-w-[800px]">
        {title}
      </h1>

      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 mb-12 items-start">
        {/* Left: Image Container */}
        <div className="space-y-3">
          <div className="relative aspect-[16/10] bg-zinc-100 rounded-sm border border-zinc-100 overflow-hidden group">
            <Image
              src={image || "/images/placeholder.jpg"}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* <p className="text-[11px] text-zinc-500 italic leading-relaxed">
            The future of building. Photo by <span className="underline cursor-pointer">{author?.name || "Manish Tamang"}</span>
          </p> */}
        </div>
        <div className="flex flex-col h-full h-auto">
          {summary && (
            <p className="text-zinc-800 dark:text-zinc-300 leading-normal border-l-2 border-[#5C2BFF] pl-6 mb-2 mt-2">
              {summary.split(/\s+/).slice(0, 30).join(" ")}
              {summary.split(/\s+/).length > 60 && "…"}
            </p>
          )}

          <div className="mt-auto pt-2 border-t border-zinc-100">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">by</span>
              <span className="text-xs font-bold text-[#5C2BFF] cursor-pointer hover:underline">
                {author?.name || "Manish Tamang"}
              </span>
            </div>
            <time className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider block mb-6 px-1">
              {date ? new Date(date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
                timeZoneName: "short"
              }) : "No date"}
            </time>
            <div className="flex items-center gap-6 text-zinc-400">
              <button className="hover:text-zinc-600 transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-1.5 hover:text-zinc-600 transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span className="text-xs font-bold">28</span>
              </button>
              <button className="hover:text-zinc-600 transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {author && (
        <div className="w-full bg-[#f9f9f9] dark:bg-zinc-900/50 border-y border-zinc-100 dark:border-zinc-800 py-6 px-1 lg:px-0 ">
          <div className="flex items-center gap-4 max-w-[600px]">
            <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-zinc-200 dark:border-zinc-800">
              <Image src="/images/profile.png" alt={author.name} fill className="object-cover" />
            </div>
            <div>
              <p className="text-[11px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                <span className="font-bold text-zinc-900 dark:text-zinc-100">{author.name}</span> is {author.role}. {author.bio}
              </p>
            </div>
          </div>
        </div>
      )}

      <article className="max-w-[720px] p-0 md:p-6 mx-auto">
        <MDXComponents content={content} />
        <Comments  />
      </article>
    </main>
  )
}

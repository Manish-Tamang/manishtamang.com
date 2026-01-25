import Link from "next/link"
import { format } from "date-fns"

interface Post {
  title?: string
  slug?: { current?: string }
  excerpt?: string
  date?: string
}

interface BlogListProps {
  posts: Post[]
}

export function BlogList({ posts }: BlogListProps) {
  return (
    <main className="space-y-4 -mt-12">
      <div className="">
        <h1 className="text-2xl font-medium">Blog</h1>
      </div>
      {posts.map((post) => (
        <Link
          key={post.slug?.current}
          href={`/blog/${post.slug?.current}`}
          className="block border border-border rounded-square p-6 transition-colors hover:border-foreground"
        >
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-lg font-medium">{post.title}</h2>
            <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">
              {post.date ? format(new Date(post.date), "MMM d, yyyy") : "No date"}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{post.excerpt}</p>
        </Link>
      ))}
    </main>
  )
}

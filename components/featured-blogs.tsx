import { sanityFetch } from "@/sanity/lib/live"
import { FEATURED_POSTS_QUERY } from "@/sanity/lib/queries"
import { BlogCard } from "./blog-card"

export async function FeaturedBlogs() {
    const { data: posts } = await sanityFetch({ query: FEATURED_POSTS_QUERY })
    return (
        <section className="w-[680px] mt-6 mb-8">
            <div className="flex h-[350px]">
                <div className="rounded-md p-2 pb-0 flex flex-col items-start relative overflow-hidden">
                    <h2 className="text-2xl font-bold mb-6 tracking-tight ml-12">Latest from Blog</h2>
                    <div className="flex justify-center gap-2 w-full px-2 items-end mt-auto -mb-12">
                        {posts.map((blog: any, i: number) => (
                            <BlogCard key={blog.slug} blog={blog} index={i} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

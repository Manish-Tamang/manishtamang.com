import { BlogCard, MobileBlogItem } from "./blog-card"

interface FeaturedBlogsProps {
    posts: any[]
}

export function FeaturedBlogs({ posts }: FeaturedBlogsProps) {
    return (
        <section className="max-w-[720px] w-full mt-6 mb-8 px-4">
            <div className="flex flex-col md:h-[350px]">
                <div className="rounded-md p-2 pb-0 flex flex-col items-start relative overflow-hidden">
                    <h2 className="mb-6 text-left text-2xl font-semibold ml-0 md:ml-12 w-full">Latest from Blog</h2>
                    <div className="hidden md:flex flex-row justify-center gap-2 w-full px-2 items-end mt-auto -mb-12">
                        {posts.map((blog: any, i: number) => (
                            <BlogCard key={blog.slug?.current || blog.slug} blog={blog} index={i} />
                        ))}
                    </div>
                    <div className="flex md:hidden flex-col gap-4 w-full">
                        {posts?.map((blog: any) => (
                            <MobileBlogItem key={blog.slug?.current || blog.slug} blog={blog} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

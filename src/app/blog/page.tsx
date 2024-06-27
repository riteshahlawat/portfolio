import { allBlogPosts, BlogPost } from "contentlayer/generated";
import { compareDesc, format, parseISO } from "date-fns";
import BlogCard from "../_components/blog/blog-card";

export default async function Blog() {
    const posts = allBlogPosts.sort((a, b) =>
        compareDesc(new Date(a.date), new Date(b.date)),
    );

    return (
        <main className="min-h-screen bg-zinc-900 py-8 text-zinc-400 selection:bg-[#6140f5c9]">
            <div className="container mx-auto flex flex-col items-center">
                <h2 className="w-full border-b border-b-zinc-700 text-2xl text-zinc-300">
                    Blog
                </h2>
                <div className="flex w-full flex-row flex-wrap gap-2">
                    {posts.map((post) => (
                        <BlogCard blogPost={post} key={post._id} />
                    ))}
                </div>
            </div>
        </main>
    );
}

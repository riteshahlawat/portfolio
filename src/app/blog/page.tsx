import { allBlogPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import BlogCard from "../_components/blog/blog-card";

export default async function Blog() {
    const posts = allBlogPosts.sort((a, b) =>
        compareDesc(new Date(a.date), new Date(b.date)),
    );

    return (
        <div className="container mx-auto flex w-full flex-row flex-wrap gap-6 pt-16">
            {posts.map((post) => (
                <BlogCard blogPost={post} key={post._id} />
            ))}
        </div>
    );
}

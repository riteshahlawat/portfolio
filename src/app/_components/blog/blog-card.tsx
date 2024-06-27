import { BlogPost } from "contentlayer/generated";

export default function BlogCard({ blogPost }: { blogPost: BlogPost }) {
    return <div>{blogPost.title}</div>;
}

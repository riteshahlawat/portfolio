import BlogViewCount from "@/app/_components/blog/blog-view-count";
import MarkdownRenderer from "@/app/_components/markdown-renderer";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { allBlogPosts } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import { Open_Sans } from "next/font/google";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const openSans = Open_Sans({ subsets: ["latin"] });

export const generateStaticParams = async () => {
    return allBlogPosts.map((post) => ({ slug: post._raw.flattenedPath }));
};

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
    const post = allBlogPosts.find(
        (post) => post._raw.flattenedPath === params.slug,
    );
    if (!post) return { title: "Not found" };

    return { title: post.title };
};
export default function BlogPost({ params }: { params: { slug: string } }) {
    const post = allBlogPosts.find(
        (post) => post._raw.flattenedPath === params.slug,
    );

    if (!post) {
        notFound();
    }

    return (
        <article
            className={cn(
                openSans.className,
                "mx-auto max-w-[768px] pb-24 pt-6 md:pt-20",
            )}
        >
            <div className="relative h-auto w-full overflow-hidden rounded-none md:rounded-md">
                <Image
                    src={post.image}
                    priority={true}
                    alt="Image"
                    width={1920}
                    height={1080}
                    style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "cover",
                        objectPosition: "center",
                    }}
                />
            </div>
            <div className="mt-4 px-4">
                <h1 className="text-2xl font-bold text-zinc-50">
                    {post.title}
                </h1>
                <div className="flex w-full flex-row justify-between text-[15px] font-bold">
                    <p>
                        {format(parseISO(post.date), "LLL d, yyyy")} ·{" "}
                        {post.readTimeMinutes} min read
                    </p>
                    <Suspense fallback={<Spinner size="small" />}>
                        <BlogViewCount slug={params.slug} />
                    </Suspense>
                </div>
            </div>
            <div className="mt-12 px-4  font-medium text-zinc-200 ">
                <MarkdownRenderer content={post.body.raw} />
            </div>
        </article>
    );
}

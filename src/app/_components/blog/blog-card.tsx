import { cn } from "@/lib/utils";
import type { BlogPost } from "contentlayer/generated";
import { format, parseISO } from "date-fns";
import { CalendarDays, Coffee, Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import BlogViewCount from "./blog-view-count";

export default async function BlogCard({ blogPost }: { blogPost: BlogPost }) {
    return (
        <Link href={blogPost.url}>
            <div
                className={cn(
                    "group bg-zinc-850 mt-2 w-fit overflow-hidden rounded-md px-2 pt-3 pb-6 transition-all duration-300 hover:bg-zinc-800 hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] hover:drop-shadow-lg",
                )}
            >
                <div className="h-auto w-full overflow-hidden md:w-[400px]">
                    <Image
                        src={blogPost.image}
                        width={1000}
                        height={0}
                        preload
                        style={{
                            width: "100%",
                            height: "auto",
                            objectFit: "cover",
                            objectPosition: "center",
                        }}
                        alt="Blog post cover image"
                    />
                </div>
                <div className="flex flex-col px-2 md:max-w-[400px]">
                    <div className="mt-2 flex flex-row items-start gap-2 text-zinc-500">
                        <div className="flex flex-row items-start gap-1">
                            <CalendarDays className="size-[18px]" />
                            <time
                                dateTime={blogPost.date}
                                className="text-sm font-semibold"
                            >
                                {format(parseISO(blogPost.date), "d LLL yyyy")}
                            </time>
                        </div>

                        <div className="flex flex-row items-start gap-1">
                            <Coffee className="size-[18px]" />
                            <p className="text-sm font-semibold">
                                {blogPost.readTimeMinutes} min read
                            </p>
                        </div>
                        <div className="flex flex-row items-start gap-1">
                            <Eye className="size-[18px]" />
                            <p className="text-sm font-semibold">
                                <BlogViewCount
                                    slug={blogPost._raw.flattenedPath}
                                    increment={false}
                                    variant="compact"
                                />
                            </p>
                        </div>
                    </div>
                    <h3 className="mt-4 text-2xl font-bold text-zinc-300">
                        {blogPost.title}
                    </h3>
                    <p className="mt-1 text-ellipsis">{blogPost.description}</p>
                </div>
            </div>
        </Link>
    );
}

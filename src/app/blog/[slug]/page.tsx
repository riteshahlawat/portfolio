import BookmarkRibbon from "@/app/_components/bookmark-ribbon";
import CopyCitation from "@/app/_components/copy-citation";
import ExpandableImage from "@/app/_components/expandable-image";
import PostMarkdown from "@/app/_components/post-markdown";
import ViewCount from "@/app/_stacks/view-count";
import { allBlogPosts } from "contentlayer/generated";
import { compareAsc, format, parseISO } from "date-fns";
import Link from "next/link";
import { notFound } from "next/navigation";

type BlogPostPageProps = {
    params: Promise<{ slug: string }>;
};

const chronological = [...allBlogPosts].sort((a, b) =>
    compareAsc(new Date(a.date), new Date(b.date)),
);

const PARADISE_SLUG = "there-is-no-paradise-for-you-to-escape-to";

const applyEggHooks = (slug: string, raw: string) => {
    if (slug !== PARADISE_SLUG) return raw;
    return raw
        .replace("El Dorado is not real.", "[El Dorado](/el-dorado) is not real.")
        .replace(
            "supposed to build here?",
            "supposed to build [here](/here)?",
        );
};

export const generateStaticParams = () => {
    return allBlogPosts.map((post) => ({ slug: post._raw.flattenedPath }));
};

export const generateMetadata = async ({ params }: BlogPostPageProps) => {
    const { slug } = await params;
    const post = allBlogPosts.find((post) => post._raw.flattenedPath === slug);
    if (!post) return { title: "Not found" };

    return {
        title: post.title,
        description: post.description,
    };
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const index = chronological.findIndex(
        (post) => post._raw.flattenedPath === slug,
    );
    const post = chronological[index];

    if (!post) {
        notFound();
    }

    const idx = String(index + 1).padStart(3, "0");
    const previous = index > 0 ? chronological[index - 1] : undefined;
    const next =
        index < chronological.length - 1 ? chronological[index + 1] : undefined;

    const label = (target: (typeof chronological)[number]) =>
        `nº ${String(chronological.indexOf(target) + 1).padStart(3, "0")} · ${(
            target.shortTitle ?? target.title
        ).toLowerCase()}`;

    return (
        <main className="relative mx-auto w-full max-w-[720px] flex-1 px-5 sm:px-8">
            <BookmarkRibbon />
            <CopyCitation idx={idx} title={post.title} slug={slug} />
            <div className="pt-14">
                <p className="m-0 font-mono text-[12px] text-[#57544e]">
                    <Link href="/" className="text-[#7a7770] hover:text-[#a89bff]">
                        library
                    </Link>{" "}
                    / nº {idx}
                </p>
                <h1 className="mt-5 mb-0 font-serif text-[38px] leading-[1.2] font-normal text-[#f2efe8] italic [text-wrap:pretty]">
                    {post.title}
                </h1>
                <div className="mt-[14px] flex flex-wrap gap-x-[14px] gap-y-1 text-[12.5px] text-[#7a7770]">
                    <span>
                        {format(parseISO(post.date), "MMM d, yyyy").toLowerCase()}
                    </span>
                    <span className="text-[#3a3a3e]">·</span>
                    <span>{post.readTimeMinutes} min</span>
                    <span className="text-[#3a3a3e]">·</span>
                    <span>
                        <ViewCount slug={slug} variant="full" increment />
                    </span>
                </div>
                <div className="relative mt-9 overflow-hidden rounded-[10px] border border-[rgba(255,255,255,.07)]">
                    <ExpandableImage
                        src={post.image}
                        alt={post.title}
                        width={1376}
                        height={774}
                        priority
                        className="block h-auto w-full [filter:saturate(.82)_brightness(.85)_contrast(1.02)]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(14,14,16,.35)] to-transparent" />
                </div>
            </div>
            <div className="pt-9 pb-5">
                <PostMarkdown
                    content={applyEggHooks(slug, post.body.raw)}
                    dropCap={post.dropCap}
                    quoteAccent={post.quoteAccent}
                />
            </div>
            <div className="flex flex-col gap-3 border-t border-[rgba(255,255,255,.07)] pt-[26px] text-[13px] sm:flex-row sm:justify-between sm:gap-4">
                {previous ? (
                    <Link
                        href={previous.url}
                        className="text-[#7a7770] hover:text-[#8b7cf8]"
                    >
                        ← {label(previous)}
                    </Link>
                ) : (
                    <Link
                        href="/blog/000"
                        className="text-[#2e2d31] hover:text-[#57544e]"
                    >
                        ← there is nothing before the first post
                    </Link>
                )}
                {next ? (
                    <Link
                        href={next.url}
                        className="text-[#7a7770] hover:text-[#8b7cf8]"
                    >
                        {label(next)} →
                    </Link>
                ) : (
                    <Link
                        href="/"
                        className="text-[#7a7770] hover:text-[#8b7cf8]"
                    >
                        back to the library
                    </Link>
                )}
            </div>
        </main>
    );
}

"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import Bookshelf from "./_components/bookshelf";
import { useStacks } from "./_stacks/providers";
import ViewCount from "./_stacks/view-count";

export type LibraryPost = {
    slug: string;
    idx: string;
    title: string;
    tag: string;
    year: string;
    dateISO: string;
    dateLabel: string;
    readTimeMinutes: number;
};

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

// Past this many posts, older years collapse to a single line.
const COLLAPSE_THRESHOLD = 25;

export default function LibraryClient({ posts }: { posts: LibraryPost[] }) {
    const [filter, setFilter] = useState("all");
    const [openYears, setOpenYears] = useState<string[]>([]);
    const { catTail } = useStacks();
    const reducedMotion = useReducedMotion();

    const tags = useMemo(() => {
        const seen: string[] = [];
        for (const post of posts) {
            if (!seen.includes(post.tag)) seen.push(post.tag);
        }
        return seen;
    }, [posts]);

    const chips = [
        { id: "all", label: `all · ${posts.length}` },
        ...tags.map((tag) => ({ id: tag, label: tag })),
    ];

    const visible = posts.filter(
        (post) => filter === "all" || post.tag === filter,
    );
    const years = useMemo(() => {
        const order: string[] = [];
        for (const post of visible) {
            if (!order.includes(post.year)) order.push(post.year);
        }
        return order.map((year) => ({
            year,
            posts: visible.filter((post) => post.year === year),
        }));
    }, [visible]);

    return (
        <main className="mx-auto w-full max-w-[1000px] flex-1 px-5 sm:px-8">
            <div className="flex flex-wrap items-end justify-between gap-10 pt-16 pb-9">
                <h1 className="m-0 max-w-[20ch] font-serif text-[clamp(28px,9vw,42px)] leading-[1.2] font-normal [text-wrap:pretty] text-[#f2efe8] italic">
                    Maybe one day I&apos;ll be good at writing.{catTail}
                </h1>
                <p className="m-0 mb-2 text-left text-[13px] leading-[1.7] text-[#7a7770] sm:text-right">
                    engineer @{" "}
                    <a
                        href="https://mercury.com"
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#c9c6bf] no-underline hover:text-[#a89bff]"
                    >
                        mercury
                    </a>{" "}
                    · i run{" "}
                    <a
                        href="https://aranova.io/"
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#8b7cf8] underline underline-offset-[3px] hover:text-[#a89bff]"
                    >
                        aranova
                    </a>
                </p>
            </div>

            <div className="flex flex-wrap items-center gap-[10px] pb-[30px]">
                {chips.map((chip) => {
                    const active = filter === chip.id;
                    return (
                        <button
                            key={chip.id}
                            onClick={() => setFilter(chip.id)}
                            className="relative isolate min-h-[34px] cursor-pointer rounded-full border px-[14px] py-[7px] font-mono text-[12px] font-medium whitespace-nowrap"
                            style={{
                                color: active ? "#0e0e10" : "#a5a29a",
                                borderColor: active
                                    ? "#8b7cf8"
                                    : "rgba(255,255,255,.14)",
                            }}
                        >
                            {active && (
                                <motion.span
                                    layoutId="chip"
                                    className="absolute inset-0 -z-10 rounded-full bg-[#8b7cf8]"
                                    transition={{
                                        duration: reducedMotion ? 0 : 0.3,
                                        ease: EASE_OUT,
                                    }}
                                />
                            )}
                            {chip.label}
                        </button>
                    );
                })}
            </div>

            <motion.div
                initial={reducedMotion ? false : "hidden"}
                animate="show"
                variants={{
                    show: { transition: { staggerChildren: 0.04 } },
                }}
            >
                {years.map((group, groupIndex) => {
                    const collapsed =
                        posts.length > COLLAPSE_THRESHOLD &&
                        groupIndex > 0 &&
                        !openYears.includes(group.year);
                    if (collapsed) {
                        return (
                            <button
                                key={group.year}
                                onClick={() =>
                                    setOpenYears((open) => [
                                        ...open,
                                        group.year,
                                    ])
                                }
                                className="flex w-full cursor-pointer items-baseline gap-3 border-b border-[rgba(255,255,255,.06)] py-4 text-left hover:bg-[rgba(139,124,248,.05)]"
                            >
                                <span className="font-mono text-[11px] font-medium tracking-[.14em] text-[#57544e]">
                                    {group.year}
                                </span>
                                <span className="font-mono text-[12px] text-[#7a7770]">
                                    · {group.posts.length} essay
                                    {group.posts.length === 1 ? "" : "s"}
                                </span>
                            </button>
                        );
                    }
                    return (
                        <div key={group.year} className="mb-[14px]">
                            <p className="m-0 mb-[2px] font-mono text-[11px] font-medium tracking-[.14em] text-[#57544e]">
                                {group.year}
                            </p>
                            <AnimatePresence initial={false}>
                                {group.posts.map((post) => (
                                    <motion.div
                                        key={post.slug}
                                        layout={!reducedMotion}
                                        variants={{
                                            hidden: { opacity: 0, y: 10 },
                                            show: {
                                                opacity: 1,
                                                y: 0,
                                                transition: {
                                                    duration: 0.4,
                                                    ease: EASE_OUT,
                                                },
                                            },
                                        }}
                                        exit={{
                                            opacity: 0,
                                            height: 0,
                                            transition: { duration: 0.25 },
                                        }}
                                        className="overflow-hidden"
                                    >
                                        <Link
                                            href={`/blog/${post.slug}`}
                                            className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-[rgba(255,255,255,.06)] py-4 hover:bg-[rgba(139,124,248,.05)]"
                                        >
                                            <span className="w-9 flex-none font-mono text-[12px] text-[#57544e]">
                                                {post.idx}
                                            </span>
                                            <span className="min-w-[200px] flex-1 font-serif text-[20px] font-normal text-[#e8e5dd] italic">
                                                {post.title}
                                            </span>
                                            <span className="flex-none text-[11.5px] text-[#8b7cf8]">
                                                {post.tag}
                                            </span>
                                            <span className="flex-none text-left font-mono text-[12px] whitespace-nowrap text-[#57544e] sm:w-[112px] sm:text-right">
                                                {post.dateLabel} ·{" "}
                                                <ViewCount
                                                    slug={post.slug}
                                                    variant="compact"
                                                />
                                            </span>
                                        </Link>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </motion.div>

            <div className="pt-11 pb-[10px]">
                <p className="m-0 font-mono text-[11px] font-medium tracking-[.14em] text-[#57544e]">
                    START HERE · THE SHELF
                </p>
                <div className="mt-5">
                    <Bookshelf posts={posts} />
                </div>
            </div>

            <div className="flex flex-col items-center gap-3 pt-14 pb-2">
                <Image
                    src="/images/brand/cat-book-mark.png"
                    alt="a cat asleep on an open book"
                    width={84}
                    height={84}
                    className="block rounded-[10px] opacity-90"
                />
                <p className="m-0 font-mono text-[10px] tracking-[.2em] text-[#3a3a3e]">
                    THE STACKS
                </p>
            </div>
        </main>
    );
}

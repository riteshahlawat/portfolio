"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useStacks } from "../_stacks/providers";
import { type LibraryPost } from "../library-client";
import { hashString, spineMetrics, type Spine } from "./spine-data";

const BOOKS_PER_SHELF = 8;
// A second bay opens once the collection earns it.
const TWO_BAY_THRESHOLD = 50;

type Book = LibraryPost & {
    width: number;
    height: number;
    spine: Spine;
    lean: number;
    age: number; // 0 fresh → 1 at ~3 years
    dusty: boolean;
};

const toBook = (post: LibraryPost, index: number, count: number): Book => {
    const hash = hashString(post.slug);
    const metrics = spineMetrics(post.slug);
    const shelfPosition = index % BOOKS_PER_SHELF;
    const isLastOnShelf =
        shelfPosition === BOOKS_PER_SHELF - 1 || index === count - 1;
    const leans = !isLastOnShelf && hash % 4 === 0;
    const ageMs = Date.now() - new Date(post.dateISO).getTime();
    // Two-decimal buckets keep the SSR and client renders byte-identical.
    const age =
        Math.round(
            Math.min(Math.max(ageMs / (3 * 365 * 24 * 3600 * 1000), 0), 1) *
                100,
        ) / 100;
    return {
        ...post,
        ...metrics,
        lean: leans ? ((hash >> 9) % 2 === 0 ? 7 : -7) : 0,
        age,
        dusty: ageMs > 18 * 30 * 24 * 3600 * 1000,
    };
};

/**
 * Click → the spine lifts off the shelf, opens toward the reader, and
 * washes out into the page background while the post loads behind it.
 */
function BookSpine({ book }: { book: Book }) {
    const reducedMotion = useReducedMotion();
    const router = useRouter();
    const ref = useRef<HTMLAnchorElement | null>(null);
    const [opening, setOpening] = useState<{
        top: number;
        left: number;
        width: number;
        height: number;
    } | null>(null);

    const href = `/blog/${book.slug}`;

    const open = (event: React.MouseEvent) => {
        if (reducedMotion || !ref.current || event.metaKey || event.ctrlKey) {
            return; // plain navigation
        }
        event.preventDefault();
        const rect = ref.current.getBoundingClientRect();
        setOpening({
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
        });
        router.prefetch(href);
        setTimeout(() => router.push(href), 430);
    };

    return (
        <>
            <motion.div
                style={{
                    width: book.width,
                    height: book.height,
                    rotate: book.lean,
                    transformOrigin:
                        book.lean > 0 ? "bottom right" : "bottom left",
                    zIndex: book.lean === 0 ? 1 : 0,
                }}
                whileHover={reducedMotion ? undefined : { y: -10, rotate: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 24 }}
                className="group flex-none"
            >
                <Link
                    ref={ref}
                    href={href}
                    title={book.title}
                    onClick={open}
                    className="relative flex h-full w-full flex-col items-center overflow-hidden rounded-[3px] rounded-b-[1px] shadow-[inset_2px_0_4px_rgba(255,255,255,.06),inset_-3px_0_6px_rgba(0,0,0,.45),0_2px_8px_rgba(0,0,0,.5)]"
                    style={{
                        background: book.spine.background,
                        filter: `saturate(${1 - 0.25 * book.age}) brightness(${1 - 0.1 * book.age})`,
                        opacity: opening ? 0 : 1,
                    }}
                >
                    {book.dusty && (
                        <span className="absolute top-0 right-[3px] left-[3px] block h-[2px] rounded-full bg-[rgba(255,255,255,.06)] transition-opacity duration-200 group-hover:opacity-0" />
                    )}
                    <span
                        className="mt-[10px] block h-[3px] w-[calc(100%-12px)] flex-none rounded-full"
                        style={{ background: book.spine.band }}
                    />
                    <span className="mt-2 block min-h-0 flex-1 overflow-hidden font-serif text-[13.5px] leading-none font-normal text-[#e8e5dd] italic [text-orientation:mixed] [writing-mode:vertical-rl]">
                        {book.title}
                    </span>
                    <span
                        className="mt-1 mb-2 block flex-none font-mono text-[9px]"
                        style={{ color: book.spine.meta }}
                    >
                        {book.idx}
                    </span>
                    <span
                        className="mb-[8px] block h-[3px] w-[calc(100%-12px)] flex-none rounded-full"
                        style={{ background: book.spine.band }}
                    />
                </Link>
            </motion.div>
            {opening &&
                createPortal(
                    <div className="pointer-events-none fixed inset-0 z-[120] [perspective:1200px]">
                        <motion.div
                            initial={{
                                top: opening.top,
                                left: opening.left,
                                width: opening.width,
                                height: opening.height,
                                rotateY: 0,
                                opacity: 1,
                                borderRadius: 3,
                            }}
                            animate={{
                                top: Math.max(opening.top - 140, 60),
                                left: Math.max(
                                    (typeof window !== "undefined"
                                        ? window.innerWidth
                                        : 1200) /
                                        2 -
                                        (opening.width * 4) / 2,
                                    24,
                                ),
                                width: opening.width * 4,
                                height: opening.height * 2.2,
                                rotateY: -74,
                                opacity: 0,
                                borderRadius: 8,
                            }}
                            transition={{
                                duration: 0.55,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            style={{
                                position: "absolute",
                                transformOrigin: "left center",
                                background: book.spine.background,
                                boxShadow: "0 30px 80px rgba(0,0,0,.6)",
                            }}
                        />
                    </div>,
                    document.body,
                )}
        </>
    );
}

function UntitledSpine() {
    const { eggs } = useStacks();
    const catalogued = !!eggs.shrine;

    if (catalogued) {
        // The shrine has been found: the untitled volume earns its label,
        // and a small candle burns on top of it. The one lit book.
        return (
            <div className="relative flex-none self-end">
                <span
                    aria-hidden
                    className="pointer-events-none absolute -inset-4 rounded-full bg-[radial-gradient(circle_at_50%_18%,rgba(232,200,122,.22),transparent_65%)] [animation:twinkle_3.5s_ease-in-out_infinite]"
                />
                <svg
                    aria-hidden
                    viewBox="0 0 10 14"
                    className="absolute -top-[15px] left-1/2 h-[14px] w-[10px] -translate-x-1/2 [animation:flicker_1.6s_ease-in-out_infinite] [transform-origin:50%_100%]"
                >
                    <path
                        d="M5 0.5 C6.8 3.6 8.6 5.7 8.6 8.8 C8.6 11.6 7 13.4 5 13.4 C3 13.4 1.4 11.6 1.4 8.8 C1.4 5.7 3.2 3.6 5 0.5 Z"
                        fill="#f0d38a"
                    />
                    <path
                        d="M5 5 C5.9 6.8 6.6 7.8 6.6 9.6 C6.6 11.4 5.9 12.4 5 12.4 C4.1 12.4 3.4 11.4 3.4 9.6 C3.4 7.8 4.1 6.8 5 5 Z"
                        fill="#fdf3d5"
                    />
                </svg>
                <Link
                    href="/quotes"
                    title="the shrine"
                    className="relative flex h-[146px] w-[30px] flex-col items-center overflow-hidden rounded-[3px] bg-[linear-gradient(160deg,#2b2418,#3e321f)] shadow-[inset_2px_0_4px_rgba(255,255,255,.08),inset_-3px_0_6px_rgba(0,0,0,.45),0_0_16px_rgba(201,165,94,.28)]"
                >
                    <span className="mt-[8px] block h-[2px] w-[calc(100%-10px)] flex-none rounded-full bg-[rgba(232,200,122,.6)]" />
                    <span className="mt-2 block min-h-0 flex-1 overflow-hidden font-mono text-[9px] text-[#e8c87a] [writing-mode:vertical-rl]">
                        the shrine · 2022
                    </span>
                    <span className="mb-[6px] block h-[2px] w-[calc(100%-10px)] flex-none rounded-full bg-[rgba(232,200,122,.6)]" />
                </Link>
            </div>
        );
    }

    return (
        <Link
            href="/quotes"
            title="untitled"
            className="flex h-[138px] w-[26px] flex-none items-center justify-center rounded-[3px] border border-dashed border-[rgba(139,124,248,.22)] bg-[#141416] transition-colors hover:border-[#8b7cf8] hover:bg-[#17161c]"
        >
            <span className="font-mono text-[9.5px] text-[#3a3a3e] [writing-mode:vertical-rl]">
                untitled
            </span>
        </Link>
    );
}

function Bookend() {
    return (
        <div
            aria-hidden
            className="mb-0 h-[64px] w-[14px] flex-none rounded-[2px] bg-[linear-gradient(160deg,#6b5530,#8a6d3b)] shadow-[0_2px_6px_rgba(0,0,0,.5)] [clip-path:polygon(0_100%,100%_100%,100%_0,45%_0,0_62%)]"
        />
    );
}

export default function Bookshelf({ posts }: { posts: LibraryPost[] }) {
    const { catMode } = useStacks();

    // Oldest first: the shelf fills left to right as the library grows.
    const chronological = [...posts].reverse();
    const books = chronological.map((post, index) =>
        toBook(post, index, chronological.length),
    );

    const shelves: Book[][] = [];
    for (let i = 0; i < books.length; i += BOOKS_PER_SHELF) {
        shelves.push(books.slice(i, i + BOOKS_PER_SHELF));
    }
    const showYearPlates = shelves.length >= 3;
    const twoBay = books.length >= TWO_BAY_THRESHOLD;

    return (
        <div
            className={
                twoBay
                    ? "grid max-w-[1000px] grid-cols-1 gap-x-10 gap-y-9 lg:grid-cols-2"
                    : "flex max-w-[820px] flex-col gap-9"
            }
        >
            {shelves.map((shelfBooks, shelfIndex) => {
                const isLastShelf = shelfIndex === shelves.length - 1;
                const shelfFull = shelfBooks.length === BOOKS_PER_SHELF;
                const firstYear = shelfBooks[0]?.year;
                const lastYear = shelfBooks[shelfBooks.length - 1]?.year;
                return (
                    <div key={shelfIndex}>
                        <div className="-mx-5 flex [scrollbar-width:none] items-end gap-[7px] overflow-x-auto px-5 pt-3 sm:mx-0 sm:px-3">
                            {shelfBooks.map((book) => (
                                <BookSpine key={book.slug} book={book} />
                            ))}
                            {isLastShelf && <UntitledSpine />}
                            {isLastShelf && !shelfFull && <Bookend />}
                            {isLastShelf && catMode && (
                                <AnimatePresence>
                                    <motion.div
                                        initial={{ opacity: 0, y: 4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mb-[2px] flex-none text-[22px]"
                                        title=":3"
                                    >
                                        🐈‍⬛
                                    </motion.div>
                                </AnimatePresence>
                            )}
                        </div>
                        <div className="h-[10px] rounded-[2px] bg-gradient-to-b from-[#2a2a30] to-[#1a1a1d] shadow-[0_10px_22px_rgba(0,0,0,.5)]" />
                        {showYearPlates && firstYear && (
                            <p className="m-0 mt-[3px] ml-2 font-mono text-[9px] tracking-[.12em] text-[#3a3a3e]">
                                {firstYear === lastYear
                                    ? firstYear
                                    : `${firstYear}–${lastYear}`}
                            </p>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

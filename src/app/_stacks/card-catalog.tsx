"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export type CatalogPost = {
    slug: string;
    idx: string;
    title: string;
};

export default function CardCatalog({ posts }: { posts: CatalogPost[] }) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [selected, setSelected] = useState(0);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const router = useRouter();

    const matches = posts.filter(
        (post) =>
            post.title.includes(query.toLowerCase()) ||
            post.idx.includes(query),
    );
    const clampedSelection = Math.min(selected, Math.max(matches.length - 1, 0));

    useEffect(() => {
        const onKey = (event: KeyboardEvent) => {
            const target = event.target as HTMLElement | null;
            const typing =
                target &&
                (target.tagName === "INPUT" ||
                    target.tagName === "TEXTAREA" ||
                    target.isContentEditable);
            if (event.key === "/" && !typing) {
                event.preventDefault();
                setOpen(true);
                setQuery("");
                setSelected(0);
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    useEffect(() => {
        if (open) inputRef.current?.focus();
    }, [open]);

    const pick = (slug: string) => {
        setOpen(false);
        router.push(`/blog/${slug}`);
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 z-[140] flex items-start justify-center bg-[rgba(8,8,10,.7)] px-5 pt-[14vh] backdrop-blur-[3px]"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        onClick={(event) => event.stopPropagation()}
                        role="dialog"
                        aria-modal="true"
                        aria-label="card catalog"
                        className="w-full max-w-[440px] rounded-[10px] border border-[rgba(139,124,248,.25)] bg-[#141416] shadow-[0_30px_80px_rgba(0,0,0,.6)]"
                    >
                        <p className="m-0 border-b border-[rgba(139,124,248,.35)] px-5 pt-4 pb-2 font-mono text-[10px] tracking-[.2em] text-[#57544e]">
                            CARD CATALOG
                        </p>
                        <input
                            ref={inputRef}
                            value={query}
                            onChange={(event) => {
                                setQuery(event.target.value);
                                setSelected(0);
                            }}
                            onKeyDown={(event) => {
                                if (event.key === "Escape") setOpen(false);
                                if (event.key === "ArrowDown") {
                                    event.preventDefault();
                                    setSelected((s) =>
                                        Math.min(s + 1, matches.length - 1),
                                    );
                                }
                                if (event.key === "ArrowUp") {
                                    event.preventDefault();
                                    setSelected((s) => Math.max(s - 1, 0));
                                }
                                if (event.key === "Enter") {
                                    const match = matches[clampedSelection];
                                    if (match) pick(match.slug);
                                }
                            }}
                            placeholder="title or nº"
                            className="w-full border-0 bg-transparent px-5 py-3 font-mono text-[13px] text-[#e8e5dd] outline-none placeholder:text-[#3a3a3e]"
                        />
                        <div className="max-h-[40vh] overflow-y-auto pb-2">
                            {matches.length === 0 ? (
                                <p className="m-0 px-5 py-3 font-serif text-[14px] text-[#57544e] italic">
                                    nothing in the stacks by that name.
                                </p>
                            ) : (
                                matches.map((post, index) => (
                                    <button
                                        key={post.slug}
                                        onClick={() => pick(post.slug)}
                                        onMouseEnter={() => setSelected(index)}
                                        className="flex w-full cursor-pointer items-baseline gap-3 px-5 py-[9px] text-left"
                                        style={{
                                            background:
                                                index === clampedSelection
                                                    ? "rgba(139,124,248,.08)"
                                                    : "transparent",
                                        }}
                                    >
                                        <span className="flex-none font-mono text-[11px] text-[#57544e]">
                                            {post.idx}
                                        </span>
                                        <span className="flex-1 font-serif text-[15px] text-[#e8e5dd] italic">
                                            {post.title}
                                        </span>
                                    </button>
                                ))
                            )}
                        </div>
                        <p className="m-0 border-t border-[rgba(255,255,255,.06)] px-5 py-2 text-right font-mono text-[10px] text-[#3a3a3e]">
                            ↑↓ · enter · esc
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

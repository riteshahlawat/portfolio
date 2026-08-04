import GrantEggOnVisit from "@/app/_stacks/grant-egg-on-visit";
import Link from "next/link";
import ZeroNote from "./zero-note";
import { absolute, sharedOpenGraph } from "@/app/_seo/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "note to self",
    robots: { index: false, follow: false },
    // Self-referencing: without it this inherits the root layout's canonical
    // and declares itself to be the homepage.
    alternates: { canonical: "/blog/000" },
    openGraph: { ...sharedOpenGraph, url: absolute("/blog/000") },
};

export default function EntryZero() {
    return (
        <main className="mx-auto w-full max-w-[640px] flex-1 px-5 sm:px-8">
            <GrantEggOnVisit id="zero" />
            <div className="pt-16 pb-5">
                <p className="m-0 font-mono text-[11px] tracking-[.25em] text-[#57544e]">
                    ENTRY Nº 000 · UNLISTED
                </p>
                <h1 className="mt-[18px] mb-0 font-serif text-[34px] leading-[1.25] font-normal text-[#f2efe8] italic">
                    note to self
                </h1>
                <ZeroNote />
                <p className="mt-[18px] mb-0 font-mono text-[12px] text-[#57544e]">
                    arrays start at zero. so did i. ·{" "}
                    <Link
                        href="/blog/my-favorite-quotes"
                        className="text-[#8b7cf8] hover:text-[#a89bff]"
                    >
                        nº 001 →
                    </Link>
                </p>
            </div>
        </main>
    );
}

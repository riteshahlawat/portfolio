import type { Metadata } from "next";
import Link from "next/link";
import GrantEggOnVisit from "./_stacks/grant-egg-on-visit";

export const metadata: Metadata = {
    title: "there is no page for you to escape to.",
    robots: { index: false, follow: false },
    // A 404 has no canonical version of itself. Null clears the one the root
    // layout would otherwise hand down, which points at the homepage.
    alternates: { canonical: null },
};

export default function NotFound() {
    return (
        <main className="mx-auto w-full max-w-[640px] flex-1 px-5 sm:px-8">
            <GrantEggOnVisit id="notfound" />
            <div className="pt-16 pb-5">
                <p className="m-0 font-serif text-[clamp(72px,28vw,120px)] leading-none font-normal text-[#1c1c1f] italic">
                    404
                </p>
                <h1 className="mt-2 mb-0 font-serif text-[30px] leading-[1.35] font-normal text-[#e8e5dd] italic">
                    there is no page for you to escape to.
                </h1>
                <div className="mt-[22px] max-w-[52ch] text-[14.5px] leading-[1.85] text-[#8f8c85]">
                    <p className="m-0">
                        You came here looking for something that doesn&apos;t
                        exist. Most of us spend years doing that — different
                        job, different city, different person, same search
                        bar.
                    </p>
                    <p className="mt-[14px] mb-0">
                        The good news: the way back is one click, not one
                        lifetime.
                    </p>
                </div>
                <p className="mt-[26px] mb-0 text-[13px]">
                    <Link
                        href="/"
                        className="text-[#8b7cf8] hover:text-[#a89bff]"
                    >
                        ← go home
                    </Link>
                </p>
            </div>
        </main>
    );
}

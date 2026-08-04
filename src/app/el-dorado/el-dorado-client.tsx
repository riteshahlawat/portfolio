"use client";

import Link from "next/link";
import GrantEggOnVisit from "../_stacks/grant-egg-on-visit";
import { useStacks } from "../_stacks/providers";

const STARFIELD =
    "radial-gradient(2px 2px at 20% 20%,rgba(232,200,122,.5),transparent)," +
    "radial-gradient(1.5px 1.5px at 70% 15%,rgba(232,200,122,.4),transparent)," +
    "radial-gradient(1px 1px at 45% 45%,rgba(232,200,122,.35),transparent)," +
    "radial-gradient(1.5px 1.5px at 85% 60%,rgba(232,200,122,.3),transparent)," +
    "radial-gradient(1px 1px at 15% 70%,rgba(232,200,122,.3),transparent)";

export default function ElDoradoClient() {
    const { catMode } = useStacks();

    return (
        <main className="relative mx-auto w-full max-w-[640px] flex-1 px-5 sm:px-8">
            <GrantEggOnVisit id="eldorado" />
            <div
                className="pointer-events-none absolute inset-0 [animation:twinkle_3.5s_ease-in-out_infinite]"
                style={{ background: STARFIELD }}
            />
            <div className="relative pt-20 pb-10 text-center">
                <p className="m-0 font-mono text-[11px] tracking-[.35em] text-[#8a6d3b]">
                    YOU FOUND IT
                </p>
                <h1 className="gold-shimmer-text mt-[22px] mb-0 font-serif text-[clamp(36px,13vw,58px)] leading-[1.1] font-normal italic">
                    El Dorado
                </h1>
                <p className="mt-[10px] mb-0 font-mono text-[11px] tracking-[.3em] text-[#57544e]">
                    POPULATION: {catMode ? "YOU + 1 CAT" : "YOU"}
                </p>
                <div className="mx-auto mt-9 max-w-[46ch] text-left text-[14.5px] leading-[1.85] text-[#a5a29a]">
                    <p className="m-0">
                        Raleigh never found it. The expeditions never came
                        back. Somewhere along the way a ceremony became a
                        kingdom, a kingdom became a city, and a city became a
                        dream.
                    </p>
                    <p className="mt-[14px] mb-0">
                        And you? You clicked a word in an essay on a
                        stranger&apos;s website. Of everyone who ever went
                        looking, you got here the cheapest.
                    </p>
                    <p className="mt-[14px] mb-0">
                        There&apos;s still no gold. There never was. The
                        cities worth anything are the ones people built for
                        whoever came after them.
                    </p>
                    <p className="mt-[22px] mb-0 text-center font-serif text-[19px] font-normal text-[#e8c87a] italic">
                        leave something worth inheriting.
                    </p>
                </div>
                <p className="mt-10 mb-0 text-[13px]">
                    <Link
                        href="/"
                        className="text-[#7a7770] hover:text-[#e8c87a]"
                    >
                        close the map. go build something. →
                    </Link>
                </p>
            </div>
        </main>
    );
}

"use client";

import { useStacks } from "../_stacks/providers";

export function AboutHeading() {
    const { catTail } = useStacks();
    return (
        <h1 className="mt-4 mb-0 font-serif text-[40px] leading-[1.2] font-normal text-[#f2efe8] italic">
            ahlawat.{catTail}
        </h1>
    );
}

export function CatsLine() {
    const { catTail } = useStacks();
    return (
        <p className="mt-[14px] mb-0">
            Toronto raised me. The Bay Area has me now. Away from the
            keyboard, I&apos;m usually training, playing chess, or being
            outmaneuvered by two cats{catTail}.
        </p>
    );
}

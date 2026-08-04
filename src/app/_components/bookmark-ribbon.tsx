"use client";

import {
    motion,
    useReducedMotion,
    useScroll,
    useTransform,
} from "motion/react";

/**
 * A ribbon bookmark draped down the essay's right gutter. It hangs from
 * the top of the article and extends as you read, ending in the classic
 * notched tail. Lives inside the post's (relative) <main>, so it tracks
 * the article, not the viewport. No extra smoothing: Lenis already eases
 * the scroll itself, and a spring on top reads as lag.
 * Hidden below 1100px where there is no gutter.
 */
export default function BookmarkRibbon() {
    const { scrollYProgress } = useScroll();
    const reducedMotion = useReducedMotion();
    const height = useTransform(scrollYProgress, (value) =>
        reducedMotion ? "100%" : `${Math.max(value, 0.04) * 100}%`,
    );
    const scaleX = useTransform(scrollYProgress, (value) =>
        reducedMotion ? 1 : value,
    );

    return (
        <>
            {/* Mobile: the same ribbon, lying along the top edge. */}
            <motion.div
                aria-hidden
                style={{ scaleX }}
                className="fixed inset-x-0 top-0 z-[90] h-[3px] origin-left bg-[linear-gradient(90deg,rgba(139,124,248,.45),#8b7cf8_78%,#c4b5fd)] shadow-[0_0_10px_rgba(139,124,248,.55)] min-[1100px]:hidden"
            />
            <div
                aria-hidden
                className="bookmark-ribbon pointer-events-none absolute top-14 -right-16 bottom-40 hidden min-[1100px]:block"
            >
                <motion.div
                    style={{ height }}
                    className="w-[16px] [clip-path:polygon(0_0,100%_0,100%_100%,50%_calc(100%-11px),0_100%)]"
                >
                    <div className="h-full w-full bg-[linear-gradient(180deg,rgba(139,124,248,.42),rgba(139,124,248,.16))] shadow-[inset_1px_0_0_rgba(255,255,255,.08),inset_-1px_0_0_rgba(0,0,0,.3)]" />
                </motion.div>
                {/* the stitch where the ribbon is bound into the book */}
                <div className="absolute -top-[3px] left-[-2px] h-[3px] w-[20px] rounded-full bg-[rgba(139,124,248,.5)]" />
            </div>
        </>
    );
}

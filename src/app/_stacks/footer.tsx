"use client";

import { useRef, useSyncExternalStore } from "react";
import { EGG_COUNT } from "./eggs";

const noop = () => undefined;
const emptySubscribe = () => noop;
import { useStacks } from "./providers";

export default function Footer() {
    const { catTail, eggCount, setDrawerOpen, lamp, toggleCat } = useStacks();
    // False during SSR, evaluated client-side after hydration.
    const nightOwl = useSyncExternalStore(
        emptySubscribe,
        () => {
            const hour = new Date().getHours();
            return hour >= 1 && hour < 5;
        },
        () => false,
    );

    // Touch path into cat mode: triple-tap the copyright line within 1.2s.
    const taps = useRef<number[]>([]);
    const onCopyrightTap = () => {
        const now = performance.now();
        taps.current = [...taps.current.filter((t) => now - t < 1200), now];
        if (taps.current.length >= 3) {
            taps.current = [];
            toggleCat();
        }
    };

    return (
        <footer className="mx-auto mt-auto flex w-full max-w-[1000px] flex-wrap items-center justify-between gap-x-4 gap-y-1 px-5 pt-11 pb-[max(30px,env(safe-area-inset-bottom))] sm:px-8">
            <span
                onClick={onCopyrightTap}
                className="text-[12px] text-[#57544e] select-none"
            >
                © mmxxvi · built at night
                {lamp && <span className="text-[#c9a55e]"> · lit</span>}
                {nightOwl && " · so is this visit"}
                {catTail}
            </span>
            <button
                onClick={() => setDrawerOpen(true)}
                title="the drawer"
                className="-my-3 min-h-11 cursor-pointer py-3 font-mono text-[12px] text-[#57544e] hover:text-[#8b7cf8]"
            >
                🥚 <span className="text-[#8b7cf8]">{eggCount}</span>/{EGG_COUNT}{" "}
                found
            </button>
        </footer>
    );
}

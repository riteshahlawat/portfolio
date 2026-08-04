"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { EGG_COUNT, EGG_DEFS, SPOILED_STORAGE_KEY } from "./eggs";
import { useStacks } from "./providers";

const REVEAL_STEPS = [
    "reveal the eggs",
    "are you sure?",
    "are you really sure??",
    "they're called easter eggs for a reason.",
    "the hunt is the whole point, you know.",
    "fine.",
];

// One step only for repeat offenders — we both know how this ends.
const REVEAL_STEPS_AGAIN = ["reveal them again"];

export default function Drawer() {
    const { drawerOpen } = useStacks();

    return <AnimatePresence>{drawerOpen && <DrawerPanel />}</AnimatePresence>;
}

function DrawerPanel() {
    const { eggs, eggCount, setDrawerOpen, resetHunt, catMode, toggleCat } =
        useStacks();
    const allFound = eggCount === EGG_COUNT;
    // Panel mounts on open, so this reads storage once per drawer opening.
    const [spoiledBefore] = useState(() => {
        try {
            return localStorage.getItem(SPOILED_STORAGE_KEY) === "1";
        } catch {
            return false;
        }
    });
    const steps = spoiledBefore ? REVEAL_STEPS_AGAIN : REVEAL_STEPS;
    const openedAt = useRef(0);
    const panelRef = useRef<HTMLDivElement | null>(null);

    // Move focus into the dialog on open, back to the opener on close.
    useEffect(() => {
        openedAt.current = Date.now();
        const opener = document.activeElement as HTMLElement | null;
        panelRef.current?.focus();
        return () => opener?.focus();
    }, []);
    // Session-only: closing the drawer unmounts this panel and re-hides them.
    const [revealStep, setRevealStep] = useState(0);
    const revealed = revealStep >= steps.length;

    const onRevealClick = () => {
        if (revealed) return;
        if (revealStep === steps.length - 1) {
            try {
                localStorage.setItem(SPOILED_STORAGE_KEY, "1");
            } catch {
                // storage unavailable
            }
        }
        setRevealStep((step) => step + 1);
    };

    const unfoundIndex = (id: string) =>
        EGG_DEFS.filter((d) => !eggs[d.id]).findIndex((d) => d.id === id);

    const rowAction = (def: (typeof EGG_DEFS)[number]) => {
        if (def.id === "cat") {
            return (
                <button
                    onClick={toggleCat}
                    className="flex-none cursor-pointer font-mono text-[11px] whitespace-nowrap text-[#8b7cf8] hover:text-[#a89bff]"
                >
                    {catMode ? "turn off" : "turn on"}
                </button>
            );
        }
        if ("href" in def) {
            return (
                <Link
                    href={def.href}
                    onClick={() => setDrawerOpen(false)}
                    className="flex-none font-mono text-[11px] whitespace-nowrap text-[#8b7cf8] hover:text-[#a89bff]"
                >
                    visit →
                </Link>
            );
        }
        return null;
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => {
                // Ignore the tap-through click right after opening (gotcha 3).
                if (Date.now() - openedAt.current > 350) setDrawerOpen(false);
            }}
            className="fixed inset-0 z-[100] flex items-start justify-center bg-[rgba(8,8,10,.78)] p-4 pt-[8vh] backdrop-blur-[3px] sm:items-center sm:p-6 sm:pt-6"
        >
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                onClick={(event) => event.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label="the drawer"
                ref={panelRef}
                tabIndex={-1}
                className="max-h-[85dvh] w-full max-w-[520px] overflow-y-auto rounded-[14px] border border-[rgba(139,124,248,.25)] bg-[#141416] px-5 py-6 shadow-[0_30px_80px_rgba(0,0,0,.6)] outline-none sm:px-9 sm:py-8"
            >
                <div className="flex items-baseline justify-between">
                    <p className="m-0 font-mono text-[12px] font-medium tracking-[.2em] text-[#c9a55e]">
                        THE DRAWER · {eggCount}/{EGG_COUNT}
                    </p>
                    <button
                        onClick={() => setDrawerOpen(false)}
                        className="-my-2 min-h-11 cursor-pointer py-2 font-mono text-[12px] text-[#57544e]"
                    >
                        esc ✕
                    </button>
                </div>
                <p className="mt-3 mb-0 text-[12.5px] text-[#7a7770]">
                    everything you&apos;ve found on this site lives here. find
                    all seven and something changes.
                </p>
                <div className="mt-[18px] flex flex-col gap-[2px]">
                    {EGG_DEFS.map((def) => {
                        const found = !!eggs[def.id];
                        const spoiled = !found && revealed;
                        return (
                            <div
                                key={def.id}
                                className="flex flex-wrap items-baseline gap-x-[14px] gap-y-1 border-b border-[rgba(255,255,255,.05)] py-[10px]"
                            >
                                {spoiled ? (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: 6,
                                            filter: "blur(4px)",
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            filter: "blur(0px)",
                                        }}
                                        transition={{
                                            duration: 0.45,
                                            ease: [0.22, 1, 0.36, 1],
                                            delay:
                                                0.35 +
                                                unfoundIndex(def.id) * 0.12,
                                        }}
                                        className="flex flex-1 items-baseline gap-[14px]"
                                    >
                                        <span className="flex-none text-[16px] opacity-55">
                                            {def.icon}
                                        </span>
                                        <span className="flex-none font-mono text-[12px] font-medium text-[#7a7770] sm:w-[130px]">
                                            {def.name}
                                        </span>
                                        <span className="min-w-[160px] flex-1 basis-full text-[12px] leading-[1.55] text-[#57544e] italic sm:basis-auto">
                                            {def.spoiler}
                                        </span>
                                        {rowAction(def)}
                                    </motion.div>
                                ) : (
                                    <>
                                        <span
                                            className="flex-none text-[16px]"
                                            style={{
                                                opacity: found ? 1 : 0.35,
                                            }}
                                        >
                                            {found ? def.icon : "❓"}
                                        </span>
                                        <span
                                            className="flex-none font-mono text-[12px] font-medium sm:w-[130px]"
                                            style={{
                                                color: found
                                                    ? "#c4b5fd"
                                                    : "#3a3a3e",
                                            }}
                                        >
                                            {found ? def.name : "???"}
                                        </span>
                                        <span className="min-w-[160px] flex-1 basis-full text-[12px] leading-[1.55] text-[#57544e] italic sm:basis-auto">
                                            {def.hint}
                                        </span>
                                        {found && rowAction(def)}
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
                {allFound && (
                    <p className="gold-shimmer-text mt-[18px] mb-0 text-center font-serif text-[16px] italic">
                        all seven. the lamp is yours, night owl.
                    </p>
                )}
                <div className="mt-4 flex items-baseline justify-between">
                    {!allFound ? (
                        revealed ? (
                            <motion.span
                                key="disappointing"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="font-serif text-[13px] text-[#7a7770] italic"
                            >
                                {spoiledBefore
                                    ? "still disappointing."
                                    : "disappointing."}
                            </motion.span>
                        ) : (
                            <motion.button
                                key={revealStep}
                                onClick={onRevealClick}
                                initial={revealStep > 0 ? { x: 0 } : false}
                                animate={
                                    revealStep > 0
                                        ? { x: [0, -3, 3, -2, 2, 0] }
                                        : undefined
                                }
                                transition={{ duration: 0.3 }}
                                className="cursor-pointer font-mono text-[11px] text-[#3a3a3e] hover:text-[#8b7cf8]"
                            >
                                {steps[revealStep]}
                            </motion.button>
                        )
                    ) : (
                        <span />
                    )}
                    <button
                        onClick={resetHunt}
                        className="cursor-pointer font-mono text-[11px] text-[#3a3a3e] hover:text-[#8b7cf8]"
                    >
                        reset the hunt
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

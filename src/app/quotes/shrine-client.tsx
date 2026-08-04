"use client";

import {
    AnimatePresence,
    motion,
    useReducedMotion,
    useSpring,
} from "motion/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import GrantEggOnVisit from "../_stacks/grant-egg-on-visit";
import { useStacks } from "../_stacks/providers";

const QUOTES = [
    {
        text: "Aut viam inveniam aut faciam.",
        by: "hannibal · i shall either find a way or make one",
        bright: true,
    },
    {
        text: "But how could you live and have no story to tell?",
        by: "dostoevsky · white nights",
        bright: false,
    },
    {
        text: "The trouble is, you think you have time.",
        by: "jack kornfield",
        bright: false,
    },
    {
        text: "To understand everything is to forgive everything.",
        by: "madame de staël",
        bright: false,
    },
    {
        text: "This too, shall pass.",
        by: "persian adage",
        bright: false,
    },
];

export default function ShrineClient() {
    const { grant } = useStacks();
    const reducedMotion = useReducedMotion();
    const [candleOut, setCandleOut] = useState(false);
    const relightTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
        undefined,
    );
    const candleRef = useRef<HTMLButtonElement | null>(null);
    const lastPointer = useRef<{ x: number; y: number; t: number } | null>(
        null,
    );
    // The flame leans away from the pointer; a fast swipe snuffs it.
    const lean = useSpring(0, { stiffness: 160, damping: 12 });

    const snuff = () => {
        setCandleOut((out) => {
            if (out) return out;
            grant("candle");
            clearTimeout(relightTimer.current);
            relightTimer.current = setTimeout(
                () => setCandleOut(false),
                2600,
            );
            return true;
        });
    };

    useEffect(() => () => clearTimeout(relightTimer.current), []);

    useEffect(() => {
        if (reducedMotion) return;
        const onMove = (event: MouseEvent) => {
            const candle = candleRef.current;
            if (!candle) return;
            const rect = candle.getBoundingClientRect();
            const flameX = rect.left + rect.width / 2;
            const flameY = rect.top + rect.height * 0.25;
            const dx = event.clientX - flameX;
            const dy = event.clientY - flameY;
            const distance = Math.hypot(dx, dy);

            if (distance < 170) {
                const strength = 1 - distance / 170;
                lean.set(-Math.sign(dx || 1) * strength * 24);
            } else {
                lean.set(0);
            }

            const last = lastPointer.current;
            if (last) {
                const dt = event.timeStamp - last.t;
                if (dt > 0 && dt < 120 && distance < 90) {
                    const speed =
                        Math.hypot(
                            event.clientX - last.x,
                            event.clientY - last.y,
                        ) / dt;
                    if (speed > 1.1) snuff();
                }
            }
            lastPointer.current = {
                x: event.clientX,
                y: event.clientY,
                t: event.timeStamp,
            };
        };
        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reducedMotion]);

    return (
        <main className="mx-auto w-full max-w-[640px] flex-1 px-5 sm:px-8">
            <GrantEggOnVisit id="shrine" />
            <div className="pt-14 text-center">
                <button
                    ref={candleRef}
                    onClick={snuff}
                    title="don't."
                    aria-label="the candle"
                    className="relative inline-block h-[84px] w-[56px] cursor-pointer"
                >
                    {/* warm spill onto the page */}
                    <AnimatePresence>
                        {!candleOut && (
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                                className="pointer-events-none absolute -inset-16 rounded-full bg-[radial-gradient(circle,rgba(232,200,122,.14),transparent_65%)]"
                            />
                        )}
                    </AnimatePresence>
                    {/* flame */}
                    <AnimatePresence>
                        {!candleOut && (
                            <motion.svg
                                key="flame"
                                viewBox="0 0 24 34"
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{
                                    opacity: 0,
                                    scale: 0.3,
                                    transition: { duration: 0.12 },
                                }}
                                style={{ rotate: lean }}
                                className="candle-flicker absolute top-0 left-1/2 h-[34px] w-[24px] -translate-x-1/2 [animation:flicker_1.6s_ease-in-out_infinite] [transform-origin:50%_100%]"
                            >
                                <path
                                    d="M12 1 C16 9 21 14 21 22 C21 29 17 33 12 33 C7 33 3 29 3 22 C3 14 8 9 12 1 Z"
                                    fill="rgba(138,109,59,.55)"
                                />
                                <path
                                    d="M12 8 C14.5 13 17 16.5 17 22 C17 27 15 30.5 12 30.5 C9 30.5 7 27 7 22 C7 16.5 9.5 13 12 8 Z"
                                    fill="#f0d38a"
                                />
                                <path
                                    d="M12 16 C13.4 19 14.5 20.6 14.5 23.5 C14.5 26.6 13.4 28.6 12 28.6 C10.6 28.6 9.5 26.6 9.5 23.5 C9.5 20.6 10.6 19 12 16 Z"
                                    fill="#fdf3d5"
                                />
                            </motion.svg>
                        )}
                    </AnimatePresence>
                    {/* smoke */}
                    <AnimatePresence>
                        {candleOut && !reducedMotion && (
                            <motion.span
                                key="smoke"
                                initial={{ opacity: 0.5, y: 0, scaleY: 0.4 }}
                                animate={{ opacity: 0, y: -26, scaleY: 1.4 }}
                                transition={{
                                    duration: 1.2,
                                    ease: "easeOut",
                                }}
                                className="absolute top-[2px] left-1/2 h-[26px] w-[2px] -translate-x-1/2 rounded-full bg-[rgba(197,194,187,.5)] blur-[1px]"
                            />
                        )}
                    </AnimatePresence>
                    {/* wick + wax */}
                    <span className="absolute top-[32px] left-1/2 h-[6px] w-[2px] -translate-x-1/2 bg-[#3a3a35]" />
                    <span
                        className="absolute top-[38px] left-1/2 h-[40px] w-[26px] -translate-x-1/2 rounded-[4px] rounded-b-[2px]"
                        style={{
                            background: candleOut
                                ? "linear-gradient(180deg,#57544e,#3a3a3e)"
                                : "linear-gradient(180deg,#e8e5dd,#b5b2aa)",
                            transition: "background .4s",
                        }}
                    />
                    <span className="absolute top-[36px] left-1/2 h-[5px] w-[30px] -translate-x-1/2 rounded-full bg-[rgba(255,255,255,.12)]" />
                </button>
                <p className="mt-[14px] mb-0 font-mono text-[11px] tracking-[.3em] text-[#c9a55e]">
                    THE SHRINE · 2022
                </p>
                <p className="mx-auto mt-[14px] mb-0 max-w-[44ch] text-[13px] leading-[1.7] text-[#7a7770]">
                    my favorite quotes
                </p>
                <div className="min-h-[24px]">
                    {candleOut && (
                        <p className="mt-[10px] mb-0 font-serif text-[15px] font-normal text-[#e8e5dd] italic">
                            some things you keep lit.
                        </p>
                    )}
                </div>
            </div>
            <div className="flex flex-col gap-[22px] pt-8 pb-5">
                {QUOTES.map((quote, index) => (
                    <div
                        key={quote.by}
                        className="border-l-2 py-1 pl-5 transition-opacity duration-[600ms]"
                        style={{
                            borderColor: quote.bright
                                ? "#c9a55e"
                                : "rgba(201,165,94,.4)",
                            // Light falls off with distance from the candle:
                            // the top quote stays readable longest.
                            opacity: candleOut
                                ? Math.max(0.5 - index * 0.09, 0.16)
                                : 1,
                        }}
                    >
                        <p
                            className="m-0 font-serif text-[19px] leading-[1.55] font-normal italic"
                            style={{
                                color: quote.bright ? "#e8e5dd" : "#c9c6bf",
                            }}
                        >
                            {quote.text}
                        </p>
                        <p className="mt-[6px] mb-0 font-mono text-[11px] text-[#57544e]">
                            {quote.by}
                        </p>
                    </div>
                ))}
            </div>
            <p className="mt-5 mb-0 text-center text-[13px]">
                <Link href="/" className="text-[#7a7770] hover:text-[#8b7cf8]">
                    ← back to the library
                </Link>
            </p>
        </main>
    );
}

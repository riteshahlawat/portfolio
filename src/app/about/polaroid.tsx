"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ImageLightbox } from "../_components/expandable-image";
import { useStacks } from "../_stacks/providers";

export default function Polaroid() {
    const { grant } = useStacks();
    const [showBack, setShowBack] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const holdFired = useRef(false);
    const holdTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
        undefined,
    );
    const flipBackTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
        undefined,
    );

    useEffect(
        () => () => {
            clearTimeout(holdTimer.current);
            clearTimeout(flipBackTimer.current);
        },
        [],
    );

    const pressStart = () => {
        clearTimeout(holdTimer.current);
        holdFired.current = false;
        holdTimer.current = setTimeout(() => {
            holdFired.current = true;
            setShowBack(true);
            grant("polaroid");
        }, 850);
    };

    const scheduleFlipBack = () => {
        clearTimeout(holdTimer.current);
        setShowBack((current) => {
            if (current) {
                clearTimeout(flipBackTimer.current);
                flipBackTimer.current = setTimeout(
                    () => setShowBack(false),
                    1800,
                );
            }
            return current;
        });
    };

    // Short press (released before the hold fires) expands the photo;
    // a full hold flips the polaroid instead.
    const pressEnd = () => {
        const wasHold = holdFired.current;
        scheduleFlipBack();
        if (!wasHold && !showBack) setExpanded(true);
    };

    return (
        <div
            onPointerDown={pressStart}
            onPointerUp={pressEnd}
            onPointerLeave={scheduleFlipBack}
            onPointerCancel={scheduleFlipBack}
            className="w-[170px] flex-none rotate-2 cursor-zoom-in touch-manipulation select-none [-webkit-touch-callout:none] [perspective:800px] max-sm:order-first max-sm:mx-auto max-sm:w-[240px]"
        >
            <motion.div
                animate={{ rotateY: showBack ? 180 : 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative [transform-style:preserve-3d]"
                style={{ transformPerspective: 800 }}
            >
                <div className="rounded-[3px] bg-[#1a1a1d] p-[7px] pb-[26px] shadow-[0_6px_20px_rgba(0,0,0,.5)] [backface-visibility:hidden]">
                    <Image
                        src="/images/about/DSC06419.jpg"
                        alt="Ritesh at night under string lights"
                        width={340}
                        height={480}
                        draggable={false}
                        className="pointer-events-none block w-full rounded-[2px]"
                    />
                    <p className="mt-2 mb-0 text-center font-mono text-[9.5px] text-[#57544e]">
                        somewhere warm, after dark
                    </p>
                </div>
                <div className="absolute inset-0 flex [transform:rotateY(180deg)] items-center justify-center rounded-[3px] bg-[#e9e5d8] p-[7px] shadow-[0_6px_20px_rgba(0,0,0,.5)] [backface-visibility:hidden]">
                    <p className="m-0 -rotate-2 px-3 text-center font-serif text-[15px] leading-[1.6] font-normal text-[#3a3a35] italic">
                        for the plot.
                        <br />
                        <span className="text-[11px] text-[#8a8578]">
                            — r, 2026
                        </span>
                    </p>
                </div>
            </motion.div>
            <ImageLightbox
                src="/images/about/DSC06419.jpg"
                alt="somewhere warm, after dark"
                width={680}
                height={960}
                open={expanded}
                onClose={() => setExpanded(false)}
            />
        </div>
    );
}

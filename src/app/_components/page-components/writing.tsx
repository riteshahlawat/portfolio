"use client";

import { useEffect, useRef, useState } from "react";
import SectionDivider from "./section-divider";
import { useSetAtom } from "jotai";
import { writingSectionBoundsAtom } from "@/app/_state/atoms";
import MobileMargin from "./mobile-margin";

export default function Writing() {
    const ref = useRef<HTMLDivElement>(null);
    const [activeHoveredCard, setActiveHoveredCard] = useState<number | null>(
        null,
    );

    const setWritingBounds = useSetAtom(writingSectionBoundsAtom);

    useEffect(() => {
        if (ref.current) {
            const bounds = ref.current.getBoundingClientRect();

            // setWritingBounds({
            //     startY: bounds.top + window.scrollY,
            //     endY: bounds.bottom + window.scrollY,
            // });
        }
    }, [setWritingBounds]);

    return (
        <div className="mt-0 flex flex-col md:mt-16" id="writing" ref={ref}>
            <SectionDivider sectionName="Writing" />
            <p>Writing stuff...</p>
            <MobileMargin className="h-12" />
        </div>
    );
}

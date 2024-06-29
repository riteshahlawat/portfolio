"use client";

import { useEffect, useRef } from "react";
import SectionDivider from "./section-divider";
import { useSetAtom } from "jotai";
import { writingSectionBoundsAtom } from "@/app/_state/atoms";
import MobileMargin from "./mobile-margin";
import ExternalLink from "../links/external-link";

export default function Writing() {
    const ref = useRef<HTMLDivElement>(null);

    const setWritingBounds = useSetAtom(writingSectionBoundsAtom);

    useEffect(() => {
        if (ref.current) {
            const bounds = ref.current.getBoundingClientRect();

            setWritingBounds({
                startY: bounds.top + window.scrollY,
                endY: bounds.bottom + window.scrollY,
            });
        }
    }, [setWritingBounds]);

    return (
        <div className="mt-0 flex flex-col md:mt-16" id="writing" ref={ref}>
            <SectionDivider sectionName="Writing" />
            <p className="font-medium ">I try to write when I can</p>
            <ExternalLink className="mt-4" href="/blog" newTab={false}>
                View Blog
            </ExternalLink>
            <MobileMargin className="h-12" />
        </div>
    );
}

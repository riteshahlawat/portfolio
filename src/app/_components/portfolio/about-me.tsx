"use client";

import { useEffect, useRef } from "react";
import Code from "../code";
import ExternalTextLink from "../links/external-text-link";
import MobileMargin from "./mobile-margin";
import SectionDivider from "./section-divider";
import { useSetAtom } from "jotai";
import { aboutSectionBoundsAtom } from "@/app/_state/atoms";

export default function AboutMe() {
    const ref = useRef<HTMLDivElement>(null);

    const setAboutBounds = useSetAtom(aboutSectionBoundsAtom);

    useEffect(() => {
        if (ref.current) {
            const bounds = ref.current.getBoundingClientRect();

            setAboutBounds({
                startY: bounds.top + window.scrollY,
                endY: bounds.bottom + window.scrollY,
            });
        }
    }, [setAboutBounds]);
    return (
        <div id="about-me" className="flex-col" ref={ref}>
            <SectionDivider sectionName="About" />
            <p>
                I'm an awkward blend between full-stack and deep learning. Born
                to descend the gradient, forced to <Code>POST /upload</Code>{" "}
                type of blend. I've had the privilege of working in industry &
                research for deep learning, creating my own
                <em> (failed) </em>
                AI startup, and knowing too much about networks for my own good.
                Currently working on Infra @{" "}
                <ExternalTextLink href="https://www.commure.com/">
                    Commure
                </ExternalTextLink>
                . Originally from Toronto but living in Mountain View right now
                :)
            </p>
            <p className="mt-3">
                When I'm not at my computer, I'm usually olympic weightlifting,
                playing chess, rubbing my cats' bellies, or browsing through cat
                memes :3
            </p>
            <MobileMargin />
        </div>
    );
}

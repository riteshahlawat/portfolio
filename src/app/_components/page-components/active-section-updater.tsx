"use client";

import { scrollInfoAtom } from "@/app/_state/atoms";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

import { useWindowScrollPosition } from "rooks";
export default function ActiveSectionUpdater() {
    const { scrollY } = useWindowScrollPosition();
    const setMidScreenY = useSetAtom(scrollInfoAtom);

    useEffect(() => {
        setMidScreenY({
            scrollY: scrollY,
            windowHeight: window.innerHeight,
        });
    }, [scrollY, setMidScreenY]);

    return <></>;
}

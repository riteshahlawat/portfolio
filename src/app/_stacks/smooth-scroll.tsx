"use client";

import Lenis from "lenis";
import { useReducedMotion } from "motion/react";
import { useEffect } from "react";

export default function SmoothScroll() {
    const reducedMotion = useReducedMotion();

    useEffect(() => {
        if (reducedMotion) return;

        const lenis = new Lenis({
            lerp: 0.1,
            duration: 0.8,
            easing: (t: number) => 1 - Math.pow(1 - t, 4),
        });
        let frame: number;
        const raf = (time: number) => {
            lenis.raf(time);
            frame = requestAnimationFrame(raf);
        };
        frame = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(frame);
            lenis.destroy();
        };
    }, [reducedMotion]);

    return null;
}

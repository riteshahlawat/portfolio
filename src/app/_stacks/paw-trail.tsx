"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { useStacks } from "./providers";

const MIN_TRAVEL_SQ = 72 * 72;

export default function PawTrail() {
    const { catMode } = useStacks();
    const reducedMotion = useReducedMotion();
    const layerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!catMode || reducedMotion) return;
        if (window.matchMedia("(pointer: coarse)").matches) return;

        let last = { x: -999, y: -999 };
        const onMove = (event: MouseEvent) => {
            const layer = layerRef.current;
            if (!layer) return;
            const dx = event.clientX - last.x;
            const dy = event.clientY - last.y;
            if (dx * dx + dy * dy < MIN_TRAVEL_SQ) return;
            last = { x: event.clientX, y: event.clientY };

            const paw = document.createElement("div");
            paw.textContent = "🐾";
            paw.style.cssText = `position:fixed;left:${event.clientX - 13}px;top:${event.clientY - 13}px;font-size:26px;pointer-events:none;z-index:9999;--paw-rotate:${Math.random() * 60 - 30}deg;animation:pawFade .9s ease-out forwards`;
            layer.appendChild(paw);
            setTimeout(() => paw.remove(), 950);
        };
        window.addEventListener("mousemove", onMove);
        return () => window.removeEventListener("mousemove", onMove);
    }, [catMode, reducedMotion]);

    return <div ref={layerRef} className="pointer-events-none" />;
}

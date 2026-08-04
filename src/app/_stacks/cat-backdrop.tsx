"use client";

import {
    AnimatePresence,
    motion,
    useReducedMotion,
    useScroll,
    useTransform,
} from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { useStacks } from "./providers";

const CAT_GLYPHS = ["🐱", "🐈", "🐈‍⬛", "😼", "😺", "🐾", "😸", "🙀"];

// Deterministic PRNG so the herd doesn't reshuffle on every toggle.
const mulberry32 = (seed: number) => () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

// Far cats are small, dim, and barely move; near cats are bigger and faster.
const DEPTH_LAYERS = [
    { seed: 11, share: 0.45, factor: 0.55, size: [12, 18], opacity: 0.16 },
    { seed: 22, share: 0.35, factor: 0.32, size: [16, 26], opacity: 0.24 },
    { seed: 33, share: 0.2, factor: 0.12, size: [22, 34], opacity: 0.32 },
] as const;

function ParallaxLayer({
    layer,
    height,
    total,
    reducedMotion,
}: {
    layer: (typeof DEPTH_LAYERS)[number];
    height: number;
    total: number;
    reducedMotion: boolean;
}) {
    const { scrollY } = useScroll();
    // Translating the layer down while the page scrolls up makes it lag
    // behind the content — cheap parallax without touching Lenis.
    const y = useTransform(scrollY, (value) =>
        reducedMotion ? 0 : value * layer.factor,
    );

    const cats = useMemo(() => {
        const rand = mulberry32(layer.seed);
        const count = Math.round(total * layer.share);
        return Array.from({ length: count }, (_, i) => {
            // Edge-biased horizontal placement: most cats hug the margins,
            // a long tail reaches the middle. Center cats render dimmer.
            const inset = Math.pow(rand(), 2.2) * 50;
            const left = rand() < 0.5 ? inset : 100 - inset;
            const edgeCloseness = 1 - inset / 50;
            return {
                id: i,
                glyph: CAT_GLYPHS[Math.floor(rand() * CAT_GLYPHS.length)],
                left,
                top: rand() * 100,
                size:
                    layer.size[0] +
                    rand() * (layer.size[1] - layer.size[0]),
                rotate: rand() * 60 - 30,
                delay: rand() * 0.6,
                opacity: layer.opacity * (0.3 + 0.7 * edgeCloseness),
            };
        });
    }, [layer, total]);

    return (
        <motion.div style={{ y, height }} className="absolute inset-x-0 top-0">
            {cats.map((cat) => (
                <motion.span
                    key={cat.id}
                    initial={
                        reducedMotion
                            ? false
                            : { opacity: 0, scale: 0.6, rotate: cat.rotate }
                    }
                    animate={{
                        opacity: cat.opacity,
                        scale: 1,
                        rotate: cat.rotate,
                    }}
                    transition={{
                        duration: 0.4,
                        delay: reducedMotion ? 0 : cat.delay,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute"
                    style={{
                        left: `${cat.left}%`,
                        top: `${cat.top}%`,
                        fontSize: cat.size,
                    }}
                >
                    {cat.glyph}
                </motion.span>
            ))}
        </motion.div>
    );
}

export default function CatBackdrop() {
    const { catMode } = useStacks();
    const reducedMotion = useReducedMotion();
    const [pageHeight, setPageHeight] = useState(0);

    useEffect(() => {
        if (!catMode) return;
        const measure = () =>
            setPageHeight(document.documentElement.scrollHeight);
        measure();
        const observer = new ResizeObserver(measure);
        observer.observe(document.body);
        return () => observer.disconnect();
    }, [catMode]);

    // Density scales with page length; capped so long posts don't get 500 cats.
    const total = Math.min(160, Math.max(40, Math.round(pageHeight / 60)));

    return (
        <AnimatePresence>
            {catMode && pageHeight > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.8 }}
                    aria-hidden
                    style={{ height: pageHeight }}
                    className="pointer-events-none absolute inset-x-0 top-0 -z-10 overflow-hidden select-none"
                >
                    {DEPTH_LAYERS.map((layer) => (
                        <ParallaxLayer
                            key={layer.seed}
                            layer={layer}
                            height={pageHeight}
                            total={total}
                            reducedMotion={!!reducedMotion}
                        />
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

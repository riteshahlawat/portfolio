"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

const noop = () => undefined;
const emptySubscribe = () => noop;
// True after hydration, false during SSR — lint-safe mount detection.
const useMounted = () =>
    useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false,
    );

type ExpandableImageProps = {
    src: string;
    alt: string;
    width: number;
    height: number;
    className?: string;
    priority?: boolean;
};

export function ImageLightbox({
    src,
    alt,
    width,
    height,
    open,
    onClose,
}: {
    src: string;
    alt: string;
    width: number;
    height: number;
    open: boolean;
    onClose: () => void;
}) {
    const openedAt = useRef(0);
    // Portal to body: a transformed ancestor (e.g. the rotated polaroid)
    // would otherwise turn position:fixed into position:absolute.
    const mounted = useMounted();

    useEffect(() => {
        if (!open) return;
        openedAt.current = Date.now();
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [open, onClose]);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    onClick={() => {
                        // A tap's synthesized click can land on the overlay
                        // right after it opens — ignore the first ~350ms.
                        if (Date.now() - openedAt.current > 350) onClose();
                    }}
                    className="fixed inset-0 z-[150] flex cursor-zoom-out items-center justify-center bg-[rgba(8,8,10,.88)] p-6 backdrop-blur-[4px]"
                >
                    <motion.div
                        initial={{ scale: 0.94, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.96, opacity: 0 }}
                        transition={{
                            duration: 0.3,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="relative max-h-[88vh] max-w-[92vw]"
                    >
                        <Image
                            src={src}
                            alt={alt}
                            width={width * 2}
                            height={height * 2}
                            className="block h-auto max-h-[88vh] w-auto max-w-[92vw] rounded-[10px] object-contain shadow-[0_30px_80px_rgba(0,0,0,.6)]"
                        />
                        <p className="mt-3 mb-0 text-center font-mono text-[11px] text-[#a5a29a]">
                            {alt} · esc to close
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body,
    );
}

export default function ExpandableImage({
    src,
    alt,
    width,
    height,
    className,
    priority,
}: ExpandableImageProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                aria-label={`expand image: ${alt}`}
                className="block w-full cursor-zoom-in border-0 bg-transparent p-0 text-left"
            >
                <Image
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    priority={priority}
                    className={className}
                />
            </button>
            <ImageLightbox
                src={src}
                alt={alt}
                width={width}
                height={height}
                open={open}
                onClose={() => setOpen(false)}
            />
        </>
    );
}

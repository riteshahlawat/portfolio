"use client";

import { AnimatePresence, motion } from "motion/react";
import { useStacks } from "./providers";

export default function LampGlow() {
    const { lamp } = useStacks();

    return (
        <AnimatePresence>
            {lamp && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2 }}
                    aria-hidden
                    className="lamp-glow"
                />
            )}
        </AnimatePresence>
    );
}

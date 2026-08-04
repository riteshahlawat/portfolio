"use client";

import { AnimatePresence, motion } from "motion/react";
import { useStacks } from "./providers";

export default function EggToast() {
    const { toast } = useStacks();

    return (
        <AnimatePresence>
            {toast && (
                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="fixed bottom-7 left-1/2 z-[200] -translate-x-1/2 rounded-full border border-[rgba(139,124,248,.35)] bg-[#1c1a26] px-[22px] py-[10px] font-mono text-[12.5px] font-medium whitespace-nowrap text-[#e8e5dd] shadow-[0_10px_30px_rgba(0,0,0,.5)]"
                >
                    {toast}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

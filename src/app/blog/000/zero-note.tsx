"use client";

import { motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";

type RiddleBlock = {
    text: string;
    indent?: boolean;
    bright?: boolean;
    breakAfter?: boolean;
};

const RIDDLE_BLOCKS: RiddleBlock[] = [
    { text: "you have one enemy," },
    { text: "he has what you want,", indent: true, bright: true },
    {
        text: "has done what you could dream of doing,",
        indent: true,
        bright: true,
    },
    { text: "and is who you want to be.", indent: true, bright: true, breakAfter: true },
    {
        text: "your struggles are a fraction of his and your intellect is but a shadow to his wisdom.",
        breakAfter: true,
    },
    { text: "he's reached the zenith, you're at the nadir. who is he?" },
];

const ANSWER_LINE_1 = "he is you, 10 years from now.";
const ANSWER_LINE_2 = "you must beat him. you must win.";

const WORD_STAGGER = 0.09;
const START_DELAY = 0.4;

export default function ZeroNote() {
    const [revealed, setRevealed] = useState(false);
    const [writingDone, setWritingDone] = useState(false);
    const reducedMotion = useReducedMotion();

    const { blocks, totalWords } = useMemo(() => {
        let counter = 0;
        const blocks = RIDDLE_BLOCKS.map((block) => {
            const words = block.text.split(" ").map((word) => ({
                word,
                index: counter++,
            }));
            return { ...block, words };
        });
        return { blocks, totalWords: counter };
    }, []);

    return (
        <>
            <div className="mt-[30px] rounded-[8px] border border-[rgba(255,255,255,.07)] bg-[#141416] px-5 py-6 font-serif text-[17px] leading-[1.85] font-normal text-[#d6d3cd] italic sm:px-8 sm:py-7 sm:text-[19px]">
                {blocks.map((block, blockIndex) => (
                    <p
                        key={blockIndex}
                        className={[
                            "m-0",
                            block.indent ? "pl-6 text-[#e8e5dd]" : "",
                            blockIndex > 0 && !block.indent
                                ? "mt-[18px]"
                                : blockIndex > 0
                                  ? "mt-[2px]"
                                  : "",
                            block.breakAfter ? "mb-0" : "",
                        ].join(" ")}
                    >
                        {block.words.map(({ word, index }) => (
                            <motion.span
                                key={index}
                                initial={
                                    reducedMotion
                                        ? false
                                        : { opacity: 0, filter: "blur(3px)" }
                                }
                                animate={{
                                    opacity: 1,
                                    filter: "blur(0px)",
                                }}
                                transition={{
                                    duration: 0.35,
                                    delay: reducedMotion
                                        ? 0
                                        : START_DELAY + index * WORD_STAGGER,
                                    ease: "easeOut",
                                }}
                                onAnimationComplete={
                                    index === totalWords - 1
                                        ? () => setWritingDone(true)
                                        : undefined
                                }
                                className="inline"
                            >
                                {word}
                                {index !== totalWords - 1 ? " " : ""}
                            </motion.span>
                        ))}
                    </p>
                ))}
            </div>

            <div className="mt-6 min-h-[32px] text-center">
                {revealed ? (
                    <motion.div
                        initial={
                            reducedMotion
                                ? false
                                : { opacity: 0, filter: "blur(10px)", y: 6 }
                        }
                        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <p className="m-0 font-serif text-[22px] leading-[1.7] font-normal text-[#e8e5dd] italic">
                            {ANSWER_LINE_1}
                        </p>
                        <motion.p
                            initial={reducedMotion ? false : { opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 1.2 }}
                            className="m-0 mt-2 font-serif text-[22px] leading-[1.7] font-normal text-[#a89bff] italic"
                        >
                            {ANSWER_LINE_2}
                        </motion.p>
                    </motion.div>
                ) : (
                    (!!reducedMotion || writingDone) && (
                        <motion.button
                            initial={reducedMotion ? false : { opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            onClick={() => setRevealed(true)}
                            className="-my-2 min-h-11 cursor-pointer border-b border-dashed border-[rgba(139,124,248,.4)] py-2 pb-[2px] font-mono text-[12px] text-[#57544e] transition-colors hover:border-[#8b7cf8] hover:text-[#8b7cf8]"
                        >
                            who is he?
                        </motion.button>
                    )
                )}
            </div>
        </>
    );
}

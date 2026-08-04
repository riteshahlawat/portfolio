"use client";

import { useEffect } from "react";

// Copying 40+ words from an essay appends a citation, the same way the
// site attributes everyone else it quotes. No toast, no nag.
export default function CopyCitation({
    idx,
    title,
    slug,
}: {
    idx: string;
    title: string;
    slug: string;
}) {
    useEffect(() => {
        const onCopy = (event: ClipboardEvent) => {
            const selection = document.getSelection();
            if (!selection || selection.isCollapsed) return;
            const anchor = selection.anchorNode?.parentElement;
            if (!anchor?.closest(".post-body")) return;
            const text = selection.toString();
            if (text.trim().split(/\s+/).length < 40) return;
            event.preventDefault();
            event.clipboardData?.setData(
                "text/plain",
                `${text}\n\nritesh ahlawat · nº ${idx} · ${title.toLowerCase()} · https://ahlawat.dev/blog/${slug}`,
            );
        };
        document.addEventListener("copy", onCopy);
        return () => document.removeEventListener("copy", onCopy);
    }, [idx, title, slug]);

    return null;
}

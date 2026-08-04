"use client";

import { useEffect, useState } from "react";
import { useStacks } from "./providers";

const VISITOR_ID_STORAGE_KEY = "portfolio:visitor-id";

const getVisitorId = () => {
    try {
        const stored = localStorage.getItem(VISITOR_ID_STORAGE_KEY);
        if (stored) return stored;
        const visitorId = crypto.randomUUID();
        localStorage.setItem(VISITOR_ID_STORAGE_KEY, visitorId);
        return visitorId;
    } catch {
        return crypto.randomUUID();
    }
};

const formatCompact = (count: number) => {
    if (count < 1000) return String(count);
    const thousands = count / 1000;
    return `${thousands >= 100 ? Math.round(thousands) : thousands.toFixed(1).replace(/\.0$/, "")}k`;
};

type ViewCountProps = {
    slug: string;
    /** "compact" → "2.4k" (library rows); "full" → "2,418 views" (post meta). */
    variant: "compact" | "full";
    increment?: boolean;
};

export default function ViewCount({
    slug,
    variant,
    increment = false,
}: ViewCountProps) {
    const [viewCount, setViewCount] = useState<number | null>(null);
    const { catTail } = useStacks();

    useEffect(() => {
        const abortController = new AbortController();

        const load = async () => {
            const response = await fetch(
                `/api/views/${encodeURIComponent(slug)}`,
                increment
                    ? {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ visitorId: getVisitorId() }),
                          signal: abortController.signal,
                      }
                    : { signal: abortController.signal },
            );
            if (!response.ok) throw new Error(`views ${response.status}`);
            const data = (await response.json()) as { viewCount: number };
            if (!abortController.signal.aborted) {
                setViewCount(data.viewCount);
            }
        };

        load().catch(() => {
            // leave the placeholder on failure
        });

        return () => abortController.abort();
    }, [slug, increment]);

    if (variant === "compact") {
        return <>{viewCount === null ? "—" : formatCompact(viewCount)}</>;
    }

    return (
        <>
            {viewCount === null ? "—" : viewCount.toLocaleString("en-US")} view
            {viewCount === 1 ? "" : "s"}
            {catTail}
        </>
    );
}

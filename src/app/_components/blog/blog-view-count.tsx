"use client";

import { Spinner } from "@/components/ui/spinner";
import { useEffect, useState } from "react";

const VISITOR_ID_STORAGE_KEY = "portfolio:visitor-id";

const getVisitorId = () => {
    try {
        const storedVisitorId = localStorage.getItem(VISITOR_ID_STORAGE_KEY);
        if (storedVisitorId) {
            return storedVisitorId;
        }

        const visitorId = crypto.randomUUID();
        localStorage.setItem(VISITOR_ID_STORAGE_KEY, visitorId);
        return visitorId;
    } catch {
        return crypto.randomUUID();
    }
};

type BlogViewCountProps = {
    slug: string;
    increment?: boolean;
    variant?: "article" | "compact";
};

type ViewCountResponse = {
    viewCount: number;
};

type ViewCountState = {
    requestKey: string;
    viewCount?: number;
    failed: boolean;
};

export default function BlogViewCount({
    slug,
    increment = true,
    variant = "article",
}: BlogViewCountProps) {
    const requestKey = `${slug}:${increment ? "increment" : "read"}`;
    const [state, setState] = useState<ViewCountState>({
        requestKey,
        failed: false,
    });

    useEffect(() => {
        const abortController = new AbortController();

        const loadViewCount = async () => {
            const response = await fetch(
                `/api/views/${encodeURIComponent(slug)}`,
                increment
                    ? {
                          method: "POST",
                          headers: {
                              "Content-Type": "application/json",
                          },
                          body: JSON.stringify({
                              visitorId: getVisitorId(),
                          }),
                          signal: abortController.signal,
                      }
                    : {
                          signal: abortController.signal,
                      },
            );

            if (!response.ok) {
                throw new Error(
                    `View counter request failed: ${response.status}`,
                );
            }

            const data = (await response.json()) as ViewCountResponse;
            if (!abortController.signal.aborted) {
                setState({
                    requestKey,
                    viewCount: data.viewCount,
                    failed: false,
                });
            }
        };

        void loadViewCount().catch((error: unknown) => {
            if (
                !abortController.signal.aborted &&
                !(error instanceof DOMException && error.name === "AbortError")
            ) {
                setState({
                    requestKey,
                    failed: true,
                });
            }
        });

        return () => abortController.abort();
    }, [increment, requestKey, slug]);

    const currentState =
        state.requestKey === requestKey ? state : { requestKey, failed: false };

    if (currentState.viewCount === undefined) {
        if (variant === "compact") {
            return <span aria-label="Loading views">— views</span>;
        }

        if (currentState.failed) {
            return <p>— Views</p>;
        }

        return <Spinner size="small" />;
    }

    if (variant === "compact") {
        return (
            <span>
                {currentState.viewCount} view
                {currentState.viewCount === 1 ? "" : "s"}
            </span>
        );
    }

    return (
        <p>
            {currentState.viewCount} View
            {currentState.viewCount === 1 ? "" : "s"}
        </p>
    );
}

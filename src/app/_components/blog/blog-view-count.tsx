"use client";

import { Spinner } from "@/components/ui/spinner";
import { api } from "@/trpc/react";
import { useEffect } from "react";

export default function BlogViewCount({ slug }: { slug: string }) {
    const utils = api.useUtils();

    const incrementViewCount = api.blog.incrementViewCount.useMutation({
        onSuccess: async (data) => {
            if (data.changed) {
                await utils.blog.viewCount.invalidate();
            }
        },
    });

    useEffect(() => {
        incrementViewCount.mutate({ slug });
    }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps

    const viewCountData = api.blog.viewCount.useQuery({
        slug,
    });

    const renderViewData = () => {
        if (viewCountData.isLoading) {
            return <Spinner size="small" />;
        }

        const viewCount = viewCountData.data?.viewCount ?? 0;

        return (
            <p>
                {viewCount} View{viewCount === 1 ? "" : "s"}
            </p>
        );
    };

    return <>{renderViewData()}</>;
}

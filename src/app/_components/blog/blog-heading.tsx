"use client";

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

export default function BlogHeading({
    children,
    headerComponentId,
}: {
    children: React.ReactNode;
    headerComponentId: string | undefined;
}) {
    const pathname = usePathname();
    const copyLinkToClipboard = async () => {
        if (window) {
            const linkToHeader =
                window.location.origin +
                "/" +
                pathname +
                "#" +
                headerComponentId;
            await navigator.clipboard.writeText(linkToHeader);
            toast.info("Link copied to clipboard");
        }
    };
    return (
        <Tooltip>
            <TooltipTrigger onClick={copyLinkToClipboard}>
                <div className="flex flex-row">{children}</div>
            </TooltipTrigger>
            <TooltipContent>
                <p>Copy link</p>
            </TooltipContent>
        </Tooltip>
    );
}

import { cn } from "@/lib/utils";

/**
 * Due to sticky header not working well with margin and paddings, I add a
 * div instead for mobile.
 */
export default function MobileMargin({ className }: { className?: string }) {
    return <div className={cn("block h-16 md:hidden", className)} />;
}

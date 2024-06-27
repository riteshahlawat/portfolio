import { cn } from "@/lib/utils";
import Link from "next/link";

export default function SectionLink({
    text,
    active,
    idToScrollTo,
}: {
    text: string;
    active: boolean;
    idToScrollTo: string;
}) {
    return (
        <Link
            href={`/#${idToScrollTo}`}
            className="group flex w-fit flex-row items-center py-3"
        >
            <div
                className={cn(
                    "mr-4 h-[1px] w-[32px] bg-zinc-500 transition-all duration-200  group-hover:w-[64px] group-hover:bg-zinc-50",
                    active && "w-[64px] bg-zinc-50",
                )}
            />
            <p
                className={cn(
                    "text-xs font-bold uppercase transition-all group-hover:text-zinc-100",
                    active && "text-zinc-100",
                )}
            >
                {text}
            </p>
        </Link>
    );
}

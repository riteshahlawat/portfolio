import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function ExternalLink({
    className,
    children,
    newTab = true,
    href,
}: {
    className?: string;
    children: React.ReactNode;
    newTab?: boolean;
    href: string;
}) {
    return (
        <Link href={href} target={newTab ? "_blank" : ""} className="w-fit">
            <div
                className={cn(
                    "group flex flex-row items-center font-bold hover:text-purple-400",
                    className,
                )}
            >
                {children}
                <ArrowUpRight className="ml-1 size-4 font-bold transition-all duration-200 group-hover:-translate-y-[2px] group-hover:translate-x-1" />
            </div>
        </Link>
    );
}

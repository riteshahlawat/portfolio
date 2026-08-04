"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStacks } from "./providers";

export default function Nav() {
    const { catMode, catTail, toggleCat } = useStacks();
    const pathname = usePathname();
    const onLibrary = pathname === "/" || pathname.startsWith("/blog");
    const onAbout = pathname === "/about";

    return (
        <nav className="mx-auto flex w-full max-w-[1000px] flex-wrap items-baseline justify-between gap-x-4 gap-y-2 px-5 pt-7 sm:px-8">
            <Link
                href="/"
                className="-my-2 flex min-h-11 items-center gap-[10px] py-2 font-mono text-[13px] font-medium tracking-[.04em] text-[#f2efe8]"
            >
                <Image
                    src="/images/brand/cat-book-mark.png"
                    alt=""
                    width={26}
                    height={26}
                    className="block rounded-[6px]"
                    priority
                />
                ritesh ahlawat{catTail}
            </Link>
            <div className="flex items-baseline gap-4 text-[13px] sm:gap-[26px]">
                {catMode && (
                    <button
                        onClick={toggleCat}
                        title="turn off cat mode"
                        className="cursor-pointer rounded-full border border-[rgba(201,165,94,.35)] px-[9px] py-[3px] font-mono text-[11px] text-[#c9a55e]"
                    >
                        🐾 :3 on
                    </button>
                )}
                <Link
                    href="/"
                    className={`-my-2 flex min-h-11 items-center py-2 ${
                        onLibrary
                            ? "text-[#8b7cf8]"
                            : "text-[#7a7770] hover:text-[#a89bff]"
                    }`}
                >
                    library
                </Link>
                <Link
                    href="/about"
                    className={`-my-2 flex min-h-11 items-center py-2 ${
                        onAbout
                            ? "text-[#8b7cf8]"
                            : "text-[#7a7770] hover:text-[#a89bff]"
                    }`}
                >
                    about
                </Link>
            </div>
        </nav>
    );
}

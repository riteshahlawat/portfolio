"use client";

import React from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const additionalPathNames = usePathname()
        .split("/")
        .filter((pathPart) => pathPart !== "");

    additionalPathNames.shift();

    const renderAdditionalBreadcrumbs = () => {
        if (additionalPathNames) {
            return (
                <>
                    {additionalPathNames.map((path) => (
                        <React.Fragment key={path}>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink>
                                    <Link href={`/blog/${path}`}>{path}</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                        </React.Fragment>
                    ))}
                </>
            );
        }
    };
    return (
        <main className="min-h-screen bg-zinc-900 py-6 text-zinc-400 selection:bg-[#6140f5c9]">
            <Breadcrumb className="ml-6">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            <Link href="/blog">Blog</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    {renderAdditionalBreadcrumbs()}
                </BreadcrumbList>
            </Breadcrumb>

            {children}
        </main>
    );
}

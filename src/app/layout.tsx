import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";

import {
    IBM_Plex_Mono,
    Instrument_Sans,
    Literata,
    Newsreader,
} from "next/font/google";

import { cn } from "@/lib/utils";
import { allBlogPosts } from "contentlayer/generated";
import { compareAsc } from "date-fns";
import type { Metadata, Viewport } from "next";
import JsonLd from "./_seo/json-ld";
import { siteGraph } from "./_seo/schema";
import { SITE, absolute, sharedOpenGraph } from "./_seo/site";
import CatBackdrop from "./_stacks/cat-backdrop";
import CardCatalog from "./_stacks/card-catalog";
import Drawer from "./_stacks/drawer";
import LampGlow from "./_stacks/lamp-glow";
import Footer from "./_stacks/footer";
import Nav from "./_stacks/nav";
import PawTrail from "./_stacks/paw-trail";
import { StacksProvider } from "./_stacks/providers";
import SmoothScroll from "./_stacks/smooth-scroll";
import EggToast from "./_stacks/toast";

const fontSans = Instrument_Sans({
    subsets: ["latin"],
    variable: "--font-sans",
});

const fontSerif = Newsreader({
    subsets: ["latin"],
    style: ["normal", "italic"],
    variable: "--font-serif",
});

const fontBook = Literata({
    subsets: ["latin"],
    style: ["normal", "italic"],
    variable: "--font-book",
});

const fontMono = IBM_Plex_Mono({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
    style: ["normal", "italic"],
    variable: "--font-mono",
});

export const viewport: Viewport = {
    themeColor: "#0e0e10",
};

export const metadata: Metadata = {
    metadataBase: new URL(SITE.url),
    title: {
        default: `${SITE.authorLower} · engineer, writing at night`,
        // Pages set a bare title; the brand is appended here so it can't drift.
        template: `%s · ${SITE.authorLower}`,
    },
    description: SITE.homeDescription,
    authors: [{ name: SITE.author, url: SITE.url }],
    creator: SITE.author,
    alternates: { canonical: "/" },
    openGraph: {
        ...sharedOpenGraph,
        type: "website",
        url: SITE.url,
        title: `${SITE.authorLower} · engineer, writing at night`,
        description: SITE.homeDescription,
    },
    twitter: {
        card: "summary_large_image",
        title: `${SITE.authorLower} · engineer, writing at night`,
        description: SITE.homeDescription,
        images: [absolute("/opengraph-image")],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            // The posts have real cover art; let Google show it full size.
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const catalogPosts = [...allBlogPosts]
        .sort((a, b) => compareAsc(new Date(a.date), new Date(b.date)))
        .map((post, index) => ({
            slug: post._raw.flattenedPath,
            idx: String(index + 1).padStart(3, "0"),
            title: post.title.toLowerCase(),
        }))
        .reverse();

    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    "flex min-h-[100svh] flex-col font-sans text-[#b5b2aa] antialiased",
                    fontSans.variable,
                    fontSerif.variable,
                    fontBook.variable,
                    fontMono.variable,
                )}
            >
                <JsonLd data={siteGraph} />
                <Analytics />
                <StacksProvider>
                    <SmoothScroll />
                    <LampGlow />
                    <CatBackdrop />
                    <PawTrail />
                    <CardCatalog posts={catalogPosts} />
                    <Nav />
                    {children}
                    <Footer />
                    <Drawer />
                    <EggToast />
                </StacksProvider>
            </body>
        </html>
    );
}

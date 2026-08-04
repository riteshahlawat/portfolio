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

export const viewport = {
    themeColor: "#0e0e10",
};

export const metadata = {
    title: "ritesh ahlawat",
    description: "Maybe one day I'll be good at writing.",
    metadataBase: new URL("https://ahlawat.dev"),
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
